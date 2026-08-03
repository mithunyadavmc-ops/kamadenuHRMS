import React, { useState } from 'react';
import { Folder, FileText, Download, Upload, ShieldCheck, Search, Plus } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const [docs, setDocs] = useState([
    { id: '1', title: 'Kamadenu Employee Handbook 2026.pdf', category: 'HR Policies', size: '2.4 MB', date: '2026-01-15' },
    { id: '2', title: 'Infosys Master Services Agreement (MSA).pdf', category: 'Client Contracts', size: '5.1 MB', date: '2026-03-10' },
    { id: '3', title: 'TCS Master Talent SLA Terms.pdf', category: 'Client Contracts', size: '3.8 MB', date: '2026-02-22' },
    { id: '4', title: 'Indian Labor Law Statutory Compliance Matrix.pdf', category: 'Compliance', size: '1.2 MB', date: '2026-04-01' },
    { id: '5', title: 'Standard Offer Letter Template.docx', category: 'Templates', size: '450 KB', date: '2026-05-18' }
  ]);
  const [search, setSearch] = useState('');

  const filtered = docs.filter(d => d.title.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Folder className="w-5 h-5 text-blue-600" />
            Document Vault & Compliance Vault
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Secure cloud storage for client contracts, employee handbooks, NDA agreements & SLAs.
          </p>
        </div>

        <button
          onClick={() => {
            const title = prompt('Document Title:');
            if (title) {
              setDocs([
                ...docs,
                { id: Date.now().toString(), title, category: 'General', size: '1.5 MB', date: new Date().toISOString().split('T')[0] }
              ]);
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
          id="upload-doc-btn"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search document title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 text-slate-800 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
            id="docs-search-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded">
                  {d.category}
                </span>
                <span className="text-[10px] text-slate-400">{d.size}</span>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="w-8 h-8 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 leading-snug">{d.title}</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Uploaded on {d.date}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>

              <button
                onClick={() => alert(`Downloading ${d.title}...`)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
