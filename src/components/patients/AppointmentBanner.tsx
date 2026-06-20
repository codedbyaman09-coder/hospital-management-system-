import React from 'react';
import { CheckCircle2, ArrowRight, Stethoscope, Heart } from 'lucide-react';

export default function AppointmentBanner() {
  const benefits = [
    "Quick & Easy Booking",
    "Choose Your Preferred Doctor",
    "Flexible Date & Time",
    "Instant Confirmation"
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      <div className="bg-[#eaf4f4] rounded-[24px] overflow-hidden flex flex-col md:flex-row items-center justify-between border border-[#009e90]/10 relative">
        
        {/* Left Side: Stethoscope & Heart (Using Icons as fallback) */}
        <div className="w-full md:w-1/3 h-[200px] md:h-full min-h-[250px] relative bg-gradient-to-br from-[#d1eaea] to-[#eaf4f4] flex items-center justify-center">
          <Stethoscope className="w-32 h-32 text-[#0a2b4e] absolute opacity-20 -left-10" strokeWidth={1} />
          <div className="relative z-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 rounded-full scale-150"></div>
            <Heart className="w-24 h-24 text-red-500 fill-red-500 filter drop-shadow-xl relative z-10" />
            <Stethoscope className="w-32 h-32 text-[#0a2b4e] absolute -ml-16 -mb-16 z-20" strokeWidth={1.5} />
          </div>
        </div>

        {/* Middle Content */}
        <div className="flex-1 p-8 md:p-10 z-10 flex flex-col justify-center">
          <h2 className="text-[24px] md:text-[28px] font-bold text-[#0a2b4e] mb-3 leading-tight max-w-sm">
            Book Your Appointment in Just a Few Clicks
          </h2>
          <p className="text-gray-600 text-[14px] leading-relaxed mb-6 max-w-sm">
            Skip the wait and book your appointment online with our easy and secure system.
          </p>
          <div>
            <button className="bg-[#0a2b4e] hover:bg-[#0d3b6b] text-white px-6 py-3 rounded-md text-[14px] font-bold transition shadow-md flex items-center gap-2">
              Book Appointment Now <ArrowRight className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Right Side: Checkmarks */}
        <div className="w-full md:w-[35%] bg-white/40 p-8 md:p-10 h-full flex flex-col justify-center md:border-l border-white/60">
          <ul className="space-y-4">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#009e90] flex-shrink-0" />
                <span className="text-[#0a2b4e] font-semibold text-[14px]">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
