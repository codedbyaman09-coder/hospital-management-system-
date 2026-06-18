"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Clock, User, Phone, Mail, Activity } from "lucide-react";

export default function AppointmentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsSuccess(false);
    };
    
    window.addEventListener("open-appointment-modal", handleOpen);
    return () => window.removeEventListener("open-appointment-modal", handleOpen);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0a2b4e]/60 backdrop-blur-sm transition-opacity"
        onClick={() => !isSubmitting && setIsOpen(false)}
      ></div>

      {/* Modal Container */}
      <div className="bg-white rounded-2xl w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <button 
          onClick={() => !isSubmitting && setIsOpen(false)}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 transition z-20"
        >
          <X className="w-6 h-6" strokeWidth={1.5} />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side - Info */}
          <div className="bg-[#0a2b4e] p-8 text-white md:w-2/5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#009e90]/20 rounded-full -ml-20 -mb-20 blur-xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3">Book Your Appointment</h3>
              <p className="text-blue-100 text-[14px] leading-relaxed mb-8">
                Get the care you need, when you need it. Fill out the form to schedule a consultation with our experts.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-blue-50">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+1 (800) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-50">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>appointments@citycare.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-8 md:w-3/5 bg-gray-50/50">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-[#d1fae5] rounded-full flex items-center justify-center mb-4">
                  <Activity className="w-8 h-8 text-[#10b981]" strokeWidth={2} />
                </div>
                <h4 className="text-xl font-bold text-[#0a2b4e] mb-2">Request Submitted!</h4>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">
                  Our team will contact you shortly to confirm your appointment details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input required type="text" placeholder="John Doe" className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009e90]/20 focus:border-[#009e90] transition" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input required type="tel" placeholder="(123) 456-7890" className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009e90]/20 focus:border-[#009e90] transition" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</label>
                    <select required className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009e90]/20 focus:border-[#009e90] transition appearance-none cursor-pointer">
                      <option value="">Select a department...</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="neurology">Neurology</option>
                      <option value="orthopedics">Orthopedics</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="general">General Checkup</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input required type="email" placeholder="john@example.com" className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009e90]/20 focus:border-[#009e90] transition" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input required type="date" className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009e90]/20 focus:border-[#009e90] transition" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Preferred Time</label>
                    <div className="relative">
                      <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select required className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009e90]/20 focus:border-[#009e90] transition appearance-none cursor-pointer">
                        <option value="">Select time...</option>
                        <option value="morning">Morning (9AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 4PM)</option>
                        <option value="evening">Evening (4PM - 7PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Message / Reason for Visit</label>
                  <textarea rows={2} placeholder="Briefly describe your symptoms or reason for visiting..." className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009e90]/20 focus:border-[#009e90] transition resize-none"></textarea>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#0a2b4e] hover:bg-[#061d36] text-white py-3 rounded-xl text-sm font-bold transition shadow-md shadow-blue-900/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      "Confirm Appointment"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
