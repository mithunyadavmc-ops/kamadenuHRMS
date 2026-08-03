import React from 'react';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  UserPlus,
  Building2,
  Clock,
  CalendarDays,
  CreditCard,
  FolderOpen,
  BarChart3,
  Settings,
  ShieldCheck,
  FileCheck,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { KamadhenuLogo } from './KamadhenuLogo';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  onOpenAiAssistant: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onOpenAiAssistant
}) => {
  const { role } = useAuth();

  const mainNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['super_admin', 'hr_manager', 'recruiter', 'client_admin', 'employee']
    },
    {
      id: 'employees',
      label: 'Employees',
      icon: Users,
      badge: '148',
      roles: ['super_admin', 'hr_manager', 'client_admin', 'employee']
    },
    {
      id: 'recruitment',
      label: 'Recruitment',
      icon: UserPlus,
      badge: '32',
      roles: ['super_admin', 'hr_manager', 'recruiter', 'client_admin']
    }
  ];

  const managementNavItems = [
    {
      id: 'jobs',
      label: 'Job Openings',
      icon: Briefcase,
      roles: ['super_admin', 'hr_manager', 'recruiter', 'client_admin']
    },
    {
      id: 'candidates',
      label: 'Candidates',
      icon: FileCheck,
      roles: ['super_admin', 'hr_manager', 'recruiter']
    },
    {
      id: 'companies',
      label: 'Client Companies',
      icon: Building2,
      roles: ['super_admin', 'hr_manager', 'client_admin']
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: Clock,
      roles: ['super_admin', 'hr_manager', 'employee']
    },
    {
      id: 'leave',
      label: 'Leave Portal',
      icon: CalendarDays,
      roles: ['super_admin', 'hr_manager', 'employee']
    },
    {
      id: 'payroll',
      label: 'Payroll',
      icon: CreditCard,
      roles: ['super_admin', 'hr_manager', 'employee']
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FolderOpen,
      roles: ['super_admin', 'hr_manager', 'recruiter', 'employee']
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      roles: ['super_admin', 'hr_manager', 'client_admin']
    },
    {
      id: 'settings',
      label: 'Settings & Audit',
      icon: Settings,
      roles: ['super_admin', 'hr_manager']
    }
  ];

  const filterItems = (items: typeof mainNavItems) =>
    items.filter((item) => item.roles.includes(role));

  const allowedMain = filterItems(mainNavItems);
  const allowedMgmt = filterItems(managementNavItems);

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 z-40 w-64 bg-white border-r border-slate-200 text-[#0F172A] flex flex-col shrink-0 transform transition-transform duration-200 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center cursor-pointer" onClick={() => handleNavClick('dashboard')}>
          <KamadhenuLogo variant="compact" />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {allowedMain.length > 0 && (
            <>
              <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-3 mb-2 mt-2">
                Main Menu
              </div>
              {allowedMain.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-[#2563EB]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    id={`nav-link-${item.id}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-[#2563EB]/10 text-[#2563EB]'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </>
          )}

          {allowedMgmt.length > 0 && (
            <>
              <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-3 mb-2 mt-6">
                Management
              </div>
              {allowedMgmt.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-[#2563EB]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    id={`nav-link-${item.id}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </>
          )}
        </nav>

        {/* AI Banner Card at bottom */}
        <div className="p-4 border-t border-slate-100">
          <div className="bg-[#2563EB] bg-opacity-5 p-4 rounded-xl border border-blue-100">
            <p className="text-xs font-bold text-[#2563EB] mb-1">AI INSIGHTS ACTIVE</p>
            <p className="text-[11px] text-blue-700 leading-tight mb-3">
              Resume ranking for Senior DevOps role is 85% complete.
            </p>
            <button
              onClick={onOpenAiAssistant}
              className="w-full py-1.5 px-3 bg-[#2563EB] text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Launch Assistant</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
