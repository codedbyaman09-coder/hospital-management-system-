import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DoctorsHero from "@/features/doctors/DoctorsHero";
import DoctorsGrid from "@/features/doctors/DoctorsGrid";
import DoctorsWhyChoose from "@/features/doctors/DoctorsWhyChoose";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Expert Doctors & Specialists",
  description: "Find the best doctors and medical specialists at CityCare Hospital. Book an appointment online with our experienced healthcare professionals.",
  alternates: {
    canonical: "/doctors",
  },
};

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-gray-800">
      <TopBar />
      <Navbar />
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Expert Doctors at CityCare Hospital",
          "url": "https://citycarehospital.com/doctors",
          "description": "Find the best doctors and medical specialists at CityCare Hospital.",
          "provider": {
            "@type": "Hospital",
            "name": "CityCare Hospital"
          }
        }}
      />
      <main className="pb-16">
        <DoctorsHero />
        <DoctorsGrid />
        <DoctorsWhyChoose />
      </main>
      <Footer />
    </div>
  );
}
