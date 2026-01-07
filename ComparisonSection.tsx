import React from 'react';
import { TableRow } from '../features/marketing/TableRow.tsx';

export default function ComparisonSection() {
  return (
    <section className="py-128 px-16 bg-white border-y border-slate-100">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-64 space-y-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Choice vs. Strategy</h2>
          <p className="text-slate-500">Why opinionated learning beats open-market aggregation.</p>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-3xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-24 font-mono text-[10px] uppercase tracking-widest">Phase</th>
                <th className="p-24 font-mono text-[10px] uppercase tracking-widest text-slate-400">Course Aggregators</th>
                <th className="p-24 font-mono text-[10px] uppercase tracking-widest text-secondary">LRNRN Path</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <TableRow feature="Onboarding" old="Self-guided search" nw="Strategic Diagnostic" nwHighlight />
              <TableRow feature="Sequencing" old="Generic chapters" nw="Dynamic Prerequisite Mapping" nwHighlight />
              <TableRow feature="Curation" old="Top-rated / Ad-heavy" nw="Signal-Scored Vetted Resources" nwHighlight />
              <TableRow feature="Environment" old="Distracting platform features" nw="Immersive Focus Sanctuary" nwHighlight />
              <TableRow feature="Confidence" old="Passive watching" nw="Active Self-Calibration" nwHighlight />
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}