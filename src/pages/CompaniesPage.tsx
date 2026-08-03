import React, { useState, useEffect } from 'react';
import { Building2, Search, Plus, Mail, Phone, Globe, MapPin, Briefcase, Users, X } from 'lucide-react';
import { apiService } from '../services/api';
import { ClientCompany } from '../types';
import { KamadhenuLogo } from '../components/layout/KamadhenuLogo';

export const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<ClientCompany[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Bengaluru');

  const fetchCompanies = () => {
    apiService.getCompanies().then(res => setCompanies(res.companies));
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    apiService.createCompany({
      name,
      industry,
      contactPerson,
      contactDesignation: 'Director HR',
      email,
      phone,
      location,
      contractStatus: 'active',
      activeJobsCount: 0,
      totalHires: 0
    }).then(() => {
      setShowAddModal(false);
      fetchCompanies();
      alert('Client partner onboarded successfully!');
    });
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Official Agency Brand Overview Card */}
      <KamadhenuLogo variant="full" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Corporate Client Partners
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enterprise clients serviced by Kamadenu HR Consultancy.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
          id="add-company-btn"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Company</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {companies.map((comp) => (
          <div
            key={comp.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={comp.logoUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=250&q=80'}
                  alt={comp.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100"
                />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{comp.name}</h3>
                  <p className="text-xs text-slate-500">{comp.industry}</p>
                </div>
              </div>

              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-1 rounded-full uppercase">
                {comp.contractStatus} Partner
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl text-xs text-slate-700 border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px]">Primary Contact:</span>
                <span className="font-bold text-slate-900">{comp.contactPerson}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Location:</span>
                <span className="font-semibold">{comp.location}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Email:</span>
                <span className="font-semibold text-blue-600">{comp.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Phone:</span>
                <span className="font-semibold">{comp.phone}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-xl">
                  {comp.activeJobsCount} Active Mandates
                </span>
                <span className="bg-teal-50 text-teal-700 font-bold px-3 py-1 rounded-xl">
                  {comp.totalHires} Total Placements
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900">Add Corporate Client Partner</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCompany} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  placeholder="e.g. Oracle India"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Industry Vertical</label>
                <input
                  type="text"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  placeholder="e.g. Cloud Software & Enterprise IT"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Lead Contact Person</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  placeholder="e.g. Ramesh Chandra"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white font-bold px-5 py-2 rounded-xl">
                  Save Client Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
