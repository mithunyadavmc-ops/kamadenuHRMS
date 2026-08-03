import React, { useState, useEffect } from 'react';
import { Clock, QrCode, MapPin, CheckCircle2, AlertTriangle, ShieldCheck, UserCheck } from 'lucide-react';
import { apiService } from '../services/api';
import { AttendanceRecord } from '../types';

export const AttendancePage: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [punchMessage, setPunchMessage] = useState('');
  const [selectedEmpId, setSelectedEmpId] = useState('emp-001');

  const fetchAttendance = () => {
    apiService.getAttendance().then(res => setRecords(res.attendance));
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handlePunch = (type: 'in' | 'out', method: string) => {
    apiService.punchAttendance(selectedEmpId, type, method).then(res => {
      setPunchMessage(`Successfully punched ${type.toUpperCase()} via ${method} at ${new Date().toLocaleTimeString()}!`);
      fetchAttendance();
      setTimeout(() => setPunchMessage(''), 4000);
    });
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Attendance & QR / GPS Verification Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time shift punch clock with GPS Geofencing & Gate QR Scanner.
          </p>
        </div>
      </div>

      {/* Punch Action Banner Card */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-400/30">
            <MapPin className="w-3.5 h-3.5" />
            <span>GPS Geofence: Active (Bengaluru HQ Campus)</span>
          </div>
          <h2 className="text-xl font-extrabold">Instant Shift Punch Terminal</h2>
          <p className="text-xs text-blue-200">
            Select employee and punch check-in or check-out with verified geofencing.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/20 backdrop-blur-md">
          <select
            value={selectedEmpId}
            onChange={(e) => setSelectedEmpId(e.target.value)}
            className="bg-slate-900 text-white text-xs px-3 py-2.5 rounded-xl border border-slate-700"
          >
            <option value="emp-001">Priya Sharma (KHR-1001)</option>
            <option value="emp-002">Arjun Verma (KHR-1002)</option>
            <option value="emp-003">Ananya Deshmukh (KHR-1003)</option>
            <option value="emp-004">Rohan Kulkarni (KHR-1004)</option>
          </select>

          <button
            onClick={() => handlePunch('in', 'QR Scanner Gate #1')}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
            id="punch-in-btn"
          >
            <QrCode className="w-4 h-4" />
            <span>Punch Check-In</span>
          </button>

          <button
            onClick={() => handlePunch('out', 'GPS Geofence App')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
            id="punch-out-btn"
          >
            <Clock className="w-4 h-4" />
            <span>Punch Check-Out</span>
          </button>
        </div>
      </div>

      {punchMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-4 rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{punchMessage}</span>
        </div>
      )}

      {/* Today Attendance Log Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Today Shift Logs ({new Date().toLocaleDateString('en-IN')})</h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            96.4% Compliance Rate
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Check-In Time</th>
                <th className="py-3.5 px-4">Check-Out Time</th>
                <th className="py-3.5 px-4">Total Hours</th>
                <th className="py-3.5 px-4">Verification Mode</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {records.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{rec.employeeName}</div>
                    <div className="text-[10px] font-mono text-slate-400">{rec.employeeCode}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{rec.department}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{rec.checkIn}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">{rec.checkOut}</td>
                  <td className="py-3.5 px-4 font-bold text-blue-700">{rec.workHours} hrs</td>
                  <td className="py-3.5 px-4 text-slate-600 text-[11px]">{rec.locationVerification}</td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
                      rec.status === 'present' ? 'bg-emerald-100 text-emerald-800' :
                      rec.status === 'late' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
