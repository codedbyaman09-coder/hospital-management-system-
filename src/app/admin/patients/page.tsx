/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import { 
  Users, Filter, Search, Plus, Edit2, Trash2, XCircle,
  ArrowUp, ArrowDown, Eye, Activity, UserPlus, AlertCircle, ChevronDown, Droplet, Clock
} from 'lucide-react';
import NewPatientForm from './NewPatientForm';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateFakePatients = (count: number) => {
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female'];
  const statuses = ['Active', 'Inactive', 'Critical'];
  
  const maleFirstNames = ['Ali', 'Ahmed', 'Bilal', 'Usman', 'Omar', 'Hamza', 'Hassan', 'Zain', 'Saad'];
  const femaleFirstNames = ['Fatima', 'Ayesha', 'Hina', 'Sana', 'Zainab', 'Sara', 'Khadija', 'Maryam', 'Nida'];
  const lastNames = ['Raza', 'Noor', 'Hassan', 'Malik', 'Ahmed', 'Tariq', 'Khan', 'Javed', 'Ali', 'Shah'];

  const dates = ['May 20, 2024', 'May 21, 2024', 'May 22, 2024', 'May 23, 2024', 'May 24, 2024', 'May 25, 2024', 'May 26, 2024', 'May 27, 2024'];

  const records: Patient[] = [];
  for (let i = 1; i <= count; i++) {
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const fname = gender === 'Male' 
      ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
      : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
    const lname = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    records.push({
      id: `#PAT-${(100 + i).toString().padStart(5, '0')}`,
      name: `${fname} ${lname}`,
      email: `${fname.toLowerCase()}.${lname.toLowerCase()}@example.com`,
      phone: `+92 30${Math.floor(Math.random() * 9)} ${Math.floor(1000000 + Math.random() * 9000000)}`,
      avatar: `https://i.pravatar.cc/150?u=${i + 200}`,
      gender: gender,
      age: Math.floor(18 + Math.random() * 60),
      bloodGroup: bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
      lastVisit: dates[Math.floor(Math.random() * dates.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return records.reverse();
};

export interface Patient {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  gender: string;
  age: number;
  bloodGroup: string;
  lastVisit: string;
  status: string;
}

// Fake patient data kept for reference but not used (data comes from API)
// const _initialPatients = generateFakePatients(100);

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [activeTab, setActiveTab] = useState('All Patients');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [, setLoading] = useState(true);
  const itemsPerPage = 8;

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null);

  React.useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch('/api/admin/patients');
        const json = await res.json();
        if (json.success) setPatients(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient => {
    // Tab filter
    if (activeTab !== 'All Patients') {
      if (activeTab === 'Active' && patient.status !== 'Active') return false;
      if (activeTab === 'Inactive' && patient.status !== 'Inactive') return false;
      if (activeTab === 'Critical' && patient.status !== 'Critical') return false;
      if (activeTab === 'New' && patient.lastVisit !== 'May 27, 2024') return false;
    }

    // Blood Group filter
    if (selectedBloodGroup !== 'All' && patient.bloodGroup !== selectedBloodGroup) return false;

    // Gender filter
    if (selectedGender !== 'All' && patient.gender !== selectedGender) return false;

    // Search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const patientId = patient._id || patient.id;
      const matchName = patient.name.toLowerCase().includes(query);
      const matchId = patientId?.toLowerCase().includes(query);
      const matchPhone = patient.phone.toLowerCase().includes(query);
      if (!matchName && !matchId && !matchPhone) return false;
    }

    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / itemsPerPage));
  const paginatedPatients = filteredPatients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = () => {
    if (deletingId) {
      setPatients(patients.filter((p) => p._id !== deletingId && p.id !== deletingId));
      setDeletingId(null);
    }
  };


  return (
    <main className={`flex-1 overflow-y-auto custom-scrollbar w-full ${(isAddModalOpen || editingPatient) ? 'p-0' : 'p-4 sm:p-6'}`}>
      {(isAddModalOpen || editingPatient) ? (
        <NewPatientForm
          initialData={editingPatient}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingPatient(null);
          }}
          onCreated={(data) => {
            if (editingPatient) {
              setPatients(patients.map(p => (p._id || p.id) === (editingPatient._id || editingPatient.id) ? { ...p, ...data } : p));
            } else {
              setPatients([data, ...patients]);
            }
            setIsAddModalOpen(false);
            setEditingPatient(null);
          }}
        />
      ) : (
        <div className="w-full space-y-6">
            
            {/* Top Bar: Button */}
            <div className="flex justify-end items-center gap-4">
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center px-4 py-2 bg-[#5e35b1] text-white rounded-lg hover:bg-[#512da8] transition-colors text-sm font-medium shadow-md whitespace-nowrap"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Patient
              </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Patients */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium whitespace-nowrap">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">4,842</p>
                  <div className="flex items-center mt-2 text-xs whitespace-nowrap">
                    <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">8.5%</span>
                    <span className="text-gray-400 ml-1">from last month</span>
                  </div>
                </div>
              </div>

              {/* Active Patients */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                  <Activity className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium whitespace-nowrap">Active</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">3,124</p>
                  <div className="flex items-center mt-2 text-xs whitespace-nowrap">
                    <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">12.2%</span>
                    <span className="text-gray-400 ml-1">of total</span>
                  </div>
                </div>
              </div>

              {/* New Patients */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                  <UserPlus className="w-6 h-6 text-indigo-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium whitespace-nowrap">New Patients</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">156</p>
                  <div className="flex items-center mt-2 text-xs whitespace-nowrap">
                    <ArrowUp className="w-3 h-3 text-indigo-500 mr-1" />
                    <span className="text-indigo-500 font-medium">4.9%</span>
                    <span className="text-gray-400 ml-1">this week</span>
                  </div>
                </div>
              </div>

              {/* Critical Patients */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium whitespace-nowrap">Critical</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">42</p>
                  <div className="flex items-center mt-2 text-xs whitespace-nowrap">
                    <ArrowDown className="w-3 h-3 text-red-500 mr-1" />
                    <span className="text-red-500 font-medium">2.4%</span>
                    <span className="text-gray-400 ml-1">of active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Table Area */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] w-full overflow-hidden">
              
              {/* Tabs and Filters */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 py-3 border-b border-gray-100 gap-3 bg-white">
                {/* Tabs */}
                <div className="flex gap-3 md:gap-5 w-full lg:w-auto overflow-x-auto custom-scrollbar pb-1 lg:pb-0">
                  {['All Patients', 'Active', 'Inactive', 'New', 'Critical'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[12px] font-semibold transition-colors whitespace-nowrap ${
                        activeTab === tab ? 'text-[#5e35b1]' : 'text-[#475569] hover:text-[#1e293b]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto custom-scrollbar pb-1 lg:pb-0">
                  <div className="relative">
                    <select
                      value={selectedBloodGroup}
                      onChange={(e) => setSelectedBloodGroup(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-1.5 border border-gray-200 rounded-md text-[11px] md:text-[12px] font-semibold text-[#475569] bg-white hover:bg-gray-50 outline-none focus:ring-[#5e35b1] focus:border-[#5e35b1] transition-all cursor-pointer"
                    >
                      <option value="All">All Blood Groups</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-1.5 border border-gray-200 rounded-md text-[11px] md:text-[12px] font-semibold text-[#475569] bg-white hover:bg-gray-50 outline-none focus:ring-[#5e35b1] focus:border-[#5e35b1] transition-all cursor-pointer"
                    >
                      <option value="All">All Genders</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedBloodGroup('All');
                      setSelectedGender('All');
                      setSearchQuery('');
                      setActiveTab('All Patients');
                    }}
                    className="px-2.5 py-1.5 border border-gray-200 rounded-md text-[11px] md:text-[12px] font-semibold text-[#475569] flex items-center bg-white hover:bg-gray-50 whitespace-nowrap transition-colors"
                  >
                    <Filter className="w-3 h-3 mr-1.5 text-[#475569]" />
                    {selectedBloodGroup !== 'All' || selectedGender !== 'All' || searchQuery !== '' ? 'Clear Filters' : 'Filters'}
                  </button>
                  <div className="relative shrink-0">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search patients..."
                      className="pl-3 pr-7 py-1.5 border border-gray-200 rounded-md text-[11px] md:text-[12px] font-medium text-gray-700 placeholder-gray-400 focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none w-32 sm:w-40 md:w-48 bg-white transition-all"
                    />
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <Search className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto p-4">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 font-bold bg-gray-50 rounded-lg border-b-4 border-white">
                    <tr>
                      <th className="px-4 py-3 rounded-l-lg">ID</th>
                      <th className="px-4 py-3">Patient</th>
                      <th className="px-4 py-3">Contact</th>
                      <th className="px-4 py-3">Age & Gender</th>
                      <th className="px-4 py-3">Blood Group</th>
                      <th className="px-4 py-3">Last Visit</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-center rounded-r-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {paginatedPatients.length > 0 ? (
                      paginatedPatients.map((item) => {
                        const itemId = item._id || item.id;
                        return (
                        <tr key={itemId} className="border-b border-gray-50/50 hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-4 text-xs font-semibold text-gray-500">{itemId?.toString().slice(-6) || 'NEW'}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <img src={item.avatar || 'https://i.pravatar.cc/150?u=999'} alt={item.name} className="w-9 h-9 rounded-full mr-3 object-cover shadow-sm" />
                              <div>
                                <div className="font-bold text-gray-800 text-[13px]">{item.name}</div>
                                <div className="text-[11px] text-gray-500">{item.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="font-medium text-gray-600 text-[12px]">{item.phone}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="font-medium text-gray-600 text-[13px]">{item.age} yrs, {item.gender}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center mr-2">
                                <Droplet className="w-3 h-3 text-red-500" />
                              </div>
                              <span className="font-bold text-gray-700 text-[12px]">{item.bloodGroup}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                             <div className="flex items-center text-gray-600 font-medium text-[12px]">
                                <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> {item.lastVisit}
                              </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold ${
                              item.status === 'Active' ? 'bg-green-50 text-green-500' :
                              item.status === 'Inactive' ? 'bg-gray-100 text-gray-500' :
                              'bg-red-50 text-red-500'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-center gap-1.5">
                              <button 
                                onClick={() => setViewingPatient(item)}
                                className="p-1.5 text-[#5e35b1] hover:bg-[#f3e8ff] border border-[#f3e8ff] rounded-md transition-colors" title="View"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => setEditingPatient(item)}
                                className="p-1.5 text-blue-500 hover:bg-blue-50 border border-blue-50 rounded-md transition-colors" title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => setDeletingId(itemId || null)}
                                className="p-1.5 text-red-500 hover:bg-red-50 border border-red-50 rounded-md transition-colors" title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )})
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-gray-500 font-medium">
                          No patients found for the selected tab.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-700">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-gray-700">{Math.min(currentPage * itemsPerPage, filteredPatients.length)}</span> of <span className="font-medium text-gray-700">{filteredPatients.length}</span> entries
                </div>
                <div className="flex gap-1 items-center">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50 disabled:opacity-50"
                  >
                    &lt;
                  </button>
                  
                  {/* Dynamic Page Numbers */}
                  {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                    let pageNum = idx + 1;
                    if (currentPage > 3 && totalPages > 5) {
                      pageNum = currentPage - 2 + idx;
                      if (pageNum > totalPages) pageNum = totalPages - (4 - idx);
                    }
                    return (
                      <button 
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center border rounded-md font-medium text-sm ${currentPage === pageNum ? 'bg-[#5e35b1] text-white border-transparent shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="px-1 text-gray-400">...</span>
                      <button 
                        onClick={() => setCurrentPage(totalPages)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 text-sm"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  <button 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50 disabled:opacity-50"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>

          </div>
      )}

      {/* Modals */}
      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Patient</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete patient {deletingId}? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewingPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Patient Details
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">{viewingPatient.id}</span>
              </h3>
              <button 
                onClick={() => setViewingPatient(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-6">
              
              {/* Profiles */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                <img src={viewingPatient.avatar} alt="Patient" className="w-16 h-16 rounded-full object-cover shadow-sm border-2 border-white" />
                <div>
                  <h4 className="font-bold text-lg text-gray-900">{viewingPatient.name}</h4>
                  <p className="text-sm text-gray-500">{viewingPatient.email}</p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 px-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                  <p className="text-sm font-semibold text-gray-800">{viewingPatient.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Age & Gender</p>
                  <p className="text-sm font-semibold text-gray-800">{viewingPatient.age} years, {viewingPatient.gender}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Blood Group</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                      <Droplet className="w-3 h-3 text-red-500" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{viewingPatient.bloodGroup}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Last Visit</p>
                  <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {viewingPatient.lastVisit}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${
                    viewingPatient.status === 'Active' ? 'bg-green-50 text-green-500' :
                    viewingPatient.status === 'Inactive' ? 'bg-gray-100 text-gray-500' :
                    'bg-red-50 text-red-500'
                  }`}>
                    {viewingPatient.status}
                  </span>
                </div>
              </div>
              
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setViewingPatient(null)}
                className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #94a3b8;
        }
      `}} />
    </main>
  );
}
