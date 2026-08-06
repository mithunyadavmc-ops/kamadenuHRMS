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

export const INITIAL_USER: User = {
  id: 'usr-101',
  name: 'Admin',
  email: 'admin@kamadenu.com',
  role: 'super_admin',
  department: 'Executive Leadership',
  title: 'System Admin',
  phone: '',
  avatar: '',
  createdAt: ''
};

export const INITIAL_METRICS: DashboardMetrics = {
  totalEmployees: 0,
  activeJobs: 0,
  totalCandidates: 0,
  attendanceRate: 0,
  monthlyPayroll: 0,
  monthlyRevenue: 0,
  pendingLeaves: 0,
  hiresThisMonth: 0
};

export const INITIAL_EMPLOYEES: Employee[] = [];
export const INITIAL_CLIENT_COMPANIES: ClientCompany[] = [];
export const INITIAL_JOB_POSTINGS: JobPosting[] = [];
export const INITIAL_CANDIDATES: Candidate[] = [];
export const INITIAL_ATTENDANCE: AttendanceRecord[] = [];
export const INITIAL_LEAVES: LeaveRequest[] = [];
export const INITIAL_PAYROLL: PayrollRecord[] = [];
export const INITIAL_DOCUMENTS: DocumentItem[] = [];
export const INITIAL_NOTIFICATIONS: NotificationItem[] = [];
export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [];
