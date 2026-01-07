import React from 'react';
import { Handle } from 'reactflow';
import { Position } from 'reactflow';
import { BookOpen } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Play } from 'lucide-react';

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ConceptNode({ data }: any) {
  return (
    <div 
      className={cn(
        "px-20 py-16 rounded-2xl border-2 bg-white shadow-lg transition-all w-[280px] group",
        data.isCurrent ? "border-accent shadow-accent/10 ring-4 ring-accent/5" : "border-slate-200 hover:border-slate-300",
        data.isCompleted && "border-success bg-emerald-50/30"
      )}
      onClick={() => data.onSelect(data.node)}
    >
      <Handle type="target" position={Position.Top} className="!bg-slate-300" />
      
      <div className="flex items-start justify-between mb-8">
        <div className={cn(
          "p-6 rounded-lg",
          data.isCurrent ? "bg-accent/10 text-accent" : "bg-slate-100 text-slate-500"
        )}>
          <BookOpen className="w-4 h-4" />
        </div>
        {data.isCompleted && (
          <CheckCircle2 className="w-4 h-4 text-success" />
        )}
      </div>

      <h3 className="font-bold text-slate-900 leading-tight mb-4 group-hover:text-primary transition-colors">
        {data.node.title}
      </h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8 text-[10px] font-mono text-slate-400">
          <Clock className="w-3 h-3" />
          {data.node.estimated_hours}h focus
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); data.onLearn(data.node); }}
          className="bg-slate-900 text-white p-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Play className="w-3 h-3 fill-current" />
        </button>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-slate-300" />
    </div>
  );
}