import { HeartPulse, Brain, Bone, Microscope, Pill, Activity, Baby, User, Scissors, Ear, Stethoscope, ArrowRight } from "lucide-react";

export default function ServicesAndDepartments() {
  const services = [
    { icon: <HeartPulse className="w-10 h-10" />, name: "Cardiology", desc: "Comprehensive heart care and treatment", bgColor: "bg-[#f4f8fc]", iconColor: "text-[#1c4ed8]" },
    { icon: <Brain className="w-10 h-10" />, name: "Neurology", desc: "Advanced neurological care and solutions", bgColor: "bg-[#f4f8fc]", iconColor: "text-[#1c4ed8]" },
    { icon: <Bone className="w-10 h-10" />, name: "Orthopedics", desc: "Bone, joint and spine care services", bgColor: "bg-[#f8fafc]", iconColor: "text-[#0d9488]" },
    { icon: <Microscope className="w-10 h-10" />, name: "Laboratory", desc: "Accurate lab tests and diagnostics", bgColor: "bg-[#f4f8fc]", iconColor: "text-[#1c4ed8]" },
    { icon: <Pill className="w-10 h-10" />, name: "Pharmacy", desc: "Quality medicines and healthcare", bgColor: "bg-[#fef2f2]", iconColor: "text-[#ef4444]" },
    { icon: <Activity className="w-10 h-10" />, name: "Radiology", desc: "Advanced imaging for accurate results", bgColor: "bg-[#f8fafc]", iconColor: "text-[#0d9488]" },
  ];

  const departments = [
    { icon: <HeartPulse className="w-5 h-5" />, name: "Cardiology" },
    { icon: <Brain className="w-5 h-5" />, name: "Neurology" },
    { icon: <Bone className="w-5 h-5" />, name: "Orthopedics" },
    { icon: <Baby className="w-5 h-5" />, name: "Pediatrics" },
    { icon: <User className="w-5 h-5" />, name: "Gynecology" },
    { icon: <Scissors className="w-5 h-5" />, name: "Dermatology" },
    { icon: <HeartPulse className="w-5 h-5" />, name: "Dental Care" },
    { icon: <Activity className="w-5 h-5" />, name: "Urology" },
    { icon: <Ear className="w-5 h-5" />, name: "ENT" },
    { icon: <Stethoscope className="w-5 h-5" />, name: "General Medicine" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Our Services */}
        <div className="lg:w-[65%] lg:border-r border-gray-100 lg:pr-8">
          <div className="flex justify-between items-end mb-2">
            <div className="">
              <h2 className="text-[22px] font-bold text-[#0a335c]">Our Services</h2>
              <div className="w-10 h-[2px] bg-[#009e90] mt-2"></div>
            </div>
            <a href="#" className="flex items-center gap-2 text-[#4361ee] font-semibold text-[13px] hover:underline mb-1">
              View All Services <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {services.map((service, idx) => (
              <div key={idx} className={`rounded-xl p-4 text-center transition flex flex-col items-center justify-center min-h-[160px] group cursor-pointer ${service.bgColor}`}>
                <div className={`mb-4 transition-transform group-hover:scale-110 ${service.iconColor}`}>
                  {service.icon}
                </div>
                <h3 className="font-bold text-[#0a335c] text-[13px] mb-1.5 leading-tight">{service.name}</h3>
                <p className="text-[10px] text-gray-500 leading-snug px-1">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Departments */}
        <div className="lg:w-[35%] lg:pl-2">
          <div className="flex justify-between items-end mb-3">
            <div>
              <h2 className="text-[22px] font-bold text-[#0a335c]">Our Departments</h2>
              <div className="w-10 h-[2px] bg-[#009e90] mt-2"></div>
            </div>
            <a href="#" className="flex items-center gap-2 text-[#4361ee] font-semibold text-[13px] hover:underline mb-1">
              View All Departments <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-y-6 gap-x-2">
            {departments.map((dept, idx) => (
              <div key={idx} className="flex items-center gap-3 group cursor-pointer">
                <div className="text-[#009e90] transition-transform group-hover:scale-110">
                  {dept.icon}
                </div>
                <span className="text-[13px] font-semibold text-[#0a335c]">{dept.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
