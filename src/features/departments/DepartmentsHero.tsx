import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Microscope, HeartPulse } from "lucide-react";

export default function DepartmentsHero() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#009e90]" strokeWidth={1.5} />,
      title: "Expert Specialists",
      desc: "Experienced & certified doctors"
    },
    {
      icon: <Microscope className="w-6 h-6 text-[#009e90]" strokeWidth={1.5} />,
      title: "Advanced Technology",
      desc: "State-of-the-art equipment"
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-[#009e90]" strokeWidth={1.5} />,
      title: "Patient-Centered Care",
      desc: "Your health is our priority"
    }
  ];

  return (
    <section className="relative w-full h-auto min-h-[380px] lg:min-h-[420px] bg-[#eef5fa] flex items-center py-12 lg:py-0 overflow-hidden">
      {/* Background Image Full Width with subtle left-side gradient for text readability */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Subtle gradient fading out completely by the middle of the screen */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent to-[60%] z-10"></div>
        <Image
          src="/images/departments_hero_bg.png"
          alt="CityCare Departments"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-8 w-full">
        <div className="max-w-xl mb-10">
          {/* Breadcrumb */}
          <div className="flex items-center text-[12px] font-semibold mb-4 tracking-wide">
            <Link href="/" className="text-[#0a2b4e] hover:text-[#009e90] transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-[#0a2b4e]" />
            <span className="text-[#0a2b4e]">Departments</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-[#0a2b4e] leading-[1.15] mb-4">
            Our Medical <br />
            <span className="text-[#009e90]">Departments</span>
          </h1>
          <p className="text-[#0a2b4e] text-[14px] max-w-sm leading-relaxed font-medium">
            Comprehensive healthcare departments to meet all your medical needs under one roof.
          </p>
        </div>

        {/* Feature Bar (Single Container) */}
        <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] w-full max-w-[850px] flex flex-col md:flex-row items-center justify-between p-4 lg:py-5 lg:px-8 relative z-30">
          {features.map((feature, idx) => (
            <div key={idx} className={`flex items-center gap-4 flex-1 w-full ${idx !== features.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-100 pb-4 mb-4 md:pb-0 md:mb-0 md:pr-4 lg:pr-8' : 'md:pl-4 lg:pl-8'}`}>
              <div className="bg-[#f0f9f8] p-3 rounded-full flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-[#0a2b4e] font-bold text-[13px] leading-tight mb-1">{feature.title}</h3>
                <p className="text-gray-500 text-[11px] leading-tight">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
