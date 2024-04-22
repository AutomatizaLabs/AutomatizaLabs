'use client'
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import useAuth from "../../../hook/useAuth";

export default function Projetos() {
  const { user } = useAuth(); // Use o hook useAuth

  
  return (
    <main className="flex min-h-screen flex-col bg-[#ffffff]">
      <LoginForm />
      <Footer />
    </main>
  );
}
