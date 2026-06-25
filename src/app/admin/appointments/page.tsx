"use client";

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  Calendar, Filter, Search, Plus, MoreVertical, Edit2, Trash2, CheckCircle, XCircle,
  ArrowUp, ArrowDown, Eye, Clock, Heart, Brain, Bone, Activity, Stethoscope, ChevronDown
} from 'lucide-react';

const generateFakeAppointments = (count: number) => {
  const depts = [
    { name: 'Cardiology', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
    { name: 'Neurology', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-50' },
    { name: 'Orthopedics', icon: Bone, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Dermatology', icon: Activity, color: 'text-teal-500', bg: 'bg-teal-50' }
  ];
  const doctors = [
    { name: 'Dr. Sarah Khan', qual: 'MBBS, FCPS', avatar: '11' },
    { name: 'Dr. Usman Ali', qual: 'MBBS, MD', avatar: '12' },
    { name: 'Dr. Maria Ahmed', qual: 'MBBS, MS', avatar: '13' },
    { name: 'Dr. Hamza Qureshi', qual: 'MBBS, MD', avatar: '14' }
  ];
  const statuses = ['Confirmed', 'Pending', 'Cancelled', 'Completed'];
  const payments = ['Paid', 'Unpaid', 'Refunded'];
  const firstNames = ['Ali', 'Fatima', 'Ahmed', 'Ayesha', 'Bilal', 'Hina', 'Usman', 'Sana', 'Omar', 'Zainab'];
  const lastNames = ['Raza', 'Noor', 'Hassan', 'Malik', 'Ahmed', 'Tariq', 'Khan', 'Javed', 'Ali', 'Shah'];

  const dates = ['May 20, 2024', 'May 21, 2024', 'May 22, 2024', 'May 23, 2024', 'May 24, 2024', 'May 25, 2024', 'May 26, 2024', 'May 27, 2024'];
  const times = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '04:00 PM'];

  const records = [];
  for (let i = 1; i <= count; i++) {
    const doc = doctors[Math.floor(Math.random() * doctors.length)];
    const dept = depts[Math.floor(Math.random() * depts.length)];
    const fname = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lname = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    records.push({
      id: `#APT-${(100 + i).toString().padStart(5, '0')}`,
      patient: `${fname} ${lname}`,
      phone: `+92 30${Math.floor(Math.random() * 9)} ${Math.floor(1000000 + Math.random() * 9000000)}`,
      pAvatar: `https://i.pravatar.cc/150?u=${i}`,
      doctor: doc.name,
      docQual: doc.qual,
      dAvatar: `https://i.pravatar.cc/150?u=${doc.avatar}`,
      dept: dept.name,
      deptIcon: dept.icon,
      deptColor: dept.color,
      deptBg: dept.bg,
      date: dates[Math.floor(Math.random() * dates.length)],
      time: times[Math.floor(Math.random() * times.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      payment: payments[Math.floor(Math.random() * payments.length)]
    });
  }
  return records.reverse();
};

const initialAppointments = generateFakeAppointments(100);

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>(initialAppointments);
  const [activeTab, setActiveTab] = useState('All Appointments');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingAppointment, setViewingAppointment] = useState<any>(null);

  const filteredAppointments = appointments.filter(app => {
    // Tab filter
    if (activeTab !== 'All Appointments') {
      if (activeTab === 'Today' && app.date !== 'May 26, 2024') return false;
      if (activeTab === 'Upcoming' && app.date !== 'May 27, 2024') return false;
      if (activeTab === 'Completed' && app.status !== 'Completed' && app.status !== 'Confirmed') return false;
      if (activeTab === 'Cancelled' && app.status !== 'Cancelled') return false;
    }

    // Department filter
    if (selectedDept !== 'All' && app.dept !== selectedDept) return false;

    // Doctor filter
    if (selectedDoctor !== 'All' && app.doctor !== selectedDoctor) return false;

    // Search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchPatient = app.patient.toLowerCase().includes(query);
      const matchId = app.id.toLowerCase().includes(query);
      const matchDoctor = app.doctor.toLowerCase().includes(query);
      if (!matchPatient && !matchId && !matchDoctor) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = () => {
    if (deletingId) {
      setAppointments(appointments.filter(a => a.id !== deletingId));
      setDeletingId(null);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const doctorName = formData.get('doctor') as string;
    
    // Pick avatar logic based on existing structure
    let dAvatar = 'https://i.pravatar.cc/150?u=11';
    let docQual = 'MBBS';
    if (doctorName === 'Dr. Usman Ali') dAvatar = 'https://i.pravatar.cc/150?u=12';
    if (doctorName === 'Dr. Maria Ahmed') dAvatar = 'https://i.pravatar.cc/150?u=13';
    
    let deptName = formData.get('dept') as string;
    let deptIcon = Heart;
    let deptColor = 'text-red-500';
    let deptBg = 'bg-red-50';
    if (deptName === 'Neurology') { deptIcon = Brain; deptColor = 'text-purple-500'; deptBg = 'bg-purple-50'; }
    if (deptName === 'Orthopedics') { deptIcon = Bone; deptColor = 'text-blue-500'; deptBg = 'bg-blue-50'; }
    if (deptName === 'Dermatology') { deptIcon = Activity; deptColor = 'text-teal-500'; deptBg = 'bg-teal-50'; }

    const updatedData = {
      patient: formData.get('patient') as string,
      phone: formData.get('phone') as string,
      doctor: doctorName,
      docQual, dAvatar,
      dept: deptName, deptIcon, deptColor, deptBg,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      status: formData.get('status') as string,
      payment: formData.get('payment') as string,
    };

    if (editingAppointment) {
      setAppointments(appointments.map(a => a.id === editingAppointment.id ? { ...a, ...updatedData } : a));
      setEditingAppointment(null);
    } else {
      const newId = `#APT-${Math.floor(10000 + Math.random() * 90000)}`;
      setAppointments([{ id: newId, pAvatar: 'https://i.pravatar.cc/150?u=99', ...updatedData }, ...appointments]);
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col pl-[260px]">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="w-full space-y-6">
            
            {/* Top Bar: Date Picker & Button */}
            <div className="flex justify-end items-center gap-4">
              <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm whitespace-nowrap">
                <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">May 20, 2024 - May 26, 2024</span>
                <ArrowDown className="w-3 h-3 text-gray-400 ml-2" />
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center px-4 py-2 bg-[#5e35b1] text-white rounded-lg hover:bg-[#512da8] transition-colors text-sm font-medium shadow-md whitespace-nowrap"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Appointments */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium whitespace-nowrap">Total Appointments</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">1,248</p>
                  <div className="flex items-center mt-2 text-xs whitespace-nowrap">
                    <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">12.5%</span>
                    <span className="text-gray-400 ml-1">from last week</span>
                  </div>
                </div>
              </div>

              {/* Confirmed */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium whitespace-nowrap">Confirmed</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">876</p>
                  <div className="flex items-center mt-2 text-xs whitespace-nowrap">
                    <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">70.2%</span>
                    <span className="text-gray-400 ml-1">of total</span>
                  </div>
                </div>
              </div>

              {/* Pending */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium whitespace-nowrap">Pending</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">236</p>
                  <div className="flex items-center mt-2 text-xs whitespace-nowrap">
                    <ArrowUp className="w-3 h-3 text-orange-500 mr-1" />
                    <span className="text-orange-500 font-medium">18.9%</span>
                    <span className="text-gray-400 ml-1">of total</span>
                  </div>
                </div>
              </div>

              {/* Cancelled */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                  <XCircle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium whitespace-nowrap">Cancelled</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">136</p>
                  <div className="flex items-center mt-2 text-xs whitespace-nowrap">
                    <ArrowDown className="w-3 h-3 text-red-500 mr-1" />
                    <span className="text-red-500 font-medium">10.9%</span>
                    <span className="text-gray-400 ml-1">of total</span>
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
                  {['All Appointments', 'Today', 'Upcoming', 'Completed', 'Cancelled'].map(tab => (
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
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-1.5 border border-gray-200 rounded-md text-[11px] md:text-[12px] font-semibold text-[#475569] bg-white hover:bg-gray-50 outline-none focus:ring-[#5e35b1] focus:border-[#5e35b1] transition-all cursor-pointer"
                    >
                      <option value="All">All Departments</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Dermatology">Dermatology</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-1.5 border border-gray-200 rounded-md text-[11px] md:text-[12px] font-semibold text-[#475569] bg-white hover:bg-gray-50 outline-none focus:ring-[#5e35b1] focus:border-[#5e35b1] transition-all cursor-pointer"
                    >
                      <option value="All">All Doctors</option>
                      <option value="Dr. Sarah Khan">Dr. Sarah Khan</option>
                      <option value="Dr. Usman Ali">Dr. Usman Ali</option>
                      <option value="Dr. Maria Ahmed">Dr. Maria Ahmed</option>
                      <option value="Dr. Hamza Qureshi">Dr. Hamza Qureshi</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedDept('All');
                      setSelectedDoctor('All');
                      setSearchQuery('');
                      setActiveTab('All Appointments');
                    }}
                    className="px-2.5 py-1.5 border border-gray-200 rounded-md text-[11px] md:text-[12px] font-semibold text-[#475569] flex items-center bg-white hover:bg-gray-50 whitespace-nowrap transition-colors"
                  >
                    <Filter className="w-3 h-3 mr-1.5 text-[#475569]" />
                    {selectedDept !== 'All' || selectedDoctor !== 'All' || searchQuery !== '' ? 'Clear Filters' : 'Filters'}
                  </button>
                  <div className="relative shrink-0">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
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
                      <th className="px-4 py-3 rounded-l-lg">#</th>
                      <th className="px-4 py-3">Patient</th>
                      <th className="px-4 py-3">Doctor</th>
                      <th className="px-4 py-3">Department</th>
                      <th className="px-4 py-3">Date & Time</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Payment</th>
                      <th className="px-4 py-3 text-center rounded-r-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {paginatedAppointments.length > 0 ? (
                      paginatedAppointments.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-50/50 hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-4 text-xs font-semibold text-gray-500">{item.id}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <img src={item.pAvatar} alt={item.patient} className="w-9 h-9 rounded-full mr-3 object-cover shadow-sm" />
                              <div>
                                <div className="font-bold text-gray-800 text-[13px]">{item.patient}</div>
                                <div className="text-[11px] text-gray-500">{item.phone}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <img src={item.dAvatar} alt={item.doctor} className="w-9 h-9 rounded-full mr-3 object-cover shadow-sm" />
                              <div>
                                <div className="font-bold text-gray-800 text-[13px]">{item.doctor}</div>
                                <div className="text-[11px] text-gray-500">{item.docQual}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <div className={`w-7 h-7 rounded-full ${item.deptBg} flex items-center justify-center mr-2`}>
                                <item.deptIcon className={`w-3.5 h-3.5 ${item.deptColor}`} />
                              </div>
                              <span className="font-medium text-gray-600 text-[13px]">{item.dept}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-1 text-[12px]">
                              <div className="flex items-center text-gray-600 font-medium">
                                <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> {item.date}
                              </div>
                              <div className="flex items-center text-gray-500">
                                <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> {item.time}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold ${
                              item.status === 'Confirmed' ? 'bg-green-50 text-green-500' :
                              item.status === 'Pending' ? 'bg-orange-50 text-orange-500' :
                              'bg-red-50 text-red-500'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`text-[12px] font-bold ${
                              item.payment === 'Paid' ? 'text-green-500 bg-green-50/50 px-2.5 py-1 rounded-full' :
                              item.payment === 'Unpaid' ? 'text-red-500 bg-red-50/50 px-2.5 py-1 rounded-full' :
                              'text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full'
                            }`}>
                              {item.payment}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-center gap-1.5">
                              <button 
                                onClick={() => setViewingAppointment(item)}
                                className="p-1.5 text-[#5e35b1] hover:bg-[#f3e8ff] border border-[#f3e8ff] rounded-md transition-colors" title="View"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => setEditingAppointment(item)}
                                className="p-1.5 text-blue-500 hover:bg-blue-50 border border-blue-50 rounded-md transition-colors" title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => setDeletingId(item.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 border border-red-50 rounded-md transition-colors" title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-gray-500 font-medium">
                          No appointments found for the selected tab.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-700">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-gray-700">{Math.min(currentPage * itemsPerPage, filteredAppointments.length)}</span> of <span className="font-medium text-gray-700">{filteredAppointments.length}</span> entries
                </div>
                <div className="flex gap-1 items-center">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50 disabled:opacity-50"
                  >
                    &lt;
                  </button>
                  
                  {/* Dynamic Page Numbers (Simplified for 100 items) */}
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
        </main>
      </div>

      {/* Modals */}
      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Appointment</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete appointment {deletingId}? This action cannot be undone.</p>
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
      {viewingAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Appointment Details
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">{viewingAppointment.id}</span>
              </h3>
              <button 
                onClick={() => setViewingAppointment(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-6">
              
              {/* Profiles */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Patient</p>
                  <div className="flex items-center gap-3">
                    <img src={viewingAppointment.pAvatar} alt="Patient" className="w-10 h-10 rounded-full object-cover shadow-sm" />
                    <div>
                      <p className="font-bold text-sm text-gray-900">{viewingAppointment.patient}</p>
                      <p className="text-xs text-gray-500">{viewingAppointment.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Doctor</p>
                  <div className="flex items-center gap-3">
                    <img src={viewingAppointment.dAvatar} alt="Doctor" className="w-10 h-10 rounded-full object-cover shadow-sm" />
                    <div>
                      <p className="font-bold text-sm text-gray-900">{viewingAppointment.doctor}</p>
                      <p className="text-xs text-gray-500">{viewingAppointment.dept}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 px-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date & Time</p>
                  <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {viewingAppointment.date} at {viewingAppointment.time}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Department</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${viewingAppointment.deptBg} flex items-center justify-center`}>
                      <viewingAppointment.deptIcon className={`w-3 h-3 ${viewingAppointment.deptColor}`} />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{viewingAppointment.dept}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${
                    viewingAppointment.status === 'Confirmed' ? 'bg-green-50 text-green-500' :
                    viewingAppointment.status === 'Pending' ? 'bg-orange-50 text-orange-500' :
                    'bg-red-50 text-red-500'
                  }`}>
                    {viewingAppointment.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Payment</p>
                  <span className={`text-xs font-bold ${
                    viewingAppointment.payment === 'Paid' ? 'text-green-500 bg-green-50/50 px-2.5 py-1 rounded-full' :
                    viewingAppointment.payment === 'Unpaid' ? 'text-red-500 bg-red-50/50 px-2.5 py-1 rounded-full' :
                    'text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full'
                  }`}>
                    {viewingAppointment.payment}
                  </span>
                </div>
              </div>
              
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setViewingAppointment(null)}
                className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {(isAddModalOpen || editingAppointment) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {editingAppointment ? 'Edit Appointment' : 'New Appointment'}
              </h3>
              <button 
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingAppointment(null);
                }}
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Patient Name</label>
                  <input required name="patient" defaultValue={editingAppointment?.patient || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm" placeholder="e.g. Ali Raza" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input required name="phone" defaultValue={editingAppointment?.phone || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm" placeholder="e.g. +92 300 1234567" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Department</label>
                  <select required name="dept" defaultValue={editingAppointment?.dept || 'Cardiology'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm">
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Dermatology">Dermatology</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Doctor</label>
                  <select required name="doctor" defaultValue={editingAppointment?.doctor || 'Dr. Sarah Khan'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm">
                    <option value="Dr. Sarah Khan">Dr. Sarah Khan</option>
                    <option value="Dr. Usman Ali">Dr. Usman Ali</option>
                    <option value="Dr. Maria Ahmed">Dr. Maria Ahmed</option>
                    <option value="Dr. Hamza Qureshi">Dr. Hamza Qureshi</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <input required type="text" name="date" defaultValue={editingAppointment?.date || 'May 28, 2024'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm" placeholder="e.g. May 26, 2024" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Time</label>
                  <input required type="text" name="time" defaultValue={editingAppointment?.time || '10:00 AM'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm" placeholder="e.g. 10:00 AM" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <select required name="status" defaultValue={editingAppointment?.status || 'Pending'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm">
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Payment</label>
                  <select required name="payment" defaultValue={editingAppointment?.payment || 'Unpaid'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm">
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
                <button 
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingAppointment(null);
                  }}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 text-sm font-medium text-white bg-[#5e35b1] hover:bg-[#512da8] rounded-xl transition-colors shadow-md"
                >
                  {editingAppointment ? 'Save Changes' : 'Create Appointment'}
                </button>
              </div>
            </form>
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
    </div>
  );
}
