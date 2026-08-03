import React from 'react';
import { BarChart3, FileSpreadsheet, Download, TrendingUp, Users, Clock, CreditCard } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ReportsPage: React.FC = () => {
  const quarterlyRecruitmentData = [
    { quarter: 'Q1 2026', applications: 1200, interviews: 320, offers: 48, joined: 42 },
    { quarter: 'Q2 2026', applications: 1450, interviews: 410, offers: 62, joined: 56 },
    { quarter: 'Q3 2026 (Est)', applications: 1800, interviews: 520, offers: 75, joined: 68 }
  ];

  const handleExportAll = () => {
    alert('Generating comprehensive 2026 Executive HR & Payroll Report (PDF)...');
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Executive HR Analytics & Custom Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Recruitment conversion funnels, employee retention rates & payroll cost breakdown.
          </p>
        </div>

        <button
          onClick={handleExportAll}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
          id="export-reports-btn"
        >
          <Download className="w-4 h-4" />
          <span>Export Master Report PDF</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Quarterly Sourcing & Hiring Yield Comparison</h3>
            <p className="text-[11px] text-slate-400">Applications vs Interviews Scheduled vs Offers Joined</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={quarterlyRecruitmentData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="quarter" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
              <Bar dataKey="applications" name="Applications" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="interviews" name="Interviews" fill="#14B8A6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="offers" name="Offers Sent" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="joined" name="Joined" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-600" /> Retention & Turnover Rate
          </h4>
          <p className="text-2xl font-black text-slate-900">94.8%</p>
          <p className="text-[11px] text-slate-400">Industry benchmark: 88.0%</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-teal-600" /> Average Time-to-Hire
          </h4>
          <p className="text-2xl font-black text-slate-900">18.5 Days</p>
          <p className="text-[11px] text-slate-400">Reduced by 6 days using AI Resume Parser</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-indigo-600" /> Revenue Per Placement
          </h4>
          <p className="text-2xl font-black text-slate-900">₹1,85,000</p>
          <p className="text-[11px] text-slate-400">8.3% average placement fee margin</p>
        </div>
      </div>
    </div>
  );
};
