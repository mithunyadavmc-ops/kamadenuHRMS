export type UserRole = 'super_admin' | 'hr_manager' | 'recruiter' | 'client_admin' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  title?: string;
  phone?: string;
  createdAt: string;
}

export interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  role: UserRole;
  status: 'active' | 'on_leave' | 'probation' | 'terminated';
  joinDate: string;
  salary: number;
  location: string;
  avatar?: string;
  gender: string;
  dob: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifscCode: string;
  };
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  experienceYears: number;
  performanceScore: number; // 1 to 5
}

export interface ClientCompany {
  id: string;
  name: string;
  industry: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  contactPerson: string;
  contactDesignation: string;
  contractStatus: 'active' | 'pending' | 'expired';
  activeJobsCount: number;
  totalHires: number;
  logoUrl?: string;
}

export interface JobPosting {
  id: string;
  jobCode: string;
  title: string;
  companyId: string;
  companyName: string;
  department: string;
  location: string;
  jobType: 'full_time' | 'part_time' | 'contract' | 'remote';
  experienceRequired: string;
  salaryRange: string;
  status: 'open' | 'draft' | 'closed' | 'filled';
  description: string;
  requirements: string[];
  skills: string[];
  postedDate: string;
  deadlineDate: string;
  applicantsCount: number;
}

export type CandidateStage = 'sourced' | 'screened' | 'interview_scheduled' | 'technical_eval' | 'offer_sent' | 'joined' | 'rejected';

export interface Candidate {
  id: string;
  candidateCode: string;
  fullName: string;
  email: string;
  phone: string;
  currentRole: string;
  currentCompany: string;
  experienceYears: number;
  expectedSalary: string;
  noticePeriod: string;
  skills: string[];
  appliedJobId: string;
  appliedJobTitle: string;
  companyName: string;
  stage: CandidateStage;
  matchScore: number; // 0 to 100
  resumeUrl?: string;
  resumeText?: string;
  appliedDate: string;
  interviewDate?: string;
  interviewer?: string;
  rating: number; // 1 to 5
  notes?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half_day' | 'on_leave';
  workHours: number;
  locationVerification: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: 'casual' | 'sick' | 'earned' | 'maternity' | 'unpaid';
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
  approvedBy?: string;
}

export interface PayrollRecord {
  id: string;
  payrollCode: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  department: string;
  designation: string;
  month: string; // e.g. "2026-07"
  basicSalary: number;
  hra: number;
  specialAllowance: number;
  bonus: number;
  pfDeduction: number;
  taxDeduction: number;
  netSalary: number;
  paymentStatus: 'paid' | 'processing' | 'pending';
  paymentDate?: string;
  bankAccount: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'resume' | 'offer_letter' | 'experience_cert' | 'identity_proof' | 'tax_doc' | 'policy';
  employeeOrCandidateName: string;
  fileSize: string;
  uploadedAt: string;
  fileType: string;
  url: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'recruitment' | 'payroll' | 'leave';
  timestamp: string;
  read: boolean;
}

export interface AuditLogItem {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  module: string;
  ipAddress: string;
  timestamp: string;
  status: 'success' | 'warning' | 'failed';
}

export interface DashboardMetrics {
  totalEmployees: number;
  activeJobs: number;
  totalCandidates: number;
  attendanceRate: number;
  monthlyPayroll: number;
  monthlyRevenue: number;
  pendingLeaves: number;
  hiresThisMonth: number;
}
