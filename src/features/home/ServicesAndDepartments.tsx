import { HeartPulse, Brain, Bone, Microscope, Pill, Activity, Baby, User, Scissors, Ear, Stethoscope, ArrowRight } from "lucide-react";

export default function ServicesAndDepartments() {
  const services = [
    { icon: <HeartPulse className="w-10 h-10" />, name: "Cardiology", desc: "Comprehensive heart care and treatment" },
    { icon: <Brain className="w-10 h-10" />, name: "Neurology", desc: "Advanced neurological care and solutions" },
    { icon: <Bone className="w-10 h-10" />, name: "Orthopedics", desc: "Bone, joint and spine care services" },
    { icon: <Microscope className="w-10 h-10" />, name: "Laboratory", desc: "Accurate lab tests and diagnostics" },
    { icon: <Pill className="w-10 h-10" />, name: "Pharmacy", desc: "Quality medicines and healthcare" },
    { icon: <Activity className="w-10 h-10" />, name: "Radiology", desc: "Advanced imaging for accurate results" },
  ];

  const departments = [
    { icon: <HeartPulse className="w-4 h-4" />, name: "Cardiology" },
    { icon: <Brain className="w-4 h-4" />, name: "Neurology" },
    { icon: <Bone className="w-4 h-4" />, name: "Orthopedics" },
    { icon: <Baby className="w-4 h-4" />, name: "Pediatrics" },
    { icon: <User className="w-4 h-4" />, name: "Gynecology" },
    { icon: <Scissors className="w-4 h-4" />, name: "Dermatology" },
    { icon: <HeartPulse className="w-4 h-4" />, name: "Dental Care" },
    { icon: <Activity className="w-4 h-4" />, name: "Urology" },
    { icon: <Ear className="w-4 h-4" />, name: "ENT" },
    { icon: <Stethoscope className="w-4 h-4" />, name: "General Medicine" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      <div className="grid lg:grid-cols-12 gap-10">
        {/* Our Services */}
        <div className="lg:col-span-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-[22px] font-bold text-[#0a335c]">Our Services</h2>
            <a href="#" className="flex items-center gap-2 text-[#009e90] font-semibold text-[13px] hover:underline">
              View All Services <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {services.map((service, idx) => (
              <div key={idx} className="border border-gray-100 rounded-xl p-6 text-center hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition bg-white flex flex-col items-center group cursor-pointer">
                <div className="text-[#009e90] mb-5 border-[1.5px] border-teal-500/20 p-4 rounded-2xl group-hover:bg-[#009e90] group-hover:text-white transition group-hover:border-[#009e90]">
                  {service.icon}
                </div>
                <h3 className="font-bold text-[#0a335c] text-[15px] mb-2">{service.name}</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed px-2">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Departments */}
        <div className="lg:col-span-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-[22px] font-bold text-[#0a335c]">Our Departments</h2>
            <a href="#" className="flex items-center gap-2 text-[#009e90] font-semibold text-[13px] hover:underline">
              View All Departments <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-y-5 gap-x-2">
            {departments.map((dept, idx) => (
              <div key={idx} className="flex items-center gap-3 group cursor-pointer">
                <div className="text-[#009e90] bg-[#f2fafa] p-2.5 rounded-full group-hover:bg-[#009e90] group-hover:text-white transition">
                  {dept.icon}
                </div>
                <span className="text-[13px] font-semibold text-gray-600 group-hover:text-[#0a335c] transition">{dept.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
