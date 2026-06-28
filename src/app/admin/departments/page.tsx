"use client";

import React, { useState } from 'react';
import { 
  Building, Plus, Edit2, Trash2, XCircle,
  Activity, CheckCircle, Heart, Brain, Bone, Stethoscope, Droplet, Users
} from 'lucide-react';

// Fake department data kept for reference but not used (data comes from API)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _generateFakeDepartments = (count: number) => {
  return [
    { id: '#DEP-001', name: 'Cardiology', head: 'Dr. Sarah Khan', iconName: 'Heart', color: 'text-red-500', bg: 'bg-red-50', staff: 24, activePatients: 145, status: 'Active' },
    { id: '#DEP-002', name: 'Neurology', head: 'Dr. Usman Ali', iconName: 'Brain', color: 'text-purple-500', bg: 'bg-purple-50', staff: 18, activePatients: 98, status: 'Active' },
    { id: '#DEP-003', name: 'Orthopedics', head: 'Dr. Maria Ahmed', iconName: 'Bone', color: 'text-blue-500', bg: 'bg-blue-50', staff: 20, activePatients: 112, status: 'Active' },
    { id: '#DEP-004', name: 'Dermatology', head: 'Dr. Hamza Qureshi', iconName: 'Activity', color: 'text-teal-500', bg: 'bg-teal-50', staff: 12, activePatients: 65, status: 'Active' },
    { id: '#DEP-005', name: 'Pediatrics', head: 'Dr. Ayesha Malik', iconName: 'Stethoscope', color: 'text-pink-500', bg: 'bg-pink-50', staff: 30, activePatients: 210, status: 'Active' },
    { id: '#DEP-006', name: 'Blood Bank', head: 'Dr. Bilal Raza', iconName: 'Droplet', color: 'text-red-600', bg: 'bg-red-100', staff: 8, activePatients: 0, status: 'Inactive' },
  ];
};

const iconMap: Record<string, React.ElementType> = {
  Heart, Brain, Bone, Activity, Stethoscope, Droplet, Building
};

export interface Department {
  _id?: string;
  id?: string;
  name: string;
  head: string;
  iconName: string;
  color: string;
  bg: string;
  staff: number;
  activePatients: number;
  status: string;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [activeTab, setActiveTab] = useState('All Departments');
  const [searchQuery, setSearchQuery] = useState('');
  const [, setLoading] = useState(true);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchDepts = async () => {
      try {
        const res = await fetch('/api/admin/departments');
        const json = await res.json();
        if (json.success) setDepartments(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDepts();
  }, []);

  const filteredDepts = departments.filter(dept => {
    if (activeTab !== 'All Departments') {
      if (activeTab === 'Active' && dept.status !== 'Active') return false;
      if (activeTab === 'Inactive' && dept.status !== 'Inactive') return false;
    }
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      if (!dept.name.toLowerCase().includes(query) && !dept.head.toLowerCase().includes(query)) return false;
    }
    return true;
  });

  const handleDelete = () => {
    if (deletingId) {
      // Typically you would call a DELETE API here. For now we update local state.
      setDepartments(departments.filter((d) => d._id !== deletingId && d.id !== deletingId));
      setDeletingId(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const updatedData = {
      name: formData.get('name') as string,
      head: formData.get('head') as string,
      staff: parseInt(formData.get('staff') as string),
      activePatients: parseInt(formData.get('activePatients') as string),
      status: formData.get('status') as string,
    };

    if (editingDept) {
      // Typically you would call a PUT API here.
      const editId = editingDept._id || editingDept.id;
      setDepartments(departments.map((d) => (d._id || d.id) === editId ? { ...d, ...updatedData } : d));
      setEditingDept(null);
    } else {
      try {
        const res = await fetch('/api/admin/departments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData)
        });
        const json = await res.json();
        if (json.success) {
          setDepartments([json.data, ...departments]);
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
            <Plus className="w-4 h-4 mr-2" /> New Department
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Departments</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{departments.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{departments.filter(d=>d.status==='Active').length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Staff</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{departments.reduce((acc, curr) => acc + curr.staff, 0)}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
              <Activity className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Patients</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{departments.reduce((acc, curr) => acc + curr.activePatients, 0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] w-full overflow-hidden">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 py-3 border-b border-gray-100 gap-3 bg-white">
            <div className="flex gap-3 md:gap-5 w-full lg:w-auto overflow-x-auto custom-scrollbar pb-1 lg:pb-0">
              {['All Departments', 'Active', 'Inactive'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`text-[12px] font-semibold transition-colors whitespace-nowrap ${activeTab === tab ? 'text-[#5e35b1]' : 'text-[#475569] hover:text-[#1e293b]'}`}>{tab}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search departments..." className="pl-3 pr-7 py-1.5 border border-gray-200 rounded-md text-[12px] font-medium outline-none w-48 bg-white" />
            </div>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 font-bold bg-gray-50 rounded-lg border-b-4 border-white">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Department Name</th>
                  <th className="px-4 py-3">Head of Department</th>
                  <th className="px-4 py-3">Staff</th>
                  <th className="px-4 py-3">Active Patients</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {filteredDepts.map((item) => {
                  const Icon = iconMap[item.iconName] || Building;
                  const itemId = item._id || item.id;
                  return (
                    <tr key={itemId} className="border-b border-gray-50/50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4 text-xs font-semibold text-gray-500">{itemId?.slice(-6) || 'NEW'}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full ${item.bg || 'bg-blue-50'} flex items-center justify-center mr-3`}><Icon className={`w-4 h-4 ${item.color || 'text-blue-500'}`} /></div>
                          <span className="font-bold text-gray-800 text-[13px]">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-medium text-gray-600 text-[13px]">{item.head}</td>
                      <td className="px-4 py-4 font-medium text-gray-600 text-[13px]">{item.staff}</td>
                      <td className="px-4 py-4 font-medium text-gray-600 text-[13px]">{item.activePatients}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${
                          item.status === 'Active' ? 'bg-green-50 text-green-500' : 'bg-gray-100 text-gray-500'
                        }`}>{item.status}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button onClick={() => setEditingDept(item)} className="p-1.5 text-blue-500 hover:bg-blue-50 border border-blue-50 rounded-md transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => setDeletingId(itemId || null)} className="p-1.5 text-red-500 hover:bg-red-50 border border-red-50 rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {deletingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold mb-2">Delete Department</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this department? Cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}

      {(isAddModalOpen || editingDept) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{editingDept ? 'Edit Department' : 'New Department'}</h3>
              <button onClick={() => { setIsAddModalOpen(false); setEditingDept(null); }}><XCircle className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div><label className="text-sm font-medium">Department Name</label><input required name="name" defaultValue={editingDept?.name} className="w-full px-3 py-2 border rounded-lg text-sm outline-none" /></div>
                <div><label className="text-sm font-medium">Head of Department</label><input required name="head" defaultValue={editingDept?.head} className="w-full px-3 py-2 border rounded-lg text-sm outline-none" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium">Total Staff</label><input required type="number" name="staff" defaultValue={editingDept?.staff} className="w-full px-3 py-2 border rounded-lg text-sm outline-none" /></div>
                  <div><label className="text-sm font-medium">Active Patients</label><input required type="number" name="activePatients" defaultValue={editingDept?.activePatients} className="w-full px-3 py-2 border rounded-lg text-sm outline-none" /></div>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <select name="status" defaultValue={editingDept?.status || 'Active'} className="w-full px-3 py-2 border rounded-lg text-sm outline-none">
                    <option>Active</option><option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                <button type="button" onClick={() => { setIsAddModalOpen(false); setEditingDept(null); }} className="px-5 py-2.5 bg-gray-100 rounded-xl text-sm font-medium">Cancel</button>
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
