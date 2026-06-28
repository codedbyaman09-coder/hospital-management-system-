/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useMemo } from 'react';
import {
  Calendar, Clock, ChevronDown, Plus, Search, X, User,
  Building, Stethoscope, FileText, CreditCard, CheckCircle,
  ClipboardList, MessageSquare, ChevronRight, CalendarPlus
} from 'lucide-react';

interface NewAppointmentFormProps {
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreated: (data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any | null;
}

const departments = [
  'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Gynecology',
  'Dermatology', 'Dental Care', 'Urology', 'ENT', 'Ophthalmology',
  'Gastroenterology', 'Pulmonology', 'Emergency Care'
];

const doctorsByDept: Record<string, { name: string; avatar: string }[]> = {
  'Cardiology': [
    { name: 'Dr. Sarah Khan', avatar: 'https://i.pravatar.cc/150?u=11' },
    { name: 'Dr. Bilal Ahmed', avatar: 'https://i.pravatar.cc/150?u=16' },
  ],
  'Neurology': [
    { name: 'Dr. Usman Ali', avatar: 'https://i.pravatar.cc/150?u=12' },
  ],
  'Orthopedics': [
    { name: 'Dr. Maria Khan', avatar: 'https://i.pravatar.cc/150?u=15' },
  ],
  'Pediatrics': [
    { name: 'Dr. Ayesha Malik', avatar: 'https://i.pravatar.cc/150?u=14' },
  ],
  'Gynecology': [
    { name: 'Dr. Ayesha Malik', avatar: 'https://i.pravatar.cc/150?u=14' },
  ],
  'Dermatology': [
    { name: 'Dr. Hamza Qureshi', avatar: 'https://i.pravatar.cc/150?u=13' },
  ],
  'Dental Care': [
    { name: 'Dr. Bilal Ahmed', avatar: 'https://i.pravatar.cc/150?u=16' },
  ],
  'Urology': [
    { name: 'Dr. Usman Ali', avatar: 'https://i.pravatar.cc/150?u=12' },
  ],
  'ENT': [
    { name: 'Dr. Sarah Khan', avatar: 'https://i.pravatar.cc/150?u=11' },
  ],
  'Ophthalmology': [
    { name: 'Dr. Maria Khan', avatar: 'https://i.pravatar.cc/150?u=15' },
  ],
  'Gastroenterology': [
    { name: 'Dr. Hamza Qureshi', avatar: 'https://i.pravatar.cc/150?u=13' },
  ],
  'Pulmonology': [
    { name: 'Dr. Usman Ali', avatar: 'https://i.pravatar.cc/150?u=12' },
  ],
  'Emergency Care': [
    { name: 'Dr. Sarah Khan', avatar: 'https://i.pravatar.cc/150?u=11' },
    { name: 'Dr. Usman Ali', avatar: 'https://i.pravatar.cc/150?u=12' },
    { name: 'Dr. Maria Khan', avatar: 'https://i.pravatar.cc/150?u=15' },
  ],
};

const appointmentTypes = [
  'First Visit', 'Follow Up', 'Consultation', 'Emergency', 'Surgery', 'Lab Test', 'Routine Checkup'
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
  '11:30 AM', '12:00 PM', '01:00 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM'
];

const visitReasons = [
  'Fever', 'Headache', 'Chest Pain', 'Body Pain', 'Pregnancy Checkup',
  'Child Checkup', 'Dental Problem', 'Skin Problem', 'Eye Problem',
  'Emergency Case', 'Other'
];

const paymentStatuses = ['Paid', 'Unpaid', 'Pending'];

const appointmentStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled', 'No Show'];

const existingPatients = [
  { name: 'Ali Raza', phone: '+92 310 1122334', avatar: 'https://i.pravatar.cc/150?u=21' },
  { name: 'Fatima Noor', phone: '+92 311 2233445', avatar: 'https://i.pravatar.cc/150?u=22' },
  { name: 'Ahmed Hassan', phone: '+92 312 3344556', avatar: 'https://i.pravatar.cc/150?u=23' },
  { name: 'Ayesha Malik', phone: '+92 313 4455667', avatar: 'https://i.pravatar.cc/150?u=24' },
  { name: 'Bilal Tariq', phone: '+92 314 5566778', avatar: 'https://i.pravatar.cc/150?u=25' },
  { name: 'Hina Shah', phone: '+92 315 6677889', avatar: 'https://i.pravatar.cc/150?u=26' },
  { name: 'Omar Farooq', phone: '+92 316 7788990', avatar: 'https://i.pravatar.cc/150?u=27' },
  { name: 'Sana Javed', phone: '+92 317 8899001', avatar: 'https://i.pravatar.cc/150?u=28' },
];

export default function NewAppointmentForm({ onClose, onCreated, initialData }: NewAppointmentFormProps) {
  // Patient
  const [patientSearch, setPatientSearch] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPatient, setSelectedPatient] = useState<any | null>(initialData ? {
    id: initialData.id || 'P-UNKNOWN',
    name: initialData.patient || initialData.patientName || 'Unknown Patient',
    phone: 'Unknown',
    email: 'unknown@example.com',
    avatar: initialData.avatar || 'https://i.pravatar.cc/150'
  } : null);
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);

  // Appointment Details
  const [department, setDepartment] = useState(initialData?.dept || '');
  const [doctor, setDoctor] = useState(initialData?.doctor || '');
  const [doctorAvatar, setDoctorAvatar] = useState(initialData?.dAvatar || '');
  const [appointmentType, setAppointmentType] = useState('Checkup');
  const [appointmentDate, setAppointmentDate] = useState(initialData?.date || '');
  const [appointmentTime, setAppointmentTime] = useState(initialData?.time || '');
  const [visitReason, setVisitReason] = useState('General Consultation');
  const [paymentStatus, setPaymentStatus] = useState(initialData?.payment || '');
  const [appointmentStatus, setAppointmentStatus] = useState(initialData?.status || '');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [estimatedFees] = useState('Rs. 1,000');

  // Dropdown states
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showReasonDropdown, setShowReasonDropdown] = useState(false);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const filteredPatients = useMemo(() => {
    if (!patientSearch.trim()) return existingPatients;
    const q = patientSearch.toLowerCase();
    return existingPatients.filter(p =>
      p.name.toLowerCase().includes(q) || p.phone.includes(q)
    );
  }, [patientSearch]);

  const availableDoctors = useMemo(() => {
    return doctorsByDept[department as keyof typeof doctorsByDept] || [];
  }, [department]);

  const closeAllDropdowns = () => {
    setShowPatientDropdown(false);
    setShowDeptDropdown(false);
    setShowDoctorDropdown(false);
    setShowTypeDropdown(false);
    setShowTimeDropdown(false);
    setShowReasonDropdown(false);
    setShowPaymentDropdown(false);
    setShowStatusDropdown(false);
  };

  const handleSubmit = async () => {
    if (!selectedPatient || !department || !doctor || !appointmentDate || !appointmentTime || !appointmentStatus) {
      return;
    }

    setSubmitting(true);

    const appointmentData = {
      patientName: selectedPatient.name,
      phone: selectedPatient.phone,
      pAvatar: selectedPatient.avatar,
      doctorName: doctor,
      docQual: 'MBBS',
      dAvatar: doctorAvatar || 'https://i.pravatar.cc/150',
      dept: department,
      date: appointmentDate,
      time: appointmentTime,
      status: appointmentStatus || 'Pending',
      payment: paymentStatus || 'Pending',
      amount: parseInt(estimatedFees.replace(/,/g, '')) || 2500,
    };

    if (initialData) {
      onCreated({ ...initialData, ...appointmentData });
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
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

  // Format date for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-[#f0f4f8] min-h-full flex flex-col animate-in fade-in duration-200" onClick={() => closeAllDropdowns()}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{initialData ? 'Edit Appointment' : 'New Appointment'}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
            <button onClick={onClose} className="text-blue-600 hover:underline font-medium">Appointments</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-700 font-medium">{initialData ? 'Edit Appointment' : 'New Appointment'}</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex flex-col xl:flex-row gap-6">

            {/* ========== LEFT: FORM ========== */}
            <div className="flex-1 space-y-6">

              {/* Section 1: Patient Information */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</div>
                  <h2 className="text-lg font-bold text-blue-700">Patient Information</h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  {/* Patient Search */}
                  <div className="flex-1 relative w-full">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Patient <span className="text-red-500">*</span></label>
                    <div
                      className="relative"
                      onClick={(e) => { e.stopPropagation(); setShowPatientDropdown(true); }}
                    >
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search existing patient by name or mobile number..."
                        value={selectedPatient ? selectedPatient.name : patientSearch}
                        onChange={(e) => {
                          setPatientSearch(e.target.value);
                          setSelectedPatient(null);
                          setShowPatientDropdown(true);
                        }}
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
                      />
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>

                    {showPatientDropdown && (
                      <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                        {filteredPatients.map((p, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPatient(p);
                              setPatientSearch('');
                              setShowPatientDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left border-b border-gray-50 last:border-0"
                          >
                            <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-full object-cover" />
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{p.name}</p>
                              <p className="text-xs text-gray-500">{p.phone}</p>
                            </div>
                          </button>
                        ))}
                        {filteredPatients.length === 0 && (
                          <div className="px-4 py-6 text-center text-sm text-gray-500">No patients found</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Add New Patient */}
                  <div className="shrink-0 pt-7">
                    <button className="flex items-center gap-2 px-5 py-3 border-2 border-blue-600 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap">
                      <Plus className="w-4 h-4" />
                      Add New Patient
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 2: Appointment Details */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">2</div>
                  <h2 className="text-lg font-bold text-green-700">Appointment Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                  {/* Department */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Department <span className="text-red-500">*</span></label>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); closeAllDropdowns(); setShowDeptDropdown(!showDeptDropdown); }}
                      className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
                    >
                      <span className={department ? 'text-gray-800' : 'text-gray-400'}>{department || 'Select Department'}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    {showDeptDropdown && (
                      <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
                        <div className="px-4 py-2.5 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50 rounded-t-xl border-b">Select Department</div>
                        {departments.map(d => (
                          <button
                            key={d}
                            onClick={(e) => { e.stopPropagation(); setDepartment(d); setDoctor(''); setDoctorAvatar(''); setShowDeptDropdown(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors ${department === d ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700'}`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Doctor */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Doctor <span className="text-red-500">*</span></label>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); closeAllDropdowns(); setShowDoctorDropdown(!showDoctorDropdown); }}
                      className={`w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white ${!department ? 'opacity-60 cursor-not-allowed' : ''}`}
                      disabled={!department}
                    >
                      <span className={doctor ? 'text-gray-800' : 'text-gray-400'}>{doctor || (department ? 'Select Doctor' : 'Select Department First')}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    {showDoctorDropdown && department && (
                      <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
                        <div className="px-4 py-2.5 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50 rounded-t-xl border-b">Select Doctor</div>
                        {availableDoctors.length > 0 ? (
                          <div className="p-2">
                            <p className="px-2 py-1 text-xs text-gray-400 mb-1">
                              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                              Doctors will be shown after selecting department
                            </p>
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {availableDoctors.map((doc: any, i) => (
                              <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setDoctor(doc.name); setDoctorAvatar(doc.avatar); setShowDoctorDropdown(false); }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-left ${doctor === doc.name ? 'bg-blue-50' : ''}`}
                              >
                                <img src={doc.avatar} alt={doc.name} className="w-8 h-8 rounded-full object-cover" />
                                <span className={`text-sm ${doctor === doc.name ? 'text-blue-700 font-semibold' : 'text-gray-700'}`}>{doc.name}</span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="px-4 py-4 text-sm text-gray-500 text-center">No doctors in this department</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Appointment Type */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Appointment Type <span className="text-red-500">*</span></label>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); closeAllDropdowns(); setShowTypeDropdown(!showTypeDropdown); }}
                      className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
                    >
                      <span className={appointmentType ? 'text-gray-800' : 'text-gray-400'}>{appointmentType || 'Select Appointment Type'}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    {showTypeDropdown && (
                      <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
                        <div className="px-4 py-2.5 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50 rounded-t-xl border-b">Select Appointment Type</div>
                        {appointmentTypes.map(t => (
                          <button
                            key={t}
                            onClick={(e) => { e.stopPropagation(); setAppointmentType(t); setShowTypeDropdown(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors ${appointmentType === t ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Appointment Date */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Appointment Date <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Appointment Time */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Appointment Time <span className="text-red-500">*</span></label>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); closeAllDropdowns(); setShowTimeDropdown(!showTimeDropdown); }}
                      className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
                    >
                      <span className={appointmentTime ? 'text-gray-800' : 'text-gray-400'}>{appointmentTime || 'Select Time'}</span>
                      <Clock className="w-4 h-4 text-gray-400" />
                    </button>
                    {showTimeDropdown && (
                      <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
                        <div className="px-4 py-2.5 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50 rounded-t-xl border-b">Select Time</div>
                        {timeSlots.map(t => (
                          <button
                            key={t}
                            onClick={(e) => { e.stopPropagation(); setAppointmentTime(t); setShowTimeDropdown(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 ${appointmentTime === t ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700'}`}
                          >
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Visit Reason */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Visit Reason <span className="text-red-500">*</span></label>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); closeAllDropdowns(); setShowReasonDropdown(!showReasonDropdown); }}
                      className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
                    >
                      <span className={visitReason ? 'text-gray-800' : 'text-gray-400'}>{visitReason || 'Select Visit Reason'}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    {showReasonDropdown && (
                      <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
                        <div className="px-4 py-2.5 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50 rounded-t-xl border-b">Select Visit Reason</div>
                        {visitReasons.map(r => (
                          <button
                            key={r}
                            onClick={(e) => { e.stopPropagation(); setVisitReason(r); setShowReasonDropdown(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors ${visitReason === r ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700'}`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Payment Status */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Status <span className="text-red-500">*</span></label>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); closeAllDropdowns(); setShowPaymentDropdown(!showPaymentDropdown); }}
                      className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
                    >
                      <span className={paymentStatus ? 'text-gray-800' : 'text-gray-400'}>{paymentStatus || 'Select Payment Status'}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    {showPaymentDropdown && (
                      <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg">
                        <div className="px-4 py-2.5 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50 rounded-t-xl border-b">Select Payment Status</div>
                        {paymentStatuses.map(s => (
                          <button
                            key={s}
                            onClick={(e) => { e.stopPropagation(); setPaymentStatus(s); setShowPaymentDropdown(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors ${paymentStatus === s ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Appointment Status */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Appointment Status <span className="text-red-500">*</span></label>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); closeAllDropdowns(); setShowStatusDropdown(!showStatusDropdown); }}
                      className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
                    >
                      <span className={appointmentStatus ? 'text-gray-800' : 'text-gray-400'}>{appointmentStatus || 'Select Appointment Status'}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    {showStatusDropdown && (
                      <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg">
                        <div className="px-4 py-2.5 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50 rounded-t-xl border-b">Select Appointment Status</div>
                        {appointmentStatuses.map(s => (
                          <button
                            key={s}
                            onClick={(e) => { e.stopPropagation(); setAppointmentStatus(s); setShowStatusDropdown(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors ${appointmentStatus === s ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Additional Notes - Full width */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                    <textarea
                      rows={3}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Enter any additional notes..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-4 pb-6">
                <button
                  onClick={onClose}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !selectedPatient || !department || !doctor || !appointmentDate || !appointmentTime || !appointmentStatus}
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CalendarPlus className="w-4 h-4" />
                  {submitting ? 'Processing...' : (initialData ? 'Update Appointment' : 'Create Appointment')}
                </button>
              </div>
            </div>

            {/* ========== RIGHT: APPOINTMENT SUMMARY ========== */}
            <div className="xl:w-[340px] shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">
                <h3 className="text-lg font-bold text-blue-700 mb-6">Appointment Summary</h3>

                {/* Patient Avatar & Icons */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                      {selectedPatient ? (
                        <img src={selectedPatient.avatar} alt={selectedPatient.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-blue-400" />
                      )}
                    </div>
                    {/* Clock badge */}
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-md border-2 border-white">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    {/* QR-like pattern badge */}
                    <div className="absolute -top-1 -right-3 w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-0.5">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-[1px] ${i % 3 === 0 ? 'bg-gray-800' : 'bg-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Items */}
                <div className="space-y-4">
                  <SummaryRow icon={<User className="w-4 h-4" />} label="Patient" value={selectedPatient?.name || '-'} />
                  <SummaryRow icon={<Building className="w-4 h-4" />} label="Department" value={department || '-'} />
                  <SummaryRow icon={<Stethoscope className="w-4 h-4" />} label="Doctor" value={doctor || '-'} />
                  <SummaryRow icon={<Calendar className="w-4 h-4" />} label="Date" value={appointmentDate ? formatDate(appointmentDate) : '-'} />
                  <SummaryRow icon={<Clock className="w-4 h-4" />} label="Time" value={appointmentTime || '-'} />
                  <SummaryRow icon={<FileText className="w-4 h-4" />} label="Type" value={appointmentType || '-'} />
                  <SummaryRow icon={<MessageSquare className="w-4 h-4" />} label="Visit Reason" value={visitReason || '-'} />
                  <SummaryRow icon={<CreditCard className="w-4 h-4" />} label="Payment Status" value={paymentStatus || '-'} />
                  <SummaryRow icon={<CheckCircle className="w-4 h-4" />} label="Appointment Status" value={appointmentStatus || '-'} />
                  <SummaryRow icon={<ClipboardList className="w-4 h-4" />} label="Estimated Fees" value={`Rs. ${estimatedFees}`} />
                </div>

                {/* Note */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-xs text-blue-700 font-medium leading-relaxed">
                    <span className="font-bold">Note:</span> The appointment will be confirmed after saving the details.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <span className={`text-sm font-semibold ${value === '-' ? 'text-gray-300' : 'text-gray-800'}`}>{value}</span>
    </div>
  );
}
