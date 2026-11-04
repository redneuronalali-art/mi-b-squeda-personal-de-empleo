/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThreeBackground } from './components/ThreeBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { AvailabilityCard } from './components/AvailabilityCard';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CalendarSection } from './components/CalendarSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PdfModal } from './components/PdfModal';

export default function App() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const handleOpenPdf = () => setIsPdfModalOpen(true);
  const handleClosePdf = () => setIsPdfModalOpen(false);

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
        
        {/* Interactive 3D WebGL Background (Three.js) */}
        <ThreeBackground />

        {/* Ambient Grid overlay */}
        <div 
          className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" 
          aria-hidden="true" 
        />

        {/* Main Content Layers */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header onOpenPdf={handleOpenPdf} />

          <main className="flex-1">
            <Hero onOpenPdf={handleOpenPdf} />
            <AboutSection />
            <ExperienceTimeline />
            <SkillsSection />
            <EducationSection />
            <AvailabilityCard />
            <TestimonialsSection />
            <CalendarSection />
            <ContactSection />
          </main>

          <Footer onOpenPdf={handleOpenPdf} />
        </div>

        {/* Recruiter PDF & Print Modal */}
        <PdfModal 
          isOpen={isPdfModalOpen} 
          onClose={handleClosePdf} 
        />

      </div>
    </LanguageProvider>
  );
}
