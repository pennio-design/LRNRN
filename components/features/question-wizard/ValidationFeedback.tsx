import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils/cn.ts';

interface ValidationFeedbackProps {
  type: 'error' | 'warning' | 'success';
  message: string;
}

export const ValidationFeedback: React.FC<ValidationFeedbackProps> = ({ type, message }) => {
  const icons = {
    error: <AlertCircle className="w-16 h-16" />,
    warning: <AlertTriangle className="w-16 h-16" />,
    success: <CheckCircle2 className="w-16 h-16" />
  };
  
  return (
    <div className={cn(
      'flex items-center gap-12 p-16 rounded-xl border animate-in slide-in-from-top-4 duration-300',
      type === 'error' && 'bg-red-50 border-red-100 text-red-900',
      type === 'warning' && 'bg-amber-50 border-amber-100 text-amber-900',
      type === 'success' && 'bg-emerald-50 border-emerald-100 text-emerald-900'
    )}>
      <div className="shrink-0">{icons[type]}</div>
      <p className="text-xs font-semibold leading-relaxed uppercase tracking-tight">{message}</p>
    </div>
  );
};