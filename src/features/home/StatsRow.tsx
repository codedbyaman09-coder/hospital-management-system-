import { Headset } from "lucide-react";
import Image from "next/image";

export default function StatsRow() {
  const stats = [
    { imageSrc: "/images/Expert doctors.png", alt: "Expert Doctors" },
    { imageSrc: "/images/Departments.png", alt: "Departments" },
    { imageSrc: "/images/Smiling doctor with happy patients.png", alt: "Happy Patients" },
    { imageSrc: "/images/Partient satisfaction.png", alt: "Patient Satisfaction" },
    { icon: <Headset className="w-6 h-6" />, count: "24/7", label: "Emergency Support", color: "text-[#ea7b33]", bg: "bg-[#fdf3ec]" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-8 relative z-20 mb-16">
      <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-between p-6 lg:px-10 lg:py-8 gap-6 border border-gray-50 lg:divide-x divide-gray-100 items-center">
        {stats.map((stat, idx) => (
          <div key={idx} className={`flex items-center justify-center w-full sm:w-auto flex-1 min-w-[150px] ${idx > 0 ? 'lg:pl-8' : ''}`}>
            {stat.imageSrc ? (
              <Image 
                src={stat.imageSrc} 
                alt={stat.alt || "Stats Image"} 
                width={180} 
                height={70} 
                style={{ width: "auto", height: "auto" }}
                className="object-contain"
              />
            ) : (
              <div className="flex items-center gap-4">
                <div className={`${stat.color} ${stat.bg} p-3.5 rounded-full`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#0a335c] leading-none mb-1">{stat.count}</div>
                  <div className="text-[13px] font-medium text-gray-500">{stat.label}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
