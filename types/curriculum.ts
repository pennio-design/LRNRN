
export interface CurriculumNode {
  id: string;
  title: string;
  description: string;
  reasoning: string;
  estimated_hours: number;
  prerequisites: number[]; // Indices of prerequisite nodes
  learning_outcomes: string[];
  decision_point?: {
    question: string;
    branches: Array<{
      choice: string;
      next_nodes: number[];
    }>;
  };
}

export interface Curriculum {
  title: string;
  description: string;
  learner_context: string;
  path_strategy: string;
  nodes: CurriculumNode[];
  total_estimated_hours: number;
  completion_milestone: string;
}

export interface CurriculumContext {
  goal: {
    project: string;
    domain: string;
    success_criteria: string;
    complexity_level: 1 | 2 | 3 | 4 | 5;
  };
  current_level: {
    existing_skills: string[];
    mental_models: string[];
    knowledge_gaps: string[];
    learning_phase: 'beginner' | 'intermediate' | 'advanced';
  };
  constraints: {
    hours_per_week: number;
    learning_style: 'visual' | 'textual' | 'hands-on' | 'mixed';
    depth_preference: 'breadth' | 'depth' | 'balanced';
    pace_preference: 'thorough' | 'fast' | 'adaptive';
  };
}
