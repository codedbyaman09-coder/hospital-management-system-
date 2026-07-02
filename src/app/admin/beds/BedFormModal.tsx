"use client";

import React, { useState } from 'react';
import { Menu, ChevronRight, BedDouble, Save, X } from 'lucide-react';

export default function BedFormModal({ onClose, onSave, initialData }: { onClose: () => void, onSave: (data: any) => void, initialData?: any }) {
  const [formData, setFormData] = useState({
    bedNumber: initialData?.bedNumber || '',
    roomNumber: initialData?.roomNumber || '',
    roomType: initialData?.roomType || 'Select type',
    status: initialData?.status || 'Select status',
    patientName: initialData?.patientName || ''
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.roomType === 'Select type' || formData.status === 'Select status' || !formData.bedNumber || !formData.roomNumber) {
      return;
    }
    setSubmitting(true);
    await onSave({ ...formData, id: initialData?.id });
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
      
      {/* Left Form Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50 relative">
        <div className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-[16px] font-bold text-gray-900">{initialData ? 'Edit Bed/Room' : 'Add New Bed'}</h2>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
                <span>Beds & Rooms</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#5e35b1] font-medium">{initialData ? 'Edit' : 'Create'}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-8 pb-20">
            <form id="bed-form" onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#5e35b1]"></div>
              
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <BedDouble className="w-5 h-5 text-[#5e35b1]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Bed Information</h3>
                  <p className="text-[11px] text-gray-500">Provide the room and bed details.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">Bed Number <span className="text-red-500">*</span></label>
                  <input required type="text" name="bedNumber" value={formData.bedNumber} onChange={handleChange} placeholder="e.g. B-101" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] font-medium outline-none focus:border-[#5e35b1] focus:ring-1 focus:ring-[#5e35b1] transition-shadow" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">Room Number <span className="text-red-500">*</span></label>
                  <input required type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} placeholder="e.g. 101" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] font-medium outline-none focus:border-[#5e35b1] focus:ring-1 focus:ring-[#5e35b1] transition-shadow" />
                </div>
                
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">Room Type <span className="text-red-500">*</span></label>
                  <select name="roomType" value={formData.roomType} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] font-medium outline-none focus:border-[#5e35b1] focus:ring-1 focus:ring-[#5e35b1] appearance-none bg-white">
                    <option disabled>Select type</option>
                    <option>General</option>
                    <option>ICU</option>
                    <option>Private</option>
                    <option>VIP</option>
                    <option>Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">Status <span className="text-red-500">*</span></label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] font-medium outline-none focus:border-[#5e35b1] focus:ring-1 focus:ring-[#5e35b1] appearance-none bg-white">
                    <option disabled>Select status</option>
                    <option>Available</option>
                    <option>Occupied</option>
                    <option>Maintenance</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-[11px] font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">Patient Name (If Occupied)</label>
                  <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} disabled={formData.status !== 'Occupied'} placeholder="Enter patient name..." className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] font-medium outline-none focus:border-[#5e35b1] focus:ring-1 focus:ring-[#5e35b1] transition-shadow disabled:bg-gray-50 disabled:text-gray-400" />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer actions */}
        <div className="h-16 bg-white border-t border-gray-100 flex items-center justify-end px-6 shrink-0 gap-3 shadow-[0_-4px_15px_rgb(0,0,0,0.02)] z-20">
          <button type="button" onClick={onClose} className="px-5 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button form="bed-form" type="submit" disabled={submitting || formData.roomType === 'Select type' || formData.status === 'Select status' || !formData.bedNumber || !formData.roomNumber} className="px-5 py-2 bg-[#5e35b1] text-white rounded-lg text-sm font-bold hover:bg-[#512da8] transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50">
            {submitting ? 'Saving...' : <><Save className="w-4 h-4" /> Save Bed</>}
          </button>
        </div>
      </div>
      
      {/* Right Column Summary (matches Doctor form layout) */}
      <div className="w-full md:w-[380px] bg-white border-l border-gray-100 h-full hidden lg:flex flex-col z-20">
        <div className="h-16 border-b border-gray-100 flex items-center px-6 shrink-0 bg-white">
          <h3 className="text-sm font-bold text-gray-900">Bed Preview</h3>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-purple-50 flex items-center justify-center relative mb-4">
              <BedDouble className="w-10 h-10 text-[#5e35b1]" />
            </div>
            <h4 className="font-bold text-lg text-gray-900">{formData.bedNumber || 'New Bed'}</h4>
            <p className="text-sm text-gray-500 font-medium mt-1">Room {formData.roomNumber || '-'}</p>
            <span className={`mt-3 inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${
                formData.status === 'Available' ? 'bg-green-50 text-green-500' :
                formData.status === 'Occupied' ? 'bg-red-50 text-red-500' : 
                formData.status === 'Maintenance' ? 'bg-orange-50 text-orange-500' :
                'bg-gray-100 text-gray-500'
              }`}>{formData.status}</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200/60">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Room Type</span>
              <span className="text-[12px] font-semibold text-gray-900">{formData.roomType}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200/60">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Patient</span>
              <span className="text-[12px] font-semibold text-gray-900">{formData.patientName || '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

