import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/features/about/AboutHero";
import AboutContent from "@/features/about/AboutContent";
import MissionVisionValues from "@/features/about/MissionVisionValues";
import AboutStats from "@/features/about/AboutStats";
import WhyChooseUsAbout from "@/features/about/WhyChooseUsAbout";
import LeadershipTeam from "@/features/about/LeadershipTeam";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about CityCare Hospital's legacy, our expert medical leadership team, and our mission to provide the best healthcare services in Pakistan.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About CityCare Hospital",
          "url": "https://citycarehospital.com/about",
          "description": "Learn about CityCare Hospital's legacy, our expert medical leadership team, and our mission to provide the best healthcare services in Pakistan.",
          "publisher": {
            "@type": "Organization",
            "name": "CityCare Hospital"
          }
        }}
      />
      <AboutHero />
      <AboutContent />
      <MissionVisionValues />
      <AboutStats />
      <WhyChooseUsAbout />
      <LeadershipTeam />
      <Footer />
    </main>
  );
}
