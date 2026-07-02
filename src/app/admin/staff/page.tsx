"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Edit2, Trash2, Eye, Menu, ChevronRight, Search, Calendar, Bell, Mail, ChevronDown, Download, Filter, Stethoscope, Syringe, FlaskConical, Briefcase
} from 'lucide-react';
import NewStaffForm from './NewStaffForm';

export default function StaffPage() {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any | null>(null);
  const [viewingStaff, setViewingStaff] = useState<any | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/staff');
      const data = await res.json();
      if (data.success) {
        setStaffList(data.data);
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    if (role.includes('Nurse')) return { color: 'text-blue-600', bg: 'bg-blue-50' };
    if (role.includes('Technician') || role.includes('Tech')) return { color: 'text-orange-600', bg: 'bg-orange-50' };
    if (role.includes('Receptionist') || role.includes('Admin')) return { color: 'text-pink-600', bg: 'bg-pink-50' };
    if (role.includes('Pharmacist')) return { color: 'text-purple-600', bg: 'bg-purple-50' };
    if (role.includes('IT')) return { color: 'text-indigo-600', bg: 'bg-indigo-50' };
    if (role.includes('Account')) return { color: 'text-amber-600', bg: 'bg-amber-50' };
    return { color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, departmentFilter, roleFilter, statusFilter]);

  const uniqueDepartments = Array.from(new Set(staffList.map(d => d.department)));
  const uniqueRoles = Array.from(new Set(staffList.map(d => d.role)));

  let filteredStaff = staffList.filter(staff => {
    const formattedId = `STF-${String(staff.id).padStart(3, '0')}`;
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          formattedId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          staff.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = departmentFilter === 'All Departments' || staff.department === departmentFilter;
    const matchesRole = roleFilter === 'All Roles' || staff.role === roleFilter;
    const matchesStatus = statusFilter === 'All Status' || staff.status === statusFilter;
    return matchesSearch && matchesDept && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const paginatedStaff = filteredStaff.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredStaff.map(d => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      try {
        const res = await fetch(`/api/admin/staff/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          setStaffList(staffList.filter(s => s.id !== id));
        }
      } catch (error) {
        console.error('Error deleting staff:', error);
      }
    }
  };

  const handleExport = () => {
    const headers = ['ID', 'Staff ID', 'Name', 'Role', 'Department', 'Phone', 'Email', 'Join Date', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredStaff.map(staff => 
        [
          staff.id,
          `"STF-${String(staff.id).padStart(3, '0')}"`,
          `"${staff.name}"`,
          `"${staff.role}"`,
          `"${staff.department}"`,
          `"${staff.phone}"`,
          `"${staff.email}"`,
          `"${staff.createdAt}"`,
          staff.status
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'staff_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = async (newStaff: any) => {
    try {
      const isEdit = !!newStaff.id;
      const url = isEdit ? `/api/admin/staff/${newStaff.id}` : '/api/admin/staff';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStaff)
      });
      const data = await res.json();
      
      if (data.success) {
        if (isEdit) {
          setStaffList(staffList.map(s => s.id === newStaff.id ? data.data : s));
        } else {
          setStaffList([data.data, ...staffList]);
        }
        setIsAddModalOpen(false);
        setEditingStaff(null);
      } else {
        alert('Failed to save staff');
      }
    } catch (error) {
      console.error('Error saving staff:', error);
    }
  };

  if (isAddModalOpen || editingStaff) {
    return <NewStaffForm 
             onClose={() => { setIsAddModalOpen(false); setEditingStaff(null); }} 
             onSave={handleSave} 
             initialData={editingStaff}
           />;
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col absolute top-0 right-0 bottom-0 left-0 lg:left-[260px] z-40 animate-in fade-in duration-200 overflow-y-auto">
      
      <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 w-full sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700 lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-[18px] font-bold text-gray-900 leading-tight">Staff</h1>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
              <span className="text-blue-600 font-medium cursor-pointer hover:underline">Dashboard</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-600">Staff</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-[280px]">
            <input 
              type="text" 
              placeholder="Search staff by name, ID, or role..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full outline-none text-gray-600 placeholder-gray-400 text-xs font-bold" 
            />
            <Search className="w-3.5 h-3.5 text-gray-400 ml-2 shrink-0" />
          </div>

          <div className="hidden lg:flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 font-bold cursor-pointer hover:bg-gray-50 transition-colors gap-2">
            <Calendar className="w-3.5 h-3.5 text-gray-500" />
            <span>May 20, 2024</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </div>

          <div className="flex items-center space-x-3 pl-2">
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border border-white rounded-full text-[8px] font-bold text-white flex items-center justify-center">
                12
              </span>
            </button>
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Mail className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border border-white rounded-full text-[8px] font-bold text-white flex items-center justify-center">
                8
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 border-l border-gray-200 pl-5 cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Admin" 
              className="w-7 h-7 rounded-full object-cover"
            />
            <div className="hidden sm:flex items-center">
              <span className="text-[13px] font-bold text-gray-800">Admin</span>
              <ChevronDown className="w-3 h-3 ml-1 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto w-full space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#0052cc] text-white flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[12px] text-gray-500 font-bold mb-1">Total Staff</p>
              <p className="text-2xl font-black text-gray-900 leading-none">{staffList.length}</p>
              <p className="text-[11px] text-gray-500 mt-1.5">All staff members</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#dcfce7] text-[#16a34a] flex items-center justify-center shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[12px] text-gray-500 font-bold mb-1">Doctors</p>
              <p className="text-2xl font-black text-gray-900 leading-none">{staffList.filter(s => s.role.includes('Doctor')).length}</p>
              <p className="text-[11px] text-gray-500 mt-1.5">Staff members</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Syringe className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[12px] text-gray-500 font-bold mb-1">Nurses</p>
              <p className="text-2xl font-black text-gray-900 leading-none">{staffList.filter(s => s.role.includes('Nurse')).length}</p>
              <p className="text-[11px] text-gray-500 mt-1.5">Staff members</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[12px] text-gray-500 font-bold mb-1">Technicians</p>
              <p className="text-2xl font-black text-gray-900 leading-none">{staffList.filter(s => s.role.includes('Technician')).length}</p>
              <p className="text-[11px] text-gray-500 mt-1.5">Staff members</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[12px] text-gray-500 font-bold mb-1">Administrative</p>
              <p className="text-2xl font-black text-gray-900 leading-none">{staffList.filter(s => s.role.includes('Admin') || s.role.includes('Receptionist') || s.role.includes('Accountant')).length}</p>
              <p className="text-[11px] text-gray-500 mt-1.5">Staff members</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full overflow-hidden flex flex-col">
          
          <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 bg-white">
            
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search staff by name, ID, or role..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-3 pr-8 py-1.5 border border-gray-200 rounded-lg text-[11px] font-bold outline-none w-[220px] text-[#1e1b4b] placeholder-gray-500 focus:border-[#0052cc]" 
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex flex-col relative w-[130px]">
                <label className="text-[10px] text-[#1e1b4b] font-bold absolute -top-2 left-2 bg-white px-1 z-10">Department</label>
                <select 
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-[11px] font-bold text-[#1e1b4b] outline-none appearance-none bg-white focus:border-[#0052cc]">
                  <option>All Departments</option>
                  {uniqueDepartments.map(dept => (
                    <option key={dept}>{dept}</option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#1e1b4b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="flex flex-col relative w-[120px]">
                <label className="text-[10px] text-[#1e1b4b] font-bold absolute -top-2 left-2 bg-white px-1 z-10">Role</label>
                <select 
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-[11px] font-bold text-[#1e1b4b] outline-none appearance-none bg-white focus:border-[#0052cc]">
                  <option>All Roles</option>
                  {uniqueRoles.map(role => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#1e1b4b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              
              <div className="flex flex-col relative w-[110px]">
                <label className="text-[10px] text-[#1e1b4b] font-bold absolute -top-2 left-2 bg-white px-1 z-10">Status</label>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-[11px] font-bold text-[#1e1b4b] outline-none appearance-none bg-white focus:border-[#0052cc]">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#1e1b4b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <button className="px-3 py-1.5 border border-blue-200 text-[#0052cc] rounded-lg hover:bg-blue-50 transition-colors text-[12px] font-bold flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" /> Filters
              </button>
              <button onClick={handleExport} className="px-3 py-1.5 border border-blue-200 text-[#0052cc] rounded-lg hover:bg-blue-50 transition-colors text-[12px] font-bold flex items-center gap-2">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
              <button onClick={() => setIsAddModalOpen(true)} className="px-3 py-1.5 bg-[#0052cc] text-white rounded-lg hover:bg-blue-700 transition-colors text-[12px] font-bold flex items-center gap-2 shadow-sm">
                <Plus className="w-3.5 h-3.5" /> New Staff
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100">
                  <th className="px-4 py-3 w-12">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={selectedIds.length === filteredStaff.length && filteredStaff.length > 0} 
                      className="rounded border-gray-300 w-3.5 h-3.5 accent-[#0052cc]" 
                    />
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-900 uppercase">#</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-900 uppercase">Staff ID</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-900 uppercase">Name</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-900 uppercase">Role</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-900 uppercase">Department</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-900 uppercase">Phone</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-900 uppercase">Email</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-900 uppercase">Join Date</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-900 uppercase">Status</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-900 uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedStaff.map((staff, index) => {
                  return (
                    <tr key={staff.id} className="hover:bg-gray-50/50 transition-colors bg-white">
                      <td className="px-4 py-3">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(staff.id)} 
                          onChange={() => handleSelectOne(staff.id)} 
                          className="rounded border-gray-300 w-3.5 h-3.5 accent-[#0052cc]" 
                        />
                      </td>
                      <td className="px-4 py-3 text-[13px] font-bold text-gray-900">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td className="px-4 py-3 text-[12px] font-bold text-gray-900">{staff.staffId}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={staff.avatar} alt={staff.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                          <span className="font-bold text-[13px] text-[#0052cc]">{staff.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${getRoleColor(staff.role).color} ${getRoleColor(staff.role).bg}`}>
                          {staff.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[12px] font-bold text-gray-700">{staff.department}</td>
                      <td className="px-4 py-3 text-[12px] font-bold text-gray-700">{staff.phone}</td>
                      <td className="px-4 py-3 text-[12px] font-bold text-gray-700">{staff.email}</td>
                      <td className="px-4 py-3 text-[12px] font-bold text-gray-700">{new Date(staff.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${staff.status === 'Active' ? 'text-[#16a34a] bg-green-50' : 'text-red-500 bg-red-50'}`}>
                          {staff.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => setViewingStaff(staff)} className="w-7 h-7 rounded border border-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => setEditingStaff(staff)} className="w-7 h-7 rounded border border-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDelete(staff.id)} className="w-7 h-7 rounded border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
            <div className="text-[12px] font-bold text-gray-700">
              Showing {filteredStaff.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStaff.length)} of {filteredStaff.length} entries
            </div>
            <div className="flex gap-1.5 items-center">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-xs font-bold bg-white disabled:opacity-50">&lt;</button>
              
              {Array.from({ length: totalPages }).map((_, i) => {
                // Show some pagination buttons dynamically
                if (totalPages > 5 && i > 0 && i !== totalPages - 1 && Math.abs(i - (currentPage - 1)) > 1) {
                  if (i === 1 && currentPage > 3) return <span key={i} className="px-1 text-gray-400">...</span>;
                  if (i === totalPages - 2 && currentPage < totalPages - 2) return <span key={i} className="px-1 text-gray-400">...</span>;
                  return null;
                }
                
                return (
                  <button 
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-7 h-7 flex items-center justify-center border rounded text-xs font-bold ${
                      currentPage === i + 1 
                        ? 'border-[#0052cc] text-white bg-[#0052cc]' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50 bg-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              })}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-xs font-bold bg-white disabled:opacity-50">&gt;</button>
            </div>
          </div>

        </div>
      </div>

      {/* View Modal */}
      {viewingStaff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Staff Details</h3>
              <button onClick={() => setViewingStaff(null)} className="text-gray-400 hover:text-gray-600">
                &times;
              </button>
            </div>
            <div className="flex flex-col items-center mb-6">
              <img src={viewingStaff.avatar} alt="Avatar" className="w-20 h-20 rounded-full mb-3 shadow-md border-2 border-gray-50 object-cover" />
              <h4 className="font-black text-xl text-gray-900">{viewingStaff.name}</h4>
              <p className="text-sm text-[#0052cc] font-semibold">STF-{String(viewingStaff.id).padStart(3, '0')}</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-xs text-gray-500 font-bold">Role</span><span className="text-sm font-bold">{viewingStaff.role}</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-xs text-gray-500 font-bold">Department</span><span className="text-sm font-bold">{viewingStaff.department}</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-xs text-gray-500 font-bold">Phone</span><span className="text-sm font-bold">{viewingStaff.phone}</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-xs text-gray-500 font-bold">Email</span><span className="text-sm font-bold">{viewingStaff.email}</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-xs text-gray-500 font-bold">Join Date</span><span className="text-sm font-bold">{new Date(viewingStaff.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span></div>
              <div className="flex justify-between pt-1"><span className="text-xs text-gray-500 font-bold">Status</span><span className={`text-sm font-bold ${viewingStaff.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>{viewingStaff.status}</span></div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
