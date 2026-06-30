"use client";

import React, { useState } from 'react';
import { 
  Building, Plus, Edit2, Trash2,
  CheckCircle, Heart, Brain, Bone, Eye, Activity, Menu, ChevronRight, Search, Calendar, Bell, Mail, ChevronDown, Download, Filter, User
} from 'lucide-react';
import NewDepartmentForm from './NewDepartmentForm';

const mockDepartments = [
  { 
    id: 1, 
    name: 'Cardiology', 
    icon: Heart, 
    iconColor: 'text-blue-500', 
    iconBg: 'bg-blue-50',
    head: 'Dr. Sarah Khan',
    headAvatar: 'https://i.pravatar.cc/150?u=sarah',
    qualification: 'MBBS, MD (Cardiology)',
    description: 'Diagnosis and treatment of heart related diseases.',
    doctors: 8,
    staff: 18,
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Neurology', 
    icon: Brain, 
    iconColor: 'text-indigo-500', 
    iconBg: 'bg-indigo-50',
    head: 'Dr. Usman Ali',
    headAvatar: 'https://i.pravatar.cc/150?u=usman',
    qualification: 'MBBS, MD (Neurology)',
    description: 'Treatment of disorders of the nervous system.',
    doctors: 7,
    staff: 16,
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Orthopedics', 
    icon: Bone, 
    iconColor: 'text-purple-500', 
    iconBg: 'bg-purple-50',
    head: 'Dr. Hamza Qureshi',
    headAvatar: 'https://i.pravatar.cc/150?u=hamza',
    qualification: 'MBBS, MS (Orthopedics)',
    description: 'Treatment of bone, joint and muscle conditions.',
    doctors: 6,
    staff: 14,
    status: 'Active'
  },
  { 
    id: 4, 
    name: 'Pediatrics', 
    icon: Activity, 
    iconColor: 'text-pink-500', 
    iconBg: 'bg-pink-50',
    head: 'Dr. Maria Ahmed',
    headAvatar: 'https://i.pravatar.cc/150?u=maria',
    qualification: 'MBBS, MD (Pediatrics)',
    description: 'Healthcare for infants, children and adolescents.',
    doctors: 5,
    staff: 12,
    status: 'Active'
  },
  { 
    id: 5, 
    name: 'Gynecology', 
    icon: Heart, 
    iconColor: 'text-rose-500', 
    iconBg: 'bg-rose-50',
    head: 'Dr. Ayesha Malik',
    headAvatar: 'https://i.pravatar.cc/150?u=ayesha',
    qualification: 'MBBS, DGO (Gynecology)',
    description: "Women's reproductive health and pregnancies.",
    doctors: 6,
    staff: 13,
    status: 'Active'
  },
  { 
    id: 6, 
    name: 'Dermatology', 
    icon: Activity, 
    iconColor: 'text-orange-500', 
    iconBg: 'bg-orange-50',
    head: 'Dr. Sana Javed',
    headAvatar: 'https://i.pravatar.cc/150?u=sana',
    qualification: 'MBBS, MD (Dermatology)',
    description: 'Diagnosis and treatment of skin, hair and nail disorders.',
    doctors: 4,
    staff: 9,
    status: 'Active'
  },
  { 
    id: 7, 
    name: 'Dental Care', 
    icon: Activity, 
    iconColor: 'text-teal-500', 
    iconBg: 'bg-teal-50',
    head: 'Dr. Bilal Ahmed',
    headAvatar: 'https://i.pravatar.cc/150?u=bilal',
    qualification: 'BDS, MDS (Dental)',
    description: 'Oral health care and dental treatments.',
    doctors: 5,
    staff: 10,
    status: 'Active'
  },
  { 
    id: 8, 
    name: 'Urology', 
    icon: Activity, 
    iconColor: 'text-purple-600', 
    iconBg: 'bg-purple-100',
    head: 'Dr. Imran Shafiq',
    headAvatar: 'https://i.pravatar.cc/150?u=imran',
    qualification: 'MBBS, MS (Urology)',
    description: 'Treatment of urinary tract and male reproductive organs.',
    doctors: 3,
    staff: 7,
    status: 'Active'
  },
  { 
    id: 9, 
    name: 'ENT', 
    icon: Activity, 
    iconColor: 'text-red-500', 
    iconBg: 'bg-red-50',
    head: 'Dr. Hina Fatima',
    headAvatar: 'https://i.pravatar.cc/150?u=hina',
    qualification: 'MBBS, MS (ENT)',
    description: 'Treatment of ear, nose, throat and related disorders.',
    doctors: 4,
    staff: 8,
    status: 'Active'
  },
  { 
    id: 10, 
    name: 'Ophthalmology', 
    icon: Eye, 
    iconColor: 'text-blue-600', 
    iconBg: 'bg-blue-100',
    head: 'Dr. Ahmed Raza',
    headAvatar: 'https://i.pravatar.cc/150?u=ahmed',
    qualification: 'MBBS, MS (Ophthalmology)',
    description: 'Eye care and treatment of vision related problems.',
    doctors: 4,
    staff: 7,
    status: 'Active'
  },
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState(mockDepartments);
  const [isCreating, setIsCreating] = useState(false);

  const handleSaveDepartment = (newDept: any) => {
    setDepartments([newDept, ...departments]);
    setIsCreating(false);
  };

  if (isCreating) {
    return <NewDepartmentForm onClose={() => setIsCreating(false)} onSave={handleSaveDepartment} />;
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col absolute top-0 right-0 bottom-0 left-0 lg:left-[260px] z-40 animate-in fade-in duration-200 overflow-y-auto">
      
      {/* Custom Top Header */}
      <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 w-full sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700 lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-[18px] font-bold text-gray-900 leading-tight">Departments</h1>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
              <span className="text-blue-600 font-medium cursor-pointer hover:underline">Dashboard</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-600">Departments</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-[240px]">
            <input type="text" placeholder="Search department..." className="w-full outline-none text-gray-600 placeholder-gray-400 text-xs" />
            <Search className="w-3.5 h-3.5 text-gray-400 ml-2 shrink-0" />
          </div>

          {/* Date Picker */}
          <div className="hidden lg:flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 font-medium cursor-pointer hover:bg-gray-50 transition-colors gap-2">
            <Calendar className="w-3.5 h-3.5 text-gray-500" />
            <span>May 20, 2024</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </div>

          {/* Action Icons */}
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

          {/* Admin Profile */}
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

      {/* Main Content Area */}
      <div className="p-6 max-w-[1250px] mx-auto w-full space-y-6">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#4f46e5] text-white flex items-center justify-center shrink-0">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[12px] text-gray-500 font-bold mb-1">Total Departments</p>
              <p className="text-2xl font-black text-gray-900 leading-none">15</p>
              <p className="text-[11px] text-gray-500 mt-1.5">All departments</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#dcfce7] text-[#16a34a] flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[12px] text-gray-500 font-bold mb-1">Active Departments</p>
              <p className="text-2xl font-black text-gray-900 leading-none">13</p>
              <p className="text-[11px] text-gray-500 mt-1.5">86.7% of total</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#ffedd5] text-[#ea580c] flex items-center justify-center shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[12px] text-gray-500 font-bold mb-1">Total Staff</p>
              <p className="text-2xl font-black text-gray-900 leading-none">156</p>
              <p className="text-[11px] text-gray-500 mt-1.5">Working in departments</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#7e22ce] text-white flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[12px] text-gray-500 font-bold mb-1">Total Doctors</p>
              <p className="text-2xl font-black text-gray-900 leading-none">78</p>
              <p className="text-[11px] text-gray-500 mt-1.5">Assigned to departments</p>
            </div>
          </div>
        </div>

        {/* Toolbar & Table Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full overflow-hidden flex flex-col">
          
          {/* Toolbar */}
          <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 bg-white">
            
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search department..." 
                  className="pl-3 pr-8 py-1 border border-gray-200 rounded-lg text-[11px] font-bold outline-none w-[150px] text-[#1e1b4b] placeholder-gray-500 focus:border-blue-500" 
                />
                <Search className="w-3.5 h-3.5 text-[#1e1b4b] absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>
              
              <div className="flex flex-col relative w-[100px]">
                <label className="text-[10px] text-[#1e1b4b] font-bold absolute -top-2 left-2 bg-white px-1 z-10">Status</label>
                <select className="w-full px-2.5 py-1 border border-gray-200 rounded-lg text-[11px] font-bold text-[#1e1b4b] outline-none appearance-none bg-white focus:border-blue-500">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#1e1b4b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="flex flex-col relative w-[130px]">
                <label className="text-[10px] text-[#1e1b4b] font-bold absolute -top-2 left-2 bg-white px-1 z-10">Head of Department</label>
                <select className="w-full px-2.5 py-1 border border-gray-200 rounded-lg text-[11px] font-bold text-[#1e1b4b] outline-none appearance-none bg-white focus:border-blue-500">
                  <option>All Heads</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#1e1b4b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="flex flex-col relative w-[120px]">
                <label className="text-[10px] text-[#1e1b4b] font-bold absolute -top-2 left-2 bg-white px-1 z-10">Sort By</label>
                <select className="w-full px-2.5 py-1 border border-gray-200 rounded-lg text-[11px] font-bold text-[#1e1b4b] outline-none appearance-none bg-white focus:border-blue-500">
                  <option>Department Name</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#1e1b4b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <button className="px-3 py-1 border border-blue-200 text-[#0052cc] rounded-lg hover:bg-blue-50 transition-colors text-[12px] font-bold flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" /> Filters
              </button>
              <button className="px-3 py-1 border border-blue-200 text-[#0052cc] rounded-lg hover:bg-blue-50 transition-colors text-[12px] font-bold flex items-center gap-2">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
              <button onClick={() => setIsCreating(true)} className="px-3 py-1 bg-[#0052cc] text-white rounded-lg hover:bg-blue-700 transition-colors text-[12px] font-bold flex items-center gap-2 shadow-sm">
                <Plus className="w-3.5 h-3.5" /> New Department
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100">
                  <th className="px-4 py-2.5 w-12"><input type="checkbox" className="rounded border-gray-300" /></th>
                  <th className="px-4 py-2.5 text-[11px] font-bold text-gray-900 uppercase">#</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold text-gray-900 uppercase">Department Name</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold text-gray-900 uppercase">Head of Department</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold text-gray-900 uppercase w-[220px]">Description</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold text-gray-900 uppercase text-center">Total Doctors</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold text-gray-900 uppercase text-center">Total Staff</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold text-gray-900 uppercase">Status</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold text-gray-900 uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {departments.map((dept, index) => {
                  const Icon = dept.icon;
                  return (
                    <tr key={dept.id} className="hover:bg-gray-50/50 transition-colors bg-white">
                      <td className="px-4 py-2.5"><input type="checkbox" className="rounded border-gray-300" /></td>
                      <td className="px-4 py-2.5 text-[13px] font-bold text-gray-900">{index + 1}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${dept.iconBg} flex items-center justify-center shrink-0`}>
                            <Icon className={`w-4 h-4 ${dept.iconColor}`} />
                          </div>
                          <span className="font-bold text-[13px] text-gray-900">{dept.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-3">
                          <img src={dept.headAvatar} alt={dept.head} className="w-8 h-8 rounded-full object-cover shrink-0" />
                          <div className="flex flex-col">
                            <span className="font-bold text-[13px] text-blue-700">{dept.head}</span>
                            <span className="text-[11px] font-semibold text-gray-500 mt-0.5">{dept.qualification}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <p className="text-[12px] font-semibold text-gray-700 leading-tight pr-4">{dept.description}</p>
                      </td>
                      <td className="px-4 py-2.5 text-[13px] font-bold text-gray-900 text-center">{dept.doctors}</td>
                      <td className="px-4 py-2.5 text-[13px] font-bold text-gray-900 text-center">{dept.staff}</td>
                      <td className="px-4 py-2.5">
                        <span className="text-[12px] font-bold text-[#16a34a]">{dept.status}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center justify-center gap-2">
                          <button className="w-7 h-7 rounded border border-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="w-7 h-7 rounded border border-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button className="w-7 h-7 rounded border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors">
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
            <div className="text-[12px] font-bold text-gray-700">Showing 1 to 10 of 15 entries</div>
            <div className="flex gap-1.5 items-center">
              <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-xs font-bold bg-white">&lt;</button>
              <button className="w-7 h-7 flex items-center justify-center border border-[#0052cc] rounded text-white bg-[#0052cc] text-xs font-bold">1</button>
              <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-xs font-bold bg-white">2</button>
              <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-xs font-bold bg-white">&gt;</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
