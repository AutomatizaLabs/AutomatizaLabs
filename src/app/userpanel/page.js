'use client'
import { useRouter } from 'next/navigation'; // Corrigi o import
import Navbar from "../components/Navbar"; // Adicionei o import do Navbar
import EmailSection from "../components/EmailSection";
import Footer from "../components/Footer";
import ProjectsSection from "../components/ProjectsSection";
import useAuth from "../../../hook/useAuth";
import Auth from '../components/Auth';

export default function UserPanel() {
  const { user } = useAuth(); // Use o hook useAuth
  const router = useRouter(); // Use useRouter para redirecionar

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#ffffff]">
      <Auth />
      <div className="container mt-24 mx-auto px-12 py-4">
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
