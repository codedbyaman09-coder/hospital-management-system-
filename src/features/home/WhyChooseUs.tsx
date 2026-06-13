import { User, Activity, HeartPulse, CreditCard, Headset } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    { icon: <User strokeWidth={1.5} className="w-9 h-9" />, title: "Experienced Doctors", desc: "Our team of highly qualified doctors with years of experience." },
    { icon: <Activity strokeWidth={1.5} className="w-9 h-9" />, title: "Advanced Technology", desc: "We use modern technology and advanced equipment for better diagnosis." },
    { icon: <HeartPulse strokeWidth={1.5} className="w-9 h-9" />, title: "Patient First Approach", desc: "We prioritize patient comfort and provide personalized care." },
    { icon: <CreditCard strokeWidth={1.5} className="w-9 h-9" />, title: "Affordable Pricing", desc: "Quality healthcare services at affordable and transparent prices." },
    { icon: <Headset strokeWidth={1.5} className="w-9 h-9" />, title: "24/7 Support", desc: "Our support team is available round the clock for your help." },
  ];

  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-[22px] font-bold text-[#0a335c] mb-12">
          Why Choose CityCare Hospital?
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-x divide-transparent md:divide-gray-50">
          {reasons.map((reason, idx) => (
            <div key={idx} className="text-center group">
              <div className="mx-auto w-16 h-16 flex items-center justify-center text-[#0a335c] mb-3 group-hover:scale-110 transition duration-300">
                {reason.icon}
              </div>
              <h3 className="font-bold text-[#0a335c] mb-2 text-[14px]">{reason.title}</h3>
              <p className="text-[12px] text-gray-500 leading-relaxed px-4">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
