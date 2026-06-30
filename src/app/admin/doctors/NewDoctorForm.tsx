import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Menu, Search, Bell, Mail, User, Briefcase, Activity, Calendar, Clock, MapPin, Upload, Phone } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Doctor } from './page';

interface NewDoctorFormProps {
  onClose: () => void;
  onCreated: (doctor: Doctor) => void;
  initialData?: Doctor | null;
}

export default function NewDoctorForm({ onClose, onCreated, initialData }: NewDoctorFormProps) {
  // Parse name if exists
  const nameParts = initialData?.name ? initialData.name.replace(/^Dr\.\s*/, '').split(' ') : [];
  
  // Section 1: Personal Info
  const [firstName, setFirstName] = useState(nameParts[0] || '');
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone ? initialData.phone.replace(/\s+/g, '') : '');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Select gender');
  const [bloodGroup, setBloodGroup] = useState('Select blood group');
  const [maritalStatus, setMaritalStatus] = useState('Select marital status');

  // Section 2: Professional Info
  const [dept, setDept] = useState(initialData?.dept || 'Select department');
  const [specialization, setSpecialization] = useState('Select specialization');
  const [designation, setDesignation] = useState('');
  const [qual, setQual] = useState(initialData?.qual || '');
  const [experience, setExperience] = useState<string>(initialData?.experience?.toString() || 'Select experience');
  const [license, setLicense] = useState('');
  const [fee, setFee] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [status, setStatus] = useState(initialData?.status || 'Select status');

  // Section 3: Additional Info
  const [address, setAddress] = useState('');
  const [biography, setBiography] = useState('');
  const [availabilityDays, setAvailabilityDays] = useState('Select days');
  const [availFrom, setAvailFrom] = useState('Select time');
  const [availTo, setAvailTo] = useState('Select time');
  const [note, setNote] = useState('');

  const [avatarBase64, setAvatarBase64] = useState(initialData?.avatar || '');
  const [submitting, setSubmitting] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setDob('');
    setGender('Select gender');
    setBloodGroup('Select blood group');
    setMaritalStatus('Select marital status');
    
    setDept('Select department');
    setSpecialization('Select specialization');
    setDesignation('');
    setQual('');
    setExperience('Select experience');
    setLicense('');
    setFee('');
    setJoinDate('');
    setStatus('Select status');
    
    setAddress('');
    setBiography('');
    setAvailabilityDays('Select days');
    setAvailFrom('Select time');
    setAvailTo('Select time');
    setNote('');
    setAvatarBase64('');
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!firstName || !lastName || !phone || dept === 'Select department' || !qual || experience === 'Select experience') return;

    setSubmitting(true);

    const expNumber = parseInt(experience, 10) || 0;

    const doctorData = {
      name: `Dr. ${firstName} ${lastName}`,
      email: email || `dr.${firstName.toLowerCase()}.${lastName.toLowerCase()}@citycare.com`,
      phone: phone,
      avatar: avatarBase64 || `https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 1000)}`,
      dept: dept,
      qual: qual,
      experience: expNumber,
      status: status !== 'Select status' ? status : 'Active',
    };

    if (initialData) {
      onCreated({ ...initialData, ...doctorData } as Doctor);
      setSubmitting(false);
      return;
    }

    setTimeout(() => {
      onCreated(doctorData as Doctor);
      setSubmitting(false);
    }, 300);
  };

  return (
    <div className="bg-[#f0f4f8] min-h-screen flex flex-col absolute top-0 right-0 bottom-0 left-0 lg:left-[260px] z-50 animate-in fade-in duration-200">
      
      {/* Top Header replicating the screenshot exactly */}
      <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 w-full shadow-sm">
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700 lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-[17px] font-bold text-gray-900 leading-tight">{initialData ? 'Edit Doctor' : 'New Doctor'}</h1>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
              <button onClick={onClose} className="text-blue-600 font-medium hover:underline">Doctors</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-600">{initialData ? 'Edit Doctor' : 'New Doctor'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-[300px]">
            <input type="text" placeholder="Search doctor by name, ID or department..." className="w-full outline-none text-gray-600 placeholder-gray-400 text-[11px]" />
            <Search className="w-3.5 h-3.5 text-gray-400 ml-2 shrink-0" />
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full text-[8px] font-bold text-white flex items-center justify-center">
                12
              </span>
            </button>
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Mail className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full text-[8px] font-bold text-white flex items-center justify-center">
                8
              </span>
            </button>
          </div>

          {/* Admin Profile */}
          <div className="flex items-center gap-2 border-l border-gray-200 pl-6 cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Admin" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="hidden sm:flex items-center">
              <span className="text-sm font-bold text-gray-800">Admin</span>
              <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-6">

          {/* Left Column: Form */}
          <div className="flex-[2] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-6 sm:p-8 flex-1">

              {/* 1. Personal Information */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">1</div>
                  <h2 className="text-lg font-bold text-blue-600">Personal Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Doctor ID <span className="text-red-500">*</span></label>
                    <input disabled value="Auto generated" className="w-full px-4 py-2.5 border border-gray-200 bg-gray-50 rounded-xl outline-none text-xs text-gray-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">First Name <span className="text-red-500">*</span></label>
                    <input required value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs placeholder-gray-400" placeholder="Enter first name" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Last Name <span className="text-red-500">*</span></label>
                    <input required value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs placeholder-gray-400" placeholder="Enter last name" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Email <span className="text-red-500">*</span></label>
                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs placeholder-gray-400" placeholder="Enter email address" />
                  </div>
                  <div className="space-y-1.5 custom-phone-input">
                    <label className="text-[11px] font-bold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                    <PhoneInput
                      country={'pk'}
                      enableSearch={true}
                      value={phone}
                      onChange={(val) => setPhone(val ? '+' + val : '')}
                      inputClass="!w-full !px-3 !py-2.5 !pl-12 !border !border-gray-300 !rounded-xl focus-within:!ring-1 focus-within:!ring-[#5e35b1] focus-within:!border-[#5e35b1] !outline-none !text-xs !bg-white !h-[38px]"
                      buttonClass="!border-gray-300 !rounded-l-xl !bg-gray-50 hover:!bg-gray-100"
                      dropdownClass="!w-72"
                      containerClass="w-full"
                    />
                  </div>
                  <div className="space-y-1.5 relative">
                    <label className="text-[11px] font-bold text-gray-700">Date of Birth <span className="text-red-500">*</span></label>
                    <input required type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs text-gray-600 appearance-none" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Gender <span className="text-red-500">*</span></label>
                    <select value={gender} onChange={e => setGender(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs bg-white text-gray-600">
                      <option disabled>Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Blood Group</label>
                    <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs bg-white text-gray-600">
                      <option disabled>Select blood group</option>
                      <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                      <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Marital Status</label>
                    <select value={maritalStatus} onChange={e => setMaritalStatus(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs bg-white text-gray-600">
                      <option disabled>Select marital status</option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Divorced</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Professional Information */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">2</div>
                  <h2 className="text-lg font-bold text-blue-600">Professional Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Department <span className="text-red-500">*</span></label>
                    <select value={dept} onChange={e => setDept(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs bg-white text-gray-600">
                      <option disabled>Select department</option>
                      <option>Cardiology</option><option>Neurology</option><option>Orthopedics</option>
                      <option>Dermatology</option><option>Pediatrics</option><option>Oncology</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Specialization <span className="text-red-500">*</span></label>
                    <select value={specialization} onChange={e => setSpecialization(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs bg-white text-gray-600">
                      <option disabled>Select specialization</option>
                      <option>General</option>
                      <option>Surgery</option>
                      <option>Consultation</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Designation / Position <span className="text-red-500">*</span></label>
                    <input value={designation} onChange={e => setDesignation(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs placeholder-gray-400" placeholder="Enter designation" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Qualification <span className="text-red-500">*</span></label>
                    <input required value={qual} onChange={e => setQual(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs placeholder-gray-400" placeholder="Enter highest qualification" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Experience (Years) <span className="text-red-500">*</span></label>
                    <select required value={experience} onChange={e => setExperience(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs bg-white text-gray-600">
                      <option disabled>Select experience</option>
                      {[...Array(30)].map((_, i) => <option key={i} value={i+1}>{i+1} Years</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">License / Registration No. <span className="text-red-500">*</span></label>
                    <input value={license} onChange={e => setLicense(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs placeholder-gray-400" placeholder="Enter license number" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Consultation Fee (PKR) <span className="text-red-500">*</span></label>
                    <input value={fee} onChange={e => setFee(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs placeholder-gray-400" placeholder="Enter consultation fee" />
                  </div>
                  <div className="space-y-1.5 relative">
                    <label className="text-[11px] font-bold text-gray-700">Join Date <span className="text-red-500">*</span></label>
                    <input type="date" value={joinDate} onChange={e => setJoinDate(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs text-gray-600 appearance-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Status <span className="text-red-500">*</span></label>
                    <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs bg-white text-gray-600">
                      <option disabled>Select status</option>
                      <option>Active</option>
                      <option>On Leave</option>
                      <option>Left</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Additional Information */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">3</div>
                  <h2 className="text-lg font-bold text-blue-600">Additional Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Address</label>
                    <textarea rows={3} value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs placeholder-gray-400 resize-none" placeholder="Enter complete address"></textarea>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Biography</label>
                    <textarea rows={3} value={biography} onChange={e => setBiography(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs placeholder-gray-400 resize-none" placeholder="Enter short biography"></textarea>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Availability Days <span className="text-red-500">*</span></label>
                    <select value={availabilityDays} onChange={e => setAvailabilityDays(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs bg-white text-gray-600">
                      <option disabled>Select days</option>
                      <option>Mon - Fri</option>
                      <option>Mon - Sat</option>
                      <option>Weekends</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Availability Time <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-semibold text-gray-700">From</span>
                      <select value={availFrom} onChange={e => setAvailFrom(e.target.value)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs bg-white text-gray-600">
                         <option disabled>Select time</option>
                         <option>09:00 AM</option><option>10:00 AM</option>
                      </select>
                      <span className="text-[11px] font-semibold text-gray-700">To</span>
                      <select value={availTo} onChange={e => setAvailTo(e.target.value)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs bg-white text-gray-600">
                         <option disabled>Select time</option>
                         <option>05:00 PM</option><option>06:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[11px] font-bold text-gray-700">Note (Optional)</label>
                    <input value={note} onChange={e => setNote(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-xs placeholder-gray-400" placeholder="Enter any additional note" />
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-center gap-4 bg-white shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-2.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit()}
                disabled={submitting}
                className="px-8 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm flex items-center justify-center min-w-[140px]"
              >
                {submitting ? 'Saving...' : 'Save Doctor'}
              </button>
            </div>
          </div>

          {/* Right Column: Summaries & Actions */}
          <div className="w-full xl:w-[320px] flex flex-col gap-6 shrink-0">

            {/* Doctor Photo Upload */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
              <h3 className="font-bold text-gray-900 w-full text-left mb-6 text-[14px]">Doctor Photo</h3>
              
              <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-300 flex items-center justify-center mb-4 overflow-hidden shadow-inner relative">
                {avatarBase64 ? (
                  <img src={avatarBase64} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8" />
                )}
              </div>
              <h4 className="font-bold text-blue-600 text-[13px] mb-1">Upload Photo</h4>
              <p className="text-[11px] text-gray-500 mb-5">JPG, PNG (Max. 2MB)</p>
              
              <label className="px-5 py-1.5 border border-gray-200 text-blue-600 text-[11px] font-semibold rounded-lg hover:bg-blue-50 cursor-pointer transition-colors inline-block shadow-sm">
                Choose File
                <input type="file" accept="image/jpeg, image/png" className="hidden" onChange={handlePhotoUpload} />
              </label>
            </div>

            {/* Information Summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-5 text-[14px]">Information Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] pb-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-600 font-medium gap-2">
                    <User className="w-3.5 h-3.5 text-blue-500" />
                    Doctor ID
                  </div>
                  <span className="font-semibold text-blue-600">-</span>
                </div>
                <div className="flex items-center justify-between text-[11px] pb-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-600 font-medium gap-2">
                    <User className="w-3.5 h-3.5 text-blue-500" />
                    Name
                  </div>
                  <span className="font-semibold text-gray-900 max-w-[120px] truncate">{firstName ? `${firstName} ${lastName}` : '-'}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] pb-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-600 font-medium gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                    Department
                  </div>
                  <span className="font-semibold text-gray-900">{dept !== 'Select department' ? dept : '-'}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] pb-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-600 font-medium gap-2">
                    <Activity className="w-3.5 h-3.5 text-blue-500" />
                    Specialization
                  </div>
                  <span className="font-semibold text-gray-900">{specialization !== 'Select specialization' ? specialization : '-'}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] pb-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-600 font-medium gap-2">
                    <Phone className="w-3.5 h-3.5 text-blue-500" />
                    Phone
                  </div>
                  <span className="font-semibold text-gray-900">{phone || '-'}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] pb-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-600 font-medium gap-2">
                    <Mail className="w-3.5 h-3.5 text-blue-500" />
                    Email
                  </div>
                  <span className="font-semibold text-gray-900 max-w-[120px] truncate">{email || '-'}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] pb-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-600 font-medium gap-2">
                    <Activity className="w-3.5 h-3.5 text-blue-500" />
                    Experience
                  </div>
                  <span className="font-semibold text-gray-900">{experience !== 'Select experience' ? `${experience} Years` : '-'}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] pb-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-600 font-medium gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    Join Date
                  </div>
                  <span className="font-semibold text-gray-900">{joinDate ? new Date(joinDate).toLocaleDateString() : '-'}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center text-gray-600 font-medium gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    Status
                  </div>
                  <span className="font-semibold text-gray-900">{status !== 'Select status' ? status : '-'}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-[14px]">Quick Actions</h3>

              <div className="space-y-3">
                <button onClick={onClose} className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-blue-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-white transition-colors">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[12px] font-bold text-blue-600 transition-colors">View Doctors</p>
                      <p className="text-[10px] text-gray-500">Go to doctors list</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-blue-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-white transition-colors">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[12px] font-bold text-blue-600 transition-colors">Schedule</p>
                      <p className="text-[10px] text-gray-500">Manage doctor schedule</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-500" />
                </button>
                <button onClick={handleReset} type="button" className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-blue-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-white transition-colors">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[12px] font-bold text-blue-600 transition-colors">Reset Form</p>
                      <p className="text-[10px] text-gray-500">Clear all fields</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-500" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-phone-input .PhoneInputInput {
          border: none;
          outline: none;
          background: transparent;
          font-size: 0.75rem;
          padding-left: 0.5rem;
        }
        .custom-phone-input .PhoneInputCountry {
          padding-right: 0.5rem;
          border-right: 1px solid #e5e7eb;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}} />
    </div>
  );
}
