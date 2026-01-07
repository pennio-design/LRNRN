import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { Lightbulb } from 'lucide-react';
import { Workflow } from 'lucide-react';
import { Zap } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { useQuestionStore } from '../../lib/stores/question-store.ts';
import { Button } from '../../components/ui/button.tsx';

const MetaPage: React.FC = () => {
  const navigate = useNavigate();
  const { loadMetaCurriculum } = useQuestionStore();

  const handleLaunchMeta = () => {
    loadMetaCurriculum();
    navigate('/question-flow');
  };

  return (
    <div className="container mx-auto px-16 py-96 max-w-4xl">
      <header className="mb-64">
        <h1 className="text-4xl font-bold text-slate-900 mb-16 tracking-tight md:text-5xl">The Strategic Framework</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          LRNRN isn't just a tool; it's a demonstration of high-level AI product engineering. 
          We believe the best way to prove our system works is to teach you exactly how we built it.
        </p>
      </header>

      <div className="space-y-64 mb-96">
        <Section 
          icon={<Terminal className="w-6 h-6" />}
          title="01 // Framing before Features"
          content="Most AI tools are 'wrappers'. LRNRN starts with a positioning claim: self-learners fail because of uncertainty, not ability. Every feature—from the question flow to the reasoning nodes—serves to destroy that uncertainty."
        />

        <Section 
          icon={<Lightbulb className="w-6 h-6" />}
          title="02 // Opinionated Orchestration"
          content="We intentionally limit choices. By giving the user ONE path, we reduce the cognitive load of decision-making. This builds trust through authority rather than overwhelming them with options."
        />

        <div className="bg-slate-900 text-white p-48 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-32 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkles className="w-32 h-32 text-secondary" />
          </div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-secondary mb-16 flex items-center gap-8">
            <Terminal className="w-4 h-4" />
            Internal Reasoning
          </h3>
          <p className="font-mono text-sm text-slate-300 leading-relaxed max-w-2xl">
            // STRATEGIC: We use Gemini's thinking tokens to simulate the advice of a senior engineer or domain expert. 
            // This 'Reasoning Transparency' is the primary differentiator against search-engine results.
          </p>
        </div>

        <Section 
          icon={<Workflow className="w-6 h-6" />}
          title="03 // The PENNIO Flow"
          content="Built following the Frame -> Layout -> Orchestrate -> World model. This project serves as a portfolio piece showcasing how to bridge the gap between prompt engineering and production-grade software."
        />
      </div>

      {/* Meta Curriculum Launchpad */}
      <section className="bg-primary p-48 md:p-64 rounded-[40px] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] opacity-20" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-8 bg-white/10 backdrop-blur-md px-16 py-8 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest mb-24">
            <Zap className="w-4 h-4 text-secondary fill-secondary" />
            Dogfooding Strategy
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-24 tracking-tight leading-tight">
            Learn exactly how we <br /> built this system.
          </h2>
          <p className="text-slate-300 text-lg mb-48 max-w-xl mx-auto leading-relaxed">
            We've curated a meta-curriculum that breaks down our exact strategic and technical build process. No diagnostic required.
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="rounded-full px-48 h-16 group"
            onClick={handleLaunchMeta}
          >
            Launch Meta-Learning Room
            <ArrowRight className="ml-8 w-5 h-5 transition-transform group-hover:translate-x-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

const Section: React.FC<{ icon: React.ReactNode; title: string; content: string }> = ({ icon, title, content }) => (
  <div className="flex gap-24 group">
    <div className="shrink-0 w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-white transition-colors">
      {icon}
    </div>
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-8 tracking-tight">{title}</h2>
      <p className="text-lg text-slate-600 leading-relaxed">{content}</p>
    </div>
  </div>
);

export default MetaPage;