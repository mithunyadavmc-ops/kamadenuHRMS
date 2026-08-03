import React, { useState, useEffect } from 'react';
import { Briefcase, Search, Plus, Building2, MapPin, Calendar, Clock, DollarSign, X } from 'lucide-react';
import { apiService } from '../services/api';
import { JobPosting } from '../types';

export const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('Infosys Technologies');
  const [department, setDepartment] = useState('Digital Cloud Engineering');
  const [location, setLocation] = useState('Bengaluru (Hybrid)');
  const [experience, setExperience] = useState('4 - 8 Years');
  const [salary, setSalary] = useState('₹18,000,00 - ₹24,000,00 PA');
  const [description, setDescription] = useState('');

  const fetchJobs = () => {
    apiService.getJobs().then(res => setJobs(res.jobs));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    apiService.createJob({
      title,
      companyName,
      companyId: 'comp-101',
      department,
      location,
      experienceRequired: experience,
      salaryRange: salary,
      jobType: 'full_time',
      status: 'open',
      description,
      requirements: ['Proven track record in software engineering', 'Strong communication skills'],
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      deadlineDate: '2026-09-30'
    }).then(() => {
      setShowAddModal(false);
      fetchJobs();
      alert('Job posting published successfully!');
    });
  };

  const filteredJobs = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.companyName.toLowerCase().includes(search.toLowerCase()) ||
    j.jobCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Client Job Openings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Active mandate postings for Infosys, TCS, Tech Mahindra & Wipro.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
          id="post-new-job-btn"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Client Mandate</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search job title, code or client company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 text-slate-800 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
            id="jobs-search-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map((j) => (
          <div
            key={j.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {j.jobCode}
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {j.status}
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{j.title}</h3>

              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>{j.companyName}</span>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {j.description}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Experience:</span>
                <span className="font-semibold text-slate-800">{j.experienceRequired}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Salary CTC:</span>
                <span className="font-bold text-slate-900">{j.salaryRange}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Applicants:</span>
                <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{j.applicantsCount} Applied</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900">Post New Client Mandate</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  placeholder="e.g. Lead Technical Architect"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Client Company</label>
                  <select
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  >
                    <option value="Infosys Technologies">Infosys Technologies</option>
                    <option value="TCS - Tata Consultancy Services">TCS</option>
                    <option value="Tech Mahindra Ltd">Tech Mahindra</option>
                    <option value="Wipro Digital Enterprise">Wipro</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Offered CTC Range</label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Job Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  placeholder="Key responsibilities and technical expectations..."
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white font-bold px-5 py-2 rounded-xl">
                  Publish Job Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
