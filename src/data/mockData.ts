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
  name: 'Anil Yadav',
  email: 'anil.yadav@kamadenu.com',
  role: 'super_admin',
  department: 'Executive Leadership',
  title: 'Managing Director & Head of Talent',
  phone: '+91 98450 12345',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  createdAt: '2024-01-15'
};

export const INITIAL_METRICS: DashboardMetrics = {
  totalEmployees: 148,
  activeJobs: 32,
  totalCandidates: 1240,
  attendanceRate: 96.4,
  monthlyPayroll: 18450000, // INR (~184.5 Lakhs)
  monthlyRevenue: 34200000, // INR (~342 Lakhs)
  pendingLeaves: 7,
  hiresThisMonth: 18
};

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-001',
    employeeCode: 'KHR-1001',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@kamadenu.com',
    phone: '+91 98765 43210',
    department: 'Talent Acquisition',
    designation: 'Senior Recruitment Lead',
    role: 'hr_manager',
    status: 'active',
    joinDate: '2022-03-15',
    salary: 125000,
    location: 'Bengaluru, India',
    gender: 'Female',
    dob: '1992-06-18',
    experienceYears: 7,
    performanceScore: 4.8,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    emergencyContact: {
      name: 'Rajesh Sharma',
      relationship: 'Spouse',
      phone: '+91 98765 43211'
    },
    bankDetails: {
      accountName: 'Priya Sharma',
      accountNumber: '50100234567891',
      bankName: 'HDFC Bank',
      ifscCode: 'HDFC0001234'
    },
    education: [
      { degree: 'MBA in Human Resources', institution: 'IIM Bangalore', year: '2016' },
      { degree: 'B.A. Psychology', institution: 'Christ University', year: '2014' }
    ]
  },
  {
    id: 'emp-002',
    employeeCode: 'KHR-1002',
    firstName: 'Arjun',
    lastName: 'Verma',
    email: 'arjun.verma@kamadenu.com',
    phone: '+91 98123 45678',
    department: 'Technical Sourcing',
    designation: 'Lead Technical Recruiter',
    role: 'recruiter',
    status: 'active',
    joinDate: '2023-01-10',
    salary: 95000,
    location: 'Bengaluru, India',
    gender: 'Male',
    dob: '1994-09-24',
    experienceYears: 5,
    performanceScore: 4.6,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    emergencyContact: {
      name: 'Sunita Verma',
      relationship: 'Mother',
      phone: '+91 98123 45679'
    },
    bankDetails: {
      accountName: 'Arjun Verma',
      accountNumber: '60200876543210',
      bankName: 'ICICI Bank',
      ifscCode: 'ICIC0000456'
    },
    education: [
      { degree: 'B.Tech Computer Science', institution: 'VTU Belagavi', year: '2017' }
    ]
  },
  {
    id: 'emp-003',
    employeeCode: 'KHR-1003',
    firstName: 'Ananya',
    lastName: 'Deshmukh',
    email: 'ananya.d@kamadenu.com',
    phone: '+91 97654 32109',
    department: 'Payroll & HR Ops',
    designation: 'Payroll & Compliance Manager',
    role: 'hr_manager',
    status: 'active',
    joinDate: '2021-08-01',
    salary: 135000,
    location: 'Mumbai, India',
    gender: 'Female',
    dob: '1990-11-05',
    experienceYears: 9,
    performanceScore: 4.9,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    emergencyContact: {
      name: 'Siddharth Deshmukh',
      relationship: 'Spouse',
      phone: '+91 97654 32110'
    },
    bankDetails: {
      accountName: 'Ananya Deshmukh',
      accountNumber: '30400112233445',
      bankName: 'Axis Bank',
      ifscCode: 'UTIB0000789'
    },
    education: [
      { degree: 'M.Com Finance & Taxation', institution: 'Mumbai University', year: '2013' }
    ]
  },
  {
    id: 'emp-004',
    employeeCode: 'KHR-1004',
    firstName: 'Rohan',
    lastName: 'Kulkarni',
    email: 'rohan.k@kamadenu.com',
    phone: '+91 96543 21098',
    department: 'Client Relations',
    designation: 'Enterprise Account Manager',
    role: 'client_admin',
    status: 'active',
    joinDate: '2022-11-20',
    salary: 110000,
    location: 'Hyderabad, India',
    gender: 'Male',
    dob: '1993-04-12',
    experienceYears: 6,
    performanceScore: 4.5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    emergencyContact: {
      name: 'Meena Kulkarni',
      relationship: 'Mother',
      phone: '+91 96543 21099'
    },
    bankDetails: {
      accountName: 'Rohan Kulkarni',
      accountNumber: '10900998877665',
      bankName: 'State Bank of India',
      ifscCode: 'SBIN0001020'
    },
    education: [
      { degree: 'MBA Marketing', institution: 'ISB Hyderabad', year: '2018' }
    ]
  },
  {
    id: 'emp-005',
    employeeCode: 'KHR-1005',
    firstName: 'Kavitha',
    lastName: 'Nair',
    email: 'kavitha.nair@kamadenu.com',
    phone: '+91 95432 10987',
    department: 'Executive Leadership',
    designation: 'VP of Human Capital',
    role: 'super_admin',
    status: 'active',
    joinDate: '2020-02-01',
    salary: 220000,
    location: 'Bengaluru, India',
    gender: 'Female',
    dob: '1987-08-30',
    experienceYears: 14,
    performanceScore: 5.0,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    emergencyContact: {
      name: 'Venugopal Nair',
      relationship: 'Spouse',
      phone: '+91 95432 10988'
    },
    bankDetails: {
      accountName: 'Kavitha Nair',
      accountNumber: '80900445566778',
      bankName: 'Kotak Mahindra Bank',
      ifscCode: 'KKBK0000321'
    },
    education: [
      { degree: 'Ph.D in Organizational Behavior', institution: 'XLRI Jamshedpur', year: '2012' }
    ]
  }
];

export const INITIAL_CLIENT_COMPANIES: ClientCompany[] = [
  {
    id: 'comp-101',
    name: 'Infosys Technologies',
    industry: 'Information Technology & Consulting',
    email: 'careers@infosys-partner.com',
    phone: '+91 80 2852 0261',
    website: 'https://www.infosys.com',
    location: 'Bengaluru / Hybrid',
    contactPerson: 'Suresh Nambiar',
    contactDesignation: 'AVP Talent Acquisition',
    contractStatus: 'active',
    activeJobsCount: 8,
    totalHires: 142,
    logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'comp-102',
    name: 'TCS - Tata Consultancy Services',
    industry: 'IT Services & Digital Transformation',
    email: 'hr.vendor@tcs.com',
    phone: '+91 22 6778 9999',
    website: 'https://www.tcs.com',
    location: 'Mumbai / Pune',
    contactPerson: 'Radhika Merchant',
    contactDesignation: 'Director Global Sourcing',
    contractStatus: 'active',
    activeJobsCount: 12,
    totalHires: 210,
    logoUrl: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'comp-103',
    name: 'Tech Mahindra Ltd',
    industry: 'Telecommunications & Cloud Solutions',
    email: 'recruit.partners@techmahindra.com',
    phone: '+91 20 6601 8100',
    website: 'https://www.techmahindra.com',
    location: 'Hyderabad / Noida',
    contactPerson: 'Amitabh Sen',
    contactDesignation: 'Head of Lateral Hiring',
    contractStatus: 'active',
    activeJobsCount: 6,
    totalHires: 85,
    logoUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'comp-104',
    name: 'Wipro Digital Enterprise',
    industry: 'AI Solutions & Software Engineering',
    email: 'wipro.talent@wipro.com',
    phone: '+91 80 2844 0011',
    website: 'https://www.wipro.com',
    location: 'Bengaluru / Remote',
    contactPerson: 'Deepa Krishnan',
    contactDesignation: 'Lead Partner Manager',
    contractStatus: 'active',
    activeJobsCount: 4,
    totalHires: 64,
    logoUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=250&q=80'
  }
];

export const INITIAL_JOB_POSTINGS: JobPosting[] = [
  {
    id: 'job-501',
    jobCode: 'JOB-2026-001',
    title: 'Senior Full Stack React/Node Engineer',
    companyId: 'comp-101',
    companyName: 'Infosys Technologies',
    department: 'Digital Cloud Engineering',
    location: 'Bengaluru (Hybrid)',
    jobType: 'full_time',
    experienceRequired: '5 - 8 Years',
    salaryRange: '₹18,000,00 - ₹26,000,00 PA',
    status: 'open',
    description: 'We are seeking an experienced Senior Full Stack Engineer to architect, build, and deploy high-concurrency enterprise cloud applications using React 18, TypeScript, Node.js, and PostgreSQL.',
    requirements: [
      'Strong expertise in React 18, TypeScript, Next.js or Vite',
      'Hands-on experience with Node.js/Express or Python FastAPI microservices',
      'Proficiency in PostgreSQL, Redis, and RESTful API design',
      'Familiarity with Docker, Kubernetes, and CI/CD pipelines'
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    postedDate: '2026-07-15',
    deadlineDate: '2026-08-30',
    applicantsCount: 42
  },
  {
    id: 'job-502',
    jobCode: 'JOB-2026-002',
    title: 'AI / Machine Learning Solutions Architect',
    companyId: 'comp-102',
    companyName: 'TCS - Tata Consultancy Services',
    department: 'Cognitive Computing & AI',
    location: 'Hyderabad / Remote',
    jobType: 'full_time',
    experienceRequired: '7 - 12 Years',
    salaryRange: '₹28,000,00 - ₹40,000,00 PA',
    status: 'open',
    description: 'Join TCS AI Research Labs as a Lead Architect. Drive LLM integration, generative AI workflows, computer vision models, and MLOps infrastructure for Fortune 500 clients.',
    requirements: [
      'Master/Ph.D or B.Tech in CS/AI/Data Science',
      'Proven track record implementing Generative AI (Gemini, OpenAI, HuggingFace)',
      'Expertise in Python, PyTorch/TensorFlow, Vector DBs (Milvus, Pinecone, pgvector)',
      'Experience with scalable cloud deployment on Google Cloud Platform or AWS'
    ],
    skills: ['Python', 'PyTorch', 'Gemini API', 'MLOps', 'Vector DB', 'FastAPI'],
    postedDate: '2026-07-20',
    deadlineDate: '2026-09-05',
    applicantsCount: 28
  },
  {
    id: 'job-503',
    jobCode: 'JOB-2026-003',
    title: 'Lead HR Talent Business Partner',
    companyId: 'comp-103',
    companyName: 'Tech Mahindra Ltd',
    department: 'Human Resources & People Ops',
    location: 'Mumbai (Onsite)',
    jobType: 'full_time',
    experienceRequired: '6 - 10 Years',
    salaryRange: '₹16,000,00 - ₹22,000,00 PA',
    status: 'open',
    description: 'Lead strategic workforce planning, talent management, employee retention programs, and performance appraisals for Tech Mahindra Enterprise division.',
    requirements: [
      'MBA in HR from a top-tier business school',
      'Minimum 6 years in IT/ITeS HR Business Partnering',
      'In-depth knowledge of Indian labor laws, statutory compliance, and payroll management',
      'Excellent interpersonal communication and leadership skills'
    ],
    skills: ['HRBP', 'Talent Management', 'Labor Compliance', 'Employee Engagement', 'Payroll Strategy'],
    postedDate: '2026-07-28',
    deadlineDate: '2026-09-15',
    applicantsCount: 19
  }
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-701',
    candidateCode: 'CND-8001',
    fullName: 'Siddharth Varma',
    email: 'siddharth.varma@gmail.com',
    phone: '+91 99887 76655',
    currentRole: 'Senior Software Engineer',
    currentCompany: 'Accenture India',
    experienceYears: 6.5,
    expectedSalary: '₹22,000,00 PA',
    noticePeriod: '30 Days',
    skills: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
    appliedJobId: 'job-501',
    appliedJobTitle: 'Senior Full Stack React/Node Engineer',
    companyName: 'Infosys Technologies',
    stage: 'technical_eval',
    matchScore: 94,
    appliedDate: '2026-07-18',
    interviewDate: '2026-08-05 11:00 AM',
    interviewer: 'Arjun Verma (Lead Recruiter)',
    rating: 4.8,
    notes: 'Outstanding technical assessment. High proficiency in React 18, state management, and PostgreSQL optimization.',
    resumeText: `SIDDHARTH VARMA
Senior Software Engineer | 6.5 Years Experience
Email: siddharth.varma@gmail.com | Phone: +91 99887 76655 | Bengaluru

SUMMARY:
Results-driven Full Stack Engineer with 6.5+ years building cloud-native web applications using React, TypeScript, Node.js, Express, and PostgreSQL. Expert in frontend performance optimization, microservices design, and CI/CD pipelines.

EXPERIENCE:
Accenture India — Senior Software Engineer (2022 - Present)
• Built high-concurrency banking dashboard serving 500k+ daily users using React 18 and Node.js.
• Reduced API response time by 40% using Redis caching and database indexing.

Wipro Technologies — Software Engineer (2019 - 2022)
• Developed responsive SPA client applications and REST APIs.

EDUCATION:
B.Tech in Computer Science & Engineering — PES Institute of Technology (2019)`
  },
  {
    id: 'cand-702',
    candidateCode: 'CND-8002',
    fullName: 'Meera Sundaram',
    email: 'meera.sundaram@outlook.com',
    phone: '+91 98765 11223',
    currentRole: 'AI Research Lead',
    currentCompany: 'Bosch AI Center',
    experienceYears: 8,
    expectedSalary: '₹34,000,00 PA',
    noticePeriod: '15 Days',
    skills: ['Python', 'PyTorch', 'Gemini API', 'MLOps', 'Vector DB', 'FastAPI'],
    appliedJobId: 'job-502',
    appliedJobTitle: 'AI / Machine Learning Solutions Architect',
    companyName: 'TCS - Tata Consultancy Services',
    stage: 'offer_sent',
    matchScore: 98,
    appliedDate: '2026-07-22',
    interviewDate: '2026-07-30 03:00 PM',
    interviewer: 'Priya Sharma (HR Lead)',
    rating: 5.0,
    notes: 'Exceptional candidate. Published 3 papers in Generative AI and LLM benchmarking. Offer letter dispatched.',
    resumeText: `MEERA SUNDARAM
AI Research Lead | 8 Years Experience
Email: meera.sundaram@outlook.com | Phone: +91 98765 11223 | Hyderabad

SUMMARY:
AI & Machine Learning Architect specializing in Large Language Models (LLMs), RAG pipelines, PyTorch, Gemini API, and cloud deployment. 8 years driving AI product strategy.`
  },
  {
    id: 'cand-703',
    candidateCode: 'CND-8003',
    fullName: 'Rajiv Menon',
    email: 'rajiv.menon@techhub.io',
    phone: '+91 97112 23344',
    currentRole: 'Senior HR Manager',
    currentCompany: 'Cognizant',
    experienceYears: 7,
    expectedSalary: '₹19,000,00 PA',
    noticePeriod: 'Immediate',
    skills: ['HRBP', 'Talent Management', 'Labor Compliance', 'Payroll Strategy'],
    appliedJobId: 'job-503',
    appliedJobTitle: 'Lead HR Talent Business Partner',
    companyName: 'Tech Mahindra Ltd',
    stage: 'interview_scheduled',
    matchScore: 88,
    appliedDate: '2026-07-29',
    interviewDate: '2026-08-06 02:30 PM',
    interviewer: 'Ananya Deshmukh',
    rating: 4.2,
    notes: 'Strong experience in IT company HRBP function and headcount planning.'
  },
  {
    id: 'cand-704',
    candidateCode: 'CND-8004',
    fullName: 'Pooja Agarwal',
    email: 'pooja.agarwal@gmail.com',
    phone: '+91 96223 34455',
    currentRole: 'Frontend Developer',
    currentCompany: 'Mindtree',
    experienceYears: 4,
    expectedSalary: '₹15,000,00 PA',
    noticePeriod: '45 Days',
    skills: ['React', 'JavaScript', 'CSS3', 'Tailwind CSS', 'Redux'],
    appliedJobId: 'job-501',
    appliedJobTitle: 'Senior Full Stack React/Node Engineer',
    companyName: 'Infosys Technologies',
    stage: 'screened',
    matchScore: 78,
    appliedDate: '2026-07-31',
    rating: 3.9,
    notes: 'Good UI skills, but lighter on backend Node/PostgreSQL capabilities.'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-101',
    employeeId: 'emp-001',
    employeeName: 'Priya Sharma',
    employeeCode: 'KHR-1001',
    department: 'Talent Acquisition',
    date: '2026-08-03',
    checkIn: '09:05 AM',
    checkOut: '06:15 PM',
    status: 'present',
    workHours: 9.1,
    locationVerification: 'Verified (GPS Geofence: HQ Bengaluru)'
  },
  {
    id: 'att-102',
    employeeId: 'emp-002',
    employeeName: 'Arjun Verma',
    employeeCode: 'KHR-1002',
    department: 'Technical Sourcing',
    date: '2026-08-03',
    checkIn: '08:55 AM',
    checkOut: '06:00 PM',
    status: 'present',
    workHours: 9.0,
    locationVerification: 'Verified (QR Scanner Gate #1)'
  },
  {
    id: 'att-103',
    employeeId: 'emp-003',
    employeeName: 'Ananya Deshmukh',
    employeeCode: 'KHR-1003',
    department: 'Payroll & HR Ops',
    date: '2026-08-03',
    checkIn: '09:20 AM',
    checkOut: '06:30 PM',
    status: 'late',
    workHours: 9.1,
    locationVerification: 'Verified (GPS Geofence: Mumbai Regional Office)'
  },
  {
    id: 'att-104',
    employeeId: 'emp-004',
    employeeName: 'Rohan Kulkarni',
    employeeCode: 'KHR-1004',
    department: 'Client Relations',
    date: '2026-08-03',
    checkIn: '-',
    checkOut: '-',
    status: 'on_leave',
    workHours: 0,
    locationVerification: 'Approved Casual Leave'
  }
];

export const INITIAL_LEAVES: LeaveRequest[] = [
  {
    id: 'lv-201',
    employeeId: 'emp-004',
    employeeName: 'Rohan Kulkarni',
    department: 'Client Relations',
    leaveType: 'casual',
    startDate: '2026-08-03',
    endDate: '2026-08-04',
    totalDays: 2,
    reason: 'Personal family function in Pune.',
    status: 'approved',
    appliedOn: '2026-07-28',
    approvedBy: 'Kavitha Nair'
  },
  {
    id: 'lv-202',
    employeeId: 'emp-002',
    employeeName: 'Arjun Verma',
    department: 'Technical Sourcing',
    leaveType: 'sick',
    startDate: '2026-08-10',
    endDate: '2026-08-11',
    totalDays: 2,
    reason: 'Medical health checkup and routine consultation.',
    status: 'pending',
    appliedOn: '2026-08-01'
  }
];

export const INITIAL_PAYROLL: PayrollRecord[] = [
  {
    id: 'pay-301',
    payrollCode: 'PAY-2026-07-001',
    employeeId: 'emp-001',
    employeeName: 'Priya Sharma',
    employeeCode: 'KHR-1001',
    department: 'Talent Acquisition',
    designation: 'Senior Recruitment Lead',
    month: '2026-07',
    basicSalary: 62500,
    hra: 25000,
    specialAllowance: 25000,
    bonus: 12500,
    pfDeduction: 7500,
    taxDeduction: 12500,
    netSalary: 105000,
    paymentStatus: 'paid',
    paymentDate: '2026-07-31',
    bankAccount: 'HDFC Bank (•••• 67891)'
  },
  {
    id: 'pay-302',
    payrollCode: 'PAY-2026-07-002',
    employeeId: 'emp-002',
    employeeName: 'Arjun Verma',
    employeeCode: 'KHR-1002',
    department: 'Technical Sourcing',
    designation: 'Lead Technical Recruiter',
    month: '2026-07',
    basicSalary: 47500,
    hra: 19000,
    specialAllowance: 19000,
    bonus: 9500,
    pfDeduction: 5700,
    taxDeduction: 8500,
    netSalary: 80800,
    paymentStatus: 'paid',
    paymentDate: '2026-07-31',
    bankAccount: 'ICICI Bank (•••• 3210)'
  },
  {
    id: 'pay-303',
    payrollCode: 'PAY-2026-07-003',
    employeeId: 'emp-003',
    employeeName: 'Ananya Deshmukh',
    employeeCode: 'KHR-1003',
    department: 'Payroll & HR Ops',
    designation: 'Payroll & Compliance Manager',
    month: '2026-07',
    basicSalary: 67500,
    hra: 27000,
    specialAllowance: 27000,
    bonus: 13500,
    pfDeduction: 8100,
    taxDeduction: 14500,
    netSalary: 112400,
    paymentStatus: 'paid',
    paymentDate: '2026-07-31',
    bankAccount: 'Axis Bank (•••• 445)'
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-401',
    title: 'Siddharth Varma - Resume v2026.pdf',
    category: 'resume',
    employeeOrCandidateName: 'Siddharth Varma',
    fileSize: '1.4 MB',
    uploadedAt: '2026-07-18',
    fileType: 'PDF Document',
    url: '#'
  },
  {
    id: 'doc-402',
    title: 'Meera Sundaram - Signed Offer Letter.pdf',
    category: 'offer_letter',
    employeeOrCandidateName: 'Meera Sundaram',
    fileSize: '820 KB',
    uploadedAt: '2026-07-31',
    fileType: 'PDF Document',
    url: '#'
  },
  {
    id: 'doc-403',
    title: 'Priya Sharma - NDA & Employment Contract.pdf',
    category: 'policy',
    employeeOrCandidateName: 'Priya Sharma',
    fileSize: '2.1 MB',
    uploadedAt: '2022-03-15',
    fileType: 'PDF Document',
    url: '#'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New High Match Candidate!',
    message: 'Meera Sundaram achieved a 98% match score for TCS AI Solutions Architect position.',
    type: 'recruitment',
    timestamp: '10 minutes ago',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Leave Approval Pending',
    message: 'Arjun Verma submitted a 2-day Sick Leave request for Aug 10-11.',
    type: 'leave',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: 'notif-3',
    title: 'July Payroll Completed',
    message: 'July monthly payroll processed successfully for 148 employees (₹1.84 Cr).',
    type: 'payroll',
    timestamp: '3 days ago',
    read: true
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-101',
    userId: 'usr-101',
    userName: 'Anil Yadav',
    userRole: 'Super Admin',
    action: 'Dispatched Offer Letter',
    module: 'Recruitment',
    ipAddress: '103.14.22.10',
    timestamp: '2026-08-03 11:20 AM',
    status: 'success'
  },
  {
    id: 'log-102',
    userId: 'emp-001',
    userName: 'Priya Sharma',
    userRole: 'HR Manager',
    action: 'AI Resume Parse executed for candidate Siddharth Varma',
    module: 'AI Recruitment Engine',
    ipAddress: '103.14.22.12',
    timestamp: '2026-08-03 10:45 AM',
    status: 'success'
  },
  {
    id: 'log-103',
    userId: 'emp-003',
    userName: 'Ananya Deshmukh',
    userRole: 'HR Manager',
    action: 'Executed July Monthly Payroll Batch Run',
    module: 'Payroll',
    ipAddress: '103.14.22.15',
    timestamp: '2026-07-31 05:00 PM',
    status: 'success'
  }
];
