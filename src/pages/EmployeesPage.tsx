import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  MoreVertical,
  X,
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
  Building2,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { apiService } from '../services/api';
import { Employee } from '../types';

export const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Add Employee Form State
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newDepartment, setNewDepartment] = useState('Talent Acquisition');
  const [newDesignation, setNewDesignation] = useState('Recruitment Specialist');
  const [newSalary, setNewSalary] = useState('95000');
  const [newLocation, setNewLocation] = useState('Bengaluru, India');

  const fetchEmployees = () => {
    setIsLoading(true);
    apiService.getEmployees({ search, department: deptFilter, status: statusFilter })
      .then(res => setEmployees(res.employees))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, deptFilter, statusFilter]);

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    apiService.createEmployee({
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      phone: newPhone,
      department: newDepartment,
      designation: newDesignation,
      salary: Number(newSalary),
      location: newLocation,
      role: 'hr_manager',
      status: 'active',
      gender: 'Male',
      dob: '1995-05-15',
      experienceYears: 4,
      emergencyContact: { name: 'Emergency Contact', relationship: 'Relative', phone: '+91 90000 00000' },
      bankDetails: { accountName: `${newFirstName} ${newLastName}`, accountNumber: '50100998877665', bankName: 'HDFC Bank', ifscCode: 'HDFC0001234' },
      education: [{ degree: 'B.A. / B.Tech', institution: 'State University', year: '2017' }]
    }).then(() => {
      setShowAddModal(false);
      fetchEmployees();
      alert('Employee onboarded successfully!');
    });
  };

  const exportToCsv = () => {
    const headers = ['Employee Code', 'Full Name', 'Email', 'Department', 'Designation', 'Status', 'Salary (INR)'];
    const rows = employees.map(e => [
      e.employeeCode,
      `"${e.firstName} ${e.lastName}"`,
      e.email,
      `"${e.department}"`,
      `"${e.designation}"`,
      e.status,
      e.salary
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Kamadenu_Employee_Directory_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Employee Management Directory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage 148 active staff, designations, bank accounts, and employment records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportToCsv}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 transition-all flex items-center gap-2"
            id="export-emp-csv-btn"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
            id="add-new-employee-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Employee</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by code, name, email or designation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 text-slate-800 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            id="employee-search-input"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
            id="dept-filter-select"
          >
            <option value="all">All Departments</option>
            <option value="Talent Acquisition">Talent Acquisition</option>
            <option value="Technical Sourcing">Technical Sourcing</option>
            <option value="Payroll & HR Ops">Payroll & HR Ops</option>
            <option value="Client Relations">Client Relations</option>
            <option value="Executive Leadership">Executive Leadership</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
            id="status-filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="on_leave">On Leave</option>
            <option value="probation">Probation</option>
          </select>
        </div>
      </div>

      {/* Employee Grid / Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Department & Designation</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Joining Date</th>
                <th className="py-3.5 px-4">Salary (Monthly)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {employees.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  onClick={() => setSelectedEmployee(emp)}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                        alt={emp.firstName}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                      />
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {emp.firstName} {emp.lastName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono font-semibold">
                          {emp.employeeCode}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{emp.designation}</div>
                    <div className="text-[10px] text-slate-400">{emp.department}</div>
                  </td>
                  <td className="py-3.5 px-4 space-y-0.5">
                    <div className="text-slate-700 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{emp.email}</span>
                    </div>
                    <div className="text-slate-400 text-[10px] flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>{emp.phone}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {emp.joinDate}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    ₹{emp.salary.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full uppercase">
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEmployee(emp);
                      }}
                      className="bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 font-bold text-[11px] px-3 py-1.5 rounded-lg transition-colors"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Detailed Profile Drawer Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-lg h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedEmployee.avatar}
                    alt={selectedEmployee.firstName}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500"
                  />
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      {selectedEmployee.firstName} {selectedEmployee.lastName}
                    </h2>
                    <p className="text-xs text-blue-600 font-semibold">
                      {selectedEmployee.designation} • {selectedEmployee.employeeCode}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 pt-4 text-xs">
                {/* Personal Details Card */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-600" /> Personal Details
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Email:</span>
                      <span className="font-semibold">{selectedEmployee.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Phone:</span>
                      <span className="font-semibold">{selectedEmployee.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Location:</span>
                      <span className="font-semibold">{selectedEmployee.location}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Gender / DOB:</span>
                      <span className="font-semibold">{selectedEmployee.gender} ({selectedEmployee.dob})</span>
                    </div>
                  </div>
                </div>

                {/* Salary & Bank Details */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-teal-600" /> Salary & Bank Info
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Base Monthly Salary:</span>
                      <span className="font-extrabold text-slate-900 text-sm">
                        ₹{selectedEmployee.salary.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Bank Name:</span>
                      <span className="font-semibold">{selectedEmployee.bankDetails?.bankName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Account No:</span>
                      <span className="font-mono font-semibold">{selectedEmployee.bankDetails?.accountNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">IFSC Code:</span>
                      <span className="font-mono font-semibold">{selectedEmployee.bankDetails?.ifscCode}</span>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-600" /> Qualifications
                  </h3>
                  {selectedEmployee.education?.map((edu, idx) => (
                    <div key={idx} className="text-slate-700">
                      <p className="font-bold text-slate-900">{edu.degree}</p>
                      <p className="text-[11px] text-slate-500">{edu.institution} ({edu.year})</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex gap-2">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900">Onboard New Employee</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                    placeholder="e.g. Rahul"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                    placeholder="e.g. Kapoor"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                    placeholder="rahul.k@kamadenu.com"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                    placeholder="+91 98000 11223"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department</label>
                  <select
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  >
                    <option value="Talent Acquisition">Talent Acquisition</option>
                    <option value="Technical Sourcing">Technical Sourcing</option>
                    <option value="Payroll & HR Ops">Payroll & HR Ops</option>
                    <option value="Client Relations">Client Relations</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    value={newDesignation}
                    onChange={(e) => setNewDesignation(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                    placeholder="Senior Recruiter"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Monthly Salary (INR)</label>
                  <input
                    type="number"
                    required
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Work Location</label>
                  <input
                    type="text"
                    required
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-xl"
                >
                  Confirm & Onboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
