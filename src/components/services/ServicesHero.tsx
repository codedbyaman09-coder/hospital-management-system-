import React from 'react';
import Image from 'next/image';

export default function ServicesHero() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-[#f8f9fa] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services/hero_hospital_interior.jpg"
          alt="Hospital Interior"
          fill
          priority
          className="object-cover object-right"
        />
        {/* Left white gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent w-full md:w-[70%]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full relative z-10 flex flex-col justify-center h-full pt-10">
        <div className="max-w-xl">
          <h1 className="text-[36px] md:text-[48px] font-bold text-[#0a2b4e] leading-tight mb-2">
            Our Healthcare <br />
            <span className="text-[#009e90]">Services</span>
          </h1>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="h-[2px] w-12 bg-[#009e90]/30"></div>
            <HeartPulseIcon />
            <div className="h-[2px] w-12 bg-[#009e90]/30"></div>
          </div>

          <p className="text-[#0a2b4e]/80 text-[15px] md:text-[16px] leading-relaxed max-w-md">
            We provide a wide range of advanced healthcare services
            designed to meet your medical needs with compassion,
            quality and expertise.
          </p>
        </div>
      </div>
    </div>
  );
}

function HeartPulseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#009e90"/>
    </svg>
  );
}
