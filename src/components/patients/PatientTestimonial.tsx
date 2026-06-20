import React from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PatientTestimonial() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      <div className="bg-[#0a2b4e] rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
        
        {/* Left Side: Quote & Text */}
        <div className="flex-[1.5] flex gap-6 items-start">
          <div className="text-[60px] leading-[0.8] text-[#009e90]/40 font-serif font-bold mt-2">
            &quot;
          </div>
          <p className="text-[16px] md:text-[18px] leading-relaxed font-medium text-white/90">
            The staff was incredibly kind and professional. The entire experience was smooth and stress-free. Highly recommended!
          </p>
        </div>

        {/* Right Side: Profile & Controls */}
        <div className="flex-1 flex flex-wrap sm:flex-nowrap items-center justify-between gap-6 w-full md:w-auto">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden relative bg-white/10 flex-shrink-0 border-2 border-white/20">
              <Image 
                src="/images/doc_gyne.png" // Fallback image since quota is exhausted
                alt="Ayesha Khan" 
                fill 
                sizes="64px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <h4 className="font-bold text-[16px]">Ayesha Khan</h4>
              <p className="text-white/60 text-[12px] mb-1">Satisfied Patient</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
}
