import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Terminal } from 'lucide-react';
import { Button } from '../ui/button.tsx';

// Inlined utility for AI Studio stability
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

interface HeroSectionProps {
  onLaunchMeta: () => void;
}

export default function HeroSection({ onLaunchMeta }: HeroSectionProps) {
  const navigateToFlow = () => {
    if (typeof window !== 'undefined') {
      window.location.hash = '/question-flow';
    }
  };

  return (
    <section className="relative pt-64 pb-96 md:pt-96 md:pb-128 px-16 overflow-hidden border-b border-slate-100">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-20" />
      </div>

      <div className="container mx-auto text-center max-w-5xl">
        <div className="inline-flex items-center gap-12 bg-slate-900 text-white px-20 py-8 rounded-full mb-32 border border-slate-800 shadow-2xl">
          <span className="flex h-3 w-3 rounded-full bg-secondary animate-ping" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">Strategy Before Study</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 mb-32 leading-[0.95] md:leading-[1.1]">
          Stop second-guessing <br />
          <span className="text-primary italic relative inline-block">
            your path.
            <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 400 20" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 15C100 5 300 5 395 15" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round"/>
            </svg>
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 mb-64 leading-relaxed max-w-3xl mx-auto font-medium">
          Self-learners waste 40% of their time researching <span className="text-slate-900 font-bold underline decoration-secondary/50">what</span> to learn instead of learning. LRNRN gives you ONE opinionated roadmap.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-24">
          <Button 
            onClick={navigateToFlow}
            size="lg"
            className="w-full sm:w-auto h-20 px-48 rounded-2xl text-xl shadow-2xl shadow-primary/20 group"
          >
            Start Diagnostic
            <ArrowRight className="ml-12 w-6 h-6 transition-transform group-hover:translate-x-4" />
          </Button>
          <button 
            onClick={onLaunchMeta}
            className="w-full sm:w-auto px-32 py-20 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-bold text-lg hover:border-primary hover:bg-slate-50 transition-all flex items-center justify-center gap-12 group"
          >
            <Terminal className="w-5 h-5 text-accent" />
            See how we built it
          </button>
        </div>
      </div>
    </section>
  );
}