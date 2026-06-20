import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PatientsHero from "@/components/patients/PatientsHero";
import PatientsResources from "@/components/patients/PatientsResources";
import AppointmentBanner from "@/components/patients/AppointmentBanner";
import SupportServices from "@/components/patients/SupportServices";
import PatientTestimonial from "@/components/patients/PatientTestimonial";
import NewsletterCTA from "@/components/patients/NewsletterCTA";

export const metadata: Metadata = {
  title: "Patients | CityCare Hospital",
  description: "Patient resources, guidelines, and support services at CityCare Hospital.",
};

export default function PatientsPage() {
  return (
    <main className="min-h-screen bg-[#fcfdfd]">
      <TopBar />
      <Navbar />
      
      {/* Patients Components */}
      <PatientsHero />
      <PatientsResources />
      <AppointmentBanner />
      <SupportServices />
      <PatientTestimonial />
      <NewsletterCTA />

      <Footer />
    </main>
  );
}
