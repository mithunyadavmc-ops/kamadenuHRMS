import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  ShieldCheck,
  UserCheck,
  ChevronDown,
  LogOut,
  Building2,
  FileText,
  Clock,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { KamadhenuLogo } from './KamadhenuLogo';

interface NavbarProps {
  onOpenAiAssistant: () => void;
  onOpenResumeParser: () => void;
  activePage: string;
  onNavigate: (page: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAiAssistant,
  onOpenResumeParser,
  activePage,
  onNavigate,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const { user, role, switchRole, logout } = useAuth();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const rolesList: { id: UserRole; label: string; desc: string }[] = [
    { id: 'super_admin', label: 'Super Admin', desc: 'Full System Access & Governance' },
    { id: 'hr_manager', label: 'HR Manager', desc: 'Payroll, Attendance & Employee Ops' },
    { id: 'recruiter', label: 'Technical Recruiter', desc: 'ATS Jobs, Candidates & Interviews' },
    { id: 'client_admin', label: 'Client Partner', desc: 'Client Jobs & Candidate Approvals' },
    { id: 'employee', label: 'Employee Portal', desc: 'Personal Leaves, Attendance & Payslips' }
  ];

  const getInitials = (name?: string) => {
    if (!name) return 'AG';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between shrink-0 sticky top-0 z-30 transition-colors">
      {/* Left: Mobile Menu Toggle & Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          id="mobile-menu-toggle-btn"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <KamadhenuLogo variant="compact" />
        </div>
      </div>

      {/* Middle: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="flex items-center bg-slate-100 px-3.5 py-1.5 rounded-lg w-full">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Global search (Cmd + K)..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm ml-2 w-full text-[#0F172A] placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right: Quick Action AI Buttons, Role Switcher, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* AI Resume Parser Quick Action Button */}
        <button
          onClick={onOpenResumeParser}
          className="hidden sm:flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all shadow-xs"
          title="Open AI Resume Parser tool"
          id="quick-ai-resume-btn"
        >
          <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>AI Resume Parse</span>
        </button>

        {/* Kamadenu AI Assistant Trigger */}
        <button
          onClick={onOpenAiAssistant}
          className="flex items-center gap-1.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all shadow-xs"
          id="ai-assistant-navbar-btn"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden xs:inline">AI Assistant</span>
        </button>

        {/* Role Switcher Badge Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 transition-all"
            id="role-switcher-btn"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="capitalize hidden md:inline">{role.replace('_', ' ')}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 border-b border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Switch Persona
                </p>
              </div>
              {rolesList.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    switchRole(r.id);
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-start gap-2.5 transition-colors ${
                    role === r.id ? 'bg-blue-50/80 text-[#2563EB] font-semibold' : 'text-slate-700'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 ${
                      role === r.id ? 'bg-[#2563EB]' : 'bg-slate-300'
                    }`}
                  />
                  <div>
                    <div className="text-xs font-medium">{r.label}</div>
                    <div className="text-[10px] text-slate-400">{r.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="relative p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            id="notif-bell-btn"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-white" />
          </button>

          {showNotifDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#0F172A]">Notifications & Alerts</h3>
                <span className="text-[10px] bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded-full font-semibold">
                  3 New
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <p className="text-xs font-semibold text-[#0F172A]">High Candidate Match (98%)</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Meera Sundaram matched for Senior DevOps Architect.
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">10 minutes ago</p>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <p className="text-xs font-semibold text-[#0F172A]">Leave Approval Needed</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Arjun Verma requested 2-day Sick Leave.
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">1 hour ago</p>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <p className="text-xs font-semibold text-[#0F172A]">July Payroll Processed</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    148 payslips generated (₹1.84 Cr disbursed).
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">3 days ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
          <div className="hidden lg:block text-right">
            <p className="text-sm font-semibold text-[#0F172A]">{user?.name || 'Anil Yadav'}</p>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">
              {user?.department || 'Executive Leadership'}
            </p>
          </div>
          <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center font-bold text-[#2563EB] text-xs shadow-xs">
            {getInitials(user?.name)}
          </div>
          <button
            onClick={logout}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
            id="logout-btn"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
