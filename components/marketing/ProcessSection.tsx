import React from 'react';
import { Search } from 'lucide-react';
import { Map as MapIcon } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { ProcessStep } from '../features/marketing/ProcessStep.tsx';

export default function ProcessSection() {
  return (
    <section className="py-128 px-16 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-96 space-y-24">
          <h2 className="text-4xl md:text-6xl font-black mb-16 tracking-tighter">Engineered for Completion.</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">We use high-fidelity diagnostics and thinking-budget AI to kill the noise.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-48">
          <ProcessStep 
            number="01"
            icon={<Search className="w-8 h-8" />}
            title="Strategic Diagnostic"
            description="Instead of 'What do you want to learn?', we ask 'What do you want to build?'. We find your knowledge cliff."
          />
          <ProcessStep 
            number="02"
            icon={<MapIcon className="w-8 h-8" />}
            title="Roadmap Synthesis"
            description="Gemini orchestrates ONE sequence. We skip the basics you know and double down on the concepts you don't."
          />
          <ProcessStep 
            number="03"
            icon={<BookOpen className="w-8 h-8" />}
            title="Focus Sanctuary"
            description="Enter the Learning Room. Vetted resources, persistent notes, and zero distraction until you finish the node."
          />
        </div>
      </div>
    </section>
  );
}