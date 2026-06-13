import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const Youtube = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#061e38] text-[#8cb2d8] pt-16 pb-6 text-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center mb-6 text-white">
              <div className="w-8 h-8 text-white mr-2">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                </svg>
              </div>
              <div className="font-bold leading-tight">
                <span className="text-xl">CityCare</span><br/>
                <span className="text-[10px] tracking-widest uppercase opacity-80">Hospital</span>
              </div>
            </div>
            <p className="mb-6 leading-relaxed">
              We are committed to providing the best healthcare services with compassion and care.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full border border-[#154677] flex items-center justify-center hover:bg-[#009e90] hover:border-[#009e90] hover:text-white transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#154677] flex items-center justify-center hover:bg-[#009e90] hover:border-[#009e90] hover:text-white transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#154677] flex items-center justify-center hover:bg-[#009e90] hover:border-[#009e90] hover:text-white transition">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#154677] flex items-center justify-center hover:bg-[#009e90] hover:border-[#009e90] hover:text-white transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#154677] flex items-center justify-center hover:bg-[#009e90] hover:border-[#009e90] hover:text-white transition">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-[#009e90] transition">About Us</a></li>
              <li><a href="#" className="hover:text-[#009e90] transition">Our Doctors</a></li>
              <li><a href="#" className="hover:text-[#009e90] transition">Departments</a></li>
              <li><a href="#" className="hover:text-[#009e90] transition">Services</a></li>
              <li><a href="#" className="hover:text-[#009e90] transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: For Patients / Support */}
          <div className="grid grid-cols-2 gap-4 col-span-1 lg:col-span-1">
             <div>
                <h4 className="text-white font-bold text-lg mb-6">For Patients</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-[#009e90] transition">Book Appointment</a></li>
                  <li><a href="#" className="hover:text-[#009e90] transition">Find a Doctor</a></li>
                  <li><a href="#" className="hover:text-[#009e90] transition">Patient Login</a></li>
                  <li><a href="#" className="hover:text-[#009e90] transition">Payment & Insurance</a></li>
                  <li><a href="#" className="hover:text-[#009e90] transition">FAQs</a></li>
                </ul>
             </div>
          </div>
          
          <div>
             <h4 className="text-white font-bold text-lg mb-6">Support</h4>
             <ul className="space-y-3">
               <li><a href="#" className="hover:text-[#009e90] transition">Help Center</a></li>
               <li><a href="#" className="hover:text-[#009e90] transition">Privacy Policy</a></li>
               <li><a href="#" className="hover:text-[#009e90] transition">Terms & Conditions</a></li>
               <li><a href="#" className="hover:text-[#009e90] transition">Refund Policy</a></li>
               <li><a href="#" className="hover:text-[#009e90] transition">Sitemap</a></li>
             </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-[#009e90] shrink-0" />
                <span>123, Health Street,<br/>Medical City, Pakistan</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-[#009e90] shrink-0" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-[#009e90] shrink-0" />
                <span>info@citycarehospital.com</span>
              </li>
              <li className="flex gap-3 text-red-400 mt-2">
                <Clock className="w-5 h-5 shrink-0" />
                <span>Emergency : 24/7</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#154677] pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© 2024 CityCare Hospital. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">
            Designed with <span className="text-red-500">♥</span> for better healthcare
          </p>
        </div>
      </div>
    </footer>
  );
}
