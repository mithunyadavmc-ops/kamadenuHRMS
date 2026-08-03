import React, { useState, useEffect } from 'react';
import { CalendarDays, Plus, CheckCircle2, XCircle, Clock, Check, X } from 'lucide-react';
import { apiService } from '../services/api';
import { LeaveRequest } from '../types';

export const LeavePage: React.FC = () => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [leaveType, setLeaveType] = useState<'casual' | 'sick' | 'earned'>('casual');
  const [startDate, setStartDate] = useState('2026-08-12');
  const [endDate, setEndDate] = useState('2026-08-13');
  const [reason, setReason] = useState('');

  const fetchLeaves = () => {
    apiService.getLeaves().then(res => setLeaves(res.leaves));
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    apiService.createLeave({
      employeeId: 'emp-001',
      employeeName: 'Priya Sharma',
      department: 'Talent Acquisition',
      leaveType,
      startDate,
      endDate,
      totalDays: 2,
      reason
    }).then(() => {
      setShowApplyModal(false);
      fetchLeaves();
      alert('Leave request submitted for manager approval!');
    });
  };

  const handleApproveReject = (id: string, status: 'approved' | 'rejected') => {
    apiService.updateLeaveStatus(id, status).then(() => {
      fetchLeaves();
    });
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-blue-600" />
            Leave Management & Approval Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Request casual, sick, maternity & earned leaves with multi-stage approval workflow.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
          id="apply-leave-btn"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for Leave</span>
        </button>
      </div>

      {/* Leave Balance Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold">Casual Leave Balance</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">8 / 12 Days</h3>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">Available</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold">Sick Leave Balance</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">10 / 12 Days</h3>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">Available</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold">Earned Leave Balance</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">15 / 18 Days</h3>
          </div>
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg">Available</span>
        </div>
      </div>

      {/* Leave Applications Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">Submitted Leave Applications</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Leave Type</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Total Days</th>
                <th className="py-3.5 px-4">Reason</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {leaves.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{l.employeeName}</div>
                    <div className="text-[10px] text-slate-400">{l.department}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-800 capitalize bg-slate-100 px-2.5 py-1 rounded-lg">
                      {l.leaveType} Leave
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {l.startDate} to {l.endDate}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-blue-700">{l.totalDays} Days</td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">{l.reason}</td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
                      l.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                      l.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {l.status === 'pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleApproveReject(l.id, 'approved')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleApproveReject(l.id, 'rejected')}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <X className="w-3 h-3" />
                          <span>Reject</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">By {l.approvedBy || 'HR Admin'}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900">Apply for Leave</h2>
              <button onClick={() => setShowApplyModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyLeave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as any)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                >
                  <option value="casual">Casual Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="earned">Earned Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Reason for Leave</label>
                <textarea
                  rows={3}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  placeholder="State reason clearly..."
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white font-bold px-5 py-2 rounded-xl">
                  Submit Leave Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
