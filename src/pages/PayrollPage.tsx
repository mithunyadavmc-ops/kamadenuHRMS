import React, { useState, useEffect } from 'react';
import { CreditCard, Play, FileText, Download, Printer, CheckCircle2, Building2, X } from 'lucide-react';
import { apiService } from '../services/api';
import { PayrollRecord } from '../types';

export const PayrollPage: React.FC = () => {
  const [payrollList, setPayrollList] = useState<PayrollRecord[]>([]);
  const [selectedPayslip, setSelectedPayslip] = useState<PayrollRecord | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('2026-07');
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchPayroll = () => {
    apiService.getPayroll().then(res => setPayrollList(res.payroll));
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

  const handleRunPayrollBatch = () => {
    setIsProcessing(true);
    apiService.processPayrollBatch(selectedMonth).then((res) => {
      setIsProcessing(false);
      fetchPayroll();
      alert(res.message);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            Enterprise Payroll & Salary Disbursal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated salary calculations, PF/ESI deductions, TDS tax computation & digital payslips.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200"
          >
            <option value="2026-07">July 2026 Payroll</option>
            <option value="2026-08">August 2026 Payroll</option>
          </select>

          <button
            onClick={handleRunPayrollBatch}
            disabled={isProcessing}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2"
            id="run-batch-payroll-btn"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isProcessing ? 'Processing Batch...' : 'Process Monthly Payroll'}</span>
          </button>
        </div>
      </div>

      {/* Payroll Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs text-slate-500 font-semibold">Total Salary Expense (July)</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">₹1,84,50,000</h3>
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block">
            100% Disbursed
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs text-slate-500 font-semibold">Total PF & TDS Tax Statutory</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">₹32,40,000</h3>
          <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded mt-1 inline-block">
            Compliant with Govt Rules
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs text-slate-500 font-semibold">Employees Processed</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">148 Employees</h3>
          <span className="text-[10px] text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded mt-1 inline-block">
            0 Errors
          </span>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Payroll Records for {selectedMonth}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">Payroll Code & Employee</th>
                <th className="py-3.5 px-4">Designation</th>
                <th className="py-3.5 px-4">Basic + HRA + Special</th>
                <th className="py-3.5 px-4">Statutory Deductions (PF/Tax)</th>
                <th className="py-3.5 px-4">Net Disbursed</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {payrollList.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{p.employeeName}</div>
                    <div className="text-[10px] font-mono text-slate-400">{p.payrollCode}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{p.designation}</div>
                    <div className="text-[10px] text-slate-400">{p.department}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">
                    ₹{(p.basicSalary + p.hra + p.specialAllowance).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-red-600 font-semibold">
                    -₹{(p.pfDeduction + p.taxDeduction).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-700 text-sm">
                    ₹{p.netSalary.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full uppercase">
                      {p.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedPayslip(p)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] px-3 py-1.5 rounded-lg border border-blue-200 transition-colors flex items-center gap-1 ml-auto"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Payslip</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payslip View Modal */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-6 border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900">Official Payslip Statement</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl"
                  title="Print Payslip PDF"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button onClick={() => setSelectedPayslip(null)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Payslip Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-300 space-y-4 text-xs font-sans text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-300 pb-3">
                <div>
                  <h3 className="font-extrabold text-blue-700 text-base">KAMADENU HR CONSULTANCY</h3>
                  <p className="text-[10px] text-slate-500">Bengaluru HQ, Karnataka • HR & Recruitment Services</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-slate-900">{selectedPayslip.payrollCode}</p>
                  <p className="text-[10px] text-slate-500">Month: {selectedPayslip.month}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">Employee Name:</span>
                  <span className="font-bold text-slate-900">{selectedPayslip.employeeName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Employee Code:</span>
                  <span className="font-mono font-bold">{selectedPayslip.employeeCode}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Designation:</span>
                  <span className="font-semibold">{selectedPayslip.designation}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Bank Account:</span>
                  <span className="font-semibold">{selectedPayslip.bankAccount}</span>
                </div>
              </div>

              {/* Earnings & Deductions Table */}
              <div className="grid grid-cols-2 gap-4 border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-3 border-r border-slate-200 space-y-2">
                  <h4 className="font-bold text-emerald-800 bg-emerald-50 p-1.5 rounded text-[11px]">Earnings</h4>
                  <div className="flex justify-between"><span>Basic Salary:</span><span className="font-mono font-semibold">₹{selectedPayslip.basicSalary.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>House Rent Allowance (HRA):</span><span className="font-mono font-semibold">₹{selectedPayslip.hra.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>Special Allowance:</span><span className="font-mono font-semibold">₹{selectedPayslip.specialAllowance.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>Performance Bonus:</span><span className="font-mono font-semibold">₹{selectedPayslip.bonus.toLocaleString('en-IN')}</span></div>
                </div>

                <div className="p-3 space-y-2">
                  <h4 className="font-bold text-red-800 bg-red-50 p-1.5 rounded text-[11px]">Deductions</h4>
                  <div className="flex justify-between"><span>Provident Fund (PF):</span><span className="font-mono font-semibold">₹{selectedPayslip.pfDeduction.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>Income Tax (TDS):</span><span className="font-mono font-semibold">₹{selectedPayslip.taxDeduction.toLocaleString('en-IN')}</span></div>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Net Salary Disbursed</span>
                  <span className="text-lg font-black text-emerald-400">₹{selectedPayslip.netSalary.toLocaleString('en-IN')}</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold border border-emerald-500/30">
                  PAID ON {selectedPayslip.paymentDate}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedPayslip(null)}
                className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
              >
                Close Statement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
