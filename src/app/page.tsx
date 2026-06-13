import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/features/home/Hero";
import StatsRow from "@/features/home/StatsRow";
import ServicesAndDepartments from "@/features/home/ServicesAndDepartments";
import WhyChooseUs from "@/features/home/WhyChooseUs";
import CtaBanner from "@/features/home/CtaBanner";
import StatsRowDark from "@/features/home/StatsRowDark";

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-gray-800">
      <TopBar />
      <Navbar />
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
