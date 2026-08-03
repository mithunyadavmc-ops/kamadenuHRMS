import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  Search,
  Plus,
  Calendar,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  FileText,
  Building2,
  ChevronRight,
  MoreHorizontal,
  X,
  UserCheck
} from 'lucide-react';
import { apiService } from '../services/api';
import { Candidate, CandidateStage } from '../types';

interface RecruitmentKanbanPageProps {
  onOpenResumeParser: () => void;
}

export const RecruitmentKanbanPage: React.FC<RecruitmentKanbanPageProps> = ({ onOpenResumeParser }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [interviewDate, setInterviewDate] = useState('2026-08-08 11:00 AM');
  const [interviewer, setInterviewer] = useState('Arjun Verma (Lead Recruiter)');

  const stages: { id: CandidateStage; label: string; color: string }[] = [
    { id: 'sourced', label: 'Sourced / Applied', color: 'bg-slate-100 text-slate-800' },
    { id: 'screened', label: 'Screened & Evaluated', color: 'bg-blue-100 text-blue-800' },
    { id: 'interview_scheduled', label: 'Interview Scheduled', color: 'bg-amber-100 text-amber-800' },
    { id: 'technical_eval', label: 'Technical Eval / Round 2', color: 'bg-purple-100 text-purple-800' },
    { id: 'offer_sent', label: 'Offer Sent', color: 'bg-teal-100 text-teal-800' },
    { id: 'joined', label: 'Joined / Onboarded', color: 'bg-emerald-100 text-emerald-800' }
  ];

  const fetchCandidates = () => {
    apiService.getCandidates().then(res => setCandidates(res.candidates));
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleMoveStage = (candidateId: string, newStage: CandidateStage) => {
    apiService.updateCandidateStage(candidateId, newStage).then(() => {
      fetchCandidates();
    });
  };

  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate) return;
    apiService.updateCandidateStage(selectedCandidate.id, 'interview_scheduled').then(() => {
      setShowScheduleModal(false);
      fetchCandidates();
      alert(`Interview scheduled for ${selectedCandidate.fullName} on ${interviewDate}!`);
    });
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-blue-600" />
            ATS Recruitment Kanban Board
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track candidate pipeline across 6 stages from sourcing to offer release.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenResumeParser}
            className="bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-teal-200 transition-all flex items-center gap-2 shadow-xs"
            id="kanban-resume-parser-btn"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>AI Resume Parser</span>
          </button>

          <button
            onClick={() => {
              const name = prompt('Candidate Name:');
              if (name) {
                apiService.createCandidate({
                  fullName: name,
                  email: `${name.toLowerCase().replace(' ', '.')}@gmail.com`,
                  phone: '+91 98000 00000',
                  currentRole: 'Software Engineer',
                  currentCompany: 'Tech Enterprise',
                  experienceYears: 5,
                  appliedJobTitle: 'Senior Full Stack React/Node Engineer',
                  companyName: 'Infosys Technologies',
                  stage: 'sourced',
                  matchScore: 88,
                  skills: ['React', 'TypeScript', 'Node.js']
                }).then(() => fetchCandidates());
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
            id="add-candidate-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Add Candidate</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Grid Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {stages.map((stg) => {
          const stageCandidates = candidates.filter(c => c.stage === stg.id);
          return (
            <div
              key={stg.id}
              className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200/80 flex flex-col min-w-[260px] h-[680px]"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200">
                <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${stg.color}`}>
                  {stg.label}
                </span>
                <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  {stageCandidates.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                {stageCandidates.map((cand) => (
                  <div
                    key={cand.id}
                    onClick={() => setSelectedCandidate(cand)}
                    className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-2.5 group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {cand.fullName}
                        </h4>
                        <p className="text-[10px] text-slate-500">{cand.currentRole}</p>
                      </div>
                      <span className="text-[10px] bg-blue-50 text-blue-700 font-extrabold px-1.5 py-0.5 rounded-md border border-blue-100">
                        {cand.matchScore}% Match
                      </span>
                    </div>

                    <div className="text-[10px] bg-slate-50 p-2 rounded-lg text-slate-600 space-y-0.5 border border-slate-100">
                      <p className="font-semibold text-slate-800 truncate">{cand.appliedJobTitle}</p>
                      <p className="text-slate-400">{cand.companyName}</p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {cand.skills?.slice(0, 3).map((sk, idx) => (
                        <span key={idx} className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                          {sk}
                        </span>
                      ))}
                    </div>

                    {/* Move Stage Controls */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">{cand.experienceYears} yrs exp</span>
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        {stg.id !== 'joined' && (
                          <button
                            onClick={() => {
                              const nextStageIdx = stages.findIndex(s => s.id === stg.id) + 1;
                              if (nextStageIdx < stages.length) {
                                handleMoveStage(cand.id, stages[nextStageIdx].id);
                              }
                            }}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px] transition-colors"
                          >
                            Advance Stage →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Candidate Profile Drawer */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-lg h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">{selectedCandidate.fullName}</h2>
                  <p className="text-xs text-blue-600 font-semibold">{selectedCandidate.currentRole} at {selectedCandidate.currentCompany}</p>
                </div>
                <button onClick={() => setSelectedCandidate(null)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 pt-4 text-xs">
                <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-blue-600 uppercase font-extrabold tracking-wider block">
                      AI Job Match Score
                    </span>
                    <span className="text-2xl font-black text-blue-900">{selectedCandidate.matchScore}%</span>
                  </div>
                  <span className="text-xs bg-blue-600 text-white font-bold px-3 py-1 rounded-full capitalize">
                    Stage: {selectedCandidate.stage.replace('_', ' ')}
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <h3 className="font-bold text-slate-900">Application Info</h3>
                  <div className="grid grid-cols-2 gap-2 text-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Applied Position:</span>
                      <span className="font-bold text-slate-900">{selectedCandidate.appliedJobTitle}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Client Company:</span>
                      <span className="font-semibold">{selectedCandidate.companyName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Notice Period:</span>
                      <span className="font-semibold">{selectedCandidate.noticePeriod || '30 Days'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Expected CTC:</span>
                      <span className="font-semibold">{selectedCandidate.expectedSalary || '₹20 LPA'}</span>
                    </div>
                  </div>
                </div>

                {selectedCandidate.notes && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <h3 className="font-bold text-slate-900 mb-1">Interviewer Notes</h3>
                    <p className="text-slate-700 leading-relaxed">{selectedCandidate.notes}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => {
                  setShowScheduleModal(true);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Next Interview Round</span>
              </button>

              <button
                onClick={() => {
                  setShowOfferModal(true);
                }}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Generate & Dispatch Offer Letter</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {showScheduleModal && selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900">Schedule Interview</h2>
              <button onClick={() => setShowScheduleModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleInterview} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Candidate</label>
                <input
                  type="text"
                  disabled
                  value={selectedCandidate.fullName}
                  className="w-full bg-slate-100 p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Date & Time</label>
                <input
                  type="text"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Lead Interviewer</label>
                <input
                  type="text"
                  value={interviewer}
                  onChange={(e) => setInterviewer(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white font-bold px-5 py-2 rounded-xl">
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Offer Letter Preview Modal */}
      {showOfferModal && selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900">Offer Letter Preview & Generation</h2>
              <button onClick={() => setShowOfferModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 font-sans text-xs text-slate-800 leading-relaxed">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="font-extrabold text-blue-700 text-sm">KAMADENU HR CONSULTANCY</div>
                <div className="text-slate-400">Date: {new Date().toLocaleDateString('en-IN')}</div>
              </div>

              <p>Dear <strong>{selectedCandidate.fullName}</strong>,</p>

              <p>
                On behalf of <strong>{selectedCandidate.companyName}</strong> and Kamadenu HR Consultancy, we are pleased to extend an offer of employment for the position of <strong>{selectedCandidate.appliedJobTitle}</strong>.
              </p>

              <p>
                Your annual cost-to-company (CTC) will be <strong>{selectedCandidate.expectedSalary || '₹22,000,00 PA'}</strong>, payable in accordance with monthly payroll policies.
              </p>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                <div>
                  <p className="font-bold text-slate-900">Anil Yadav</p>
                  <p className="text-[10px] text-slate-500">Managing Director, Kamadenu HR</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md font-mono font-bold text-[10px]">
                  [DIGITALLY SIGNED & VERIFIED]
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowOfferModal(false)}
                className="bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  apiService.updateCandidateStage(selectedCandidate.id, 'offer_sent').then(() => {
                    setShowOfferModal(false);
                    fetchCandidates();
                    alert(`Offer Letter dispatched to ${selectedCandidate.email}!`);
                  });
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2 rounded-xl shadow-md shadow-teal-600/20"
              >
                Dispatch Offer to Candidate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
