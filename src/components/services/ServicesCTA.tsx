"use client";

import React from 'react';
import Image from 'next/image';
import { PhoneCall, ArrowRight } from 'lucide-react';

export default function ServicesCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      <div className="bg-[#0a4276] rounded-xl overflow-hidden relative flex flex-col md:flex-row items-center border border-gray-100 shadow-md min-h-[160px]">
        
        {/* Background Gradient & ECG Decoration */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0a4276] via-[#0a4276] to-[#009e90]/80"></div>
        <div className="absolute inset-0 z-0 opacity-20 flex items-center w-full">
          <svg width="100%" height="60" viewBox="0 0 1000 60" preserveAspectRatio="none" fill="none">
            <path d="M0,30 L300,30 L315,10 L330,50 L345,5 L360,45 L375,30 L1000,30" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between p-8 md:pl-12 md:pr-48 gap-6 md:gap-10">
          
          {/* Left Text and Icon */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left flex-1">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-white text-[24px] md:text-[28px] font-bold mb-2">Need any of our services?</h3>
              <p className="text-blue-100/90 text-[14px] leading-relaxed max-w-lg">
                We are here 24/7 to help you. Book an appointment today and experience the best healthcare services.
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="flex-shrink-0">
            <button 
              className="bg-white text-[#0a2b4e] px-6 py-3.5 rounded-md text-[14px] font-bold shadow-md flex items-center gap-2 hover:bg-gray-50 transition whitespace-nowrap"
            >
              Book Appointment Now <ArrowRight className="w-4 h-4 ml-1 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Doctor Image Overlay */}
        <div className="hidden lg:block absolute right-12 bottom-0 w-[200px] h-[180px] z-20 pointer-events-none">
          <Image 
            src="/images/services/doctor_cta.png" 
            alt="Doctor" 
            fill 
            className="object-contain object-bottom"
          />
        </div>

      </div>
    </section>
  );
}
