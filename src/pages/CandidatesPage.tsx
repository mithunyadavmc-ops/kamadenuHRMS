import React, { useState, useEffect } from 'react';
import { FileCheck, Search, Sparkles, Filter, Mail, Phone, ExternalLink, X } from 'lucide-react';
import { apiService } from '../services/api';
import { Candidate } from '../types';

export const CandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showMatcherModal, setShowMatcherModal] = useState(false);
  const [matchResult, setMatchResult] = useState<any>(null);
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    apiService.getCandidates().then(res => setCandidates(res.candidates));
  }, []);

  const runAiMatcher = async (cand: Candidate) => {
    setSelectedCandidate(cand);
    setShowMatcherModal(true);
    setIsMatching(true);
    setMatchResult(null);

    try {
      const res = await apiService.aiMatchCandidate(cand, {
        jobTitle: cand.appliedJobTitle,
        companyName: cand.companyName,
        requiredSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker']
      });
      setMatchResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsMatching(false);
    }
  };

  const filtered = candidates.filter(c =>
    c.fullName.toLowerCase().includes(search.toLowerCase()) ||
    c.candidateCode.toLowerCase().includes(search.toLowerCase()) ||
    c.appliedJobTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-blue-600" />
            Candidate Master Database
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse candidate profiles, resume scores and run AI suitability matching.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidate name, skills, code or applied job..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 text-slate-800 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
            id="candidates-search-input"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">Candidate Code & Name</th>
                <th className="py-3.5 px-4">Current Role & Company</th>
                <th className="py-3.5 px-4">Applied Job Position</th>
                <th className="py-3.5 px-4">Experience</th>
                <th className="py-3.5 px-4">AI Match Score</th>
                <th className="py-3.5 px-4">Pipeline Stage</th>
                <th className="py-3.5 px-4 text-right">AI Tools</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{c.fullName}</div>
                    <div className="text-[10px] font-mono text-slate-400">{c.candidateCode}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{c.currentRole}</div>
                    <div className="text-[10px] text-slate-400">{c.currentCompany}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-blue-700">{c.appliedJobTitle}</div>
                    <div className="text-[10px] text-slate-400">{c.companyName}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {c.experienceYears} Years
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs font-black bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full">
                      {c.matchScore}% Match
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-2.5 py-0.5 rounded-full capitalize">
                      {c.stage.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => runAiMatcher(c)}
                      className="bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-[11px] px-3 py-1.5 rounded-lg border border-teal-200 transition-colors flex items-center gap-1 ml-auto"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                      <span>Evaluate Fit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Candidate Matcher Modal */}
      {showMatcherModal && selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-slate-900">AI Job Suitability Evaluation</h2>
              </div>
              <button onClick={() => setShowMatcherModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <p><strong>Candidate:</strong> {selectedCandidate.fullName}</p>
              <p><strong>Applied Job:</strong> {selectedCandidate.appliedJobTitle} ({selectedCandidate.companyName})</p>
            </div>

            {isMatching ? (
              <div className="p-6 text-center text-xs text-slate-500 font-medium animate-pulse">
                Evaluating candidate skill overlap, experience depth & domain fit via Gemini AI...
              </div>
            ) : matchResult && (
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-700">Calculated Match Score:</span>
                  <span className="text-xl font-black text-blue-700">{matchResult.matchScore}%</span>
                </div>

                <div>
                  <span className="font-bold text-emerald-700 block mb-1">Key Strengths:</span>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                    {matchResult.strengths?.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-amber-700 block mb-1">Skill Gaps:</span>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                    {matchResult.gaps?.map((g: string, i: number) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 text-slate-800">
                  <strong>Recommendation:</strong> {matchResult.recommendation} — {matchResult.keyTakeaway}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowMatcherModal(false)}
                className="bg-slate-900 text-white font-bold text-xs px-5 py-2 rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
