import { Curriculum } from './curriculum.ts';

export interface Question {
  id: string;
  question_text: string;
  placeholder: string;
  help_text: string;
  examples: {
    excellent: {
      answer: string;
      why: string;
    };
    good: {
      answer: string;
      why: string;
    };
    poor: {
      answer: string;
      why: string;
    };
  };
  validation: {
    min_length: number;
    max_length: number;
    required_elements?: string[];
    forbidden_patterns?: string[];
    custom_validator?: (answer: string) => { valid: boolean; feedback: string };
  };
  curriculum_mapping: {
    affects: ('scope' | 'depth' | 'sequence' | 'resource_types' | 'time_allocation')[];
    reasoning: string;
    extraction_logic: string;
  };
}

export const DIAGNOSTIC_QUESTIONS: Question[] = [
  {
    id: 'goal_discovery',
    question_text: "Imagine it is 3 months from today. What specific, tangible thing have you built or achieved that makes this learning journey an undeniable success for you?",
    placeholder: "e.g. I have a working portfolio site in Next.js that scores 100 on Lighthouse and hosts my generative art gallery.",
    help_text: "Be specific about the output. Focus on the 'what', not the 'how'. Success is a deliverable, not a feeling.",
    examples: {
      excellent: {
        answer: "I have built a real-time collaborative whiteboarding app using WebSockets and React that handles 50 simultaneous users without lag.",
        why: "Provides clear technical constraints and a specific deliverable for the AI to reverse-engineer."
      },
      good: {
        answer: "I can build a full-stack website from scratch using modern tools and deploy it to a production environment.",
        why: "Clear goal, but slightly generic on the 'what' of the product."
      },
      poor: {
        answer: "I want to be a better developer and learn some new things.",
        why: "Too vague. Impossible for the AI to generate an opinionated strategy."
      }
    },
    validation: {
      min_length: 40,
      max_length: 500,
      forbidden_patterns: ["learn stuff", "better at code"]
    },
    curriculum_mapping: {
      affects: ['scope', 'time_allocation'],
      reasoning: "Determines the 'End State' and complexity level of the curriculum.",
      extraction_logic: "Extract core project theme and required technical stack."
    }
  },
  {
    id: 'level_assessment',
    question_text: "When you look at the 'success' you described above, what is the single biggest 'knowledge cliff' you face right now? What is the specific thing you don't know that stops you from starting?",
    placeholder: "e.g. I understand basic JS, but the concept of state management in large apps feels like a black box I can't open.",
    help_text: "Identify the friction point. Is it a language, a framework, a concept, or a lack of project structure?",
    examples: {
      excellent: {
        answer: "I'm comfortable with CSS layouts, but I have no idea how to architect a scalable backend or handle secure user authentication.",
        why: "Identifies a specific technical gap (auth/backend) against a known skill (CSS)."
      },
      good: {
        answer: "I've never used a database before and I don't know how to save user data permanently.",
        why: "Identifies a clear area of missing knowledge."
      },
      poor: {
        answer: "I don't know where to start or what to do first.",
        why: "Non-specific. Hard to differentiate from complete beginner."
      }
    },
    validation: {
      min_length: 30,
      max_length: 500
    },
    curriculum_mapping: {
      affects: ['sequence', 'depth'],
      reasoning: "Used to prune the roadmap. We skip what is known and double down on the 'cliff'.",
      extraction_logic: "Map existing mental models vs required prerequisites."
    }
  },
  {
    id: 'constraint_mapping',
    question_text: "How much 'Deep Work' time can you honestly commit per week? And what is your 'abandonment trigger'—what usually makes you quit a learning path?",
    placeholder: "e.g. 10 hours/week. I usually quit when I get stuck on a bug for more than 48 hours without a clear next step.",
    help_text: "Be brutally honest. We design for your reality, not your aspirations.",
    examples: {
      excellent: {
        answer: "15 hours/week. I quit when the tutorials feel like 'copy-pasting' without understanding the 'why' behind the code.",
        why: "Gives clear time constraints and a specific psychological failure mode."
      },
      good: {
        answer: "5 hours. I quit when I get bored or life gets too busy.",
        why: "Honest, but failure mode is a bit generic."
      },
      poor: {
        answer: "As much as possible. I never quit.",
        why: "Unrealistic. Everyone has constraints; ignoring them leads to abandonment."
      }
    },
    validation: {
      min_length: 25,
      max_length: 300,
      custom_validator: (val) => {
        const hasNumbers = /\d/.test(val);
        return {
          valid: hasNumbers,
          feedback: "Please include a specific number of hours."
        };
      }
    },
    curriculum_mapping: {
      affects: ['time_allocation', 'resource_types'],
      reasoning: "Adjusts the 'Pace' and the density of the resources provided.",
      extraction_logic: "Parse weekly hours and adjust node duration estimates."
    }
  }
];