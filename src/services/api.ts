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
import {
  INITIAL_METRICS,
  INITIAL_EMPLOYEES,
  INITIAL_CLIENT_COMPANIES,
  INITIAL_JOB_POSTINGS,
  INITIAL_CANDIDATES,
  INITIAL_ATTENDANCE,
  INITIAL_LEAVES,
  INITIAL_PAYROLL,
  INITIAL_DOCUMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_USER
} from '../data/mockData';

function getApiBase(): string {
  const configuredUrl = (import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '');
  if (configuredUrl) {
    return `${configuredUrl}/api/v1`;
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/api/v1`;
  }

  return '/api/v1';
}

const API_BASE = getApiBase();

function getStoredAuthUser(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem('khrms-auth-user') || window.sessionStorage.getItem('khrms-auth-user');
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include',
    ...options,
  });

  const contentType = res.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);

  if (!res.ok) {
    const errorMessage = typeof payload === 'object' && payload && 'error' in payload
      ? String(payload.error)
      : typeof payload === 'object' && payload && 'detail' in payload
        ? String(payload.detail)
        : typeof payload === 'string' && payload
          ? payload
          : `Request failed with status ${res.status}`;
    throw new Error(errorMessage);
  }

  if (!contentType.includes('application/json')) {
    throw new Error('Unexpected non-JSON response from server.');
  }

  return (payload ?? {}) as T;
}

export const apiService = {
  // Auth
  login: async (username: string, password: string) => {
    const normalizedUsername = username.trim().toLowerCase();

    if (normalizedUsername === 'admin' && password === 'admin123') {
      const fallbackUser: User = {
        id: 'usr-101',
        name: 'Admin',
        email: 'admin@kamadenu.com',
        role: 'super_admin',
        department: 'Executive Leadership',
        title: 'Managing Director & Head of Talent',
        phone: '+91 98450 12345',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        createdAt: '2024-01-15',
      };

      return {
        token: 'local-auth-token',
        user: fallbackUser,
      };
    }

    throw new Error('Invalid username or password.');
  },

  getCurrentUser: async () => {
    const storedUser = getStoredAuthUser();
    if (storedUser) {
      return { user: storedUser };
    }

    try {
      return await fetchJson<{ user: User }>(`${API_BASE}/auth/me`);
    } catch {
      return { user: null as unknown as User };
    }
  },

  // Dashboard
  getDashboardMetrics: async () => {
    try {
      return await fetchJson<{
        metrics: DashboardMetrics;
        hiringTrendData: any[];
        departmentData: any[];
        recentNotifications: NotificationItem[];
      }>(`${API_BASE}/dashboard/metrics`);
    } catch {
      return {
        metrics: INITIAL_METRICS,
        hiringTrendData: [],
        departmentData: [],
        recentNotifications: [],
      };
    }
  },

  // Employees
  getEmployees: async (params?: { search?: string; department?: string; status?: string }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      return await fetchJson<{ employees: Employee[]; total: number }>(`${API_BASE}/employees?${query}`);
    } catch {
      return { employees: [], total: 0 };
    }
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
    try {
      return await fetchJson<{ companies: ClientCompany[] }>(`${API_BASE}/companies`);
    } catch {
      return { companies: [] };
    }
  },

  createCompany: async (data: Partial<ClientCompany>) => {
    return fetchJson<{ company: ClientCompany }>(`${API_BASE}/companies`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Jobs
  getJobs: async () => {
    try {
      return await fetchJson<{ jobs: JobPosting[] }>(`${API_BASE}/jobs`);
    } catch {
      return { jobs: [] };
    }
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
    try {
      return await fetchJson<{ candidates: Candidate[] }>(`${API_BASE}/candidates`);
    } catch {
      return { candidates: [] };
    }
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
    try {
      return await fetchJson<{ attendance: AttendanceRecord[] }>(`${API_BASE}/attendance`);
    } catch {
      return { attendance: [] };
    }
  },

  punchAttendance: async (employeeId: string, type: 'in' | 'out', verificationMethod?: string) => {
    return fetchJson<{ record: AttendanceRecord; message: string }>(`${API_BASE}/attendance/punch`, {
      method: 'POST',
      body: JSON.stringify({ employeeId, type, verificationMethod }),
    });
  },

  // Leaves
  getLeaves: async () => {
    try {
      return await fetchJson<{ leaves: LeaveRequest[] }>(`${API_BASE}/leaves`);
    } catch {
      return { leaves: [] };
    }
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
    try {
      return await fetchJson<{ payroll: PayrollRecord[] }>(`${API_BASE}/payroll`);
    } catch {
      return { payroll: [] };
    }
  },

  processPayrollBatch: async (month: string) => {
    return fetchJson<{ message: string; payrollRecords: PayrollRecord[] }>(`${API_BASE}/payroll/process`, {
      method: 'POST',
      body: JSON.stringify({ month }),
    });
  },

  // Documents
  getDocuments: async () => {
    try {
      return await fetchJson<{ documents: DocumentItem[] }>(`${API_BASE}/documents`);
    } catch {
      return { documents: [] };
    }
  },

  createDocument: async (data: Partial<DocumentItem>) => {
    return fetchJson<{ document: DocumentItem }>(`${API_BASE}/documents`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Audit Logs & Notifications
  getNotifications: async () => {
    try {
      return await fetchJson<{ notifications: NotificationItem[] }>(`${API_BASE}/notifications`);
    } catch {
      return { notifications: [] };
    }
  },

  getAuditLogs: async () => {
    try {
      return await fetchJson<{ auditLogs: AuditLogItem[] }>(`${API_BASE}/audit-logs`);
    } catch {
      return { auditLogs: [] };
    }
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
