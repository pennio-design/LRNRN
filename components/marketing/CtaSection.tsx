import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button.tsx';

export default function CtaSection() {
  const navigateToFlow = () => {
    if (typeof window !== 'undefined') {
      window.location.hash = '/question-flow';
    }
  };

  const navigateToMeta = () => {
    if (typeof window !== 'undefined') {
      window.location.hash = '/meta';
    }
  };

  return (
    <section className="py-128 px-16 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-primary text-white rounded-[60px] p-64 md:p-96 text-center relative overflow-hidden shadow-3xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] opacity-10" />
          
          <div className="relative z-10 space-y-48">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9]">
              Eliminate the doubt. <br /> Reclaim your time.
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-24">
              <Button 
                onClick={navigateToFlow}
                variant="secondary"
                size="lg"
                className="w-full md:w-auto h-20 px-64 rounded-2xl text-xl shadow-2xl group"
              >
                Start Diagnostic Now
                <ArrowRight className="ml-12 w-6 h-6 transition-transform group-hover:translate-x-4" />
              </Button>
              <button onClick={navigateToMeta} className="text-slate-300 font-bold hover:text-white transition-colors flex items-center gap-8 group">
                Read the Strategy manifesto
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}