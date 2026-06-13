import { User, Brain, HeartPulse, Calendar, ShieldCheck } from "lucide-react";

export default function StatsRowDark() {
  const stats = [
    { icon: <User className="w-8 h-8" />, count: "25+", label: "Expert Doctors" },
    { icon: <Brain className="w-8 h-8" />, count: "15+", label: "Departments" },
    { icon: <HeartPulse className="w-8 h-8" />, count: "10K+", label: "Happy Patients" },
    { icon: <Calendar className="w-8 h-8" />, count: "50K+", label: "Appointments" },
    { icon: <ShieldCheck className="w-8 h-8" />, count: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <section className="bg-[#0a335c] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-wrap lg:flex-nowrap justify-between gap-6 divide-x divide-[#154677]">
        {stats.map((stat, idx) => (
          <div key={idx} className={`flex items-center gap-4 flex-1 min-w-[150px] ${idx > 0 ? 'pl-6' : ''}`}>
            <div className="text-white opacity-80">
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.count}</div>
              <div className="text-sm text-[#8cb2d8]">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
