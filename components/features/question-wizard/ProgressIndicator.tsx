import React from 'react';
import { cn } from '../../../lib/utils/cn.ts';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  current: number; // 0-indexed
  total: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ current, total }) => {
  return (
    <div className="flex items-center gap-12">
      {Array.from({ length: total }, (_, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-8">
            <div
              className={cn(
                'flex items-center justify-center w-32 h-32 rounded-full text-xs font-bold transition-all duration-300',
                i < current && 'bg-primary text-white',
                i === current && 'bg-accent/10 text-accent ring-2 ring-accent',
                i > current && 'bg-slate-200 text-slate-500'
              )}
            >
              {i < current ? <Check className="w-16 h-16" /> : i + 1}
            </div>
          </div>
          {i < total - 1 && (
            <div
              className={cn(
                'h-2 w-24 rounded-full transition-all duration-500',
                i < current ? 'bg-primary' : 'bg-slate-200'
              )}
            />
          )}
        </React.Fragment>
      ))}
      <span className="ml-16 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
        Step {current + 1} of {total}
      </span>
    </div>
  );
};