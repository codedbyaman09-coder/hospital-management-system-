import { Users, Building2, User, CalendarCheck, Award, Clock } from "lucide-react";

export default function AboutStats() {
  const stats = [
    { icon: <Users className="w-9 h-9" strokeWidth={1.5} />, count: "25+", label: "Expert Doctors" },
    { icon: <Building2 className="w-9 h-9" strokeWidth={1.5} />, count: "15+", label: "Departments" },
    { icon: <User className="w-9 h-9" strokeWidth={1.5} />, count: "50K+", label: "Happy Patients" },
    { icon: <CalendarCheck className="w-9 h-9" strokeWidth={1.5} />, count: "10K+", label: "Appointments\nMonthly" },
    { icon: <Award className="w-9 h-9" strokeWidth={1.5} />, count: "98%", label: "Patient\nSatisfaction" },
    { icon: <Clock className="w-9 h-9" strokeWidth={1.5} />, count: "24/7", label: "Emergency\nSupport" },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-[#0d4f48] via-[#104b73] to-[#041a38] border-y border-[#1b6b85]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center py-6 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center flex-1 min-w-[140px] text-center gap-3">
            <div className="text-white mb-2">
              {stat.icon}
            </div>
            <div>
              <div className="text-[32px] font-bold text-white leading-none mb-2">{stat.count}</div>
              <div className="text-[13px] text-[#b3d4f0] whitespace-pre-line leading-snug">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
