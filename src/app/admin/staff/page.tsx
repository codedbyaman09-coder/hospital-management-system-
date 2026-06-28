/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Eye, Edit2, Trash2, XCircle,
  ArrowUp, CheckCircle, Clock, Briefcase
} from 'lucide-react';

const generateFakeStaff = (count: number) => {
  const roles = ['Nurse', 'Receptionist', 'Pharmacist', 'Technician', 'Janitor'];
  const depts = ['General', 'Emergency', 'Cardiology', 'Pharmacy', 'Maintenance'];
  const shifts = ['Morning', 'Evening', 'Night'];
  const statuses = ['Active', 'On Leave', 'Left'];
  
  const maleFirstNames = ['Ahmed', 'Bilal', 'Hassan', 'Zain', 'Omar'];
  const femaleFirstNames = ['Sara', 'Fatima', 'Ayesha', 'Sana', 'Hira'];
  const lastNames = ['Khan', 'Ali', 'Malik', 'Ahmed', 'Shah'];

  const records: Staff[] = [];
  for (let i = 1; i <= count; i++) {
    const isMale = Math.random() > 0.5;
    const fname = isMale 
      ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
      : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
    const lname = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    records.push({
      id: `#STF-${(100 + i).toString().padStart(5, '0')}`,
      name: `${fname} ${lname}`,
      email: `${fname.toLowerCase()}.${lname.toLowerCase()}@citycare.com`,
      phone: `+92 30${Math.floor(Math.random() * 9)} ${Math.floor(1000000 + Math.random() * 9000000)}`,
      avatar: `https://i.pravatar.cc/150?u=${i + 500}`,
      role: roles[Math.floor(Math.random() * roles.length)],
      department: depts[Math.floor(Math.random() * depts.length)],
      shift: shifts[Math.floor(Math.random() * shifts.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return records.reverse();
};

export interface Staff {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  department: string;
  shift: string;
  status: string;
}

export default function StaffPage() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [activeTab, setActiveTab] = useState('All Staff');
  const [selectedRole, setSelectedRole] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [, setLoading] = useState(true);
  const itemsPerPage = 8;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingStaff, setViewingStaff] = useState<Staff | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch('/api/admin/staff');
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setStaffList(json.data);
        } else {
          // Fallback to fake data if database is empty
          setStaffList(generateFakeStaff(40));
        }
      } catch (err) {
        console.error(err);
        setStaffList(generateFakeStaff(40));
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  const filteredStaff = staffList.filter(stf => {
    if (activeTab !== 'All Staff') {
      if (activeTab === 'Active' && stf.status !== 'Active') return false;
      if (activeTab === 'On Leave' && stf.status !== 'On Leave') return false;
      if (activeTab === 'Left' && stf.status !== 'Left') return false;
    }
    if (selectedRole !== 'All' && stf.role !== selectedRole) return false;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const stfId = stf._id || stf.id;
      if (!stf.name.toLowerCase().includes(query) && !stfId?.toLowerCase().includes(query)) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredStaff.length / itemsPerPage));
  const paginatedStaff = filteredStaff.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = () => {
    if (deletingId) {
      setStaffList(staffList.filter((s) => s._id !== deletingId && s.id !== deletingId));
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
      role: formData.get('role') as string,
      department: formData.get('department') as string,
      shift: formData.get('shift') as string,
      status: formData.get('status') as string,
    };

    if (editingStaff) {
      const editId = editingStaff._id || editingStaff.id;
      setStaffList(staffList.map((s) => (s._id || s.id) === editId ? { ...s, ...updatedData } : s));
      setEditingStaff(null);
    } else {
      try {
        const res = await fetch('/api/admin/staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData)
        });
        const json = await res.json();
        if (json.success) {
          setStaffList([json.data, ...staffList]);
        }
      } catch (err) {
        console.error(err);
      }
      setIsAddModalOpen(false);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar w-full">
      <div className="w-full space-y-6">
        <div className="flex justify-end items-center gap-4">
          <button onClick={() => setIsAddModalOpen(true)} className="flex items-center px-4 py-2 bg-[#5e35b1] text-white rounded-lg hover:bg-[#512da8] transition-colors text-sm font-medium shadow-md">
            <Plus className="w-4 h-4 mr-2" /> New Staff
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Staff</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{staffList.length}</p>
              <div className="flex items-center mt-2 text-xs"><ArrowUp className="w-3 h-3 text-green-500 mr-1" /><span className="text-green-500 font-medium">3 new</span></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{staffList.filter(s => s.status === 'Active').length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">On Leave</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{staffList.filter(s => s.status === 'On Leave').length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Nurses</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{staffList.filter(s => s.role === 'Nurse').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] w-full overflow-hidden">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 py-3 border-b border-gray-100 gap-3 bg-white">
            <div className="flex gap-3 md:gap-5 w-full lg:w-auto overflow-x-auto custom-scrollbar pb-1 lg:pb-0">
              {['All Staff', 'Active', 'On Leave', 'Left'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`text-[12px] font-semibold transition-colors whitespace-nowrap ${activeTab === tab ? 'text-[#5e35b1]' : 'text-[#475569] hover:text-[#1e293b]'}`}>{tab}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto custom-scrollbar pb-1 lg:pb-0">
              <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="appearance-none pl-3 pr-8 py-1.5 border border-gray-200 rounded-md text-[12px] font-semibold text-[#475569] outline-none focus:ring-[#5e35b1] focus:border-[#5e35b1]">
                <option value="All">All Roles</option>
                <option value="Nurse">Nurse</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Pharmacist">Pharmacist</option>
                <option value="Technician">Technician</option>
                <option value="Janitor">Janitor</option>
              </select>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search staff..." className="pl-3 pr-7 py-1.5 border border-gray-200 rounded-md text-[12px] font-medium outline-none w-32 sm:w-40 bg-white" />
            </div>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 font-bold bg-gray-50 rounded-lg border-b-4 border-white">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Staff Info</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Shift</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {paginatedStaff.map((item) => {
                  const itemId = item._id || item.id;
                  return (
                  <tr key={itemId} className="border-b border-gray-50/50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4 text-xs font-semibold text-gray-500">{itemId?.slice(-6) || 'NEW'}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <img src={item.avatar || 'https://i.pravatar.cc/150'} alt={item.name} className="w-9 h-9 rounded-full mr-3 object-cover shadow-sm" />
                        <div>
                          <div className="font-bold text-gray-800 text-[13px]">{item.name}</div>
                          <div className="text-[11px] text-gray-500">{item.department} | {item.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-600 text-[13px]">{item.role}</td>
                    <td className="px-4 py-4 font-medium text-gray-600 text-[13px]">{item.shift}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${
                        item.status === 'Active' ? 'bg-green-50 text-green-500' :
                        item.status === 'On Leave' ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-500'
                      }`}>{item.status}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => setViewingStaff(item)} className="p-1.5 text-[#5e35b1] hover:bg-[#f3e8ff] border border-[#f3e8ff] rounded-md transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setEditingStaff(item)} className="p-1.5 text-blue-500 hover:bg-blue-50 border border-blue-50 rounded-md transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setDeletingId(itemId || null)} className="p-1.5 text-red-500 hover:bg-red-50 border border-red-50 rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-500">Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStaff.length)} of {filteredStaff.length} entries</div>
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
            <h3 className="text-lg font-bold mb-2">Delete Staff Member</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this staff member? Cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}

      {viewingStaff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Staff Details</h3>
              <button onClick={() => setViewingStaff(null)}><XCircle className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <img src={viewingStaff.avatar || 'https://i.pravatar.cc/150'} alt="Staff" className="w-16 h-16 rounded-full" />
              <div>
                <h4 className="font-bold text-lg">{viewingStaff.name}</h4>
                <p className="text-sm text-gray-500">{viewingStaff.role} | {viewingStaff.department}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-gray-500">Phone</p><p className="font-semibold">{viewingStaff.phone}</p></div>
              <div><p className="text-xs text-gray-500">Email</p><p className="font-semibold">{viewingStaff.email}</p></div>
              <div><p className="text-xs text-gray-500">Shift</p><p className="font-semibold">{viewingStaff.shift}</p></div>
              <div><p className="text-xs text-gray-500">Status</p><p className="font-semibold">{viewingStaff.status}</p></div>
            </div>
          </div>
        </div>
      )}

      {(isAddModalOpen || editingStaff) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{editingStaff ? 'Edit Staff Member' : 'New Staff Member'}</h3>
              <button onClick={() => { setIsAddModalOpen(false); setEditingStaff(null); }}><XCircle className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium">Name</label><input required name="name" defaultValue={editingStaff?.name} className="w-full px-3 py-2 border rounded-lg text-sm outline-none" /></div>
                <div><label className="text-sm font-medium">Email</label><input required type="email" name="email" defaultValue={editingStaff?.email} className="w-full px-3 py-2 border rounded-lg text-sm outline-none" /></div>
                <div><label className="text-sm font-medium">Phone</label><input required name="phone" defaultValue={editingStaff?.phone} className="w-full px-3 py-2 border rounded-lg text-sm outline-none" /></div>
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <select name="role" defaultValue={editingStaff?.role || 'Nurse'} className="w-full px-3 py-2 border rounded-lg text-sm outline-none">
                    <option>Nurse</option><option>Receptionist</option><option>Pharmacist</option><option>Technician</option><option>Janitor</option>
                  </select>
                </div>
                <div><label className="text-sm font-medium">Department</label><input required name="department" defaultValue={editingStaff?.department || 'General'} className="w-full px-3 py-2 border rounded-lg text-sm outline-none" /></div>
                <div>
                  <label className="text-sm font-medium">Shift</label>
                  <select name="shift" defaultValue={editingStaff?.shift || 'Morning'} className="w-full px-3 py-2 border rounded-lg text-sm outline-none">
                    <option>Morning</option><option>Evening</option><option>Night</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <select name="status" defaultValue={editingStaff?.status || 'Active'} className="w-full px-3 py-2 border rounded-lg text-sm outline-none">
                    <option>Active</option><option>On Leave</option><option>Left</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                <button type="button" onClick={() => { setIsAddModalOpen(false); setEditingStaff(null); }} className="px-5 py-2.5 bg-gray-100 rounded-xl text-sm font-medium">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-[#5e35b1] text-white rounded-xl text-sm font-medium">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}} />
    </main>
  );
}
