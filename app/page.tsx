import Header from "@/features/landing_page/Header";
import Hero from "@/features/landing_page/Hero";
import Features from "@/features/landing_page/Features";
import HowItWorks from "@/features/landing_page/HowItWorks";
import Pricing from "@/features/landing_page/Pricing";
import Footer from "@/features/landing_page/Footer";

export default function LandingPage() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
