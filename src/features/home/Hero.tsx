import Image from "next/image";
import {
  Clock,
  Stethoscope,
  Activity,
  HeartPulse,
  User,
  Phone,
  ChevronDown,
  Calendar,
  Play,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fdfdfd] min-h-[485px]">
      {/* Full Background Image */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[80%] xl:w-[82%] z-0 hidden lg:block pointer-events-none">
        <Image
          src="/images/doctor-hero-banner.png.png"
          alt="Hero Banner"
          fill
          className="object-cover"
          style={{ objectPosition: '100% 0%' }}
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-8 lg:pt-10 pb-8 flex flex-col lg:flex-row">
        {/* Left Content */}
        <div className="w-full lg:w-[52%] relative z-20 pt-3">
          <div className="inline-block bg-[#eaf8f7] text-[#009e90] px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-6">
            WE CARE FOR YOUR HEALTH
          </div>

          <h1 className="text-3xl md:text-4xl xl:text-[46px] font-extrabold text-[#0a335c] leading-[1.15] mb-5">
            Compassionate Care <br />
            for a <span className="text-[#009e90]">Healthier Life</span>
          </h1>

          <p className="text-gray-500 md:text-[15px] mb-7 max-w-md leading-relaxed">
            We provide exceptional healthcare services <br />
            with a patient-first approach.
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <button className="bg-[#0a335c] text-white px-8 py-3.5 rounded-md font-semibold shadow-lg shadow-blue-900/20">
              Book Appointment
            </button>

            <button className="flex items-center gap-2 border border-[#0a335c]/30 bg-white text-[#0a335c] px-6 py-3.5 rounded-md font-semibold">
              <span className="w-6 h-6 rounded-full border border-[#0a335c]/40 flex items-center justify-center">
                <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
              </span>
              Watch Video
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-[#0a335c] max-w-2xl mt-8 lg:mt-0">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#0a335c]" />
              <span>
                24/7
                <br />
                <span className="text-gray-500 font-medium">
                  Emergency Care
                </span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Stethoscope className="w-6 h-6 text-[#009e90]" />
              <span>
                Expert
                <br />
                <span className="text-gray-500 font-medium">
                  Medical Team
                </span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-[#0a335c]" />
              <span>
                Modern
                <br />
                <span className="text-gray-500 font-medium">Technology</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <HeartPulse className="w-6 h-6 text-[#0a335c]" />
              <span>
                Personalized
                <br />
                <span className="text-gray-500 font-medium">Treatment</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-[32%] relative z-20 bg-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] ml-auto mt-10 lg:-mt-6 lg:-translate-x-6 border border-gray-50">
          <h3 className="text-[22px] font-bold text-[#0a335c] mb-1">
            Book an Appointment
          </h3>

          <p className="text-gray-500 text-sm mb-5">
            Schedule your visit with our experts
          </p>

          <form className="space-y-3">
            <div className="relative">
              <User className="absolute left-3.5 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-11 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3.5 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full pl-11 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            <div className="relative">
              <select className="w-full pl-4 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg appearance-none bg-white text-gray-500 outline-none">
                <option>Select Department</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select className="w-full pl-4 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg appearance-none bg-white text-gray-500 outline-none">
                <option>Select Doctor</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Appointment Date"
                className="w-full pl-4 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-500 outline-none"
              />
              <Calendar className="absolute right-3.5 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <button className="w-full bg-[#009e90] text-white py-2.5 rounded-lg font-semibold flex justify-center items-center gap-2 mt-2 shadow-md shadow-teal-900/20">
              <Calendar className="w-5 h-5" />
              Book Now
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}