"use client"
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";
import EmailSection from "../components/EmailSection";
import Footer from "../components/Footer";
import ProjectsSection from "../components/ProjectsSection";
import useAuth from "../../../hook/useAuth";
import Auth from '../components/Auth';
import PainelUser from '../components/PainelUserNavBar';
import PainelAdmin from '../components/PainelAdmNavBar';

export default function UserPanel() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#ffffff]">
      {isAdmin ? <PainelAdmin /> : <PainelUser />}
      <div className="container mt-24 mx-auto px-12 py-4">
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
