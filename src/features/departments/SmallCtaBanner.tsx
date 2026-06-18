"use client";

import Image from "next/image";

export default function SmallCtaBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-[#eef5fa] to-[#dbeefa] relative overflow-hidden pb-4 md:pb-0">
      {/* Decorative faint background wave/pulse */}
      <div className="absolute inset-0 z-0 opacity-40">
         <svg className="w-full h-full object-cover" preserveAspectRatio="none" viewBox="0 0 1000 100">
           <path d="M0,50 Q250,10 500,50 T1000,50" fill="none" stroke="#009e90" strokeWidth="1.5" />
           <path d="M0,60 Q250,20 500,60 T1000,60" fill="none" stroke="#009e90" strokeWidth="0.5" />
         </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        <div className="flex items-center gap-6 w-full md:w-auto">
          {/* Doctor Image Bubble */}
          <div className="hidden md:block relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm bg-white flex-shrink-0">
            <Image 
              src="/images/team_ceo.png" 
              alt="Doctor" 
              fill 
              sizes="64px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <h3 className="text-[#0a2b4e] text-xl font-bold mb-1">Your Health is Our Priority</h3>
            <p className="text-gray-500 text-[13px] leading-relaxed max-w-md">
              Book an appointment with our specialist doctors and get the best healthcare services.
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 w-full md:w-auto flex justify-start md:justify-end">
          <button 
            onClick={() => window.dispatchEvent(new Event('open-appointment-modal'))}
            className="bg-[#009e90] hover:bg-[#008f82] text-white px-5 py-2.5 rounded-md text-[14px] font-semibold transition flex items-center gap-2 shadow-md shadow-teal-900/10"
          >
            Book Appointment Now <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
