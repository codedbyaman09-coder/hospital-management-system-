"use client";

import Image from "next/image";
import Link from "next/link";
import { UserCheck, Microscope, HeartHandshake, ShieldCheck, PhoneCall, FileText } from "lucide-react";

export default function DepartmentsSidebar() {
  const whyChooseUs = [
    {
      icon: <UserCheck className="w-5 h-5 text-[#009e90]" />,
      title: "Highly Experienced Specialists",
      desc: "Expert doctors with years of experience."
    },
    {
      icon: <Microscope className="w-5 h-5 text-[#009e90]" />,
      title: "Advanced Medical Technology",
      desc: "Modern equipment for accurate diagnosis and treatment."
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#009e90]" />,
      title: "Patient-Centered Approach",
      desc: "Personalized care tailored to your health needs."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#009e90]" />,
      title: "Comprehensive Services",
      desc: "All medical services under one roof for your convenience."
    }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Expert Care Card */}
      <div className="bg-[#0a2b4e] rounded-xl overflow-hidden relative min-h-[360px] flex items-center shadow-lg">
        <div className="p-8 relative z-10 w-full lg:w-[60%]">
          <h3 className="text-white text-[26px] font-bold mb-4 leading-tight">Expert Care,<br/>Every Step of<br/>the Way</h3>
          <p className="text-blue-100/90 text-[13px] leading-relaxed mb-8 pr-2 max-w-[220px]">
            Our departments work together to provide comprehensive healthcare for a better and healthier tomorrow.
          </p>
          <button 
            onClick={() => window.dispatchEvent(new Event('open-appointment-modal'))}
            className="bg-[#009e90] hover:bg-[#008f82] text-white px-5 py-2.5 rounded-md text-[14px] font-semibold transition flex items-center gap-2"
          >
            Book Appointment <span>→</span>
          </button>
        </div>
        {/* Doctor Image */}
        <div className="absolute right-0 bottom-0 w-[55%] h-[105%] z-0">
          <Image 
            src="/images/nurse.png" 
            alt="Expert Doctor" 
            fill 
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </div>
      </div>

      {/* Why Choose Our Departments */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-100 p-6">
        <h3 className="text-[#0a2b4e] text-lg font-bold mb-5">Why Choose Our Departments?</h3>
        <div className="space-y-5">
          {whyChooseUs.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="bg-[#e6f5f4] w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-[#0a2b4e] font-bold text-[13px] mb-0.5">{item.title}</h4>
                <p className="text-gray-500 text-[12px] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Need Help Choosing */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-100 p-6">
        <h3 className="text-[#0a2b4e] text-lg font-bold mb-2">Need Help Choosing?</h3>
        <p className="text-gray-500 text-[13px] mb-5">Not sure which department is right for you? Our team is here to help.</p>
        <div className="flex items-center gap-4 bg-[#f8fbff] p-4 rounded-lg border border-blue-50">
          <div className="bg-white w-10 h-10 rounded-full shadow-sm flex items-center justify-center flex-shrink-0 text-[#009e90]">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[#0a2b4e] font-bold text-[13px]">Talk to Our Support</div>
            <div className="text-[#009e90] font-bold text-[14px]">+92 300 1234567</div>
            <div className="text-gray-500 text-[11px]">Available 24/7</div>
          </div>
        </div>
      </div>

      {/* Download Brochure */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-100 p-6 flex items-start gap-4">
        <div className="bg-[#e6f5f4] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-[#009e90]">
          <FileText className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <div>
          <h4 className="text-[#0a2b4e] font-bold text-[14px] mb-1">Download Our Brochure</h4>
          <p className="text-gray-500 text-[12px] leading-relaxed mb-2">Explore our services and facilities in detail.</p>
          <Link href="#" className="text-[#009e90] text-[13px] font-semibold flex items-center gap-1 hover:opacity-80 transition">
            Download PDF <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
