import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../../lib/utils/cn.ts';

interface TableRowProps {
  feature: string;
  old: string;
  nw: string;
  nwHighlight?: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({ feature, old, nw, nwHighlight }) => (
  <tr>
    <td className="p-24 font-black text-slate-900 text-[11px] uppercase tracking-widest border-r border-slate-50">{feature}</td>
    <td className="p-24 text-slate-400 text-sm italic">{old}</td>
    <td className={cn(
      "p-24 text-sm font-bold",
      nwHighlight ? "text-primary bg-primary/5" : "text-slate-900"
    )}>
      <div className="flex items-center gap-12">
        <Check className="w-5 h-5 text-emerald-500" />
        {nw}
      </div>
    </td>
  </tr>
);