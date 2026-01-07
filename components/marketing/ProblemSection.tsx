import React from 'react';
import { X } from 'lucide-react';
import { ProblemCard } from '../features/marketing/ProblemCard.tsx';

export default function ProblemSection() {
  return (
    <section className="bg-white py-128 px-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-64 items-center">
          <div className="space-y-48">
            <div className="space-y-16">
              <h2 className="text-slate-900 text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                Escape the <br /> <span className="text-red-600">"Tutorial Hell"</span> Cycle.
              </h2>
              <p className="text-slate-500 text-xl leading-relaxed">
                Most platforms value content volume over learner clarity. They give you 10,000 choices and call it "value." We call it paralysis.
              </p>
            </div>
            
            <div className="grid gap-24">
              <ProblemCard 
                title="The Choice Gap"
                description="Spending 2 hours comparing 5 courses instead of finishing one module."
              />
              <ProblemCard 
                title="Prerequisite Fatigue"
                description="Realizing 4 weeks in that you missed a foundational concept, causing total abandonment."
              />
              <ProblemCard 
                title="Resource Bloat"
                description="A 'to-learn' bookmark folder that grows faster than your actual skill set."
              />
            </div>
          </div>
          
          <div className="relative lg:ml-auto">
            <div className="bg-slate-50 rounded-[40px] p-8 border border-slate-200 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
              <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100">
                <div className="p-24 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-400" />
                    <div className="w-12 h-12 rounded-full bg-amber-400" />
                    <div className="w-12 h-12 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Typical Learning Platform</div>
                </div>
                <div className="p-32 space-y-24">
                  <div className="space-y-8">
                    <div className="h-8 w-1/2 bg-slate-100 rounded" />
                    <div className="grid grid-cols-2 gap-12">
                      <div className="h-32 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-[10px] text-slate-400">Course #1</div>
                      <div className="h-32 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-[10px] text-slate-400">Course #2</div>
                      <div className="h-32 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-[10px] text-slate-400">Course #3</div>
                      <div className="h-32 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-[10px] text-slate-400">Course #4</div>
                    </div>
                  </div>
                  <div className="p-24 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-16">
                    <X className="w-6 h-6 text-red-500" />
                    <p className="text-xs font-bold text-red-900 leading-tight">Internal Signal: "User is overwhelmed. Abandonment likely in 72 hours."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}