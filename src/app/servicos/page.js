import Navbar from "../components/Navbar";
import ServicesSection from "../components/ServicesSection";
import EmailSection from "../components/EmailSection";
import Footer from "../components/Footer";
import ServicesPriceSection from "../components/ServicesPriceSection";

export default function Servico() {
  return (
    <main className="flex min-h-screen flex-col bg-[#ffffff]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <ServicesSection />
        <ServicesPriceSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
