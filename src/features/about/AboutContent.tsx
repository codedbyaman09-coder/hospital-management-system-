import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function AboutContent() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="flex-1 w-full">
          <div className="text-[#009e90] text-sm font-bold tracking-wider uppercase mb-3">
            ABOUT CITYCARE HOSPITAL
          </div>
          <h2 className="text-4xl lg:text-[42px] font-bold text-[#0a2b4e] leading-[1.2] mb-6">
            Committed to Providing <span className="text-[#009e90]">Quality</span> Healthcare
          </h2>
          <p className="text-gray-600 text-[15px] leading-relaxed mb-5">
            CityCare Hospital is a leading healthcare institution dedicated to providing exceptional medical care with compassion, innovation, and excellence. Our state-of-the-art facilities, experienced doctors, and patient-first approach ensure the best outcomes for every patient.
          </p>
          <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
            We believe in creating a healthier community by delivering accessible, affordable, and advanced healthcare services.
          </p>
          <button className="bg-[#009e90] text-white px-7 py-3.5 rounded-md font-semibold text-[15px] hover:bg-[#008c7f] transition flex items-center gap-2 shadow-md">
            Learn More About Us
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="/images/about_team.png" 
              alt="Medical Team" 
              fill 
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
