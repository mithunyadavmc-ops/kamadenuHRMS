import {
  Employee,
  ClientCompany,
  JobPosting,
  Candidate,
  AttendanceRecord,
  LeaveRequest,
  PayrollRecord,
  DocumentItem,
  NotificationItem,
  AuditLogItem,
  DashboardMetrics,
  User
} from '../types';

const API_BASE = '/api/v1';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Request failed with status ${res.status}`);
  }

  return res.json();
}

export const apiService = {
  // Auth
  login: async (username: string, password: string) => {
    return fetchJson<{ token: string; user: User }>(`${API_BASE}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  getCurrentUser: async () => {
    return fetchJson<{ user: User }>(`${API_BASE}/auth/me`);
  },

  // Dashboard
  getDashboardMetrics: async () => {
    return fetchJson<{
      metrics: DashboardMetrics;
      hiringTrendData: any[];
      departmentData: any[];
      recentNotifications: NotificationItem[];
    }>(`${API_BASE}/dashboard/metrics`);
  },

  // Employees
  getEmployees: async (params?: { search?: string; department?: string; status?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchJson<{ employees: Employee[]; total: number }>(`${API_BASE}/employees?${query}`);
  },

  createEmployee: async (data: Partial<Employee>) => {
    return fetchJson<{ employee: Employee; message: string }>(`${API_BASE}/employees`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateEmployee: async (id: string, data: Partial<Employee>) => {
    return fetchJson<{ employee: Employee; message: string }>(`${API_BASE}/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteEmployee: async (id: string) => {
    return fetchJson<{ message: string }>(`${API_BASE}/employees/${id}`, {
      method: 'DELETE',
    });
  },

  // Client Companies
  getCompanies: async () => {
    return fetchJson<{ companies: ClientCompany[] }>(`${API_BASE}/companies`);
  },

  createCompany: async (data: Partial<ClientCompany>) => {
    return fetchJson<{ company: ClientCompany }>(`${API_BASE}/companies`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Jobs
  getJobs: async () => {
    return fetchJson<{ jobs: JobPosting[] }>(`${API_BASE}/jobs`);
  },

  createJob: async (data: Partial<JobPosting>) => {
    return fetchJson<{ job: JobPosting }>(`${API_BASE}/jobs`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateJob: async (id: string, data: Partial<JobPosting>) => {
    return fetchJson<{ job: JobPosting }>(`${API_BASE}/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Candidates
  getCandidates: async () => {
    return fetchJson<{ candidates: Candidate[] }>(`${API_BASE}/candidates`);
  },

  createCandidate: async (data: Partial<Candidate>) => {
    return fetchJson<{ candidate: Candidate }>(`${API_BASE}/candidates`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateCandidateStage: async (id: string, stage: string) => {
    return fetchJson<{ candidate: Candidate }>(`${API_BASE}/candidates/${id}/stage`, {
      method: 'PUT',
      body: JSON.stringify({ stage }),
    });
  },

  // Attendance
  getAttendance: async () => {
    return fetchJson<{ attendance: AttendanceRecord[] }>(`${API_BASE}/attendance`);
  },

  punchAttendance: async (employeeId: string, type: 'in' | 'out', verificationMethod?: string) => {
    return fetchJson<{ record: AttendanceRecord; message: string }>(`${API_BASE}/attendance/punch`, {
      method: 'POST',
      body: JSON.stringify({ employeeId, type, verificationMethod }),
    });
  },

  // Leaves
  getLeaves: async () => {
    return fetchJson<{ leaves: LeaveRequest[] }>(`${API_BASE}/leaves`);
  },

  createLeave: async (data: Partial<LeaveRequest>) => {
    return fetchJson<{ leave: LeaveRequest }>(`${API_BASE}/leaves`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateLeaveStatus: async (id: string, status: 'approved' | 'rejected', approvedBy?: string) => {
    return fetchJson<{ leave: LeaveRequest }>(`${API_BASE}/leaves/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, approvedBy }),
    });
  },

  // Payroll
  getPayroll: async () => {
    return fetchJson<{ payroll: PayrollRecord[] }>(`${API_BASE}/payroll`);
  },

  processPayrollBatch: async (month: string) => {
    return fetchJson<{ message: string; payrollRecords: PayrollRecord[] }>(`${API_BASE}/payroll/process`, {
      method: 'POST',
      body: JSON.stringify({ month }),
    });
  },

  // Documents
  getDocuments: async () => {
    return fetchJson<{ documents: DocumentItem[] }>(`${API_BASE}/documents`);
  },

  createDocument: async (data: Partial<DocumentItem>) => {
    return fetchJson<{ document: DocumentItem }>(`${API_BASE}/documents`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Audit Logs & Notifications
  getNotifications: async () => {
    return fetchJson<{ notifications: NotificationItem[] }>(`${API_BASE}/notifications`);
  },

  getAuditLogs: async () => {
    return fetchJson<{ auditLogs: AuditLogItem[] }>(`${API_BASE}/audit-logs`);
  },

  // AI Features
  aiParseResume: async (resumeText: string) => {
    return fetchJson<{ parsed: any }>(`${API_BASE}/ai/parse-resume`, {
      method: 'POST',
      body: JSON.stringify({ resumeText }),
    });
  },

  aiMatchCandidate: async (candidateText: any, jobRequirementText: any) => {
    return fetchJson<{
      matchScore: number;
      recommendation: string;
      strengths: string[];
      gaps: string[];
      keyTakeaway: string;
    }>(`${API_BASE}/ai/match-candidate`, {
      method: 'POST',
      body: JSON.stringify({ candidateText, jobRequirementText }),
    });
  },

  aiChatAssistant: async (message: string, conversationHistory: any[]) => {
    return fetchJson<{ reply: string }>(`${API_BASE}/ai/assistant`, {
      method: 'POST',
      body: JSON.stringify({ message, conversationHistory }),
    });
  },
};
