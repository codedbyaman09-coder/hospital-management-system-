"use client";

import React, { useState } from 'react';
import { 
  Menu, ChevronRight, Search, Calendar, Bell, Mail, ChevronDown, 
  Upload, User, Phone, Mail as MailIcon, Briefcase, Calendar as CalendarIcon, 
  MapPin, AlertCircle, FileText, Download, RotateCcw, Eye
} from 'lucide-react';

export default function NewStaffForm({ onClose, onSave, initialData }: { onClose: () => void, onSave: (staff: any) => void, initialData?: any }) {
  const [formData, setFormData] = useState({
    firstName: initialData?.name?.split(' ')[0] || '',
    lastName: initialData?.name?.split(' ').slice(1).join(' ') || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    role: initialData?.role || 'Nurse',
    department: initialData?.department || 'Cardiology',
    status: initialData?.status || 'Active',
    joinDate: initialData?.createdAt ? new Date(initialData.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const staffPayload = {
      id: initialData?.id,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      department: formData.department,
      status: formData.status,
      // Default to what the Prisma model expects
      shift: initialData?.shift || 'Morning',
      avatar: initialData?.avatar || `https://i.pravatar.cc/150?u=${Date.now()}`
    };
    onSave(staffPayload);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col absolute top-0 right-0 bottom-0 left-0 lg:left-[260px] z-40 animate-in fade-in duration-200 overflow-y-auto">
      
      {/* Custom Top Header */}
      <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 w-full sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700 lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-[18px] font-bold text-gray-900 leading-tight">{initialData ? 'Edit Staff' : 'New Staff'}</h1>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
              <span className="text-blue-600 font-medium cursor-pointer hover:underline" onClick={onClose}>Staff</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-600">{initialData ? 'Edit Staff' : 'New Staff'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-[280px]">
            <input 
              type="text" 
              placeholder="Search staff by name, ID, or role..." 
              className="w-full outline-none text-gray-600 placeholder-gray-400 text-xs font-bold" 
            />
            <Search className="w-3.5 h-3.5 text-gray-400 ml-2 shrink-0" />
          </div>

          {/* Date Picker */}
          <div className="hidden lg:flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 font-bold cursor-pointer hover:bg-gray-50 transition-colors gap-2">
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
      <div className="p-6 max-w-[1400px] mx-auto w-full flex flex-col xl:flex-row gap-6">
        
        {/* Left Column (Forms) */}
        <div className="flex-1 space-y-6">
          <form id="new-staff-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. Personal Information */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                <h3 className="text-[15px] font-bold text-blue-600">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Staff ID <span className="text-red-500">*</span></label>
                  <input disabled value={initialData ? `STF-${String(initialData.id).padStart(3, '0')}` : "Auto generated"} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none bg-gray-50 text-gray-500" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">First Name <span className="text-red-500">*</span></label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Last Name <span className="text-red-500">*</span></label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Email <span className="text-red-500">*</span></label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Phone Number <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <select className="px-2 py-2 border border-gray-200 rounded-l-lg border-r-0 text-xs outline-none bg-gray-50 font-medium">
                      <option>+92</option>
                    </select>
                    <input required name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" className="w-full px-3 py-2 border border-gray-200 rounded-r-lg text-xs outline-none focus:border-blue-500 font-medium" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Date of Birth <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="text" placeholder="Select date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium" />
                    <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Gender <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 appearance-none bg-white font-medium">
                      <option>Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Blood Group</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 appearance-none bg-white font-medium">
                      <option>Select blood group</option>
                      <option>A+</option><option>B+</option><option>O+</option><option>AB+</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Marital Status</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 appearance-none bg-white font-medium">
                      <option>Select marital status</option>
                      <option>Single</option>
                      <option>Married</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Employment Information */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                <h3 className="text-[15px] font-bold text-blue-600">Employment Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Department <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select name="department" value={formData.department} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 appearance-none bg-white font-medium">
                      <option>Select department</option>
                      <option>Cardiology</option><option>Laboratory</option><option>Administration</option><option>Pharmacy</option>
                      <option>Pediatrics</option><option>Radiology</option><option>Emergency</option><option>IT Department</option>
                      <option>Accounts</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Role / Designation <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 appearance-none bg-white font-medium">
                      <option>Select role / designation</option>
                      <option>Nurse</option><option>Lab Technician</option><option>Receptionist</option><option>Pharmacist</option>
                      <option>Admin Officer</option><option>Radiology Tech</option><option>IT Support</option><option>Accountant</option>
                      <option>Doctor</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Employment Type <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 appearance-none bg-white font-medium">
                      <option>Select employment type</option>
                      <option>Full Time</option><option>Part Time</option><option>Contract</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Date of Joining <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="text" placeholder="Select date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium" />
                    <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Employee Status <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 appearance-none bg-white font-medium">
                      <option>Select status</option>
                      <option>Active</option><option>Inactive</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Reporting To</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 appearance-none bg-white font-medium">
                      <option>Select reporting manager (if any)</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Shift</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 appearance-none bg-white font-medium">
                      <option>Select shift</option>
                      <option>Morning</option><option>Evening</option><option>Night</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Work Location</label>
                  <input type="text" placeholder="Enter work location" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Staff ID Card Number</label>
                  <input type="text" placeholder="Enter ID card number" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium" />
                </div>
              </div>
            </div>

            {/* 3. Address Information */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">3</div>
                <h3 className="text-[15px] font-bold text-blue-600">Address Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-1 h-full">
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Address <span className="text-red-500">*</span></label>
                  <div className="relative h-[100px]">
                    <textarea placeholder="Enter complete address" className="w-full h-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium resize-none" />
                    <span className="text-[10px] text-gray-400 absolute bottom-2 right-2">0/250</span>
                  </div>
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">City <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter city" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">State / Province</label>
                    <input type="text" placeholder="Enter state or province" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Country <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 appearance-none bg-white font-medium">
                        <option>Select country</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Postal / ZIP Code</label>
                    <input type="text" placeholder="Enter postal or ZIP code" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium" />
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Additional Information */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">4</div>
                <h3 className="text-[15px] font-bold text-blue-600">Additional Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Emergency Contact Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter contact name" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Emergency Contact Phone <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <select className="px-2 py-2 border border-gray-200 rounded-l-lg border-r-0 text-xs outline-none bg-gray-50 font-medium">
                      <option>+92</option>
                    </select>
                    <input type="text" placeholder="Enter phone number" className="w-full px-3 py-2 border border-gray-200 rounded-r-lg text-xs outline-none focus:border-blue-500 font-medium" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Relationship</label>
                  <input type="text" placeholder="Enter relationship" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Qualification</label>
                  <input type="text" placeholder="Enter highest qualification" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Experience (Years)</label>
                  <input type="text" placeholder="Enter experience in years" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Notes (Optional)</label>
                  <div className="relative">
                    <input type="text" placeholder="Enter any additional notes" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 font-medium" />
                    <span className="text-[10px] text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">0/250</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-center gap-4 mt-6">
              <button type="button" onClick={onClose} className="px-12 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                Cancel
              </button>
              <button type="submit" className="px-12 py-2.5 bg-[#0052cc] rounded-lg text-[13px] font-bold text-white hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
                <FileText className="w-4 h-4" /> {initialData ? 'Update Staff' : 'Save Staff'}
              </button>
            </div>
            
          </form>
        </div>

        {/* Right Column (Summary & Actions) */}
        <div className="w-full xl:w-[350px] space-y-6">
          
          {/* Staff Photo */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-[13px] font-bold text-gray-900 mb-4">Staff Photo</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                <User className="w-8 h-8" />
              </div>
              <p className="text-[13px] font-bold text-blue-600 mb-1">Upload Photo</p>
              <p className="text-[10px] font-bold text-gray-400 mb-4">JPG, PNG (Max. 2MB)</p>
              <button className="px-4 py-1.5 border border-blue-200 rounded-lg text-[11px] font-bold text-blue-600 hover:bg-blue-50 transition-colors">
                Choose File
              </button>
            </div>
          </div>

          {/* Information Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-[13px] font-bold text-gray-900 mb-4">Information Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[12px]">
                <div className="flex items-center gap-2 text-blue-600 font-bold"><FileText className="w-4 h-4" /> Staff ID</div>
                <div className="text-gray-500 font-medium">{initialData ? `STF-${String(initialData.id).padStart(3, '0')}` : '-'}</div>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <div className="flex items-center gap-2 text-blue-600 font-bold"><User className="w-4 h-4" /> Name</div>
                <div className="text-gray-500 font-medium">{formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}` : '-'}</div>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <div className="flex items-center gap-2 text-blue-600 font-bold"><User className="w-4 h-4" /> Role</div>
                <div className="text-gray-500 font-medium">{formData.role || '-'}</div>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <div className="flex items-center gap-2 text-blue-600 font-bold"><Briefcase className="w-4 h-4" /> Department</div>
                <div className="text-gray-500 font-medium">{formData.department || '-'}</div>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <div className="flex items-center gap-2 text-blue-600 font-bold"><Phone className="w-4 h-4" /> Phone</div>
                <div className="text-gray-500 font-medium">{formData.phone || '-'}</div>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <div className="flex items-center gap-2 text-blue-600 font-bold"><MailIcon className="w-4 h-4" /> Email</div>
                <div className="text-gray-500 font-medium truncate w-[100px] text-right" title={formData.email}>{formData.email || '-'}</div>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <div className="flex items-center gap-2 text-blue-600 font-bold"><CalendarIcon className="w-4 h-4" /> Date of Joining</div>
                <div className="text-gray-500 font-medium">{formData.joinDate}</div>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <div className="flex items-center gap-2 text-blue-600 font-bold"><Briefcase className="w-4 h-4" /> Employment Type</div>
                <div className="text-gray-500 font-medium">-</div>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <div className="flex items-center gap-2 text-blue-600 font-bold"><AlertCircle className="w-4 h-4" /> Status</div>
                <div className="text-gray-500 font-medium">{formData.status || '-'}</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
            <h3 className="text-[13px] font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button type="button" onClick={onClose} className="w-full flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[12px] font-bold text-blue-600">View Staff</p>
                    <p className="text-[10px] font-bold text-gray-400">Go to staff list</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-600" />
              </button>
              
              <button type="reset" form="new-staff-form" className="w-full flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[12px] font-bold text-blue-600">Reset Form</p>
                    <p className="text-[10px] font-bold text-gray-400">Clear all fields</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-600" />
              </button>
              
              <button type="button" className="w-full flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Download className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[12px] font-bold text-blue-600">Download ID Card</p>
                    <p className="text-[10px] font-bold text-gray-400">Generate staff ID card</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
