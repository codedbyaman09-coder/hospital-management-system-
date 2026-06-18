import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative w-full h-[280px] md:h-[350px] bg-[#f8fbff] flex items-center overflow-hidden">
      {/* Background Image Full Width without any white shadow/gradient */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/about_team.png"
          alt="Medical Team"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain object-bottom"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-8 w-full">
        <div className="max-w-2xl bg-white/60 p-6 rounded-xl backdrop-blur-sm lg:bg-transparent lg:p-0 lg:backdrop-blur-none inline-block">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0a2b4e] mb-4"></h1>
          <div className="flex items-center text-[15px] font-medium">
            <Link href="/" className="text-[#0a2b4e] hover:text-[#009e90] transition">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-[#0a2b4e]" />
            <span className="text-[#009e90]">About Us</span>
          </div>
        </div>
      </div>
    </section>
  );
}
