import Image from "next/image";

export default function CtaBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10 relative mt-4">
      {/* Container for banner */}
      <div className="relative flex items-center justify-between shadow-lg rounded-xl h-[160px] px-8 md:px-12 mt-10">
        
        {/* Background layer with overflow hidden for decorative SVG */}
        <div className="absolute inset-0 bg-[#009e90] rounded-xl overflow-hidden pointer-events-none">
           <svg className="w-full h-full object-cover" preserveAspectRatio="none" viewBox="0 0 1000 100">
              <path d="M0,50 L200,50 L230,20 L260,80 L290,50 L500,50 L530,10 L560,90 L590,50 L1000,50" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.15"/>
           </svg>
        </div>
        
        {/* Text Section */}
        <div className="relative z-10 text-white max-w-[450px]">
          <h2 className="text-[28px] font-bold mb-3">Need a Doctor for Check-up?</h2>
          <p className="text-[#e0f5f4] text-[15px] leading-relaxed">
            Book an appointment with our specialist doctors and get the best healthcare services.
          </p>
        </div>
        
        {/* Button Section */}
        <div className="relative z-20 flex-1 flex justify-center lg:-ml-10">
           <button className="bg-white text-[#009e90] px-6 py-3 rounded-md font-semibold text-[15px] hover:bg-gray-50 transition shadow-sm">
             Book Appointment Now
           </button>
        </div>

        {/* Doctor Image Section */}
        <div className="hidden md:block absolute right-8 bottom-0 w-[240px] h-[210px] z-20 pointer-events-none">
           <Image 
             src="/images/dcotor.png" 
             alt="Doctor" 
             fill
             className="object-contain object-bottom"
           />
        </div>
      </div>
    </section>
  );
}
