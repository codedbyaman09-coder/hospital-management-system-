import { UserCheck, Laptop, HandHeart, Building2, Wallet, Headset } from "lucide-react";

export default function WhyChooseUsAbout() {
  const features = [
    {
      icon: <UserCheck className="w-10 h-10 text-[#002f6c]" strokeWidth={1.5} />,
      title: "Expert Doctors",
      desc: "Highly qualified and experienced doctors providing specialized care."
    },
    {
      icon: <Laptop className="w-10 h-10 text-[#002f6c]" strokeWidth={1.5} />,
      title: "Advanced Technology",
      desc: "Modern equipment and innovative technology for accurate diagnosis."
    },
    {
      icon: <HandHeart className="w-10 h-10 text-[#002f6c]" strokeWidth={1.5} />,
      title: "Patient First Approach",
      desc: "We prioritize patient comfort and provide personalized care."
    },
    {
      icon: <Building2 className="w-10 h-10 text-[#002f6c]" strokeWidth={1.5} />,
      title: "World-Class Facilities",
      desc: "State-of-the-art infrastructure with international standards of safety and hygiene."
    },
    {
      icon: <Wallet className="w-10 h-10 text-[#002f6c]" strokeWidth={1.5} />,
      title: "Affordable Pricing",
      desc: "Quality healthcare services at affordable and transparent prices."
    },
    {
      icon: <Headset className="w-10 h-10 text-[#002f6c]" strokeWidth={1.5} />,
      title: "24/7 Support",
      desc: "Round-the-clock emergency care and support for our patients."
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-[28px] font-bold text-center text-[#0a2b4e] mb-12">
          Why Choose <span className="text-[#009e90]">CityCare</span> Hospital?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {features.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center">
              <div className="mb-4">
                {item.icon}
              </div>
              <h3 className="text-[15px] font-bold text-[#0a2b4e] mb-3">{item.title}</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
