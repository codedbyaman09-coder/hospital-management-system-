import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/features/home/Hero";
import StatsRow from "@/features/home/StatsRow";
import ServicesAndDepartments from "@/features/home/ServicesAndDepartments";
import WhyChooseUs from "@/features/home/WhyChooseUs";
import CtaBanner from "@/features/home/CtaBanner";
import StatsRowDark from "@/features/home/StatsRowDark";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "CityCare Hospital | Leading Medical Center & Emergency Care in Pakistan",
  description: "Welcome to CityCare Hospital. We provide top-quality healthcare, 24/7 emergency services, and comprehensive medical treatments by experienced specialists in Medical City, Pakistan.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-gray-800">
      <TopBar />
      <Navbar />
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "Hospital",
          "name": "CityCare Hospital",
          "description": "Leading Medical Center & Emergency Care in Pakistan",
          "url": "https://citycarehospital.com",
          "telephone": "+92-300-1234567",
          "openingHours": "Mo-Su 00:00-23:59",
          "medicalSpecialty": [
            "Cardiology",
            "Neurology",
            "Orthopedics",
            "Pediatrics"
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123, Health Street",
            "addressLocality": "Medical City",
            "addressRegion": "PK",
            "addressCountry": "PK"
          }
        }}
      />
      <main>
        <Hero />
        <StatsRow />
        <ServicesAndDepartments />
        <WhyChooseUs />
        <CtaBanner />
        <StatsRowDark />
      </main>
      <Footer />
    </div>
  );
}
