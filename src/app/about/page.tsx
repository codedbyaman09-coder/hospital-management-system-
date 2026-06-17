import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/features/about/AboutHero";
import AboutContent from "@/features/about/AboutContent";
import MissionVisionValues from "@/features/about/MissionVisionValues";
import AboutStats from "@/features/about/AboutStats";
import WhyChooseUsAbout from "@/features/about/WhyChooseUsAbout";
import LeadershipTeam from "@/features/about/LeadershipTeam";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
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
