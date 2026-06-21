import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, Heart, Shield, User, Building2, Headphones } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <TopBar />
      <Navbar />
      <main className="w-full">
        {/* Hero Section */}
        <section className="relative w-full h-[350px] bg-[#f4f8fb] overflow-hidden flex items-center">
          <div className="absolute top-0 right-0 bottom-0 w-2/3 md:w-1/2 z-0">
            <Image src="/images/contact-hero.png" alt="Contact Us Hero" fill className="object-cover object-center opacity-90" priority />
            {/* Smooth Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8fb] via-[#f4f8fb]/60 to-transparent w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8fb] to-transparent w-1/2"></div>
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <h1 className="text-4xl md:text-[54px] font-bold text-[#0a335c] mb-4">
              Contact <span className="text-[#009e90]">Us</span>
            </h1>
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#0a335c] mb-6">
              <Link href="/" className="hover:text-[#009e90] transition">Home</Link>
              <span className="text-gray-400">/</span>
              <span className="text-[#009e90]">Contact Us</span>
            </div>
            <p className="text-[#0a335c]/80 text-[15px] max-w-[400px] leading-relaxed font-medium">
              We are here to help you. Get in touch with us for appointments, enquiries or any assistance.
            </p>
          </div>
        </section>

        {/* Info Cards */}
        <section className="max-w-[1400px] mx-auto px-4 lg:px-8 -mt-12 relative z-20 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Visit Us */}
            <div className="bg-white rounded-xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#e6f5f4] flex items-center justify-center mb-5">
                <MapPin className="w-7 h-7 text-[#009e90]" />
              </div>
              <h3 className="text-[#0a335c] font-bold text-lg mb-3">Visit Us</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-5 h-10">
                123, Health Street,<br />Medical City, Pakistan
              </p>
              <Link href="#" className="text-[#009e90] text-[14px] font-semibold flex items-center gap-1 hover:text-[#0a335c] transition mt-auto">
                View on Map <span className="text-lg leading-none">→</span>
              </Link>
            </div>

            {/* Call Us */}
            <div className="bg-white rounded-xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#e6f5f4] flex items-center justify-center mb-5">
                <Phone className="w-7 h-7 text-[#009e90] fill-[#009e90]" />
              </div>
              <h3 className="text-[#0a335c] font-bold text-lg mb-3">Call Us</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-5 h-10">
                +92 300 1234567<br />+92 300 7654321
              </p>
              <Link href="tel:+923001234567" className="text-[#009e90] text-[14px] font-semibold flex items-center gap-1 hover:text-[#0a335c] transition mt-auto">
                Call Now <span className="text-lg leading-none">→</span>
              </Link>
            </div>

            {/* Email Us */}
            <div className="bg-white rounded-xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#e6f5f4] flex items-center justify-center mb-5">
                <Mail className="w-7 h-7 text-[#009e90]" />
              </div>
              <h3 className="text-[#0a335c] font-bold text-lg mb-3">Email Us</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-5 h-10">
                info@citycarehospital.com<br />support@citycarehospital.com
              </p>
              <Link href="mailto:info@citycarehospital.com" className="text-[#009e90] text-[14px] font-semibold flex items-center gap-1 hover:text-[#0a335c] transition mt-auto">
                Send Email <span className="text-lg leading-none">→</span>
              </Link>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#0a335c] flex items-center justify-center mb-5">
                <Clock className="w-7 h-7 text-[#0a335c] fill-[#0a335c] text-white" />
              </div>
              <h3 className="text-[#0a335c] font-bold text-lg mb-3">Working Hours</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-5 h-10">
                Monday - Saturday<br />8:00 AM - 8:00 PM<br />Sunday - Closed
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mb-20">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Form */}
            <div className="lg:w-1/2 bg-white rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100">
              <h2 className="text-2xl font-bold text-[#0a335c] mb-2">Send Us a Message</h2>
              <p className="text-gray-500 text-[14px] mb-8">Fill out the form below and our team will get back to you as soon as possible.</p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative bg-white rounded-lg">
                    <input type="text" id="name" className="peer w-full px-5 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#009e90] focus:ring-1 focus:ring-[#009e90] text-[14px] transition bg-transparent relative z-10" placeholder=" " required />
                    <label htmlFor="name" className="absolute left-5 top-1/2 -translate-y-1/2 text-[14px] text-gray-400 pointer-events-none opacity-0 peer-placeholder-shown:opacity-100 transition-opacity z-0">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="relative bg-white rounded-lg">
                    <input type="email" id="email" className="peer w-full px-5 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#009e90] focus:ring-1 focus:ring-[#009e90] text-[14px] transition bg-transparent relative z-10" placeholder=" " required />
                    <label htmlFor="email" className="absolute left-5 top-1/2 -translate-y-1/2 text-[14px] text-gray-400 pointer-events-none opacity-0 peer-placeholder-shown:opacity-100 transition-opacity z-0">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative bg-white rounded-lg">
                    <input type="tel" id="phone" className="peer w-full px-5 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#009e90] focus:ring-1 focus:ring-[#009e90] text-[14px] transition bg-transparent relative z-10" placeholder=" " required />
                    <label htmlFor="phone" className="absolute left-5 top-1/2 -translate-y-1/2 text-[14px] text-gray-400 pointer-events-none opacity-0 peer-placeholder-shown:opacity-100 transition-opacity z-0">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="relative bg-white rounded-lg">
                    <select id="subject" defaultValue="" className="peer w-full px-5 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#009e90] focus:ring-1 focus:ring-[#009e90] text-[14px] appearance-none bg-transparent relative z-10 transition text-gray-800" required>
                      <option value="" disabled hidden></option>
                      <option value="appointment">Book Appointment</option>
                      <option value="enquiry">General Enquiry</option>
                      <option value="feedback">Feedback</option>
                    </select>
                    <label htmlFor="subject" className="absolute left-5 top-1/2 -translate-y-1/2 text-[14px] text-gray-400 pointer-events-none opacity-0 peer-invalid:opacity-100 transition-opacity z-0">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
                  </div>
                </div>
                <div className="relative bg-white rounded-lg">
                  <textarea id="message" rows={5} className="peer w-full px-5 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#009e90] focus:ring-1 focus:ring-[#009e90] text-[14px] transition resize-none bg-transparent relative z-10" placeholder=" " required></textarea>
                  <label htmlFor="message" className="absolute left-5 top-4 text-[14px] text-gray-400 pointer-events-none opacity-0 peer-placeholder-shown:opacity-100 transition-opacity z-0">
                    Message <span className="text-red-500">*</span>
                  </label>
                </div>

                <div className="flex items-center gap-2 mb-6 pt-2">
                  <input type="checkbox" id="privacy" className="w-4 h-4 rounded border-gray-300 text-[#009e90] focus:ring-[#009e90] accent-[#009e90] cursor-pointer" required />
                  <label htmlFor="privacy" className="text-[14px] text-gray-500 cursor-pointer">
                    I agree to the <Link href="#" className="text-[#009e90] hover:underline">Privacy Policy</Link>.
                  </label>
                </div>

                <button type="button" className="bg-[#0a335c] hover:bg-[#082a4d] text-white px-8 py-3.5 rounded-lg text-[15px] font-semibold transition flex items-center justify-center sm:justify-start gap-2 shadow-md shadow-blue-900/10 w-full sm:w-auto">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </div>

            {/* Right: Map & Emergency */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              <div className="relative w-full h-[320px] rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 bg-[#f8f9fa]">
                <iframe
                  src="https://maps.google.com/maps?q=Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Emergency Support Box */}
              <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-gray-100 flex items-center gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="w-[70px] h-[70px] rounded-full border-2 border-[#ef4444] border-dashed flex items-center justify-center shrink-0 bg-white">
                  <Phone className="w-8 h-8 text-[#ef4444] fill-[#ef4444]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#0a335c] font-bold text-lg mb-1">Emergency Support</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed">
                    For medical emergencies, our 24/7 team<br />is always ready to help you.
                  </p>
                  <div className="mt-3 inline-block bg-[#ef4444] text-white text-[12px] font-bold px-3 py-1 rounded">
                    Emergency : 24/7
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[#0a335c] font-bold text-[17px] mb-1">+92 300 1234567</div>
                  <div className="text-[#0a335c] font-bold text-[17px]">+92 300 7654321</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-[1000px] mx-auto px-4 lg:px-8 mb-24">
          <div className="text-center mb-10">
            <h2 className="text-[#0a335c] text-[28px] font-bold mb-2">Frequently Asked Questions</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] w-12 bg-gray-200"></div>
              <Heart className="w-4 h-4 text-[#009e90] fill-[#009e90]" />
              <div className="h-[1px] w-12 bg-gray-200"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-xl p-5">
                <div className="flex justify-between items-center cursor-pointer">
                  <h4 className="text-[#0a335c] font-bold text-[15px]">How can I book an appointment?</h4>
                  <ChevronDown className="w-5 h-5 text-[#0a335c] rotate-180 transition-transform" />
                </div>
                <p className="text-gray-500 text-[14px] mt-3 leading-relaxed">
                  You can book an appointment by calling us, visiting our hospital, or using the online appointment form available on our website.
                </p>
              </div>
              <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-xl p-5 flex justify-between items-center cursor-pointer">
                <h4 className="text-[#0a335c] font-bold text-[15px]">What are your visiting hours?</h4>
                <ChevronDown className="w-5 h-5 text-[#0a335c]" />
              </div>
              <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-xl p-5 flex justify-between items-center cursor-pointer">
                <h4 className="text-[#0a335c] font-bold text-[15px]">Do you accept health insurance?</h4>
                <ChevronDown className="w-5 h-5 text-[#0a335c]" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-xl p-5 flex justify-between items-center cursor-pointer">
                <h4 className="text-[#0a335c] font-bold text-[15px]">How can I request my medical records?</h4>
                <ChevronDown className="w-5 h-5 text-[#0a335c]" />
              </div>
              <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-xl p-5 flex justify-between items-center cursor-pointer">
                <h4 className="text-[#0a335c] font-bold text-[15px]">Is parking available at the hospital?</h4>
                <ChevronDown className="w-5 h-5 text-[#0a335c]" />
              </div>
              <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-xl p-5 flex justify-between items-center cursor-pointer">
                <h4 className="text-[#0a335c] font-bold text-[15px]">How can I contact your support team?</h4>
                <ChevronDown className="w-5 h-5 text-[#0a335c]" />
              </div>
            </div>
          </div>
        </section>

        {/* Pre-footer Feature Banner */}
        <section className="bg-[#009e90] py-10">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex items-center gap-4 text-white">
                <Headphones className="w-10 h-10 shrink-0" strokeWidth={1.5} />
                <div>
                  <h4 className="font-bold text-[16px] mb-1">24/7 Support</h4>
                  <p className="text-white/80 text-[13px] leading-tight">Our support team is always<br />here to help you.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <Shield className="w-10 h-10 shrink-0" strokeWidth={1.5} />
                <div>
                  <h4 className="font-bold text-[16px] mb-1">Trusted Care</h4>
                  <p className="text-white/80 text-[13px] leading-tight">We provide safe, reliable &<br />compassionate care.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <User className="w-10 h-10 shrink-0" strokeWidth={1.5} />
                <div>
                  <h4 className="font-bold text-[16px] mb-1">Expert Doctors</h4>
                  <p className="text-white/80 text-[13px] leading-tight">Our doctors are highly qualified<br />and experienced.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <Building2 className="w-10 h-10 shrink-0" strokeWidth={1.5} />
                <div>
                  <h4 className="font-bold text-[16px] mb-1">Modern Facilities</h4>
                  <p className="text-white/80 text-[13px] leading-tight">State-of-the-art technology<br />for better treatment.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
