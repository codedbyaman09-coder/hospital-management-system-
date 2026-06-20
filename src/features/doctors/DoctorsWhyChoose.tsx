"use client";

import Image from "next/image";

import { Award, HeartHandshake, Activity, Heart } from "lucide-react";

export default function DoctorsWhyChoose() {
  return (
    <section className="bg-white py-16 w-full mt-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Why Choose Our Doctors Container */}
        <div className="bg-[#f8fafd] rounded-xl p-8 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden mb-12">
          <div className="text-center mb-10">
            <h2 className="text-[#0a2b4e] text-[22px] md:text-[26px] font-bold">Why Choose Our Doctors?</h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="h-[1px] w-12 bg-[#009e90]/30"></div>
              <HeartIcon />
              <div className="h-[1px] w-12 bg-[#009e90]/30"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-4">
                <Award className="w-8 h-8 text-[#009e90]" />
              </div>
              <h3 className="text-[#0a2b4e] font-bold text-[15px] mb-2">Qualified Experts</h3>
              <p className="text-gray-500 text-[12px] leading-relaxed max-w-[200px]">
                All our doctors are highly qualified and experienced in their fields.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-4">
                <HeartHandshake className="w-8 h-8 text-[#009e90]" />
              </div>
              <h3 className="text-[#0a2b4e] font-bold text-[15px] mb-2">Patient Focused</h3>
              <p className="text-gray-500 text-[12px] leading-relaxed max-w-[200px]">
                We prioritize patient care and ensure personalized treatment.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-4">
                <Activity className="w-8 h-8 text-[#009e90]" />
              </div>
              <h3 className="text-[#0a2b4e] font-bold text-[15px] mb-2">Advanced Treatment</h3>
              <p className="text-gray-500 text-[12px] leading-relaxed max-w-[200px]">
                Using modern technology for accurate diagnosis and treatment.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-4">
                <Heart className="w-8 h-8 text-[#009e90]" />
              </div>
              <h3 className="text-[#0a2b4e] font-bold text-[15px] mb-2">Compassionate Care</h3>
              <p className="text-gray-500 text-[12px] leading-relaxed max-w-[200px]">
                We care for our patients with compassion and respect.
              </p>
            </div>
          </div>
        </div>

        {/* Need an Appointment Banner */}
        <div className="rounded-xl overflow-hidden relative flex flex-col md:flex-row items-stretch border border-gray-100 shadow-sm mt-8 min-h-[160px]">
          
          {/* Left section: Dark Blue */}
          <div className="flex-[1.5] bg-[#094170] relative flex items-center overflow-hidden py-8 md:py-0">
            {/* ECG line SVG overlay */}
            <div className="absolute inset-0 z-0 opacity-20 flex items-center w-full">
              <svg width="100%" height="60" viewBox="0 0 1000 60" preserveAspectRatio="none" fill="none">
                <path d="M0,30 L300,30 L315,10 L330,50 L345,5 L360,45 L375,30 L1000,30" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
            
            <div className="relative z-10 px-8 md:pl-12 w-full">
              <h3 className="text-white text-[24px] md:text-[28px] font-bold mb-2">Need an Appointment?</h3>
              <p className="text-blue-100/80 text-[14px] leading-relaxed max-w-[400px]">
                Book an appointment with our specialist doctors and get the best healthcare services.
              </p>
            </div>
          </div>

          {/* Right section: Doctor Image & Teal strip (Desktop) */}
          <div className="hidden md:flex flex-1 relative max-w-[350px]">
             {/* The image container */}
             <div className="flex-1 bg-[#f1f4f6] relative h-full">
               <Image 
                 src="/images/doc_gyne.png" 
                 alt="Doctor" 
                 fill 
                 className="object-cover object-top"
               />
             </div>
             
             {/* Teal strip */}
             <div className="w-10 bg-[#009e90]"></div>

             {/* Overlapping Button */}
             <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <button 
                  onClick={() => window.dispatchEvent(new Event('open-appointment-modal'))}
                  className="bg-white text-[#0a2b4e] px-5 py-3 rounded-md text-[14px] font-bold shadow-md flex items-center gap-2 hover:bg-gray-50 transition whitespace-nowrap"
                >
                  Book Appointment Now <span className="text-gray-400 ml-1">→</span>
                </button>
             </div>
          </div>

          {/* Mobile Button (shown only on small screens) */}
          <div className="md:hidden bg-[#094170] px-8 pb-8 relative z-10">
             <button 
                onClick={() => window.dispatchEvent(new Event('open-appointment-modal'))}
                className="bg-white text-[#0a2b4e] w-full py-3 rounded-md text-[14px] font-bold shadow-md flex justify-center items-center gap-2"
              >
                Book Appointment Now <span className="text-gray-400 ml-1">→</span>
              </button>
          </div>
        </div>

      </div>
    </section>
  );
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#009e90"/>
    </svg>
  );
}
