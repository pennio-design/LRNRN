import React from 'react';
import { ProgressIndicator } from '../../components/features/question-wizard/ProgressIndicator.tsx';
import { QuestionInput } from '../../components/features/question-wizard/QuestionInput.tsx';
import { ValidationFeedback } from '../../components/features/question-wizard/ValidationFeedback.tsx';
import { ExampleAccordion } from '../../components/features/question-wizard/ExampleAccordion.tsx';
import { Button } from '../../components/ui/button.tsx';
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { BrainCircuit } from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS } from '../../types/questions.ts';

export default function QuestionWizard({ 
  currentStep, 
  answers, 
  validationStates, 
  isAnalyzing, 
  isGenerating, 
  error,
  onAnswerChange,
  onNext,
  onPrev,
  onComplete,
  canProceed
}: any) {
  const currentQuestion = DIAGNOSTIC_QUESTIONS[currentStep];
  const currentAnswer = answers[currentQuestion.id] || '';
  const currentValidation = validationStates[currentQuestion.id];

  return (
    <div className="max-w-4xl w-full bg-white md:rounded-[40px] md:shadow-2xl md:border md:border-slate-100 overflow-hidden flex flex-col min-h-[700px]">
      <div className="px-32 py-24 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <ProgressIndicator current={currentStep} total={DIAGNOSTIC_QUESTIONS.length} />
        {error && <span className="text-xs font-bold text-red-500 bg-red-50 px-12 py-4 rounded-full">{error}</span>}
      </div>
      <div className="flex-1 p-32 md:p-64 flex flex-col justify-center gap-48">
        {isAnalyzing || isGenerating ? (
          <div className="flex flex-col items-center justify-center text-center gap-32">
            <div className="relative">
              <div className="h-32 w-32 border-4 border-slate-100 rounded-full" />
              <div className="absolute inset-0 h-32 w-32 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <BrainCircuit className="absolute inset-0 m-auto w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {isAnalyzing ? "Analyzing Strategic Depth..." : "Synthesizing Roadmap..."}
            </h2>
          </div>
        ) : (
          <>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              {currentQuestion.question_text}
            </h1>
            <div className="space-y-12">
              <QuestionInput question={currentQuestion} value={currentAnswer} onChange={(val: string) => onAnswerChange(currentQuestion.id, val)} />
              {currentValidation?.feedback && <ValidationFeedback type={currentValidation.feedback.type} message={currentValidation.feedback.message} />}
              <ExampleAccordion examples={currentQuestion.examples} />
            </div>
          </>
        )}
      </div>
      <div className="px-32 py-24 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <Button variant="ghost" onClick={onPrev} disabled={currentStep === 0 || isAnalyzing || isGenerating}>
          <ArrowLeft className="w-4 h-4 mr-8" /> Back
        </Button>
        <Button onClick={currentStep === DIAGNOSTIC_QUESTIONS.length - 1 ? onComplete : onNext} disabled={!canProceed || isAnalyzing || isGenerating}>
          {currentStep === DIAGNOSTIC_QUESTIONS.length - 1 ? "Generate Path" : "Next Phase"} <ArrowRight className="ml-8 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}