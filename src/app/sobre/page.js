import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import EmailSection from "../components/EmailSection";
import Footer from "../components/Footer";
import ProjectsSectionPortifolio from "../components/ProjectsPortifolio";

export default function Sobre() {
  return (
    <main className="flex min-h-screen flex-col bg-[#ffffff]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <AboutSection />
        <ProjectsSectionPortifolio />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
