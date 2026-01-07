import React from 'react';
import { Handle } from 'reactflow';
import { Position } from 'reactflow';

export default function StartNode() {
  return (
    <div className="px-16 py-8 rounded-full bg-slate-900 text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-8 shadow-xl">
      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      Learning Genesis
      <Handle type="source" position={Position.Bottom} className="!bg-slate-900" />
    </div>
  );
}