import React, { useState } from "react";
import Image from "next/image";
import { X, Star, Calendar } from "lucide-react";

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

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
}

export default function DoctorProfileModal({ doctor, onClose }: DoctorProfileModalProps) {
  const [activeTab, setActiveTab] = useState("ABOUT");

  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className="bg-white w-full max-w-[400px] rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-[#009e90] hover:text-[#007b70] transition bg-white/80 rounded-full p-1"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Background */}
        <div className="h-24 bg-gradient-to-b from-[#e6f5f4] to-white relative w-full"></div>

        {/* Doctor Image */}
        <div className="flex justify-center -mt-14 relative z-10">
          <div className="w-24 h-24 rounded-full border-[3px] border-white overflow-hidden shadow-md bg-white">
            <Image 
              src={doctor.img} 
              alt={doctor.name} 
              width={96} 
              height={96} 
              className="object-cover object-top w-full h-full"
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-5 pt-2">
          {/* Name & Specialty */}
          <div className="text-center mb-3">
            <h2 className="text-xl font-bold text-[#0a2b4e]">{doctor.name}</h2>
            <p className="text-[#009e90] text-sm font-semibold">{doctor.specialty}</p>
          </div>

          {/* Ratings */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
              <span className="text-gray-600 font-medium ml-1">
                {doctor.rating} <span className="text-gray-400 font-normal">({doctor.reviews} Reviews)</span>
              </span>
            </div>
            
            {/* Rating Bars Mini */}
            <div className="flex flex-col gap-[2px]">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-1 text-[8px] text-gray-500">
                  <span>{star}</span>
                  <Star className="w-2 h-2 text-yellow-400 fill-yellow-400" />
                  <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#009e90]" 
                      style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '5%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-between border border-gray-200 rounded-lg p-1 mb-4">
            {['ABOUT', 'EXPERIENCE', 'EDUCATION', 'REVIEWS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 text-[10px] sm:text-xs font-semibold rounded-md transition ${
                  activeTab === tab 
                    ? 'bg-[#e6f5f4] text-[#0a2b4e]' 
                    : 'text-gray-500 hover:text-[#0a2b4e] hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mb-4 h-[140px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {activeTab === 'ABOUT' && (
              <div>
                <h3 className="font-bold text-[#0a2b4e] mb-2">Professional Bio & Expertise</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  With over {doctor.exp} of experience, {doctor.name} is a distinguished leader in {doctor.specialty.toLowerCase()}. 
                  {doctor.desc} Passionate about working with patients to manage health factors through personalized care plans.
                </p>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-bold text-[#0a2b4e]">Consultation Fee:</span> <span className="text-gray-700">$100</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-bold text-[#0a2b4e]">Location:</span> <span className="text-gray-700">City Heart Clinic, Downtown</span>
                  </p>
                </div>
              </div>
            )}
            {activeTab === 'EXPERIENCE' && (
              <div>
                <h3 className="font-bold text-[#0a2b4e] mb-2">Experience</h3>
                <p className="text-gray-600 text-sm">{doctor.exp} of extensive medical experience in top-tier hospitals.</p>
              </div>
            )}
            {activeTab === 'EDUCATION' && (
              <div>
                <h3 className="font-bold text-[#0a2b4e] mb-2">Education</h3>
                <p className="text-gray-600 text-sm">MBBS, MD - Specialization in {doctor.specialty}.</p>
              </div>
            )}
            {activeTab === 'REVIEWS' && (
              <div>
                <h3 className="font-bold text-[#0a2b4e] mb-2">Patient Reviews</h3>
                <p className="text-gray-600 text-sm">Rated {doctor.rating} out of 5 by {doctor.reviews} patients.</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-3">
            <button 
              onClick={() => {
                onClose();
                window.dispatchEvent(new Event('open-appointment-modal'));
              }}
              className="flex-1 bg-[#009e90] hover:bg-[#008f82] text-white py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Schedule Consultation
            </button>
            <button className="flex-[0.8] bg-[#0a2b4e] hover:bg-[#0d3b6b] text-white py-2.5 rounded-lg text-sm font-semibold transition shadow-sm">
              Send a Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
