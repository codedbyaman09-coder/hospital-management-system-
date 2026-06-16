import { Users, Building2, User, CalendarCheck, Award } from "lucide-react";

export default function StatsRowDark() {
  const stats = [
    { icon: <Users className="w-10 h-10" strokeWidth={1.5} />, count: "25+", label: "Expert Doctors" },
    { icon: <Building2 className="w-10 h-10" strokeWidth={1.5} />, count: "15+", label: "Departments" },
    { icon: <User className="w-10 h-10" strokeWidth={1.5} />, count: "10K+", label: "Happy Patients" },
    { icon: <CalendarCheck className="w-10 h-10" strokeWidth={1.5} />, count: "50K+", label: "Appointments" },
    { icon: <Award className="w-10 h-10" strokeWidth={1.5} />, count: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <div className="bg-gradient-to-r from-[#062444] via-[#0a335c] to-[#062444] rounded-2xl shadow-xl flex flex-wrap lg:flex-nowrap justify-between gap-6 py-8 px-6 lg:px-12 border border-[#0d3f70] divide-y lg:divide-y-0 lg:divide-x divide-[#164a81]">
        {stats.map((stat, idx) => (
          <div key={idx} className={`flex items-center gap-4 flex-1 min-w-[150px] ${idx > 0 ? 'lg:pl-8 pt-6 lg:pt-0' : ''}`}>
            <div className="text-white">
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl lg:text-[28px] font-bold text-white leading-none mb-1">{stat.count}</div>
              <div className="text-sm text-gray-200 whitespace-nowrap">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
