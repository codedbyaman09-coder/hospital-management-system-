import Image from "next/image";
import { Mail } from "lucide-react";

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export default function LeadershipTeam() {
  const team = [
    {
      name: "Dr. Muhammad Ali",
      role: "Chief Executive Officer",
      img: "/images/team_ceo.png"
    },
    {
      name: "Dr. Sarah Khan",
      role: "Chief Medical Officer",
      img: "/images/team_cmo.png"
    },
    {
      name: "Dr. Usman Tariq",
      role: "Director of Operations",
      img: "/images/team_ops.png"
    },
    {
      name: "Dr. Ayesha Malik",
      role: "Director of Nursing",
      img: "/images/team_nursing.png"
    }
  ];

  return (
    <section className="py-12 pb-24 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-[28px] font-bold text-center text-[#0a2b4e] mb-12">
          Our Leadership Team
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center pt-8 pb-6 px-4 text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-5 bg-gray-100 border-4 border-white shadow-sm relative">
                <Image 
                  src={member.img}
                  alt={member.name}
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                />
              </div>
              <h3 className="text-[17px] font-bold text-[#0a2b4e] mb-1">{member.name}</h3>
              <p className="text-gray-500 text-[13px] mb-6">{member.role}</p>
              
              <div className="flex gap-4 mt-auto">
                <a href="#" className="text-gray-400 hover:text-[#0a2b4e] transition">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#0a2b4e] transition">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#0a2b4e] transition">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
