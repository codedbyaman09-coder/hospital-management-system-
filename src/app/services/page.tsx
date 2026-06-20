import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import FeatureCards from "@/components/services/FeatureCards";
import ServicesGrid from "@/components/services/ServicesGrid";
import ServicesCTA from "@/components/services/ServicesCTA";
import WhyChooseServices from "@/components/services/WhyChooseServices";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Healthcare Services | CityCare Hospital",
  description: "Explore our comprehensive healthcare services including diagnostics, outpatient care, surgical services, maternity care, and 24/7 emergency support.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col bg-white">
      <TopBar />
      <Navbar />
      
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Healthcare Services | CityCare Hospital",
          "description": "Explore our comprehensive healthcare services.",
          "url": "https://citycarehospital.com/services"
        }}
      />

      <main className="flex-grow">
        <ServicesHero />
        <FeatureCards />
        <ServicesGrid />
        <ServicesCTA />
        <WhyChooseServices />
      </main>

      <Footer />
    </div>
  );
}
