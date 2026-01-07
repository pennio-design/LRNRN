import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '../../../lib/utils/cn.ts';
import { Question } from '../../../types/questions.ts';

interface ExampleAccordionProps {
  examples: Question['examples'];
}

export const ExampleAccordion: React.FC<ExampleAccordionProps> = ({ examples }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mt-24 border border-slate-200 rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-24 py-16 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-8 uppercase tracking-widest text-[10px]">
          <Sparkles className="w-12 h-12 text-accent" />
          Strategic Reference Benchmarks
        </div>
        <ChevronDown className={cn(
          'w-16 h-16 transition-transform duration-300',
          isOpen && 'rotate-180'
        )} />
      </button>
      
      {isOpen && (
        <div className="px-24 pb-24 space-y-24 border-t border-slate-100 pt-24 animate-in fade-in duration-300">
          <ExampleCard type="excellent" data={examples.excellent} />
          <ExampleCard type="good" data={examples.good} />
          <ExampleCard type="poor" data={examples.poor} />
        </div>
      )}
    </div>
  );
};

const ExampleCard: React.FC<{ type: 'excellent' | 'good' | 'poor'; data: { answer: string; why: string } }> = ({ type, data }) => {
  const styles = {
    excellent: 'bg-emerald-50 border-emerald-100 text-emerald-900',
    good: 'bg-blue-50 border-blue-100 text-blue-900',
    poor: 'bg-red-50 border-red-100 text-red-900',
  };

  return (
    <div className={cn('p-16 rounded-xl border', styles[type])}>
      <div className="flex items-center gap-8 mb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{type}</span>
      </div>
      <p className="text-sm font-medium italic mb-12">"{data.answer}"</p>
      <p className="text-[11px] opacity-70 leading-relaxed"><strong className="opacity-100">Why:</strong> {data.why}</p>
    </div>
  );
};