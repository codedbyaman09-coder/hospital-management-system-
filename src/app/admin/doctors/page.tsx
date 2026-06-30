/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import NewDoctorForm from './NewDoctorForm';
import { 
  Plus, Eye, Edit2, Trash2, XCircle,
  ArrowUp, Stethoscope, Briefcase, Clock, CheckCircle, Upload
} from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateFakeDoctors = (count: number) => {
  const depts = ['Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 'Pediatrics', 'Oncology'];
  const statuses = ['Active', 'On Leave', 'Left'];
  const qualifications = ['MBBS, MD', 'MBBS, FCPS', 'MBBS, MS', 'MBBS, DO'];
  
  const maleFirstNames = ['Usman', 'Ali', 'Hamza', 'Bilal', 'Omar', 'Hassan'];
  const femaleFirstNames = ['Sarah', 'Maria', 'Ayesha', 'Fatima', 'Zainab'];
  const lastNames = ['Khan', 'Ali', 'Ahmed', 'Qureshi', 'Raza', 'Malik', 'Shah'];

  const records: Doctor[] = [];
  for (let i = 1; i <= count; i++) {
    const isMale = Math.random() > 0.5;
    const fname = isMale 
      ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
      : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
    const lname = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    records.push({
      id: `#DOC-${(100 + i).toString().padStart(5, '0')}`,
      name: `Dr. ${fname} ${lname}`,
      email: `dr.${fname.toLowerCase()}.${lname.toLowerCase()}@citycare.com`,
      phone: `+92 30${Math.floor(Math.random() * 9)} ${Math.floor(1000000 + Math.random() * 9000000)}`,
      avatar: `https://i.pravatar.cc/150?u=${i + 300}`,
      dept: depts[Math.floor(Math.random() * depts.length)],
      qual: qualifications[Math.floor(Math.random() * qualifications.length)],
      experience: Math.floor(2 + Math.random() * 20),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return records.reverse();
};

export interface Doctor {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  dept: string;
  qual: string;
  experience: number;
  status: string;
}

// Fake doctor data kept for reference but not used (data comes from API)
// const _initialDoctors = generateFakeDoctors(50);

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [activeTab, setActiveTab] = useState('All Doctors');
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [, setLoading] = useState(true);
  const itemsPerPage = 8;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingDoctor, setViewingDoctor] = useState<Doctor | null>(null);
  const [avatarBase64, setAvatarBase64] = useState<string>('');

  React.useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('/api/admin/doctors');
        const json = await res.json();
        if (json.success) setDoctors(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doc => {
    if (activeTab !== 'All Doctors') {
      if (activeTab === 'Active' && doc.status !== 'Active') return false;
      if (activeTab === 'On Leave' && doc.status !== 'On Leave') return false;
      if (activeTab === 'Left' && doc.status !== 'Left') return false;
    }
    if (selectedDept !== 'All' && doc.dept !== selectedDept) return false;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const docId = doc._id || doc.id;
      if (!doc.name.toLowerCase().includes(query) && !docId?.toLowerCase().includes(query)) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredDoctors.length / itemsPerPage));
  const paginatedDoctors = filteredDoctors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = () => {
    if (deletingId) {
      setDoctors(doctors.filter((d) => d._id !== deletingId && d.id !== deletingId));
      setDeletingId(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const updatedData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      dept: formData.get('dept') as string,
      qual: formData.get('qual') as string,
      experience: parseInt(formData.get('experience') as string),
      status: formData.get('status') as string,
      avatar: avatarBase64 || editingDoctor?.avatar || `https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 1000)}`,
    };

    if (editingDoctor) {
      const editId = editingDoctor._id || editingDoctor.id;
      setDoctors(doctors.map((d) => (d._id || d.id) === editId ? { ...d, ...updatedData } : d));
      setEditingDoctor(null);
      setAvatarBase64('');
    } else {
      try {
        const res = await fetch('/api/admin/doctors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData)
        });
        const json = await res.json();
        if (json.success) {
          setDoctors([json.data, ...doctors]);
        }
      } catch (err) {
        console.error(err);
      }
      setIsAddModalOpen(false);
      setAvatarBase64('');
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar w-full">
      <div className="w-full space-y-6">
        <div className="flex justify-end items-center gap-4">
          <button onClick={() => { setIsAddModalOpen(true); setAvatarBase64(''); }} className="flex items-center px-4 py-2 bg-[#5e35b1] text-white rounded-lg hover:bg-[#512da8] transition-colors text-sm font-medium shadow-md">
            <Plus className="w-4 h-4 mr-2" /> New Doctor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Doctors</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">154</p>
              <div className="flex items-center mt-2 text-xs"><ArrowUp className="w-3 h-3 text-green-500 mr-1" /><span className="text-green-500 font-medium">2 new</span></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Doctors</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">142</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">On Leave</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">8</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Specialties</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] w-full overflow-hidden">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 py-3 border-b border-gray-100 gap-3 bg-white">
            <div className="flex gap-3 md:gap-5 w-full lg:w-auto overflow-x-auto custom-scrollbar pb-1 lg:pb-0">
              {['All Doctors', 'Active', 'On Leave', 'Left'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`text-[12px] font-semibold transition-colors whitespace-nowrap ${activeTab === tab ? 'text-[#5e35b1]' : 'text-[#475569] hover:text-[#1e293b]'}`}>{tab}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto custom-scrollbar pb-1 lg:pb-0">
              <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="appearance-none pl-3 pr-8 py-1.5 border border-gray-200 rounded-md text-[12px] font-semibold text-[#475569] outline-none focus:ring-[#5e35b1] focus:border-[#5e35b1]">
                <option value="All">All Departments</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Oncology">Oncology</option>
              </select>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search doctors..." className="pl-3 pr-7 py-1.5 border border-gray-200 rounded-md text-[12px] font-medium outline-none w-32 sm:w-40 bg-white" />
            </div>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 font-bold bg-gray-50 rounded-lg border-b-4 border-white">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Doctor Info</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Experience</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {paginatedDoctors.map((item) => {
                  const itemId = item._id || item.id;
                  return (
                  <tr key={itemId} className="border-b border-gray-50/50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4 text-xs font-semibold text-gray-500">{itemId?.toString().slice(-6) || 'NEW'}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <img src={item.avatar || 'https://i.pravatar.cc/150'} alt={item.name} className="w-9 h-9 rounded-full mr-3 object-cover shadow-sm" />
                        <div>
                          <div className="font-bold text-gray-800 text-[13px]">{item.name}</div>
                          <div className="text-[11px] text-gray-500">{item.qual} | {item.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-600 text-[13px]">{item.dept}</td>
                    <td className="px-4 py-4 font-medium text-gray-600 text-[13px]">{item.experience} Years</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${
                        item.status === 'Active' ? 'bg-green-50 text-green-500' :
                        item.status === 'On Leave' ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-500'
                      }`}>{item.status}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => setViewingDoctor(item)} className="p-1.5 text-[#5e35b1] hover:bg-[#f3e8ff] border border-[#f3e8ff] rounded-md transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                        <button onClick={() => { setEditingDoctor(item); setAvatarBase64(item.avatar || ''); }} className="p-1.5 text-blue-500 hover:bg-blue-50 border border-blue-50 rounded-md transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setDeletingId(itemId || null)} className="p-1.5 text-red-500 hover:bg-red-50 border border-red-50 rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-500">Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredDoctors.length)} of {filteredDoctors.length} entries</div>
            <div className="flex gap-1 items-center">
              <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center border rounded-md disabled:opacity-50">&lt;</button>
              {[...Array(Math.min(5, totalPages))].map((_, idx) => (
                <button key={idx + 1} onClick={() => setCurrentPage(idx + 1)} className={`w-8 h-8 flex items-center justify-center border rounded-md font-medium text-sm ${currentPage === idx + 1 ? 'bg-[#5e35b1] text-white' : 'hover:bg-gray-50'}`}>{idx + 1}</button>
              ))}
              <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="w-8 h-8 flex items-center justify-center border rounded-md disabled:opacity-50">&gt;</button>
            </div>
          </div>
        </div>
      </div>

      {deletingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold mb-2">Delete Doctor</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this doctor? Cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}

      {viewingDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Doctor Details</h3>
              <button onClick={() => setViewingDoctor(null)}><XCircle className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <img src={viewingDoctor.avatar} alt="Doctor" className="w-16 h-16 rounded-full" />
              <div>
                <h4 className="font-bold text-lg">{viewingDoctor.name}</h4>
                <p className="text-sm text-gray-500">{viewingDoctor.qual} | {viewingDoctor.dept}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-gray-500">Phone</p><p className="font-semibold">{viewingDoctor.phone}</p></div>
              <div><p className="text-xs text-gray-500">Email</p><p className="font-semibold">{viewingDoctor.email}</p></div>
              <div><p className="text-xs text-gray-500">Experience</p><p className="font-semibold">{viewingDoctor.experience} Years</p></div>
              <div><p className="text-xs text-gray-500">Status</p><p className="font-semibold">{viewingDoctor.status}</p></div>
            </div>
          </div>
        </div>
      )}

      {(isAddModalOpen || editingDoctor) && (
        <NewDoctorForm
          initialData={editingDoctor}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingDoctor(null);
          }}
          onCreated={(doctor) => {
            if (editingDoctor) {
              const editId = editingDoctor._id || editingDoctor.id;
              setDoctors(doctors.map((d) => (d._id || d.id) === editId ? { ...d, ...doctor } : d));
            } else {
              setDoctors([doctor, ...doctors]);
            }
            setIsAddModalOpen(false);
            setEditingDoctor(null);
          }}
        />
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}} />
    </main>
  );
}
