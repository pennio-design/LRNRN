import React from 'react';

interface ProcessStepProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const ProcessStep: React.FC<ProcessStepProps> = ({ number, icon, title, description }) => (
  <div className="space-y-24 p-32 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
    <div className="flex items-center justify-between">
      <div className="p-16 bg-white/10 rounded-2xl group-hover:bg-secondary group-hover:text-slate-900 transition-all duration-500">
        {icon}
      </div>
      <span className="text-5xl font-black text-white/5 group-hover:text-secondary/10 transition-colors">{number}</span>
    </div>
    <div className="space-y-12">
      <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
    </div>
  </div>
);