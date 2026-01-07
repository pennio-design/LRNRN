import React, { useState } from 'react';
import { cn } from '../../../lib/utils/cn.ts';
import { Question } from '../../../types/questions.ts';

interface QuestionInputProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({ question, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const charCount = value.length;
  const minChars = question.validation.min_length;

  return (
    <div className="relative group">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={question.placeholder}
        className={cn(
          'w-full h-64 p-24 rounded-2xl border-2 bg-slate-50/50 text-xl text-slate-900 transition-all outline-none resize-none placeholder:text-slate-400/80',
          isFocused ? 'border-accent bg-white shadow-2xl shadow-accent/5 ring-8 ring-accent/5' : 'border-slate-200 hover:border-slate-300'
        )}
      />
      
      <div className="flex justify-between items-center mt-12 px-8">
        <span className={cn(
          'text-[11px] font-mono font-medium transition-colors uppercase tracking-wider',
          charCount < minChars ? 'text-slate-400' : 'text-success'
        )}>
          {charCount < minChars 
            ? `${minChars - charCount} more characters required for diagnostic depth`
            : '✓ Sufficient fidelity'
          }
        </span>
        
        <span className="text-xs font-mono text-slate-400">
          {charCount} / {question.validation.max_length}
        </span>
      </div>
    </div>
  );
};