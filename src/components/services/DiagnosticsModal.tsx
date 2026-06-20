import React from 'react';
import Image from 'next/image';
import { X, CheckCircle2, Calendar, Clock, Activity, Users, Star, Award, PhoneCall, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../../data/servicesData';

interface DiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem | null;
}

export default function DiagnosticsModal({ isOpen, onClose, service }: DiagnosticsModalProps) {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-5xl bg-[#f8fafd] rounded-[24px] shadow-2xl relative animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Sticky Top */}
        <div className="flex items-start justify-between p-6 md:p-8 bg-white border-b border-gray-100 sticky top-0 z-20">
          <div>
            <h2 className="text-[28px] md:text-[32px] font-bold text-[#0B2D5B] leading-tight mb-1">
              {service.title}
            </h2>
            <p className="text-gray-500 text-[14px] md:text-[15px] max-w-2xl">
              {service.description}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-[#0CAEA3] transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-grow p-6 md:p-8 custom-scrollbar">
          
          {/* Hero Section */}
          <div className="w-full h-[250px] md:h-[350px] relative rounded-2xl overflow-hidden shadow-md mb-10 bg-gray-100">
            <Image 
              src={service.image} 
              alt={service.title} 
              fill 
              className="object-cover"
            />
          </div>

          {/* Information Cards (2 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Services Included */}
            <div className="bg-white/80 backdrop-blur-md border border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl p-6 md:p-8">
              <h3 className="text-[20px] font-bold text-[#0B2D5B] mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-[#0CAEA3]" />
                Services Included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2">
                {[
                  "MRI Scan", "CT Scan", "X-Ray Imaging", "Ultrasound",
                  "Laboratory Tests", "Blood Tests", "ECG", "Preventive Health Screening"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0CAEA3] flex-shrink-0" />
                    <span className="text-gray-700 text-[14px] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Our Diagnostics */}
            <div className="bg-white/80 backdrop-blur-md border border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl p-6 md:p-8">
              <h3 className="text-[20px] font-bold text-[#0B2D5B] mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-[#0CAEA3]" />
                Why Choose Us
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  "Latest Imaging Technology", "Accurate Reports", "Experienced Specialists",
                  "Fast Turnaround Time", "Safe Procedures", "Personalized Care"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#0CAEA3] flex-shrink-0"></div>
                    <span className="text-gray-700 text-[14px] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Activity, value: "50,000+", label: "Diagnostic Tests" },
              { icon: Star, value: "98%", label: "Patient Satisfaction" },
              { icon: Clock, value: "24/7", label: "Support & Care" },
              { icon: Award, value: "15+ Years", label: "Medical Experience" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-50 flex flex-col items-center hover:shadow-md transition">
                <div className="w-12 h-12 rounded-full bg-[#e6f7f6] flex items-center justify-center mb-3">
                  <stat.icon className="w-6 h-6 text-[#0CAEA3]" />
                </div>
                <h4 className="text-[22px] font-bold text-[#0B2D5B] mb-1">{stat.value}</h4>
                <p className="text-gray-500 text-[12px] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Process Timeline */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-50 mb-10 overflow-hidden">
            <h3 className="text-[20px] font-bold text-[#0B2D5B] mb-8 text-center">Our Process</h3>
            <div className="relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-6 left-0 right-0 h-[2px] bg-gray-100 z-0 mx-10"></div>
              
              <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4 relative z-10">
                {[
                  "Book Appointment", "Consultation", "Diagnostic Test", 
                  "Report Generation", "Doctor Review", "Treatment Guidance"
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-row md:flex-col items-center text-center gap-4 md:gap-3 flex-1 relative">
                    {/* Connecting Line (Mobile) */}
                    {idx !== 5 && <div className="md:hidden absolute top-10 left-6 bottom-[-30px] w-[2px] bg-gray-100 z-0"></div>}
                    
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-[#0CAEA3] text-[#0CAEA3] font-bold flex items-center justify-center shadow-sm z-10 flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-[#0B2D5B] text-[13px] font-bold text-left md:text-center leading-tight">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timings & CTA Container */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Timings */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-50 flex-[0.7]">
              <h3 className="text-[18px] font-bold text-[#0B2D5B] mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0CAEA3]" />
                Available Timings
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-600 font-medium text-[14px]">Monday – Saturday</span>
                  <span className="text-[#0B2D5B] font-bold text-[14px]">8:00 AM – 9:00 PM</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-600 font-medium text-[14px] flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    Emergency Diagnostics
                  </span>
                  <span className="text-[#0CAEA3] font-bold text-[14px]">24/7 Available</span>
                </div>
              </div>
            </div>

            {/* Gradient Bottom CTA */}
            <div className="bg-gradient-to-r from-[#0B2D5B] to-[#0CAEA3] rounded-2xl p-6 md:p-8 shadow-lg flex-[1.3] flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10">
                <Activity className="w-48 h-48 -mr-10 -mt-10" />
              </div>
              <div className="relative z-10">
                <h3 className="text-white text-[24px] font-bold mb-2">Need a Diagnostic Test?</h3>
                <p className="text-blue-50 text-[14px] leading-relaxed mb-6 max-w-md">
                  Book your appointment today and receive fast, accurate, and reliable diagnostic services from our experts.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-white text-[#0B2D5B] hover:bg-gray-50 px-6 py-3 rounded-xl text-[14px] font-bold transition shadow-sm flex items-center gap-2">
                    Book Appointment <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3 rounded-xl text-[14px] font-bold transition flex items-center gap-2">
                    <PhoneCall className="w-4 h-4" /> Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
