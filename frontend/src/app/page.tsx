import AgentShowCaseSection from "@/components/agent-showcase";
import HeroSection from "@/components/hero-section";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <ToastContainer theme="dark" />
      <HeroSection />
      <AgentShowCaseSection />
      {/* <HowItWorks /> */}
      {/* <AboutProtocol /> */}
      {/* <TechStackFooter /> */}
    </main>
  );
}
