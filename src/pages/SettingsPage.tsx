import React, { useState, useEffect } from 'react';
import { Settings, Shield, Key, Building2, Bell, Lock, Activity, Save } from 'lucide-react';
import { apiService } from '../services/api';
import { AuditLogItem } from '../types';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'rbac' | 'audit'>('general');
  const [logs, setLogs] = useState<AuditLogItem[]>([]);

  // Company Settings State
  const [companyName, setCompanyName] = useState('Kamadenu HR Consultancy');
  const [taxNumber, setTaxNumber] = useState('GSTIN29AAACK1234F1Z5');
  const [pfNumber, setPfNumber] = useState('KN/BNG/0012345/000');
  const [address, setAddress] = useState('Kamadenu Tower, 100 Feet Road, Indiranagar, Bengaluru, KA 560038');

  useEffect(() => {
    apiService.getAuditLogs().then((res) => setLogs(res.auditLogs));
  }, []);

  const handleSaveSettings = () => {
    alert('Company & HR system configuration saved successfully!');
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            System Settings & Security Control
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure company parameters, statutory tax IDs, RBAC permissions & view live audit trail.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
          id="save-settings-btn"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('general')}
          className={`pb-3 transition-colors ${activeTab === 'general' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}
        >
          Company & Statutory Info
        </button>
        <button
          onClick={() => setActiveTab('rbac')}
          className={`pb-3 transition-colors ${activeTab === 'rbac' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}
        >
          RBAC Role Access Control
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 transition-colors ${activeTab === 'audit' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}
        >
          Live Security Audit Trail
        </button>
      </div>

      {activeTab === 'general' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4 max-w-2xl text-xs">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Company Registered Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-semibold text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">GSTIN Tax Registration</label>
              <input
                type="text"
                value={taxNumber}
                onChange={(e) => setTaxNumber(e.target.value)}
                className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">EPFO Provident Fund Establishment Code</label>
              <input
                type="text"
                value={pfNumber}
                onChange={(e) => setPfNumber(e.target.value)}
                className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Registered HQ Address</label>
            <textarea
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
            />
          </div>
        </div>
      )}

      {activeTab === 'rbac' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Role-Based Access Control Matrix (RBAC)</h3>
          </div>
          <div className="p-6 text-xs space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-extrabold text-blue-900 text-sm">Super Admin</h4>
                <p className="text-slate-500 text-[11px]">Full platform access across all modules, billing & settings.</p>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded inline-block">1 User Assigned</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-extrabold text-teal-900 text-sm">HR Manager</h4>
                <p className="text-slate-500 text-[11px]">Employee onboarding, leave approvals & candidate ATS.</p>
                <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded inline-block">12 Users Assigned</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-extrabold text-indigo-900 text-sm">Recruiter / Sourcer</h4>
                <p className="text-slate-500 text-[11px]">Resume parser, job matching, candidate sourcing & interview scheduling.</p>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded inline-block">24 Users Assigned</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-extrabold text-amber-900 text-sm">Employee Self-Service</h4>
                <p className="text-slate-500 text-[11px]">View payslips, check-in QR, request leaves & profile management.</p>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded inline-block">111 Users Assigned</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Security Audit & Action Trail</h3>
            <span className="text-xs text-slate-400 font-medium">Immutable Audit Trail</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Action Event</th>
                  <th className="py-3.5 px-4">Module</th>
                  <th className="py-3.5 px-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors font-mono">
                    <td className="py-3.5 px-4 text-slate-500">{log.timestamp}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{log.userName}</td>
                    <td className="py-3.5 px-4 text-blue-700 font-bold">{log.action}</td>
                    <td className="py-3.5 px-4 text-slate-700">{log.module}</td>
                    <td className="py-3.5 px-4 text-slate-400">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
