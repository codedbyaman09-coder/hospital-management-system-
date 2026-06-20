"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
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
        <div className="flex items-center gap-1 cursor-pointer hover:text-[#0a335c] transition pb-1.5 border-b-[2.5px] border-transparent">
          Patients <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-[#0a335c] transition pb-1.5 border-b-[2.5px] border-transparent">
          Pages <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <a href="#" className="hover:text-[#0a335c] transition pb-1.5 border-b-[2.5px] border-transparent">
          Contact Us
        </a>
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
