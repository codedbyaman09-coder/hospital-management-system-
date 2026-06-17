import { Target, Eye, HandHeart, CheckCircle2 } from "lucide-react";

export default function MissionVisionValues() {
  return (
    <section className="bg-gray-50/50 py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          
          {/* Mission */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex gap-6">
            <div className="w-16 h-16 rounded-full bg-[#e6f5f4] flex items-center justify-center shrink-0">
              <Target className="w-8 h-8 text-[#009e90] stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0a2b4e] mb-3">Our Mission</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To provide world-class healthcare services with compassion and integrity while improving the health and well-being of our community.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex gap-6">
            <div className="w-16 h-16 rounded-full bg-[#e6f5f4] flex items-center justify-center shrink-0">
              <Eye className="w-8 h-8 text-[#009e90] stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0a2b4e] mb-3">Our Vision</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To be the most trusted and preferred healthcare provider, recognized for excellence, innovation, and patient satisfaction.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex gap-6">
            <div className="w-16 h-16 rounded-full bg-[#e6f5f4] flex items-center justify-center shrink-0">
              <HandHeart className="w-8 h-8 text-[#009e90] stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0a2b4e] mb-3">Our Values</h3>
              <ul className="space-y-2">
                {[
                  "Patient First",
                  "Excellence",
                  "Integrity",
                  "Compassion",
                  "Innovation"
                ].map((val, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#009e90]" />
                    {val}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
