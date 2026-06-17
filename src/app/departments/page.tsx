import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DepartmentsHero from "@/features/departments/DepartmentsHero";
import DepartmentGrid from "@/features/departments/DepartmentGrid";
import DepartmentsSidebar from "@/features/departments/DepartmentsSidebar";
import AboutStats from "@/features/about/AboutStats";
import SmallCtaBanner from "@/features/departments/SmallCtaBanner";

export default function DepartmentsPage() {
  return (
    <main className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <DepartmentsHero />
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DepartmentGrid />
            </div>
            <div className="lg:col-span-1 lg:mt-[88px]">
              <DepartmentsSidebar />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#f8fbff] pt-2 flex flex-col gap-6">
        <AboutStats />
        <SmallCtaBanner />
      </div>
      
      <Footer />
    </main>
  );
}
