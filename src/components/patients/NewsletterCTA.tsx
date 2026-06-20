"use client";

import React from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10 mb-10">
      <div className="bg-[#eaf4f4] rounded-[20px] p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border border-[#009e90]/10">
        
        {/* Left Side: Icon & Text */}
        <div className="flex items-center gap-6 flex-1 w-full">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-[#009e90]/10">
            <Mail className="w-8 h-8 text-[#009e90]" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-[20px] md:text-[22px] font-bold text-[#0a2b4e] mb-2">
              Stay Updated with Health Tips & News
            </h2>
            <p className="text-gray-600 text-[14px] leading-relaxed max-w-lg">
              Subscribe to our newsletter and get the latest updates, health tips and hospital news.
            </p>
          </div>
        </div>

        {/* Right Side: Input & Button */}
        <div className="w-full lg:w-auto flex-[0.7]">
          <form className="flex flex-col sm:flex-row items-center gap-3 w-full" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full sm:w-[300px] px-5 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#009e90] focus:ring-1 focus:ring-[#009e90] text-[14px] shadow-sm"
              required
            />
            <button 
              type="submit" 
              className="w-full sm:w-auto bg-[#009e90] hover:bg-[#008f82] text-white px-8 py-3.5 rounded-lg text-[14px] font-bold transition shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
