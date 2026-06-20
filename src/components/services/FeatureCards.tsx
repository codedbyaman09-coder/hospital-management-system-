import React from 'react';
import { HeartHandshake, Microscope, UserPlus, Heart } from 'lucide-react';

export default function FeatureCards() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-20 -mt-16">
      <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.06)] border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:divide-x divide-gray-100">
        
        {/* Feature 1 */}
        <div className="flex-1 flex items-start gap-4 px-2">
          <div className="flex-shrink-0 w-14 h-14 rounded-full border border-[#009e90]/30 bg-[#f0f9f8] flex items-center justify-center relative">
            <HeartHandshake className="w-7 h-7 text-[#009e90]" />
          </div>
          <div>
            <h3 className="text-[#0a2b4e] font-bold text-[15px] mb-1">Comprehensive Care</h3>
            <p className="text-gray-500 text-[12px] leading-relaxed">
              End-to-end healthcare solutions under one roof.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex-1 flex items-start gap-4 px-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-full border border-[#009e90]/30 bg-[#f0f9f8] flex items-center justify-center relative">
            <Microscope className="w-7 h-7 text-[#009e90]" />
          </div>
          <div>
            <h3 className="text-[#0a2b4e] font-bold text-[15px] mb-1">Advanced Technology</h3>
            <p className="text-gray-500 text-[12px] leading-relaxed">
              State-of-the-art equipment for accurate diagnosis & treatment.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex-1 flex items-start gap-4 px-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-full border border-[#009e90]/30 bg-[#f0f9f8] flex items-center justify-center relative">
            <UserPlus className="w-7 h-7 text-[#009e90]" />
          </div>
          <div>
            <h3 className="text-[#0a2b4e] font-bold text-[15px] mb-1">Expert Professionals</h3>
            <p className="text-gray-500 text-[12px] leading-relaxed">
              Highly qualified and experienced doctors and staff.
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex-1 flex items-start gap-4 px-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-full border border-[#009e90]/30 bg-[#f0f9f8] flex items-center justify-center relative">
            <Heart className="w-7 h-7 text-[#009e90]" />
          </div>
          <div>
            <h3 className="text-[#0a2b4e] font-bold text-[15px] mb-1">Patient First</h3>
            <p className="text-gray-500 text-[12px] leading-relaxed">
              Personalized care with compassion and respect.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
