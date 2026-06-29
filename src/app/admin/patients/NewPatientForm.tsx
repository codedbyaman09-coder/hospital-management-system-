import React, { useState } from 'react';
import { ChevronRight, X, User, Calendar, MapPin, Activity, Upload, Image as ImageIcon } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Patient } from './page';

interface NewPatientFormProps {
  onClose: () => void;
  onCreated: (patient: Patient) => void;
  initialData?: Patient | null;
}

export default function NewPatientForm({ onClose, onCreated, initialData }: NewPatientFormProps) {
  // Personal Info
  const nameParts = initialData?.name ? initialData.name.split(' ') : [];
  const [firstName, setFirstName] = useState(nameParts[0] || '');
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') || '');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState(initialData?.gender || 'Male');
  const [phone, setPhone] = useState(initialData?.phone ? initialData.phone.replace(/\s+/g, '') : '');
  const [email] = useState(initialData?.email || '');
  const [bloodGroup, setBloodGroup] = useState(initialData?.bloodGroup || 'A+');
  const [addressLine1, setAddressLine1] = useState('');
  const [avatarBase64, setAvatarBase64] = useState(initialData?.avatar || '');

  const [submitting, setSubmitting] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate age from DOB (rough estimate for demo)
  const calculateAge = (dobString: string) => {
    if (!dobString) return 30; // default
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age || 1; // At least 1
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!firstName || !lastName || !phone) return;

    setSubmitting(true);

    const patientData = {
      name: `${firstName} ${lastName}`,
      email: email || `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: phone,
      avatar: avatarBase64 || `https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 1000)}`,
      gender: gender,
      age: initialData?.age || calculateAge(dob),
      bloodGroup: bloodGroup,
      lastVisit: initialData?.lastVisit || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: initialData?.status || 'Active',
    };

    if (initialData) {
      onCreated({ ...initialData, ...patientData } as Patient);
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData),
      });
      const json = await res.json();
      if (json.success) {
        onCreated(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f0f4f8] min-h-full flex flex-col animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{initialData ? 'Edit Patient' : 'New Patient'}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
            <button onClick={onClose} className="text-blue-600 hover:underline font-medium">Patients</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-700 font-medium">{initialData ? 'Edit Patient' : 'New Patient'}</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-6">

          {/* Left Column: Form */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-100">

              {/* 1. Personal Information */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                  <h2 className="text-lg font-bold text-blue-600">Personal Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Title</label>
                    <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm bg-white">
                      <option>Mr.</option>
                      <option>Mrs.</option>
                      <option>Ms.</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">First Name <span className="text-red-500">*</span></label>
                    <input required value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm placeholder-gray-400" placeholder="Enter first name" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Last Name <span className="text-red-500">*</span></label>
                    <input required value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm placeholder-gray-400" placeholder="Enter last name" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Patient ID</label>
                    <input disabled value="Auto generated" className="w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl outline-none text-sm text-gray-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Date of Birth <span className="text-red-500">*</span></label>
                    <input required type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Gender <span className="text-red-500">*</span></label>
                    <select value={gender} onChange={e => setGender(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm bg-white">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Marital Status</label>
                    <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm bg-white">
                      <option>Single</option>
                      <option>Married</option>
                      <option>Divorced</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 md:col-span-2 flex flex-col md:flex-row gap-4 items-end">
                    <div className="w-full space-y-1.5 custom-phone-input">
                      <label className="text-xs font-semibold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                      <PhoneInput
                        country={'in'}
                        enableSearch={true}
                        value={phone}
                        onChange={(val) => setPhone(val ? '+' + val : '')}
                        inputClass="!w-full !px-3 !py-2 !pl-12 !border !border-gray-300 !rounded-xl focus-within:!ring-1 focus-within:!ring-[#5e35b1] focus-within:!border-[#5e35b1] !outline-none !text-sm !bg-white !h-10"
                        buttonClass="!border-gray-300 !rounded-l-xl !bg-gray-50 hover:!bg-gray-100"
                        dropdownClass="!w-72"
                        containerClass="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 md:col-span-1">
                    <label className="text-xs font-semibold text-gray-700">Blood Group</label>
                    <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm bg-white">
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>O+</option>
                      <option>O-</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-gray-700">Profile Photo</label>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0 overflow-hidden">
                        {avatarBase64 ? (
                          <img src={avatarBase64} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-6 h-6" />
                        )}
                      </div>
                      <label className="flex-1 border border-dashed border-gray-300 rounded-xl p-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer transition-colors text-sm text-gray-500 relative">
                        <Upload className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-blue-600">Upload Photo</span>
                        <span className="text-xs">JPG, PNG (Max. 5MB)</span>
                        <input type="file" accept="image/jpeg, image/png" className="hidden" onChange={handlePhotoUpload} />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Occupation</label>
                    <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm bg-white">
                      <option>Select Occupation</option>
                      <option>Student</option>
                      <option>Teacher</option>
                      <option>Engineer</option>
                      <option>Business</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-gray-700">CNIC / National ID</label>
                    <input className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm placeholder-gray-400" placeholder="Enter CNIC or National ID" />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 my-8" />

              {/* 2. Address Information */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                  <h2 className="text-lg font-bold text-blue-600">Address Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Address Line 1 <span className="text-red-500">*</span></label>
                    <input value={addressLine1} onChange={e => setAddressLine1(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm placeholder-gray-400" placeholder="Enter address line 1" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Address Line 2</label>
                    <input className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm placeholder-gray-400" placeholder="Enter address line 2 (optional)" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Country <span className="text-red-500">*</span></label>
                    <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm bg-white">
                      <option>Pakistan</option>
                      <option>India</option>
                      <option>Bangladesh</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">City <span className="text-red-500">*</span></label>
                    <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm bg-white">
                      <option>Lahore</option>
                      <option>Karachi</option>
                      <option>Islamabad</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">State / Province</label>
                    <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm bg-white">
                      <option>Punjab</option>
                      <option>Sindh</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Postal Code</label>
                    <input className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm placeholder-gray-400" placeholder="Enter postal code" />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 my-8" />

              {/* 3. Medical Information */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
                  <h2 className="text-lg font-bold text-blue-600">Medical Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Blood Group</label>
                    <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm bg-white text-gray-500 bg-gray-50" disabled>
                      <option>{bloodGroup}</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Height (cm)</label>
                    <input className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm placeholder-gray-400" placeholder="Enter height" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Weight (kg)</label>
                    <input className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm placeholder-gray-400" placeholder="Enter weight" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Allergies (if any)</label>
                    <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm bg-white">
                      <option>None</option>
                      <option>Penicillin</option>
                      <option>Dust</option>
                      <option>Pollen</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Chronic Diseases (if any)</label>
                    <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm bg-white">
                      <option>None</option>
                      <option>Diabetes</option>
                      <option>Hypertension</option>
                      <option>Asthma</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 md:col-span-3">
                    <label className="text-xs font-semibold text-gray-700">Medical History</label>
                    <textarea rows={3} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-[#5e35b1] focus:border-[#5e35b1] outline-none text-sm placeholder-gray-400 resize-none" placeholder="Enter medical history"></textarea>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="px-6 sm:px-8 py-5 bg-gray-50 flex items-center justify-end gap-3 border-t border-gray-100">
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit()}
                disabled={submitting}
                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm flex items-center gap-2"
              >
                {submitting ? 'Saving...' : (initialData ? 'Save Changes' : 'Save Patient')}
              </button>
            </div>
          </div>

          {/* Right Column: Summaries */}
          <div className="w-full xl:w-80 flex flex-col gap-6 shrink-0">

            {/* Patient Summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)]">
              <h3 className="font-bold text-gray-900 mb-6">Patient Summary</h3>

              <div className="flex flex-col items-center justify-center text-center mb-8">
                <div className="w-20 h-20 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mb-4 overflow-hidden shadow-sm border-2 border-white">
                  {avatarBase64 ? (
                    <img src={avatarBase64} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10" />
                  )}
                </div>
                {!firstName && !lastName ? (
                  <>
                    <p className="font-bold text-gray-900 text-sm">No patient added yet</p>
                    <p className="text-xs text-gray-500 mt-1">Fill in the form to see patient details summary.</p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-gray-900 text-lg">{firstName} {lastName}</p>
                    <p className="text-xs text-gray-500 mt-1">{phone || 'No phone'}</p>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-500 gap-2">
                    <User className="w-4 h-4 text-blue-500" />
                    Patient ID
                  </div>
                  <span className="font-medium text-gray-900">-</span>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-500 gap-2">
                    <User className="w-4 h-4 text-blue-500" />
                    Name
                  </div>
                  <span className="font-medium text-gray-900 max-w-[120px] truncate">{firstName ? `${firstName} ${lastName}` : '-'}</span>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-500 gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    Phone
                  </div>
                  <span className="font-medium text-gray-900">{phone || '-'}</span>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-500 gap-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    Date of Birth
                  </div>
                  <span className="font-medium text-gray-900">{dob ? new Date(dob).toLocaleDateString() : '-'}</span>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-500 gap-2">
                    <User className="w-4 h-4 text-blue-500" />
                    Gender
                  </div>
                  <span className="font-medium text-gray-900">{gender || '-'}</span>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-500 gap-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    Blood Group
                  </div>
                  <span className="font-medium text-gray-900">{bloodGroup || '-'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500 gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    Address
                  </div>
                  <span className="font-medium text-gray-900 max-w-[120px] truncate">{addressLine1 || '-'}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)]">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <button onClick={onClose} className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-white transition-colors">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">Show in List</p>
                      <p className="text-[11px] text-gray-500">View all registered patients</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-white transition-colors">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">Add Appointment</p>
                      <p className="text-[11px] text-gray-500">Schedule appointment for patient</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-white transition-colors">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">Print Patient Card</p>
                      <p className="text-[11px] text-gray-500">Generate and print patient card</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
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
          font-size: 0.875rem;
          padding-left: 0.5rem;
        }
        .custom-phone-input .PhoneInputCountry {
          padding-right: 0.5rem;
          border-right: 1px solid #e5e7eb;
        }
      `}} />
    </div>
  );
}
