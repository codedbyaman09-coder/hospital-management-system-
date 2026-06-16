import { MapPin, Phone, Mail, Target } from "lucide-react";

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const Youtube = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#032041] text-[#90b2d6] pt-16 pb-6 text-[13px] md:text-sm font-medium">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* 5-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-16">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6 text-white">
              <div className="w-10 h-10 text-white mr-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
                  <path d="M12 2v20M2 12h20" />
                  <path d="M5 5h14v14H5z" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="leading-tight">
                <span className="text-[22px] font-bold tracking-wide">City<span className="text-[#00c9b1]">Care</span></span><br/>
                <span className="text-[11px] tracking-[0.25em] uppercase opacity-90 font-medium">Hospital</span>
              </div>
            </div>
            <p className="mb-8 leading-relaxed">
              We are committed to providing the best healthcare services with compassion and care.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#00c9b1] hover:border-[#00c9b1] hover:text-white transition">
                <Facebook className="w-[14px] h-[14px] text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#00c9b1] hover:border-[#00c9b1] hover:text-white transition">
                <Twitter className="w-[14px] h-[14px] text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#00c9b1] hover:border-[#00c9b1] hover:text-white transition">
                <Linkedin className="w-[14px] h-[14px] text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#00c9b1] hover:border-[#00c9b1] hover:text-white transition">
                <Instagram className="w-[14px] h-[14px] text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#00c9b1] hover:border-[#00c9b1] hover:text-white transition">
                <Youtube className="w-[14px] h-[14px] text-white" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-[15px] mb-6">Quick Links</h4>
            <ul className="space-y-3.5">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Our Doctors</a></li>
              <li><a href="#" className="hover:text-white transition">Departments</a></li>
              <li><a href="#" className="hover:text-white transition">Services</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: For Patients */}
          <div>
            <h4 className="text-white font-semibold text-[15px] mb-6">For Patients</h4>
            <ul className="space-y-3.5">
              <li><a href="#" className="hover:text-white transition">Book Appointment</a></li>
              <li><a href="#" className="hover:text-white transition">Find a Doctor</a></li>
              <li><a href="#" className="hover:text-white transition">Patient Login</a></li>
              <li><a href="#" className="hover:text-white transition">Payment & Insurance</a></li>
              <li><a href="#" className="hover:text-white transition">FAQs</a></li>
            </ul>
          </div>
          
          {/* Column 4: Support */}
          <div>
            <h4 className="text-white font-semibold text-[15px] mb-6">Support</h4>
            <ul className="space-y-3.5">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Sitemap</a></li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold text-[15px] mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-white/70 shrink-0 stroke-[1.5]" />
                <span className="leading-snug">123, Health Street,<br/>Medical City, Pakistan</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-white/70 shrink-0 stroke-[1.5]" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-white/70 shrink-0 stroke-[1.5]" />
                <span>info@citycarehospital.com</span>
              </li>
              <li className="flex gap-3 items-center text-[#ff3b30] font-semibold mt-4">
                <Target className="w-5 h-5 shrink-0 stroke-[2]" />
                <span>Emergency : 24/7</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-[13px]">
          <p>© 2024 CityCare Hospital. All Rights Reserved.</p>
          <p className="mt-3 md:mt-0 text-[#90b2d6]">
            Designed with <span className="text-[#ff3b30] mx-0.5">♥</span> for better healthcare
          </p>
        </div>
      </div>
    </footer>
  );
}
