import React from 'react';
import { Headphones, Users, HeartHandshake, Ambulance, BookOpen } from 'lucide-react';

export default function SupportServices() {
  const supportServices = [
    {
      icon: Headphones,
      title: "24/7 Help Desk",
      desc: "Our support team is available around the clock to assist you.",
      iconColor: "text-blue-600"
    },
    {
      icon: Users,
      title: "Interpreter Services",
      desc: "We provide interpreter support for a better communication.",
      iconColor: "text-purple-600"
    },
    {
      icon: HeartHandshake,
      title: "Patient Assistance",
      desc: "We help with everything from directions to discharge.",
      iconColor: "text-[#009e90]"
    },
    {
      icon: Ambulance,
      title: "Transportation",
      desc: "Safe and reliable transportation services when you need it.",
      iconColor: "text-[#009e90]"
    },
    {
      icon: BookOpen,
      title: "Health Education",
      desc: "Access helpful health tips, guides and wellness resources.",
      iconColor: "text-amber-500"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-[#0a2b4e] text-2xl md:text-[28px] font-bold mb-3">
          Patient Support Services
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="h-[1px] w-12 bg-[#009e90]/30"></div>
          <HeartIcon />
          <div className="h-[1px] w-12 bg-[#009e90]/30"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {supportServices.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col items-center text-center hover:-translate-y-1 transition group">
            <div className="w-14 h-14 rounded-full bg-[#f8fafd] flex items-center justify-center mb-4 relative">
              <item.icon className={`w-6 h-6 ${item.iconColor}`} strokeWidth={1.5} />
            </div>
            <h3 className="text-[#0a2b4e] font-bold text-[15px] mb-3">{item.title}</h3>
            <p className="text-gray-500 text-[12px] leading-relaxed flex-grow">
              {item.desc}
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
