import React from 'react';
import { Handle } from 'reactflow';
import { Position } from 'reactflow';
import { Target } from 'lucide-react';
import { Zap } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

export default function MilestoneNode({ data }: any) {
  return (
    <div 
      className="px-24 py-20 rounded-3xl border-2 border-secondary bg-amber-50 shadow-xl w-[320px] text-center relative overflow-hidden group cursor-pointer"
      onClick={() => data.onSelect(data.node)}
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Target className="w-16 h-16 text-secondary" />
      </div>
      
      <Handle type="target" position={Position.Top} className="!bg-secondary" />
      
      <div className="inline-flex items-center gap-8 bg-secondary text-white px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest mb-12">
        <Zap className="w-3 h-3 fill-current" />
        Key Milestone
      </div>
      
      <h3 className="font-black text-slate-900 text-lg mb-8 leading-tight">
        {data.node.title}
      </h3>
      
      <p className="text-xs text-slate-600 line-clamp-2 mb-12 italic">
        {data.node.description}
      </p>

      <button 
        onClick={(e) => { e.stopPropagation(); data.onLearn(data.node); }}
        className="w-full bg-slate-900 text-white py-10 rounded-xl font-bold text-xs flex items-center justify-center gap-8 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        Enter Learning Room
        <ChevronRight className="w-4 h-4" />
      </button>

      <Handle type="source" position={Position.Bottom} className="!bg-secondary" />
    </div>
  );
}