import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  UserCheck,
  CreditCard,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowUpRight,
  Plus,
  FileText,
  Building2,
  CalendarDays,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { apiService } from '../services/api';
import { DashboardMetrics, NotificationItem } from '../types';
import { KamadhenuLogo } from '../components/layout/KamadhenuLogo';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  onOpenAiAssistant: () => void;
  onOpenResumeParser: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onOpenAiAssistant,
  onOpenResumeParser
}) => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalEmployees: 148,
    activeJobs: 32,
    totalCandidates: 1240,
    attendanceRate: 96.4,
    monthlyPayroll: 18450000,
    monthlyRevenue: 34200000,
    pendingLeaves: 7,
    hiresThisMonth: 18
  });
  const [hiringData, setHiringData] = useState<any[]>([]);
  const [deptData, setDeptData] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiService.getDashboardMetrics()
      .then((res) => {
        setMetrics(res.metrics);
        setHiringData(res.hiringTrendData);
        setDeptData(res.departmentData);
        setNotifications(res.recentNotifications);
      })
      .catch((err) => console.error("Error loading dashboard metrics:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const COLORS = ['#2563EB', '#14B8A6', '#8B5CF6', '#F59E0B', '#10B981'];

  const statCards = [
    {
      title: 'Total Active Employees',
      value: metrics.totalEmployees.toString(),
      subtext: '+12 hires this month',
      change: '+8.4%',
      isPositive: true,
      icon: Users,
      color: 'bg-blue-500',
      actionPage: 'employees'
    },
    {
      title: 'Active Client Jobs',
      value: metrics.activeJobs.toString(),
      subtext: 'Across 4 Client Partners',
      change: '+15.2%',
      isPositive: true,
      icon: Briefcase,
      color: 'bg-teal-500',
      actionPage: 'recruitment'
    },
    {
      title: 'Monthly Revenue (INR)',
      value: `₹${(metrics.monthlyRevenue / 100000).toFixed(1)} Lakhs`,
      subtext: 'Consultancy Fees & Retainers',
      change: '+18.6%',
      isPositive: true,
      icon: TrendingUp,
      color: 'bg-indigo-500',
      actionPage: 'reports'
    },
    {
      title: 'Today Attendance Rate',
      value: `${metrics.attendanceRate}%`,
      subtext: '142 / 148 Present Today',
      change: '+1.2%',
      isPositive: true,
      icon: Clock,
      color: 'bg-emerald-500',
      actionPage: 'attendance'
    }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-[#0F172A]">
      {/* Top Brand Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <KamadhenuLogo variant="header" />
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenResumeParser}
            className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5"
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>AI Resume Parser</span>
          </button>
          <button
            onClick={onOpenAiAssistant}
            className="px-3.5 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI HR Assistant</span>
          </button>
        </div>
      </div>

      {/* Top Header & Global Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Dashboard Overview</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time enterprise recruitment pipeline and HR metrics</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 transition-colors text-slate-700"
          >
            Export PDF
          </button>
          <button
            onClick={() => onNavigate('employees')}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors"
          >
            + New Hire
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={() => onNavigate('employees')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-blue-300 transition-colors"
        >
          <p className="text-sm text-slate-500 mb-1 font-medium">Total Employees</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-[#0F172A]">1,284</span>
            <span className="text-[#22C55E] text-xs font-bold bg-green-50 px-2 py-1 rounded-full">+12%</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('jobs')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-blue-300 transition-colors"
        >
          <p className="text-sm text-slate-500 mb-1 font-medium">Active Job Openings</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-[#0F172A]">42</span>
            <span className="text-slate-400 text-xs font-bold">Stable</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('candidates')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-blue-300 transition-colors"
        >
          <p className="text-sm text-slate-500 mb-1 font-medium">Pending Interviews</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-[#0F172A]">156</span>
            <span className="text-[#F59E0B] text-xs font-bold bg-amber-50 px-2 py-1 rounded-full">Urgent</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('recruitment')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-blue-300 transition-colors"
        >
          <p className="text-sm text-slate-500 mb-1 font-medium">Average Time-to-Hire</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-[#0F172A]">18.5d</span>
            <span className="text-[#22C55E] text-xs font-bold bg-green-50 px-2 py-1 rounded-full">-3.2d</span>
          </div>
        </div>
      </div>

      {/* Grid 12 Columns: Pipeline Analytics & AI Resume Match Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Col 8: Recruitment Pipeline Analytics */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[#0F172A]">Recruitment Pipeline Analytics</h3>
            <select className="text-xs border border-slate-200 rounded-md bg-slate-50 px-2.5 py-1 text-slate-700">
              <option>Last 30 Days</option>
              <option>Quarter 3</option>
              <option>Year 2026</option>
            </select>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hiringData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="applications" name="Applications Sourced" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorApplications)" />
                <Area type="monotone" dataKey="hires" name="Final Hires" stroke="#14B8A6" strokeWidth={2} fillOpacity={1} fill="url(#colorHires)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-around pt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#2563EB]" />
              <span className="text-slate-600 font-medium">Sourced Candidates (1,240)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#14B8A6]" />
              <span className="text-slate-600 font-medium">Final Hires (18)</span>
            </div>
          </div>
        </div>

        {/* Col 4: AI Resume Match Ranking */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-[#0F172A] mb-4">AI Resume Match Ranking</h3>
          <div className="space-y-3">
            <div
              onClick={() => onNavigate('candidates')}
              className="flex items-center p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#14B8A6] bg-opacity-10 text-[#14B8A6] flex items-center justify-center font-bold text-sm">
                98
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-[#0F172A]">Sarah Jenkins</p>
                <p className="text-[11px] text-slate-500">Senior UI Designer</p>
              </div>
            </div>

            <div
              onClick={() => onNavigate('candidates')}
              className="flex items-center p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#14B8A6] bg-opacity-10 text-[#14B8A6] flex items-center justify-center font-bold text-sm">
                94
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-[#0F172A]">Rahul Verma</p>
                <p className="text-[11px] text-slate-500">Lead Python Engineer</p>
              </div>
            </div>

            <div
              onClick={() => onNavigate('candidates')}
              className="flex items-center p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#F59E0B] bg-opacity-10 text-[#F59E0B] flex items-center justify-center font-bold text-sm">
                89
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-[#0F172A]">Elena Gilbert</p>
                <p className="text-[11px] text-slate-500">Product Manager</p>
              </div>
            </div>

            <div
              onClick={() => onNavigate('candidates')}
              className="flex items-center p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#F59E0B] bg-opacity-10 text-[#F59E0B] flex items-center justify-center font-bold text-sm">
                87
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-[#0F172A]">James Wilson</p>
                <p className="text-[11px] text-slate-500">DevOps Architect</p>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenResumeParser}
            className="w-full mt-4 py-2 text-[#2563EB] text-xs font-bold tracking-wide hover:underline text-center"
          >
            VIEW ALL RECOMMENDATIONS
          </button>
        </div>
      </div>

      {/* Operational Actions & Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#0F172A] border-b border-slate-100 pb-3">
            Quick Operational Actions
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('employees')}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all group"
            >
              <div className="p-2 bg-blue-100 text-[#2563EB] rounded-lg w-fit mb-2 group-hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-[#0F172A]">Add Employee</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Onboard team member</p>
            </button>

            <button
              onClick={() => onNavigate('payroll')}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 text-left transition-all group"
            >
              <div className="p-2 bg-teal-100 text-teal-700 rounded-lg w-fit mb-2 group-hover:scale-105 transition-transform">
                <CreditCard className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-[#0F172A]">Run Payroll</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Generate payslips</p>
            </button>

            <button
              onClick={() => onNavigate('attendance')}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 text-left transition-all group"
            >
              <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg w-fit mb-2 group-hover:scale-105 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-[#0F172A]">QR Check-In</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Punch attendance</p>
            </button>

            <button
              onClick={() => onNavigate('leave')}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 text-left transition-all group"
            >
              <div className="p-2 bg-amber-100 text-amber-700 rounded-lg w-fit mb-2 group-hover:scale-105 transition-transform">
                <CalendarDays className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-[#0F172A]">Approve Leaves</p>
              <p className="text-[10px] text-slate-400 mt-0.5">7 Pending requests</p>
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-[#0F172A]">System Activity & Audit Logs</h3>
            <span className="text-[10px] text-slate-400 font-medium">Live Feed</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1 space-y-1">
            {notifications.map((n) => (
              <div key={n.id} className="py-2.5 flex items-start gap-3">
                <div className="p-2 bg-blue-50 text-[#2563EB] rounded-xl mt-0.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#0F172A]">{n.title}</p>
                    <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
