import React from 'react';
import TopBanner from './components/TopBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuBar from './components/MenuBar';
import InboxMockup from './components/InboxMockup';
import ServicesSection from './components/ServicesSection';
import FeatureTriage from './components/FeatureTriage';
import LogoCloud from './components/LogoCloud';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#090b0e] text-white selection:bg-[#00e87a]/30">
      {/* Root SVG filter for shiny gradient headline */}
      <svg className="sr-only" aria-hidden="true" width="0" height="0">
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      {/* Fixed full-screen looping background video */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
      </div>

      {/* Subtle green ambient lighting in corners */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00e87a]/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#3a8fe8]/5 blur-[140px] rounded-full" />
      </div>

      {/* Two fixed vertical guide lines at 36rem container edges */}
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

      {/* Main landing page content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <TopBanner />
        <Navbar />
        <main className="flex-1">
          <Hero />
          <MenuBar />
          <InboxMockup />
          <ServicesSection />
          <FeatureTriage />
          <LogoCloud />
          <Pricing />
          <Testimonials />
          <FAQSection />
          <ContactSection />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;