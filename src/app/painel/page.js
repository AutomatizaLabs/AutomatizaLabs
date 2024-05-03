"use client"
import { useRouter } from 'next/navigation';
import EmailSection from "../components/EmailSection";
import Footer from "../components/Footer";
import ProjectsSection from "../components/ProjectsSection";
import useAuth from "../../../hook/useAuth";
import PainelUserNavBar from '../components/PainelUserNavBar';
import PainelAdminNavBar from '../components/PainelAdmNavBar';
import AddTodo from '../components/AddTodo';
import TodoListedit from '../components/TodolistEditor';
import ModalContextProvider from '../contexts/ModalContext';

export default function UserPanel() {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    
    <>
    <main className="flex min-h-screen flex-col bg-[#ffffff]">
      <ModalContextProvider >
      {isAdmin ? <PainelAdminNavBar /> : <PainelUserNavBar />}
      <div className="container mt-24 mx-auto px-12 py-4">
      {isAdmin ? <AddTodo /> : <p/>}
      {isAdmin ? <TodoListedit />: <p/>}
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </ModalContextProvider>
    </main>
    </>
  );
}
