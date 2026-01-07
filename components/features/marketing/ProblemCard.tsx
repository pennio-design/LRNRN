import React from 'react';
import { X } from 'lucide-react';

interface ProblemCardProps {
  title: string;
  description: string;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ title, description }) => (
  <div className="flex gap-16 items-start group">
    <div className="p-8 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
      <X className="w-5 h-5" />
    </div>
    <div>
      <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-4">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);