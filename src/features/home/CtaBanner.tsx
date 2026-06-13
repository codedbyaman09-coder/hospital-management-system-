import Image from "next/image";

export default function CtaBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10 relative mt-4">
      <div className="bg-[#009e90] rounded-xl overflow-hidden relative flex flex-col md:flex-row items-center justify-between shadow-lg">
        {/* Decorative ECG Line Background */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
           <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
              <path d="M0,50 L200,50 L230,20 L260,80 L290,50 L500,50 L530,10 L560,90 L590,50 L1000,50" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
           </svg>
        </div>
        
        <div className="p-8 md:p-12 z-10 text-white md:w-1/2">
          <h2 className="text-[28px] font-bold mb-3">Need a Doctor for Check-up?</h2>
          <p className="text-[#e0f5f4] text-[15px] max-w-[400px]">
            Book an appointment with our specialist doctors and get the best healthcare services.
          </p>
        </div>
        
        <div className="z-20 pb-8 md:pb-0 md:absolute md:right-[30%]">
           <button className="bg-white text-[#009e90] px-8 py-3.5 rounded-md font-semibold text-[15px] hover:bg-gray-50 transition shadow-lg border border-transparent">
             Book Appointment Now
           </button>
        </div>

        <div className="hidden md:block w-1/3 relative h-[220px] z-10 self-end">
           <Image 
             src="/images/cta_doctor.png" 
             alt="Female Doctor" 
             fill
             className="object-contain object-bottom right-0"
           />
        </div>
      </div>
    </section>
  );
}
