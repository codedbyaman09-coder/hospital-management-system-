import React from 'react';
import { Award, Building2, Clock, Heart, ShieldCheck } from 'lucide-react';

export default function WhyChooseServices() {
  const features = [
    {
      icon: Award,
      title: "Quality & Safety",
      description: "International standards of care and safety."
    },
    {
      icon: Building2,
      title: "Modern Facilities",
      description: "Advanced infrastructure for better outcomes."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock services whenever you need us."
    },
    {
      icon: Heart,
      title: "Affordable Care",
      description: "Quality healthcare at affordable prices."
    },
    {
      icon: ShieldCheck,
      title: "Insurance Support",
      description: "Cashless and hassle-free insurance assistance."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12 mb-16">
      <div className="text-center mb-10">
        <h2 className="text-[#0a2b4e] text-[26px] font-bold mb-3">
          Why Choose Our Services?
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="h-[1px] w-12 bg-[#009e90]/30"></div>
          <HeartIcon />
          <div className="h-[1px] w-12 bg-[#009e90]/30"></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-8 flex flex-wrap justify-center gap-6 lg:flex-nowrap lg:divide-x divide-gray-100">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center text-center flex-1 min-w-[150px] px-2">
            <div className="w-14 h-14 rounded-full border border-[#009e90]/20 bg-[#f0f9f8] flex items-center justify-center mb-4 relative">
              <feature.icon className="w-6 h-6 text-[#009e90]" />
              {/* Decorative dashed circle */}
              <div className="absolute inset-1 rounded-full border border-dashed border-[#009e90]/30"></div>
            </div>
            <h3 className="text-[#0a2b4e] font-bold text-[14px] mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-[11px] leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
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
