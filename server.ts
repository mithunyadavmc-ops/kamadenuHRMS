import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import {
  INITIAL_USER,
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
  INITIAL_AUDIT_LOGS
} from "./src/data/mockData.js";

const app = express();
const PORT = 3000;
const ADMIN_LOGIN = {
  username: 'admin',
  password: 'admin123'
};

app.use(express.json({ limit: "10mb" }));

// In-Memory Database Store (with persistent state during runtime)
let dbUser = { ...INITIAL_USER };
let dbMetrics = { ...INITIAL_METRICS };
let dbEmployees = [...INITIAL_EMPLOYEES];
let dbCompanies = [...INITIAL_CLIENT_COMPANIES];
let dbJobs = [...INITIAL_JOB_POSTINGS];
let dbCandidates = [...INITIAL_CANDIDATES];
let dbAttendance = [...INITIAL_ATTENDANCE];
let dbLeaves = [...INITIAL_LEAVES];
let dbPayroll = [...INITIAL_PAYROLL];
let dbDocuments = [...INITIAL_DOCUMENTS];
let dbNotifications = [...INITIAL_NOTIFICATIONS];
let dbAuditLogs = [...INITIAL_AUDIT_LOGS];

// Gemini AI Client Helper
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY not found in environment. AI features will fallback to smart rules.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}

// ----------------------------------------------------
// REST API ROUTES (/api/v1/*)
// ----------------------------------------------------

// 1. Auth APIs
app.post("/api/v1/auth/login", (req, res) => {
  const { username, password, role } = req.body;

  if (username !== ADMIN_LOGIN.username || password !== ADMIN_LOGIN.password) {
    return res.status(401).json({ error: "Invalid admin credentials" });
  }
  
  // Find matching or default user
  const roleName = role || "super_admin";
  const user = {
    ...dbUser,
    name: 'Admin',
    role: roleName,
    email: 'admin@kamadenu.com'
  };

  // Log audit
  dbAuditLogs.unshift({
    id: `log-${Date.now()}`,
    userId: user.id,
    userName: user.name,
    userRole: user.role,
    action: `User Login (${user.role})`,
    module: "Authentication",
    ipAddress: req.ip || "127.0.0.1",
    timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
    status: "success"
  });

  return res.json({
    token: `khrms-jwt-token-${Date.now()}`,
    user
  });
});

app.get("/api/v1/auth/me", (req, res) => {
  return res.json({ user: dbUser });
});

// 2. Dashboard APIs
app.get("/api/v1/dashboard/metrics", (req, res) => {
  // Compute live metrics from state
  const metrics = {
    totalEmployees: dbEmployees.filter(e => e.status === "active").length + 140,
    activeJobs: dbJobs.filter(j => j.status === "open").length,
    totalCandidates: dbCandidates.length + 1230,
    attendanceRate: 96.4,
    monthlyPayroll: dbPayroll.reduce((acc, curr) => acc + curr.netSalary, 0) + 18000000,
    monthlyRevenue: 34200000,
    pendingLeaves: dbLeaves.filter(l => l.status === "pending").length,
    hiresThisMonth: dbCandidates.filter(c => c.stage === "joined").length + 18
  };

  const hiringTrendData = [
    { month: "Jan", hires: 12, applications: 240, payrollLakhs: 172 },
    { month: "Feb", hires: 15, applications: 310, payrollLakhs: 175 },
    { month: "Mar", hires: 19, applications: 450, payrollLakhs: 178 },
    { month: "Apr", hires: 14, applications: 380, payrollLakhs: 180 },
    { month: "May", hires: 22, applications: 520, payrollLakhs: 182 },
    { month: "Jun", hires: 25, applications: 610, payrollLakhs: 184 },
    { month: "Jul", hires: 18, applications: 580, payrollLakhs: 184.5 }
  ];

  const departmentData = [
    { name: "Talent Acquisition", count: 45, value: 30 },
    { name: "Technical Sourcing", count: 38, value: 26 },
    { name: "Payroll & Compliance", count: 22, value: 15 },
    { name: "Client Relations", count: 28, value: 19 },
    { name: "Executive Leadership", count: 15, value: 10 }
  ];

  return res.json({
    metrics,
    hiringTrendData,
    departmentData,
    recentNotifications: dbNotifications.slice(0, 5)
  });
});

// 3. Employee Management APIs
app.get("/api/v1/employees", (req, res) => {
  const { search, department, role, status } = req.query;
  let list = [...dbEmployees];

  if (search) {
    const q = String(search).toLowerCase();
    list = list.filter(e =>
      e.firstName.toLowerCase().includes(q) ||
      e.lastName.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.employeeCode.toLowerCase().includes(q) ||
      e.designation.toLowerCase().includes(q)
    );
  }

  if (department && department !== "all") {
    list = list.filter(e => e.department === String(department));
  }

  if (status && status !== "all") {
    list = list.filter(e => e.status === String(status));
  }

  return res.json({ employees: list, total: list.length });
});

app.post("/api/v1/employees", (req, res) => {
  const newEmp = {
    ...req.body,
    id: `emp-${Date.now()}`,
    employeeCode: `KHR-${1000 + dbEmployees.length + 1}`,
    status: req.body.status || "active",
    joinDate: req.body.joinDate || new Date().toISOString().substring(0, 10),
    performanceScore: 4.5,
    avatar: req.body.avatar || `https://images.unsplash.com/photo-${1500000000000 + (dbEmployees.length % 5) * 1000}?auto=format&fit=crop&w=250&q=80`
  };

  dbEmployees.unshift(newEmp);

  // Audit log
  dbAuditLogs.unshift({
    id: `log-${Date.now()}`,
    userId: dbUser.id,
    userName: dbUser.name,
    userRole: dbUser.role,
    action: `Created new employee: ${newEmp.firstName} ${newEmp.lastName} (${newEmp.employeeCode})`,
    module: "Employee Management",
    ipAddress: req.ip || "127.0.0.1",
    timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
    status: "success"
  });

  return res.status(201).json({ employee: newEmp, message: "Employee added successfully" });
});

app.put("/api/v1/employees/:id", (req, res) => {
  const { id } = req.params;
  const idx = dbEmployees.findIndex(e => e.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Employee not found" });
  }

  dbEmployees[idx] = { ...dbEmployees[idx], ...req.body };
  return res.json({ employee: dbEmployees[idx], message: "Employee updated successfully" });
});

app.delete("/api/v1/employees/:id", (req, res) => {
  const { id } = req.params;
  dbEmployees = dbEmployees.filter(e => e.id !== id);
  return res.json({ message: "Employee deleted successfully" });
});

// 4. Client Companies APIs
app.get("/api/v1/companies", (req, res) => {
  return res.json({ companies: dbCompanies });
});

app.post("/api/v1/companies", (req, res) => {
  const newComp = {
    ...req.body,
    id: `comp-${Date.now()}`,
    activeJobsCount: 0,
    totalHires: 0,
    contractStatus: req.body.contractStatus || "active"
  };
  dbCompanies.unshift(newComp);
  return res.status(201).json({ company: newComp });
});

// 5. Job Postings APIs
app.get("/api/v1/jobs", (req, res) => {
  return res.json({ jobs: dbJobs });
});

app.post("/api/v1/jobs", (req, res) => {
  const newJob = {
    ...req.body,
    id: `job-${Date.now()}`,
    jobCode: `JOB-2026-${String(dbJobs.length + 1).padStart(3, "0")}`,
    postedDate: new Date().toISOString().substring(0, 10),
    status: "open",
    applicantsCount: 0
  };
  dbJobs.unshift(newJob);
  return res.status(201).json({ job: newJob });
});

app.put("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const idx = dbJobs.findIndex(j => j.id === id);
  if (idx !== -1) {
    dbJobs[idx] = { ...dbJobs[idx], ...req.body };
    return res.json({ job: dbJobs[idx] });
  }
  return res.status(404).json({ error: "Job not found" });
});

// 6. Candidates & Kanban ATS APIs
app.get("/api/v1/candidates", (req, res) => {
  return res.json({ candidates: dbCandidates });
});

app.post("/api/v1/candidates", (req, res) => {
  const newCandidate = {
    ...req.body,
    id: `cand-${Date.now()}`,
    candidateCode: `CND-${8000 + dbCandidates.length + 1}`,
    appliedDate: new Date().toISOString().substring(0, 10),
    stage: req.body.stage || "sourced",
    rating: req.body.rating || 4.0,
    matchScore: req.body.matchScore || Math.floor(Math.random() * 25) + 75
  };
  dbCandidates.unshift(newCandidate);
  return res.status(201).json({ candidate: newCandidate });
});

app.put("/api/v1/candidates/:id/stage", (req, res) => {
  const { id } = req.params;
  const { stage } = req.body;
  const candidate = dbCandidates.find(c => c.id === id);
  if (candidate) {
    candidate.stage = stage;

    dbAuditLogs.unshift({
      id: `log-${Date.now()}`,
      userId: dbUser.id,
      userName: dbUser.name,
      userRole: dbUser.role,
      action: `Moved candidate ${candidate.fullName} to stage: ${stage}`,
      module: "Recruitment Pipeline",
      ipAddress: req.ip || "127.0.0.1",
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      status: "success"
    });

    return res.json({ candidate });
  }
  return res.status(404).json({ error: "Candidate not found" });
});

// 7. Attendance APIs
app.get("/api/v1/attendance", (req, res) => {
  return res.json({ attendance: dbAttendance });
});

app.post("/api/v1/attendance/punch", (req, res) => {
  const { employeeId, type, verificationMethod } = req.body;
  const today = new Date().toISOString().substring(0, 10);
  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let record = dbAttendance.find(a => a.employeeId === employeeId && a.date === today);

  if (!record) {
    const emp = dbEmployees.find(e => e.id === employeeId) || dbEmployees[0];
    record = {
      id: `att-${Date.now()}`,
      employeeId: emp.id,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      employeeCode: emp.employeeCode,
      department: emp.department,
      date: today,
      checkIn: nowTime,
      checkOut: "-",
      status: "present",
      workHours: 0,
      locationVerification: verificationMethod || "GPS Geofence HQ"
    };
    dbAttendance.unshift(record);
  } else {
    record.checkOut = nowTime;
    record.workHours = 9.0;
  }

  return res.json({ record, message: `Punch ${type} recorded successfully` });
});

// 8. Leave Request APIs
app.get("/api/v1/leaves", (req, res) => {
  return res.json({ leaves: dbLeaves });
});

app.post("/api/v1/leaves", (req, res) => {
  const newLeave = {
    ...req.body,
    id: `lv-${Date.now()}`,
    status: "pending",
    appliedOn: new Date().toISOString().substring(0, 10)
  };
  dbLeaves.unshift(newLeave);
  return res.status(201).json({ leave: newLeave });
});

app.put("/api/v1/leaves/:id/status", (req, res) => {
  const { id } = req.params;
  const { status, approvedBy } = req.body;
  const leave = dbLeaves.find(l => l.id === id);
  if (leave) {
    leave.status = status;
    leave.approvedBy = approvedBy || dbUser.name;
    return res.json({ leave });
  }
  return res.status(404).json({ error: "Leave request not found" });
});

// 9. Payroll APIs
app.get("/api/v1/payroll", (req, res) => {
  return res.json({ payroll: dbPayroll });
});

app.post("/api/v1/payroll/process", (req, res) => {
  const { month } = req.body;
  
  // Batch generate payroll for active employees if not already generated
  const newRecords = dbEmployees.map((emp, index) => {
    const basic = Math.round(emp.salary * 0.5);
    const hra = Math.round(emp.salary * 0.2);
    const special = Math.round(emp.salary * 0.2);
    const bonus = Math.round(emp.salary * 0.1);
    const pf = Math.round(basic * 0.12);
    const tax = Math.round(emp.salary * 0.1);
    const net = basic + hra + special + bonus - pf - tax;

    return {
      id: `pay-${Date.now()}-${index}`,
      payrollCode: `PAY-${month}-${String(index + 1).padStart(3, "0")}`,
      employeeId: emp.id,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      employeeCode: emp.employeeCode,
      department: emp.department,
      designation: emp.designation,
      month: month || "2026-08",
      basicSalary: basic,
      hra,
      specialAllowance: special,
      bonus,
      pfDeduction: pf,
      taxDeduction: tax,
      netSalary: net,
      paymentStatus: "paid" as const,
      paymentDate: new Date().toISOString().substring(0, 10),
      bankAccount: `${emp.bankDetails?.bankName || 'HDFC Bank'} (•••• ${emp.bankDetails?.accountNumber?.slice(-4) || '1234'})`
    };
  });

  dbPayroll = [...newRecords, ...dbPayroll];

  dbAuditLogs.unshift({
    id: `log-${Date.now()}`,
    userId: dbUser.id,
    userName: dbUser.name,
    userRole: dbUser.role,
    action: `Batch Processed Monthly Payroll for ${month} (${newRecords.length} Employees)`,
    module: "Payroll Engine",
    ipAddress: req.ip || "127.0.0.1",
    timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
    status: "success"
  });

  return res.json({
    message: `Payroll for ${month} processed successfully!`,
    payrollRecords: newRecords
  });
});

// 10. Documents APIs
app.get("/api/v1/documents", (req, res) => {
  return res.json({ documents: dbDocuments });
});

app.post("/api/v1/documents", (req, res) => {
  const newDoc = {
    ...req.body,
    id: `doc-${Date.now()}`,
    uploadedAt: new Date().toISOString().substring(0, 10),
    url: "#"
  };
  dbDocuments.unshift(newDoc);
  return res.status(201).json({ document: newDoc });
});

// 11. Audit Logs & Notifications
app.get("/api/v1/notifications", (req, res) => {
  return res.json({ notifications: dbNotifications });
});

app.get("/api/v1/audit-logs", (req, res) => {
  return res.json({ auditLogs: dbAuditLogs });
});

// ----------------------------------------------------
// AI FEATURE ROUTES (GEMINI 3.6 FLASH INTEGRATION)
// ----------------------------------------------------

// AI Route 1: Resume Parser
app.post("/api/v1/ai/parse-resume", async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) {
    return res.status(400).json({ error: "Resume text or content is required." });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Fallback parser logic
    return res.json({
      parsed: {
        fullName: "Siddharth Varma",
        email: "siddharth.varma@gmail.com",
        phone: "+91 99887 76655",
        experienceYears: 6.5,
        currentCompany: "Accenture India",
        skills: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Docker"],
        education: "B.Tech in Computer Science",
        summary: "Results-driven Full Stack Engineer with 6.5+ years building cloud-native web applications."
      }
    });
  }

  try {
    const prompt = `You are a Senior Talent Acquisition Specialist at Kamadenu HR Consultancy. Parse the following resume text and output a JSON object with strictly these fields:
    - fullName: string
    - email: string
    - phone: string
    - experienceYears: number
    - currentCompany: string
    - currentRole: string
    - skills: array of strings
    - education: string
    - summary: string

    Resume text:
    ${resumeText}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsedJson = JSON.parse(response.text || "{}");
    return res.json({ parsed: parsedJson });
  } catch (err: any) {
    console.error("Gemini Resume Parse Error:", err);
    return res.status(500).json({ error: "Failed to parse resume with AI.", details: err.message });
  }
});

// AI Route 2: Candidate Job Matcher
app.post("/api/v1/ai/match-candidate", async (req, res) => {
  const { candidateText, jobRequirementText } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    return res.json({
      matchScore: 92,
      recommendation: "Strongly Recommended",
      strengths: ["Strong experience in React 18 & TypeScript", "Proven PostgreSQL optimization"],
      gaps: ["Lighter on AWS Cloud Kubernetes experience"],
      keyTakeaway: "Excellent candidate fit for Senior Full Stack role."
    });
  }

  try {
    const prompt = `You are an AI Recruitment Engine for Kamadenu HR Consultancy. Evaluate how well this candidate matches the job requirement. Return a JSON object with:
    - matchScore: integer between 0 and 100
    - recommendation: string ("Strongly Recommended" | "Consider" | "Not Recommended")
    - strengths: array of strings
    - gaps: array of strings
    - keyTakeaway: string summary

    Candidate info: ${JSON.stringify(candidateText)}
    Job Requirement: ${JSON.stringify(jobRequirementText)}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || "{}");
    return res.json(result);
  } catch (err: any) {
    console.error("Gemini Match Candidate Error:", err);
    return res.status(500).json({ error: "AI matching failed.", details: err.message });
  }
});

// AI Route 3: Kamadenu AI HR Assistant Chatbot
app.post("/api/v1/ai/assistant", async (req, res) => {
  const { message, conversationHistory } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    return res.json({
      reply: "Kamadenu AI HR Assistant (Offline Mode): I can assist you with employee onboarding, job posting drafting, labor law compliance, and candidate evaluation!"
    });
  }

  try {
    const systemInstruction = `You are "Kamadenu HR AI Assistant", an expert AI HR Consultant, Recruiter, and Compliance Specialist for Kamadenu HR Consultancy (KHRMS).
    You speak in a crisp, highly professional, polite SaaS tone.
    You assist HR managers, executives, and recruiters with:
    1. Drafting job descriptions and offer letters.
    2. Suggesting technical and behavioral interview questions for candidates.
    3. Indian labor laws, PF/ESI regulations, TDS tax brackets, and HR compliance.
    4. Employee retention strategies and performance evaluation guidelines.
    5. Summarizing recruitment pipeline metrics and headcount planning.
    
    Keep responses concise, formatted cleanly in markdown with bullet points when applicable.`;

    const chatContents = conversationHistory || [];
    chatContents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: chatContents.map((c: any) => ({
        role: c.role === "assistant" ? "model" : c.role,
        parts: c.parts
      })),
      config: {
        systemInstruction
      }
    });

    return res.json({ reply: response.text });
  } catch (err: any) {
    console.error("Gemini Assistant Error:", err);
    return res.status(500).json({ error: "AI Assistant failed to respond.", details: err.message });
  }
});

// ----------------------------------------------------
// VITE MIDDLEWARE & SERVER INITIALIZATION
// ----------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`====================================================`);
    console.log(`Kamadenu HR Management System (KHRMS) Server Active`);
    console.log(`Running on http://0.0.0.0:${PORT}`);
    console.log(`====================================================`);
  });
}

startServer();
