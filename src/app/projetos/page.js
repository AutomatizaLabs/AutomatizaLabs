import Navbar from "../components/Navbar";
import ProjectsSection from "../components/ProjectsSection";
import EmailSection from "../components/EmailSection";
import Footer from "../components/Footer";

export default function Projetos() {
  return (
    <main className="flex min-h-screen flex-col bg-[#ffffff]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
