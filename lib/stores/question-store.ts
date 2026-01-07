import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DIAGNOSTIC_QUESTIONS } from '../../types/questions.ts';
import { Curriculum } from '../../types/curriculum.ts';
import { CurriculumContext } from '../../types/curriculum.ts';
import { Resource } from '../../types/resources.ts';
import { huntResources } from '../ai/resource-hunter.ts';
import { META_CURRICULUM } from '../../data/meta-curriculum.ts';
import { META_RESOURCES } from '../../data/meta-curriculum.ts';

interface ValidationState {
  isValid: boolean;
  feedback?: {
    type: 'error' | 'warning' | 'success';
    message: string;
  };
}

interface NodeProgress {
  completed: boolean;
  confidence: number;
  notes: string;
  timeSpent: number;
}

interface QuestionFlowState {
  currentStep: number;
  answers: Record<string, string>;
  validationStates: Record<string, ValidationState>;
  isGenerating: boolean;
  isHunting: boolean;
  context: CurriculumContext | null;
  curriculum: Curriculum | null;
  resources: Record<string, Resource[]>;
  progress: Record<string, NodeProgress>;
  
  setAnswer: (questionId: string, answer: string) => void;
  validateAnswer: (questionId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  setContext: (ctx: CurriculumContext) => void;
  setCurriculum: (curriculum: Curriculum) => void;
  startGeneration: () => void;
  huntAllResources: () => Promise<void>;
  loadMetaCurriculum: () => void;
  updateNodeProgress: (nodeId: string, updates: Partial<NodeProgress>) => void;
  toggleNodeCompletion: (nodeId: string) => void;
  canProceed: () => boolean;
}

export const useQuestionStore = create<QuestionFlowState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      answers: {},
      validationStates: {},
      isGenerating: false,
      isHunting: false,
      context: null,
      curriculum: null,
      resources: {},
      progress: {},

      setAnswer: (questionId, answer) => {
        set((state) => ({ answers: { ...state.answers, [questionId]: answer } }));
        get().validateAnswer(questionId);
      },

      validateAnswer: (questionId) => {
        const question = DIAGNOSTIC_QUESTIONS.find(q => q.id === questionId);
        if (!question) return;
        const answer = get().answers[questionId] || '';
        
        if (answer.length < question.validation.min_length) {
          return set((state) => ({
            validationStates: {
              ...state.validationStates,
              [questionId]: { isValid: false, feedback: { type: 'error', message: `Strategic depth required: ${question.validation.min_length - answer.length} more characters needed.` } }
            }
          }));
        }

        if (question.validation.forbidden_patterns) {
          for (const pattern of question.validation.forbidden_patterns) {
            if (answer.toLowerCase().includes(pattern.toLowerCase())) {
              return set((state) => ({
                validationStates: {
                  ...state.validationStates,
                  [questionId]: { isValid: false, feedback: { type: 'warning', message: `Specifics matter. Avoid generic phrasing like "${pattern}".` } }
                }
              }));
            }
          }
        }

        set((state) => ({
          validationStates: {
            ...state.validationStates,
            [questionId]: { isValid: true, feedback: { type: 'success', message: 'Ready for analysis.' } }
          }
        }));
      },

      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, DIAGNOSTIC_QUESTIONS.length - 1) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
      reset: () => {
        if (typeof localStorage !== 'undefined') localStorage.removeItem('lrnrn-diagnostic-state');
        set({ currentStep: 0, answers: {}, validationStates: {}, isGenerating: false, isHunting: false, context: null, curriculum: null, resources: {}, progress: {} });
      },
      setContext: (ctx) => set({ context: ctx }),
      setCurriculum: (curriculum) => set({ curriculum, isGenerating: false }),
      startGeneration: () => set({ isGenerating: true }),
      huntAllResources: async () => {
        const state = get();
        if (!state.curriculum || !state.context) return;
        set({ isHunting: true });
        for (const node of state.curriculum.nodes) {
          if (state.resources[node.id]?.length > 0) continue;
          try {
            const results = await huntResources(node, state.context.constraints.learning_style, state.context.goal.complexity_level);
            set((s) => ({ resources: { ...s.resources, [node.id]: results } }));
          } catch (err) { console.error(err); }
        }
        set({ isHunting: false });
      },
      loadMetaCurriculum: () => {
        set({ curriculum: META_CURRICULUM, resources: META_RESOURCES, context: { goal: { project: "Build LRNRN", domain: "Strategy", success_criteria: "Complete", complexity_level: 5 }, current_level: { existing_skills: ["React"], mental_models: ["State"], knowledge_gaps: ["AI"], learning_phase: "intermediate" }, constraints: { hours_per_week: 10, learning_style: "mixed", depth_preference: "depth", pace_preference: "thorough" } }, isGenerating: false, isHunting: false });
      },
      updateNodeProgress: (nodeId, updates) => {
        set((state) => ({ progress: { ...state.progress, [nodeId]: { ...(state.progress[nodeId] || { completed: false, confidence: 0, notes: '', timeSpent: 0 }), ...updates } } }));
      },
      toggleNodeCompletion: (nodeId) => {
        set((state) => {
          const current = state.progress[nodeId]?.completed || false;
          return { progress: { ...state.progress, [nodeId]: { ...(state.progress[nodeId] || { confidence: 0, notes: '', timeSpent: 0 }), completed: !current } } };
        });
      },
      canProceed: () => {
        const state = get();
        const currentQuestion = DIAGNOSTIC_QUESTIONS[state.currentStep];
        return state.validationStates[currentQuestion.id]?.isValid || false;
      }
    }),
    {
      name: 'lrnrn-diagnostic-state',
      partialize: (state) => ({
        currentStep: state.currentStep, answers: state.answers, context: state.context,
        curriculum: state.curriculum, resources: state.resources, progress: state.progress
      }),
    }
  )
);