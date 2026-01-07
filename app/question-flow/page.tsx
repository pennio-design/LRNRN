import React from 'react';
import { useState } from 'react';
import { useQuestionStore } from '../../lib/stores/question-store.ts';
import { analyzeAnswers } from '../../lib/ai/question-analysis.ts';
import { generateCurriculum } from '../../lib/ai/curriculum-generator.ts';
import { CurriculumRoadmap } from '../../components/features/CurriculumRoadmap.tsx';
import QuestionWizard from './QuestionWizard.tsx';
import { Button } from '../../components/ui/button.tsx';
import { BrainCircuit } from 'lucide-react';
import { Zap } from 'lucide-react';
import { RefreshCcw } from 'lucide-react';

export default function QuestionFlowPage() {
  const {
    currentStep, answers, validationStates, isGenerating, isHunting,
    curriculum, resources, setAnswer, nextStep, prevStep, canProceed,
    setContext, setCurriculum, startGeneration, huntAllResources, reset
  } = useQuestionStore();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async () => {
    setIsAnalyzing(true); setError(null);
    try {
      const context = await analyzeAnswers(answers);
      setContext(context);
      startGeneration();
      const newCurriculum = await generateCurriculum(context);
      setCurriculum(newCurriculum);
      await huntAllResources();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Synthesis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (curriculum) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col p-16 md:p-32">
        <header className="max-w-7xl mx-auto w-full mb-32 flex flex-col md:flex-row md:items-end justify-between gap-16">
          <div>
            <div className="flex items-center gap-8 mb-8">
              <div className="p-8 bg-primary text-white rounded-lg"><BrainCircuit className="w-5 h-5" /></div>
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Complete</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{curriculum.title}</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={reset} className="text-slate-400 hover:text-red-500">
            <RefreshCcw className="w-4 h-4 mr-8" /> Reset
          </Button>
        </header>
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-24">
          <CurriculumRoadmap curriculum={curriculum} resources={resources} />
          {isHunting && (
            <div className="bg-white border border-slate-200 p-16 rounded-3xl flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-12">
                <div className="h-8 w-8 bg-accent/10 rounded-full flex items-center justify-center text-accent"><Zap className="w-4 h-4 animate-bounce" /></div>
                <span className="text-sm font-bold text-slate-600">Hunting resources...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white md:bg-slate-50 flex items-center justify-center p-16">
      <QuestionWizard 
        currentStep={currentStep}
        answers={answers}
        validationStates={validationStates}
        isAnalyzing={isAnalyzing}
        isGenerating={isGenerating}
        error={error}
        onAnswerChange={setAnswer}
        onNext={nextStep}
        onPrev={prevStep}
        onComplete={handleComplete}
        canProceed={canProceed()}
      />
    </div>
  );
}