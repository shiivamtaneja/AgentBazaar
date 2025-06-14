import AgentShowCaseSection from "@/components/agent-showcase";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />
      <AgentShowCaseSection />
      {/* <HowItWorks /> */}
      {/* <AboutProtocol /> */}
      {/* <TechStackFooter /> */}
    </main>
  );
}
