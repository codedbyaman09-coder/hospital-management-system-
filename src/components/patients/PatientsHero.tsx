import React from 'react';
import Image from 'next/image';
import { BookOpen, ShieldCheck, CreditCard, UserCheck, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function PatientsHero() {
  return (
    <div className="relative w-full bg-[#f8f9fa] pt-12 pb-24 md:pt-20 md:pb-32">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services/service_11.jpg" // Fallback since AI generation quota is exhausted
          alt="Nurse assisting patient"
          fill
          sizes="100vw"
          priority
          className="object-cover object-top lg:object-center opacity-90"
        />
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent w-full md:w-[65%]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#0a2b4e] mb-6">
            <Link href="/" className="hover:text-[#009e90] transition">Home</Link>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-500">Patients</span>
          </div>

          {/* Heading */}
          <h1 className="text-[38px] md:text-[52px] font-bold text-[#0a2b4e] leading-[1.1] mb-6">
            Care That Puts <br />
            <span className="text-[#009e90]">You First</span>
          </h1>

          {/* Description */}
          <p className="text-[#0a2b4e]/80 text-[15px] md:text-[16px] leading-relaxed max-w-lg mb-8">
            At CityCare Hospital, every patient is at the heart of everything we do. We are committed to providing a safe, compassionate and seamless healthcare experience.
          </p>
        </div>
      </div>

      {/* Floating Bottom Bar */}
      <div className="absolute left-0 right-0 -bottom-12 z-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 p-4 md:p-6 flex flex-wrap justify-between md:flex-nowrap divide-y md:divide-y-0 md:divide-x divide-gray-100">
          
          {[
            { icon: BookOpen, title: "Patient Guide", desc: "Everything you need to know" },
            { icon: ShieldCheck, title: "Our Policies", desc: "Important info about your visit" },
            { icon: CreditCard, title: "Insurance & Billing", desc: "Easy billing and insurance support" },
            { icon: UserCheck, title: "Patient Rights", desc: "Your rights and our commitment" },
            { icon: MessageSquare, title: "Feedback", desc: "We value your feedback" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center flex-1 py-4 md:py-2 px-2 hover:-translate-y-1 transition cursor-pointer group">
              <div className="w-12 h-12 rounded-full border border-[#009e90]/20 bg-[#f0f9f8] flex items-center justify-center mb-3 relative group-hover:bg-[#009e90] transition-colors">
                <item.icon className="w-5 h-5 text-[#009e90] group-hover:text-white transition-colors" />
                <div className="absolute inset-[3px] rounded-full border border-dashed border-[#009e90]/30 group-hover:border-white/40"></div>
              </div>
              <h3 className="text-[#0a2b4e] font-bold text-[13.5px] mb-1 leading-tight">{item.title}</h3>
              <p className="text-gray-500 text-[11px] leading-tight max-w-[120px]">{item.desc}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
