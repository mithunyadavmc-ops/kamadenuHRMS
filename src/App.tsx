import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { AiAssistantModal } from './components/ai/AiAssistantModal';
import { AiResumeParserModal } from './components/ai/AiResumeParserModal';
import { AdminLoginPage } from './components/auth/AdminLoginPage';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { EmployeesPage } from './pages/EmployeesPage';
import { RecruitmentKanbanPage } from './pages/RecruitmentKanbanPage';
import { JobsPage } from './pages/JobsPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { AttendancePage } from './pages/AttendancePage';
import { LeavePage } from './pages/LeavePage';
import { PayrollPage } from './pages/PayrollPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

interface AppShellProps {
  page: string;
}

const AppShell: React.FC<AppShellProps> = ({ page }) => {
  const navigate = useNavigate();
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isResumeParserOpen, setIsResumeParserOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (nextPage: string) => {
    const nextPath = nextPage === 'dashboard' ? '/dashboard' : `/${nextPage}`;
    navigate(nextPath);
  };

  const renderCurrentPage = () => {
    switch (page) {
      case 'dashboard':
        return (
          <DashboardPage
            onNavigate={handleNavigate}
            onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
            onOpenResumeParser={() => setIsResumeParserOpen(true)}
          />
        );
      case 'employees':
        return <EmployeesPage />;
      case 'recruitment':
        return (
          <RecruitmentKanbanPage
            onOpenResumeParser={() => setIsResumeParserOpen(true)}
          />
        );
      case 'jobs':
        return <JobsPage />;
      case 'candidates':
        return <CandidatesPage />;
      case 'companies':
        return <CompaniesPage />;
      case 'attendance':
        return <AttendancePage />;
      case 'leave':
        return <LeavePage />;
      case 'payroll':
        return <PayrollPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <DashboardPage
            onNavigate={handleNavigate}
            onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
            onOpenResumeParser={() => setIsResumeParserOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen h-screen bg-[#F8FAFC] flex flex-col text-[#0F172A] font-sans antialiased overflow-hidden">
      <Navbar
        activePage={page}
        onNavigate={handleNavigate}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenResumeParser={() => setIsResumeParserOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activePage={page}
          onNavigate={handleNavigate}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        />

        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] min-w-0">
          {renderCurrentPage()}
        </main>
      </div>

      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
      />

      <AiResumeParserModal
        isOpen={isResumeParserOpen}
        onClose={() => setIsResumeParserOpen(false)}
      />
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const normalizedPath = location.pathname === '/' ? '/dashboard' : location.pathname;

  const homeRoute = user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;

  return (
    <Routes>
      <Route path="/" element={homeRoute} />
      <Route path="/login" element={<PublicRoute><AdminLoginPage /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><AppShell page="dashboard" /></ProtectedRoute>} />
      <Route path="/employees" element={<ProtectedRoute><AppShell page="employees" /></ProtectedRoute>} />
      <Route path="/recruitment" element={<ProtectedRoute><AppShell page="recruitment" /></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><AppShell page="jobs" /></ProtectedRoute>} />
      <Route path="/candidates" element={<ProtectedRoute><AppShell page="candidates" /></ProtectedRoute>} />
      <Route path="/companies" element={<ProtectedRoute><AppShell page="companies" /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute><AppShell page="attendance" /></ProtectedRoute>} />
      <Route path="/leave" element={<ProtectedRoute><AppShell page="leave" /></ProtectedRoute>} />
      <Route path="/payroll" element={<ProtectedRoute><AppShell page="payroll" /></ProtectedRoute>} />
      <Route path="/documents" element={<ProtectedRoute><AppShell page="documents" /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><AppShell page="reports" /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><AppShell page="settings" /></ProtectedRoute>} />
      <Route path="*" element={user ? <Navigate to={normalizedPath} replace /> : <Navigate to="/login" replace />} />
    </Routes>
  );
};

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
