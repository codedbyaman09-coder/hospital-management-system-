import { User, Brain, HeartPulse, ThumbsUp, Headset } from "lucide-react";

export default function StatsRow() {
  const stats = [
    { icon: <User className="w-6 h-6" />, count: "25+", label: "Expert Doctors", color: "text-[#2e68a3]", bg: "bg-[#f0f6fc]" },
    { icon: <Brain className="w-6 h-6" />, count: "15+", label: "Departments", color: "text-[#009e90]", bg: "bg-[#eaf8f7]" },
    { icon: <HeartPulse className="w-6 h-6" />, count: "10K+", label: "Happy Patients", color: "text-[#7d56a3]", bg: "bg-[#f5f0f9]" },
    { icon: <ThumbsUp className="w-6 h-6" />, count: "98%", label: "Patient Satisfaction", color: "text-[#009e90]", bg: "bg-[#eaf8f7]" },
    { icon: <Headset className="w-6 h-6" />, count: "24/7", label: "Emergency Support", color: "text-[#ea7b33]", bg: "bg-[#fdf3ec]" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-8 relative z-20 mb-16">
      <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-wrap lg:flex-nowrap justify-between p-6 lg:px-10 lg:py-8 gap-4 border border-gray-50 divide-x divide-gray-100">
        {stats.map((stat, idx) => (
          <div key={idx} className={`flex items-center gap-4 flex-1 min-w-[150px] ${idx > 0 ? 'pl-4 lg:pl-8' : ''}`}>
            <div className={`${stat.color} ${stat.bg} p-3.5 rounded-full`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#0a335c] leading-none mb-1">{stat.count}</div>
              <div className="text-[13px] font-medium text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
