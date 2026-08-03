import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { AiAssistantModal } from './components/ai/AiAssistantModal';
import { AiResumeParserModal } from './components/ai/AiResumeParserModal';

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

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isResumeParserOpen, setIsResumeParserOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardPage
            onNavigate={(p) => setCurrentPage(p)}
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
            onNavigate={(p) => setCurrentPage(p)}
            onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
            onOpenResumeParser={() => setIsResumeParserOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen h-screen bg-[#F8FAFC] flex flex-col text-[#0F172A] font-sans antialiased overflow-hidden">
      {/* Top Navbar */}
      <Navbar
        activePage={currentPage}
        onNavigate={(p) => setCurrentPage(p)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenResumeParser={() => setIsResumeParserOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Body Layout: Sidebar + Page Container */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activePage={currentPage}
          onNavigate={(p) => setCurrentPage(p)}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        />

        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] min-w-0">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Global AI Modals */}
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

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
