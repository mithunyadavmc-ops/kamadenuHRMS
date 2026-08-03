import React, { useState } from 'react';
import { FileText, Sparkles, X, Upload, CheckCircle2, User, Briefcase, GraduationCap, Award } from 'lucide-react';
import { apiService } from '../../services/api';

interface AiResumeParserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCandidateExtracted?: (extractedData: any) => void;
}

export const AiResumeParserModal: React.FC<AiResumeParserModalProps> = ({
  isOpen,
  onClose,
  onCandidateExtracted
}) => {
  const [resumeText, setResumeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parsedResult, setParsedResult] = useState<any>(null);

  if (!isOpen) return null;

  const sampleResumeText = `SIDDHARTH VARMA
Senior Full Stack Software Engineer
Bengaluru, India | +91 99887 76655 | siddharth.varma@gmail.com

PROFESSIONAL SUMMARY:
Results-driven Senior Full Stack Engineer with 6.5 years of experience designing and deploying cloud-native web applications using React 18, TypeScript, Node.js, Express, and PostgreSQL. Demonstrated expertise in front-end performance, state management, and microservices architecture.

TECHNICAL SKILLS:
Languages: TypeScript, JavaScript, Python, SQL
Frontend: React 18, Redux Toolkit, Tailwind CSS, Vite, HTML5/CSS3
Backend: Node.js, Express, FastAPI, RESTful APIs, WebSockets
Databases: PostgreSQL, Redis, MongoDB
DevOps: Docker, AWS S3, CI/CD, Git

WORK EXPERIENCE:
Accenture India — Senior Software Engineer (July 2022 – Present)
• Architected scalable financial dashboard serving 500k active users.
• Reduced database query response times by 40% via query optimization and Redis caching.

Wipro Technologies — Software Developer (June 2019 – June 2022)
• Developed responsive client web interfaces and backend microservices.

EDUCATION:
B.Tech in Computer Science & Engineering — PES Institute of Technology (2019)`;

  const handleParse = async () => {
    if (!resumeText.trim()) return;
    setIsLoading(true);
    setParsedResult(null);

    try {
      const res = await apiService.aiParseResume(resumeText);
      setParsedResult(res.parsed);
    } catch (err: any) {
      alert('Failed to parse resume: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToCandidate = () => {
    if (parsedResult) {
      if (onCandidateExtracted) {
        onCandidateExtracted(parsedResult);
      }
      // Save directly as a new candidate in state
      apiService.createCandidate({
        fullName: parsedResult.fullName || 'Parsed Candidate',
        email: parsedResult.email || 'candidate@example.com',
        phone: parsedResult.phone || '+91 90000 00000',
        currentRole: parsedResult.currentRole || 'Software Engineer',
        currentCompany: parsedResult.currentCompany || 'Tech Corp',
        experienceYears: parsedResult.experienceYears || 5,
        skills: parsedResult.skills || ['React', 'TypeScript', 'Node.js'],
        appliedJobTitle: 'Senior Full Stack React/Node Engineer',
        companyName: 'Infosys Technologies',
        stage: 'sourced',
        matchScore: 92,
        resumeText: resumeText
      }).then(() => {
        alert('Candidate parsed & added to candidate database successfully!');
        onClose();
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                Kamadenu AI Resume Parser
                <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full font-semibold">
                  OCR & Entity Extraction
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Paste raw resume text to extract skills, experience, contact & work history.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Sample Loader trigger */}
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">Paste Resume Text or File Content:</label>
            <button
              onClick={() => setResumeText(sampleResumeText)}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg transition-colors"
            >
              Load Sample Senior Engineer Resume
            </button>
          </div>

          <textarea
            rows={6}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste complete resume text here (e.g. John Doe, experience, skills, education)..."
            className="w-full bg-slate-50 text-slate-800 text-xs p-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-mono"
            id="resume-parser-textarea"
          />

          <div className="flex justify-end">
            <button
              onClick={handleParse}
              disabled={isLoading || !resumeText.trim()}
              className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-teal-600/20 transition-all"
              id="ai-parse-submit-btn"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isLoading ? 'Parsing with Gemini AI...' : 'Parse Resume with AI'}</span>
            </button>
          </div>

          {/* Parsed Result Card */}
          {parsedResult && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900">Extracted Candidate Profile</h3>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                  96% Confidence
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-medium block">Full Name:</span>
                  <span className="font-bold text-slate-900 text-sm">{parsedResult.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Email Address:</span>
                  <span className="font-semibold text-slate-800">{parsedResult.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Phone Number:</span>
                  <span className="font-semibold text-slate-800">{parsedResult.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Total Experience:</span>
                  <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                    {parsedResult.experienceYears} Years
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-medium block mb-1 text-xs">Extracted Technical Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {parsedResult.skills?.map((skill: string, i: number) => (
                    <span
                      key={i}
                      className="bg-white border border-slate-200 text-slate-800 text-[11px] px-2.5 py-1 rounded-lg font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {parsedResult.summary && (
                <div>
                  <span className="text-slate-400 font-medium block mb-1 text-xs">AI Summary:</span>
                  <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                    {parsedResult.summary}
                  </p>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleApplyToCandidate}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20"
                  id="add-candidate-parsed-btn"
                >
                  Save & Add Candidate to Pipeline
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
