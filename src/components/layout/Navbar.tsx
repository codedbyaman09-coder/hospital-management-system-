"use client";

import { ChevronDown, Menu, Users, Building2, User, FileText, Settings, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center px-4 lg:px-8 py-5 bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <div className="relative w-8 h-8 md:w-10 md:h-10">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Vertical blue bar */}
              <rect x="9.5" y="2" width="5" height="20" rx="1" fill="#0a335c" />
              {/* Horizontal left blue bar */}
              <rect x="2" y="9.5" width="8" height="5" rx="1" fill="#0a335c" />
              {/* Horizontal right teal bar */}
              <rect x="14" y="9.5" width="8" height="5" rx="1" fill="#009e90" />
            </svg>
          </div>
          <div className="ml-3 font-bold leading-none mt-1">
            <span className="text-xl md:text-[22px] text-[#0a335c]">City</span>
            <span className="text-xl md:text-[22px] text-[#009e90]">Care</span>
            <br />
            <span className="text-[10px] md:text-[11px] text-gray-500 tracking-[0.2em] uppercase font-semibold">
              Hospital
            </span>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-8 font-medium text-gray-600 text-[15px]">
        <Link 
          href="/" 
          className={pathname === "/" ? "text-[#0a335c] border-b-[2.5px] border-[#0a335c] pb-1.5 font-semibold" : "hover:text-[#0a335c] transition pb-1.5 border-b-[2.5px] border-transparent"}
        >
          Home
        </Link>
        <Link 
          href="/about" 
          className={pathname === "/about" ? "text-[#0a335c] border-b-[2.5px] border-[#0a335c] pb-1.5 font-semibold" : "hover:text-[#0a335c] transition pb-1.5 border-b-[2.5px] border-transparent"}
        >
          About Us
        </Link>
        <Link 
          href="/departments" 
          className={pathname === "/departments" ? "text-[#0a335c] border-b-[2.5px] border-[#0a335c] pb-1.5 font-semibold" : "hover:text-[#0a335c] transition pb-1.5 border-b-[2.5px] border-transparent"}
        >
          Departments
        </Link>
        <Link 
          href="/doctors" 
          className={pathname === "/doctors" ? "text-[#0a335c] border-b-[2.5px] border-[#0a335c] pb-1.5 font-semibold" : "hover:text-[#0a335c] transition pb-1.5 border-b-[2.5px] border-transparent"}
        >
          Doctors
        </Link>
        <Link 
          href="/services" 
          className={pathname === "/services" ? "text-[#0a335c] border-b-[2.5px] border-[#0a335c] pb-1.5 font-semibold" : "hover:text-[#0a335c] transition pb-1.5 border-b-[2.5px] border-transparent"}
        >
          Services
        </Link>
        <Link 
          href="/patients"
          className={pathname === "/patients" ? "flex items-center gap-1 text-[#0a335c] border-b-[2.5px] border-[#009e90] pb-1.5 font-semibold" : "flex items-center gap-1 cursor-pointer hover:text-[#0a335c] transition pb-1.5 border-b-[2.5px] border-transparent"}
        >
          Patients <ChevronDown className={`w-4 h-4 ${pathname === "/patients" ? 'text-[#0a335c]' : 'text-gray-400'}`} />
        </Link>
        <div className="relative group">
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#0a335c] transition pb-1.5 border-b-[2.5px] border-transparent">
            Pages <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform duration-300" />
          </div>
          
          {/* Mega Menu Dropdown */}
          <div className="absolute top-[calc(100%+4px)] -right-[200px] xl:-right-[300px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <div className="w-[950px] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 flex overflow-hidden">
            
            {/* Left Promo Section */}
            <div className="w-[28%] bg-[#f4f8fb] p-8 flex flex-col relative">
              <h3 className="text-[20px] font-bold text-[#0a335c] leading-tight mb-3">
                World Class Care <br />
                <span className="text-[#009e90]">For Every Patient</span>
              </h3>
              <p className="text-gray-600 text-[12px] leading-relaxed mb-6">
                We are committed to providing exceptional healthcare with compassion and excellence.
              </p>
              <div className="mt-auto relative h-[180px] w-full rounded-lg overflow-hidden flex-shrink-0">
                <Image 
                  src="/images/Smiling doctor with happy patients.png" 
                  alt="Happy patients" 
                  fill 
                  sizes="300px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Right Links Section */}
            <div className="w-[72%] p-8 grid grid-cols-5 gap-6 border-l border-gray-100">
              
              {/* ABOUT PAGES */}
              <div>
                <h4 className="flex items-center gap-2 text-[#0a335c] font-bold text-[11px] uppercase tracking-wider mb-5">
                  <Users className="w-4 h-4 text-[#009e90]" /> About Pages
                </h4>
                <ul className="space-y-3.5">
                  {["About Us", "Our Mission & Vision", "Our Values", "Our History", "Leadership Team", "Careers", "Testimonials", "FAQs"].map((item, i) => (
                    <li key={i}>
                      <Link href="#" className="flex items-center gap-2 text-gray-500 hover:text-[#009e90] text-[12px] transition group/link">
                        <ChevronRight className="w-3 h-3 text-[#009e90] group-hover/link:translate-x-0.5 transition-transform" /> {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DEPARTMENT PAGES */}
              <div>
                <h4 className="flex items-center gap-2 text-[#0a335c] font-bold text-[11px] uppercase tracking-wider mb-5">
                  <Building2 className="w-4 h-4 text-[#009e90]" /> Department Pages
                </h4>
                <ul className="space-y-3.5">
                  {["Departments Grid", "Department Details", "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Gynecology", "View All Departments"].map((item, i) => (
                    <li key={i}>
                      <Link href="#" className="flex items-center gap-2 text-gray-500 hover:text-[#009e90] text-[12px] transition group/link">
                        <ChevronRight className="w-3 h-3 text-[#009e90] group-hover/link:translate-x-0.5 transition-transform" /> {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DOCTOR PAGES */}
              <div>
                <h4 className="flex items-center gap-2 text-[#0a335c] font-bold text-[11px] uppercase tracking-wider mb-5">
                  <User className="w-4 h-4 text-[#009e90]" /> Doctor Pages
                </h4>
                <ul className="space-y-3.5">
                  {["Doctors Grid", "Doctor Details", "Book Appointment", "Doctor Schedule", "Our Specialists"].map((item, i) => (
                    <li key={i}>
                      <Link href="#" className="flex items-center gap-2 text-gray-500 hover:text-[#009e90] text-[12px] transition group/link">
                        <ChevronRight className="w-3 h-3 text-[#009e90] group-hover/link:translate-x-0.5 transition-transform" /> {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* OTHER PAGES */}
              <div>
                <h4 className="flex items-center gap-2 text-[#0a335c] font-bold text-[11px] uppercase tracking-wider mb-5">
                  <FileText className="w-4 h-4 text-[#009e90]" /> Other Pages
                </h4>
                <ul className="space-y-3.5">
                  {["Services", "Patients", "Gallery", "Pricing Plans", "News & Articles", "Event", "404 Error Page", "Coming Soon"].map((item, i) => (
                    <li key={i}>
                      <Link href="#" className="flex items-center gap-2 text-gray-500 hover:text-[#009e90] text-[12px] transition group/link">
                        <ChevronRight className="w-3 h-3 text-[#009e90] group-hover/link:translate-x-0.5 transition-transform" /> {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* UTILITY PAGES */}
              <div>
                <h4 className="flex items-center gap-2 text-[#0a335c] font-bold text-[11px] uppercase tracking-wider mb-5">
                  <Settings className="w-4 h-4 text-[#009e90]" /> Utility Pages
                </h4>
                <ul className="space-y-3.5">
                  {["Login", "Register", "Forgot Password", "Appointment Success", "Terms & Conditions", "Privacy Policy", "Sitemap"].map((item, i) => (
                    <li key={i}>
                      <Link href="#" className="flex items-center gap-2 text-gray-500 hover:text-[#009e90] text-[12px] transition group/link">
                        <ChevronRight className="w-3 h-3 text-[#009e90] group-hover/link:translate-x-0.5 transition-transform" /> {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
            </div>
          </div>
        </div>
        <Link 
          href="/contact" 
          className={pathname === "/contact" ? "text-[#0a335c] border-b-[2.5px] border-[#0a335c] pb-1.5 font-semibold" : "hover:text-[#0a335c] transition pb-1.5 border-b-[2.5px] border-transparent"}
        >
          Contact Us
        </Link>
      </div>

      <div className="hidden lg:block">
        <button 
          onClick={() => window.dispatchEvent(new Event('open-appointment-modal'))}
          className="bg-[#0a335c] hover:bg-[#082a4d] text-white px-7 py-3 rounded-md text-[15px] font-semibold transition shadow-md shadow-blue-900/20"
        >
          Book Appointment
        </button>
      </div>
      
      <button className="lg:hidden text-[#0a335c]">
        <Menu className="w-7 h-7" />
      </button>
    </nav>
  );
}
