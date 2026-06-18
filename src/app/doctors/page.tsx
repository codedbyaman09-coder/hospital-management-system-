import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DoctorsHero from "@/features/doctors/DoctorsHero";
import DoctorsGrid from "@/features/doctors/DoctorsGrid";
import DoctorsWhyChoose from "@/features/doctors/DoctorsWhyChoose";

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-gray-800">
      <TopBar />
      <Navbar />
      <main className="pb-16">
        <DoctorsHero />
        <DoctorsGrid />
        <DoctorsWhyChoose />
      </main>
      <Footer />
    </div>
  );
}
