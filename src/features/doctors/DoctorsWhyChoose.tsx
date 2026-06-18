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
        <div className="bg-[#0a4276] rounded-xl overflow-hidden relative min-h-[140px] flex items-center">
          {/* Background Gradient/Decoration */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0a4276] via-[#0a4276] to-[#009e90]/90"></div>
          
          <div className="absolute inset-0 z-0 opacity-20 flex items-center justify-center">
            <svg width="100%" height="60" viewBox="0 0 1000 60" preserveAspectRatio="none" fill="none">
              <path d="M0,30 L300,30 L315,10 L330,50 L345,5 L360,45 L375,30 L1000,30" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full p-8 md:px-12 gap-6">
            <div className="text-white max-w-md">
              <h3 className="text-[24px] font-bold mb-2">Need an Appointment?</h3>
              <p className="text-blue-100/80 text-[13px] leading-relaxed">
                Book an appointment with our specialist doctors and get the best healthcare services.
              </p>
            </div>

            <div className="flex-shrink-0 md:mr-32 relative z-20">
              <button 
                onClick={() => window.dispatchEvent(new Event('open-appointment-modal'))}
                className="bg-white text-[#0a2b4e] px-6 py-3 rounded-md text-[14px] font-bold transition flex items-center gap-2 hover:bg-gray-50"
              >
                Book Appointment Now <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>

          {/* Doctor Image overlapping right side */}
          <div className="hidden md:block absolute right-4 bottom-0 w-[180px] h-[160px] z-10 pointer-events-none">
            <Image 
              src="/images/doc_gyne.png" 
              alt="Doctor" 
              fill 
              sizes="(max-width: 768px) 100vw, 180px"
              className="object-contain object-bottom"
            />
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
