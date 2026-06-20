"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { servicesData, ServiceCategory, ServiceItem } from '../../data/servicesData';
import { ArrowRight } from 'lucide-react';
import DiagnosticsModal from './DiagnosticsModal';

const categories: ServiceCategory[] = [
  "All Services",
  "Diagnostics",
  "Treatment & Care",
  "Surgery",
  "Wellness",
  "Support Services"
];

export default function ServicesGrid() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("All Services");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filteredServices = servicesData.filter(service => 
    activeCategory === "All Services" ? true : service.category === activeCategory
  );

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20 bg-white">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-[#0a2b4e] text-3xl md:text-[34px] font-bold mb-3">
          Explore Our <span className="text-[#009e90]">Services</span>
        </h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-[1px] w-12 bg-[#009e90]/30"></div>
          <HeartIcon />
          <div className="h-[1px] w-12 bg-[#009e90]/30"></div>
        </div>
        <p className="text-gray-500 text-[14px]">
          Trusted care. Advanced technology. Better health for you and your family.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-md text-[13px] font-semibold transition ${
              activeCategory === cat
                ? "bg-[#009e90] text-white border border-[#009e90]"
                : "bg-white text-gray-500 border border-gray-200 hover:border-[#009e90] hover:text-[#009e90]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden group hover:shadow-lg transition flex flex-col">
            {/* Image Box */}
            <div className="relative h-48 w-full overflow-hidden">
              <Image 
                src={service.image} 
                alt={service.title} 
                fill 
                className="object-cover group-hover:scale-105 transition duration-500" 
              />
              
              {/* Floating Icon */}
              <div className="absolute -bottom-6 left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-white z-10">
                <div className="w-10 h-10 bg-[#e6f5f4] rounded-full flex items-center justify-center">
                  <service.Icon className="w-5 h-5 text-[#009e90]" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-10 flex flex-col flex-grow">
              <h3 className="text-[#0a2b4e] font-bold text-[17px] mb-2">{service.title}</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>
              
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedService(service);
                }}
                className="flex items-center text-[#009e90] font-bold text-[13px] hover:text-[#0a2b4e] transition mt-auto group/link"
              >
                Learn More 
                <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <DiagnosticsModal 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        service={selectedService}
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
