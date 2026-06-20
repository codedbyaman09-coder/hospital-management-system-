import React from 'react';
import { CalendarHeart, Building2, HeartHandshake, CreditCard, FolderHeart, ArrowRight } from 'lucide-react';

export default function PatientsResources() {
  const resources = [
    {
      icon: CalendarHeart,
      title: "Before Your Visit",
      desc: "Find information on appointments, referrals, pre-registration and preparation for your visit.",
      actionText: "Learn More",
      actionColor: "text-[#009e90]",
      actionBorder: "border-[#009e90]/20"
    },
    {
      icon: Building2,
      title: "During Your Visit",
      desc: "From check-in to treatment, we ensure a smooth and comfortable experience at every step.",
      actionText: "Learn More",
      actionColor: "text-[#009e90]",
      actionBorder: "border-[#009e90]/20"
    },
    {
      icon: HeartHandshake,
      title: "After Your Visit",
      desc: "Follow-up care, test results, prescriptions and recovery guidance – we're with you all the way.",
      actionText: "Learn More",
      actionColor: "text-[#009e90]",
      actionBorder: "border-[#009e90]/20"
    },
    {
      icon: CreditCard,
      title: "Pay Your Bill",
      desc: "Secure and convenient payment options with detailed billing and insurance support.",
      actionText: "Pay Now",
      actionColor: "text-green-600",
      actionBorder: "border-green-600/20"
    },
    {
      icon: FolderHeart,
      title: "Find Resources",
      desc: "Helpful resources, FAQs and support services for you and your loved ones.",
      actionText: "Explore",
      actionColor: "text-amber-500",
      actionBorder: "border-amber-500/20"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20 mt-12 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-[#0a2b4e] text-2xl md:text-[28px] font-bold mb-3">
          Everything You Need, All in One Place
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="h-[1px] w-12 bg-[#009e90]/30"></div>
          <HeartIcon />
          <div className="h-[1px] w-12 bg-[#009e90]/30"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {resources.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col items-center text-center hover:-translate-y-1 transition group">
            <div className="w-14 h-14 rounded-full bg-[#f8fafd] flex items-center justify-center mb-5 relative">
              <item.icon className={`w-6 h-6 ${item.actionColor}`} strokeWidth={1.5} />
            </div>
            <h3 className="text-[#0a2b4e] font-bold text-[15px] mb-3">{item.title}</h3>
            <p className="text-gray-500 text-[12px] leading-relaxed mb-6 flex-grow">
              {item.desc}
            </p>
            <button className={`w-full py-2 rounded-full border ${item.actionBorder} ${item.actionColor} text-[13px] font-bold flex items-center justify-center gap-1 hover:bg-gray-50 transition`}>
              {item.actionText} <ArrowRight className="w-3.5 h-3.5" />
            </button>
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
