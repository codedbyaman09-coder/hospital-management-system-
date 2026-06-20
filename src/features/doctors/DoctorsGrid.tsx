"use client";

import Image from "next/image";
import { Star, Calendar } from "lucide-react";
import React, { useState } from "react";
import DoctorProfileModal from "./DoctorProfileModal";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  desc: string;
  rating: number;
  reviews: number;
  exp: string;
  img: string;
}

export default function DoctorsGrid() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const doctors = [
    {
      id: 1,
      name: "Dr. Muhammad Ali",
      specialty: "Cardiologist",
      desc: "Expert in interventional cardiology, heart disease & preventive care.",
      rating: 4.9,
      reviews: 120,
      exp: "15+ Years",
      img: "/images/doc_cardio.png"
    },
    {
      id: 2,
      name: "Dr. Sarah Khan",
      specialty: "Neurologist",
      desc: "Specialist in brain, spine, neuromuscular disorders and pain management.",
      rating: 4.8,
      reviews: 98,
      exp: "10+ Years",
      img: "/images/doc_neuro.png"
    },
    {
      id: 3,
      name: "Dr. Usman Tariq",
      specialty: "Orthopedic Surgeon",
      desc: "Joint replacement, sports injuries and minimally invasive surgery.",
      rating: 4.9,
      reviews: 110,
      exp: "12+ Years",
      img: "/images/doc_ortho.png"
    },
    {
      id: 4,
      name: "Dr. Ayesha Malik",
      specialty: "Gynecologist",
      desc: "Women's health, pregnancy care and advanced laparoscopy.",
      rating: 4.8,
      reviews: 90,
      exp: "9+ Years",
      img: "/images/doc_gyne.png"
    },
    {
      id: 5,
      name: "Dr. Hamza Ahmed",
      specialty: "Pediatrician",
      desc: "Specialized in child healthcare, growth and development & vaccinations.",
      rating: 4.7,
      reviews: 75,
      exp: "8+ Years",
      img: "/images/doc_peds.png"
    },
    {
      id: 6,
      name: "Dr. Zainab Fatima",
      specialty: "Dermatologist",
      desc: "Skin, hair & nail care, acne treatment and cosmetic dermatology.",
      rating: 4.8,
      reviews: 85,
      exp: "11+ Years",
      img: "/images/doc_derm.png"
    },
    {
      id: 7,
      name: "Dr. Ali Raza",
      specialty: "ENT Specialist",
      desc: "Ear, nose, throat, head & neck surgery and allergy treatment.",
      rating: 4.9,
      reviews: 105,
      exp: "13+ Years",
      img: "/images/doc_ent.png"
    },
    {
      id: 8,
      name: "Dr. Beenish Hameed",
      specialty: "Ophthalmologist",
      desc: "Cataract surgery, glaucoma & retina specialist.",
      rating: 4.8,
      reviews: 80,
      exp: "10+ Years",
      img: "/images/doc_optho.png"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-[#0a2b4e] text-3xl font-bold mb-3">Meet Our <span className="text-[#009e90]">Expert Doctors</span></h2>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-[1px] w-12 bg-[#009e90]/30"></div>
          <HeartIcon />
          <div className="h-[1px] w-12 bg-[#009e90]/30"></div>
        </div>
        <p className="text-gray-500 text-[14px]">Find the right doctor for your health needs from our wide range of specialists.</p>
      </div>

      {/* Filters - Modern Unified Style */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-2 rounded-2xl md:rounded-full shadow-[0_10px_40px_rgb(0,0,0,0.06)] border border-gray-100 mb-12 md:divide-x divide-gray-100 gap-y-4 md:gap-y-0">
        
        <div className="flex-1 w-full px-4 py-2 hover:bg-gray-50/50 transition cursor-pointer md:rounded-l-full">
          <select className="w-full bg-transparent text-[14.5px] font-medium text-gray-600 focus:outline-none cursor-pointer appearance-none">
            <option>All Specialties</option>
            <option>Cardiologist</option>
            <option>Neurologist</option>
            <option>Orthopedic</option>
          </select>
        </div>

        <div className="flex-1 w-full px-4 py-2 hover:bg-gray-50/50 transition cursor-pointer">
          <select className="w-full bg-transparent text-[14.5px] font-medium text-gray-600 focus:outline-none cursor-pointer appearance-none">
            <option>All Departments</option>
            <option>Emergency</option>
            <option>OPD</option>
            <option>ICU</option>
          </select>
        </div>

        <div className="flex-1 w-full px-4 py-2 hover:bg-gray-50/50 transition cursor-pointer">
          <select className="w-full bg-transparent text-[14.5px] font-medium text-gray-600 focus:outline-none cursor-pointer appearance-none">
            <option>All Experience</option>
            <option>5+ Years</option>
            <option>10+ Years</option>
            <option>15+ Years</option>
          </select>
        </div>

        <div className="flex-[1.5] w-full flex items-center pl-4 pr-1 py-1">
          <div className="relative flex-1 flex items-center">
            <SearchIcon className="w-4 h-4 text-[#009e90] mr-2" />
            <input 
              type="text" 
              placeholder="Search Doctor by name..." 
              className="w-full bg-transparent text-[14.5px] focus:outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
          <button className="bg-gradient-to-r from-[#0a2b4e] to-[#0d3b6b] hover:shadow-md text-white px-8 py-3 rounded-full text-[14px] font-semibold transition-all hover:-translate-y-[1px] ml-2">
            Search
          </button>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition group">
            <div className="bg-[#eef5fa] pt-6 flex justify-center relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-[#e6f5f4] text-[#009e90] text-[10px] font-bold px-2 py-1 rounded-full z-10">
                {doc.exp}
              </div>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-sm relative z-10 bg-white">
                <Image src={doc.img} alt={doc.name} fill sizes="128px" className="object-cover object-top group-hover:scale-105 transition-transform duration-300" />
              </div>
              {/* Decorative background shape */}
              <div className="absolute bottom-0 w-full h-1/2 bg-white rounded-t-[100%] opacity-20"></div>
            </div>
            
            <div className="p-5 flex flex-col flex-grow text-center">
              <h3 className="text-[#0a2b4e] font-bold text-[17px] mb-1">{doc.name}</h3>
              <p className="text-[#009e90] text-[12px] font-semibold mb-3">{doc.specialty}</p>
              <p className="text-gray-500 text-[12px] leading-relaxed mb-4 flex-grow px-2">
                {doc.desc}
              </p>
              
              <div className="flex items-center justify-center gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(doc.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
                <span className="text-gray-500 text-[11px] font-semibold ml-1">{doc.rating} ({doc.reviews} Reviews)</span>
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setSelectedDoctor(doc)}
                  className="w-full border border-[#0a2b4e] text-[#0a2b4e] hover:bg-[#0a2b4e] hover:text-white py-2 rounded-md text-[13px] font-semibold transition flex items-center justify-center gap-2"
                >
                  <UserIcon className="w-4 h-4" />
                  View Profile
                </button>
                <button 
                  onClick={() => window.dispatchEvent(new Event('open-appointment-modal'))}
                  className="w-full bg-[#009e90] hover:bg-[#008f82] text-white py-2 rounded-md text-[13px] font-semibold transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DoctorProfileModal 
        doctor={selectedDoctor} 
        onClose={() => setSelectedDoctor(null)} 
      />
    </section>
  );
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#009e90"/>
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}
