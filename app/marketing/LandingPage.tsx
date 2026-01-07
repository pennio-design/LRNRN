import React from 'react';
import { Compass } from 'lucide-react';
import { useQuestionStore } from '../../lib/stores/question-store.ts';
import HeroSection from '../../components/marketing/HeroSection.tsx';
import ProblemSection from '../../components/marketing/ProblemSection.tsx';
import ProcessSection from '../../components/marketing/ProcessSection.tsx';
import ComparisonSection from '../../components/marketing/ComparisonSection.tsx';
import CtaSection from '../../components/marketing/CtaSection.tsx';

/**
 * STRATEGIC: Landing Page Orchestrator
 * Split into modular sections to stay under 300 lines and prevent AI Studio loading crashes.
 */
export default function LandingPage() {
  const { loadMetaCurriculum } = useQuestionStore();

  const handleLaunchMeta = () => {
    loadMetaCurriculum();
    if (typeof window !== 'undefined') {
      window.location.hash = '/question-flow';
    }
  };

  return (
    <div className="flex flex-col bg-white overflow-x-hidden">
      <HeroSection onLaunchMeta={handleLaunchMeta} />
      <ProblemSection />
      <ProcessSection />
      <ComparisonSection />
      <CtaSection />

      <footer className="py-64 border-t border-slate-100">
        <div className="container mx-auto px-16 text-center space-y-24">
           <div className="flex items-center justify-center gap-12">
            <div className="bg-primary p-2 rounded-lg">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-900">LRNRN.</span>
          </div>
          <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.4em]">
            © 2024 STRATEGIC LEARNING SYSTEMS // PENNIO DNA
          </p>
        </div>
      </footer>
    </div>
  );
}