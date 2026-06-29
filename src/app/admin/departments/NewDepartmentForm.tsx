"use client";

import React, { useState } from 'react';
import { 
  Menu, ChevronRight, Search, Bell, Mail, User, Phone, 
  Users, MapPin, CheckCircle2, Building2, Clock, Upload, 
  ArrowRight, X, Image as ImageIcon, ChevronDown, Plus
} from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface NewDepartmentFormProps {
  onClose: () => void;
}

export default function NewDepartmentForm({ onClose }: NewDepartmentFormProps) {
  // State for form fields to live-update the summary
  const [deptName, setDeptName] = useState('');
  const [deptCode, setDeptCode] = useState('');
  const [headOfDept, setHeadOfDept] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [totalDoctors, setTotalDoctors] = useState('');
  const [totalStaff, setTotalStaff] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <div className="flex-1 bg-[#f4f7fe] min-h-screen font-sans flex flex-col w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full h-[70px] bg-white px-6 shrink-0 shadow-[0_1px_2px_rgb(0,0,0,0.03)] z-10">
        <div className="flex items-center gap-4 lg:gap-6">
          <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-lg transition-colors shrink-0">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex flex-col justify-center">
            <h1 className="text-[18px] font-bold text-[#1e1b4b] leading-tight">New Department</h1>
            <div className="flex items-center text-[12px] font-semibold text-gray-500 mt-0.5">
              <span className="text-[#0052cc]">Departments</span>
              <ChevronRight className="w-3.5 h-3.5 mx-1" />
              <span>New Department</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by department name..." 
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-[13px] font-semibold outline-none w-[280px] text-gray-700 focus:border-blue-500 transition-colors" 
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center border border-white">12</span>
            </button>
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Mail className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center border border-white">8</span>
            </button>
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-9 h-9 rounded-full object-cover shadow-sm" />
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-[13px] font-bold text-gray-700">Admin</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto w-full custom-scrollbar">
        <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-6">
          
          {/* Left Form Area */}
          <div className="flex-1 space-y-6">
            
            {/* Step 1: Department Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-7 h-7 rounded-full bg-[#0052cc] text-white flex items-center justify-center font-bold text-[13px] shadow-sm">1</div>
                <h2 className="text-[16px] font-bold text-[#0052cc]">Department Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                <div>
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Department Name <span className="text-red-500">*</span></label>
                  <input type="text" value={deptName} onChange={(e) => setDeptName(e.target.value)} placeholder="Enter department name" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none focus:border-[#0052cc] transition-colors placeholder:font-medium placeholder:text-gray-400" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Department Code <span className="text-red-500">*</span></label>
                  <input type="text" value={deptCode} onChange={(e) => setDeptCode(e.target.value)} placeholder="Enter department code" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none focus:border-[#0052cc] transition-colors placeholder:font-medium placeholder:text-gray-400" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Head of Department <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select value={headOfDept} onChange={(e) => setHeadOfDept(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none appearance-none focus:border-[#0052cc] transition-colors bg-white">
                      <option value="">Select head of department</option>
                      <option value="Dr. Sarah Khan">Dr. Sarah Khan</option>
                      <option value="Dr. Usman Ali">Dr. Usman Ali</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Short Name</label>
                  <input type="text" placeholder="Enter short name (optional)" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none focus:border-[#0052cc] transition-colors placeholder:font-medium placeholder:text-gray-400" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Phone Number</label>
                  <PhoneInput
                    country={'pk'}
                    value={phone}
                    onChange={setPhone}
                    inputClass="!w-full !py-2 !h-auto !text-[13px] !font-semibold !text-gray-700 !border-gray-200 !rounded-lg !outline-none focus:!border-[#0052cc] !transition-colors"
                    buttonClass="!border-gray-200 !rounded-l-lg !bg-white"
                    dropdownClass="!font-semibold !text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none focus:border-[#0052cc] transition-colors placeholder:font-medium placeholder:text-gray-400" />
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Description <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter department description" 
                      rows={3} 
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none focus:border-[#0052cc] transition-colors placeholder:font-medium placeholder:text-gray-400 resize-none"
                    ></textarea>
                    <span className="absolute bottom-2 right-2 text-[10px] font-semibold text-gray-400">{description.length}/500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Department Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-7 h-7 rounded-full bg-[#0052cc] text-white flex items-center justify-center font-bold text-[13px] shadow-sm">2</div>
                <h2 className="text-[16px] font-bold text-[#0052cc]">Department Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                <div>
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Department Type <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none appearance-none focus:border-[#0052cc] transition-colors bg-white">
                      <option value="">Select department type</option>
                      <option value="Clinical">Clinical</option>
                      <option value="Non-Clinical">Non-Clinical</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Parent Department</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none appearance-none focus:border-[#0052cc] transition-colors bg-white">
                      <option value="">Select parent department (if any)</option>
                      <option value="Surgery">Surgery</option>
                      <option value="Medicine">Medicine</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Floor / Location</label>
                  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter floor or location" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none focus:border-[#0052cc] transition-colors placeholder:font-medium placeholder:text-gray-400" />
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Total Doctors</label>
                  <input type="number" value={totalDoctors} onChange={(e) => setTotalDoctors(e.target.value)} placeholder="Enter total doctors" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none focus:border-[#0052cc] transition-colors placeholder:font-medium placeholder:text-gray-400" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Total Staff</label>
                  <input type="number" value={totalStaff} onChange={(e) => setTotalStaff(e.target.value)} placeholder="Enter total staff" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none focus:border-[#0052cc] transition-colors placeholder:font-medium placeholder:text-gray-400" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Consultation Room(s)</label>
                  <input type="text" placeholder="Enter total rooms" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none focus:border-[#0052cc] transition-colors placeholder:font-medium placeholder:text-gray-400" />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Status <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none appearance-none focus:border-[#0052cc] transition-colors bg-white">
                      <option value="">Select status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Department Priority</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none appearance-none focus:border-[#0052cc] transition-colors bg-white">
                      <option value="">Select priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Additional Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-7 h-7 rounded-full bg-[#0052cc] text-white flex items-center justify-center font-bold text-[13px] shadow-sm">3</div>
                <h2 className="text-[16px] font-bold text-[#0052cc]">Additional Information</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Services Provided</label>
                  <div className="relative">
                    <textarea 
                      value={services}
                      onChange={(e) => setServices(e.target.value)}
                      placeholder="Enter services provided" 
                      rows={5} 
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none focus:border-[#0052cc] transition-colors placeholder:font-medium placeholder:text-gray-400 resize-none"
                    ></textarea>
                    <span className="absolute bottom-2 right-2 text-[10px] font-semibold text-gray-400">{services.length}/500</span>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Working Hours</label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-[12px] font-bold text-gray-500 w-8">From</span>
                        <div className="relative flex-1">
                          <input type="text" defaultValue="08:00 AM" className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none focus:border-[#0052cc]" />
                          <Clock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-[12px] font-bold text-gray-500 w-4">To</span>
                        <div className="relative flex-1">
                          <input type="text" defaultValue="05:00 PM" className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none focus:border-[#0052cc]" />
                          <Clock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#1e1b4b] mb-2">Working Days</label>
                    <div className="flex flex-wrap items-center gap-3">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <label key={day} className="flex items-center gap-1.5 cursor-pointer">
                          <input type="checkbox" defaultChecked={['Mon','Tue','Wed','Thu','Fri'].includes(day)} className="w-3.5 h-3.5 text-[#0052cc] rounded border-gray-300 focus:ring-[#0052cc]" />
                          <span className="text-[12px] font-bold text-gray-700">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-span-1 lg:col-span-2">
                  <label className="block text-[12px] font-bold text-[#1e1b4b] mb-1.5">Notes (Optional)</label>
                  <div className="relative">
                    <textarea 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Enter any additional notes" 
                      rows={2} 
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 outline-none focus:border-[#0052cc] transition-colors placeholder:font-medium placeholder:text-gray-400 resize-none"
                    ></textarea>
                    <span className="absolute bottom-2 right-2 text-[10px] font-semibold text-gray-400">{notes.length}/500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-4 py-4 justify-center">
              <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-[13px] font-bold bg-white shadow-sm">
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-[#0052cc] text-white rounded-lg hover:bg-blue-700 transition-colors text-[13px] font-bold flex items-center gap-2 shadow-sm">
                <Upload className="w-4 h-4" /> Save Department
              </button>
            </div>

          </div>

          {/* Right Panels Area */}
          <div className="w-full xl:w-[350px] shrink-0 flex flex-col gap-6">
            
            {/* Department Image Panel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-[14px] font-bold text-[#1e1b4b] mb-4">Department Image</h3>
              <div className="w-full border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-6 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 relative text-[#0052cc]">
                  <ImageIcon className="w-7 h-7" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <Plus className="w-3.5 h-3.5 text-[#0052cc]" />
                  </div>
                </div>
                <h4 className="text-[13px] font-bold text-[#0052cc] mb-1">Upload Department Image</h4>
                <p className="text-[11px] font-semibold text-gray-500 mb-4">JPG, PNG (Max. 2MB)</p>
                <button className="px-4 py-1.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-[12px] font-bold bg-white shadow-sm">
                  Choose File
                </button>
              </div>
            </div>

            {/* Department Summary Panel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-[14px] font-bold text-[#1e1b4b] mb-4">Department Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="w-4 h-4 text-[#0052cc]" />
                    <span className="text-[12px] font-bold">Department Code</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#1e1b4b]">{deptCode || '-'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4 text-[#0052cc]" />
                    <span className="text-[12px] font-bold">Head of Department</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#1e1b4b]">{headOfDept || '-'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-[#0052cc]" />
                    <span className="text-[12px] font-bold">Phone</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#1e1b4b]">{phone ? `+${phone}` : '-'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4 text-[#0052cc]" />
                    <span className="text-[12px] font-bold">Email</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#1e1b4b] max-w-[150px] truncate">{email || '-'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-[#0052cc]" />
                    <span className="text-[12px] font-bold">Total Doctors</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#1e1b4b]">{totalDoctors || '-'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-[#0052cc]" />
                    <span className="text-[12px] font-bold">Total Staff</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#1e1b4b]">{totalStaff || '-'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-[#0052cc]" />
                    <span className="text-[12px] font-bold">Location</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#1e1b4b]">{location || '-'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#0052cc]" />
                    <span className="text-[12px] font-bold">Status</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#1e1b4b]">{status || '-'}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-[14px] font-bold text-[#1e1b4b] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={onClose} className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50/50 transition-colors group">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-[#0052cc] group-hover:bg-blue-100 transition-colors">
                      <Menu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#0052cc]">View Departments</div>
                      <div className="text-[11px] font-semibold text-gray-500">Go to departments list</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0052cc] opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
                
                <button onClick={() => {
                  setDeptName(''); setDeptCode(''); setHeadOfDept(''); setPhone(''); setEmail('');
                  setTotalDoctors(''); setTotalStaff(''); setLocation(''); setStatus(''); setDescription('');
                  setServices(''); setNotes('');
                }} className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50/50 transition-colors group">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-[#0052cc] group-hover:bg-blue-100 transition-colors">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#0052cc]">Reset Form</div>
                      <div className="text-[11px] font-semibold text-gray-500">Clear all fields</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0052cc] opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
