import { UserCheck, Award, SmilePlus } from "lucide-react";

export default function DoctorsHero() {
  return (
    <section
      className="w-full py-16 md:py-24 relative overflow-hidden bg-gradient-to-r from-[#eef5fa] to-[#dbeefa]"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between">

        {/* Left Content */}
        <div className="w-full md:w-1/2 pt-8 md:pt-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#009e90] mb-6">
            <span className="text-[#0a335c]">Home</span>
            <span>&gt;</span>
            <span>Doctors</span>
          </div>

          <h1 className="text-[42px] md:text-[54px] font-bold text-[#0a2b4e] leading-[1.1] mb-6">
            Our Expert<br />
            <span className="text-[#009e90]">Doctors</span>
          </h1>

          <p className="text-gray-600 text-[15px] leading-relaxed max-w-[420px] mb-10">
            Our team of highly qualified and experienced doctors is dedicated to providing the best possible care for you and your family.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <UserCheck className="w-6 h-6 text-[#009e90]" />
              </div>
              <div>
                <div className="text-[#0a2b4e] text-xl font-bold">25+</div>
                <div className="text-gray-500 text-xs font-medium">Expert Doctors</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Award className="w-6 h-6 text-[#009e90]" />
              </div>
              <div>
                <div className="text-[#0a2b4e] text-xl font-bold">15+</div>
                <div className="text-gray-500 text-xs font-medium">Departments</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <SmilePlus className="w-6 h-6 text-[#009e90]" />
              </div>
              <div>
                <div className="text-[#0a2b4e] text-xl font-bold">50K+</div>
                <div className="text-gray-500 text-xs font-medium">Happy Patients</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
