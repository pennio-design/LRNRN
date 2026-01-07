import { Curriculum } from '../types/curriculum.ts';
import { Resource } from '../types/resources.ts';

/**
 * STRATEGIC: The Meta-Curriculum.
 * This is the ultimate authority asset for LRNRN.
 * It teaches the learner how the system they are using was conceptualized and engineered.
 */
export const META_CURRICULUM: Curriculum = {
  title: "Building LRNRN: From Frame to World",
  description: "A deep-dive into the strategic AI product engineering of a learning strategist. Learn how we built the system that eliminates curriculum doubt.",
  learner_context: "Aspiring AI product engineers and strategic developers looking to build high-signal AI tools.",
  path_strategy: "We follow the PENNIO framework: Frame the problem, Layout the intelligence, Orchestrate the system, and position it in the World.",
  total_estimated_hours: 12,
  completion_milestone: "You understand how to bridge the gap between prompt engineering and production-grade strategic software.",
  nodes: [
    {
      id: "meta-001",
      title: "Strategy Framing: The Problem of Choice",
      description: "Defining the core problem: Self-learners fail because of uncertainty, not lack of ability. We build for 'The Analysis Paralysis Cliff'.",
      reasoning: "Without a clear problem statement, AI tools become generic wrappers. We start by framing the 'Analysis Paralysis' as a technical and psychological debt.",
      estimated_hours: 1,
      prerequisites: [],
      learning_outcomes: [
        "Identify 'High-Stakes' vs 'Low-Stakes' feature requests",
        "Define a product's Strategic Moat",
        "Documenting the 'Anti-Goals' of LRNRN"
      ]
    },
    {
      id: "meta-002",
      title: "The Diagnostic: Engineering for Depth",
      description: "Designing a question flow that forces the user to provide high-fidelity inputs. We move from 'What do you want to learn?' to strategic diagnostic benchmarks.",
      reasoning: "AI quality is a direct function of input fidelity. We designed questions that act as 'validation gates' for the user's own goals.",
      estimated_hours: 2,
      prerequisites: [0],
      learning_outcomes: [
        "Implement character-count validation for 'depth'",
        "Designing behavioral benchmarks (Excellent/Good/Poor)",
        "Building a state-persisted multi-step wizard in Zustand"
      ]
    },
    {
      id: "meta-003",
      title: "Intelligence Orchestration: Gemini 2.5 Logic",
      description: "Orchestrating Gemini 2.5 Flash and Pro to synthesize strategy. We move beyond simple prompting to complex JSON schema validation and multi-turn reasoning.",
      reasoning: "Prompting is product engineering. We use specific thinking budgets to ensure the AI 'weighs' the user's constraints against the domain complexity.",
      estimated_hours: 3,
      prerequisites: [1],
      learning_outcomes: [
        "Configuring Gemini Thinking Budgets for strategy",
        "Enforcing strict JSON schema with Zod/Gemini Types",
        "Handling token-cost vs logic-depth trade-offs"
      ]
    },
    {
      id: "meta-004",
      title: "High-Signal Hunting: Filtering the Noise",
      description: "Building the Resource Hunter. We don't scrape the web blindly; we hunt within trusted domains and use AI to score for signal-to-noise ratio.",
      reasoning: "Aggregation is easy. Curation is hard. We built a 'scoring engine' that evaluates resources based on Credibility, Depth, and Style-Match.",
      estimated_hours: 2,
      prerequisites: [2],
      learning_outcomes: [
        "Define a 'Curated Sources' whitelist",
        "Building an AI resource scoring algorithm",
        "Asynchronous 'Hunting' state management"
      ]
    },
    {
      id: "meta-005",
      title: "Spatial Logic: Visualizing with React Flow",
      description: "Turning a list into a roadmap. We use React Flow and Dagre to give learners a mental model of their progress and concept dependencies.",
      reasoning: "Linear lists are for tasks. Roadmaps are for journeys. Spatial layout helps learners visualize prerequisites and milestones.",
      estimated_hours: 2,
      prerequisites: [3],
      learning_outcomes: [
        "Implementing Dagre-based graph layout",
        "Custom node rendering in React Flow",
        "Connecting store state to a visual graph"
      ]
    },
    {
      id: "meta-006",
      title: "The Sanctuary: Building for Focus",
      description: "Designing the Learning Room. We remove navigation, embed content, and provide a persistent workspace to keep the learner in 'Deep Work'.",
      reasoning: "The final barrier is execution. We build an immersive room that kills distraction and encourages completion through micro-progress tracking.",
      estimated_hours: 2,
      prerequisites: [4],
      learning_outcomes: [
        "Immersive layout design (Focus Mode)",
        "Auto-persisting notes system per node",
        "Completion psychology and confidence calibration"
      ]
    }
  ]
};

export const META_RESOURCES: Record<string, Resource[]> = {
  "meta-001": [
    {
      url: "https://github.com/lrnrn/frame-strategy",
      title: "The Strategy Frame (GitHub Repo)",
      type: "repository",
      creator: "LRNRN Core",
      quality_score: { credibility: 10, recency: 9, depth: 8, accessibility: 9, format_match: 10, total: 9.2 },
      reasoning: "The raw technical and strategic documentation for LRNRN's inception.",
      estimated_minutes: 15,
      is_free: true
    }
  ],
  "meta-002": [
    {
      url: "https://github.com/lrnrn/diagnostic-engine",
      title: "Diagnostic Logic Implementation",
      type: "repository",
      creator: "LRNRN Core",
      quality_score: { credibility: 10, recency: 9, depth: 9, accessibility: 8, format_match: 10, total: 9.3 },
      reasoning: "The Zod schemas and character-depth validation logic.",
      estimated_minutes: 20,
      is_free: true
    }
  ],
  "meta-003": [
    {
      url: "https://ai.google.dev/gemini-api/docs/reasoning",
      title: "Deep Dive: Gemini Thinking Tokens",
      type: "documentation",
      creator: "Google DeepMind",
      quality_score: { credibility: 10, recency: 10, depth: 10, accessibility: 9, format_match: 9, total: 9.8 },
      reasoning: "The fundamental technology powering LRNRN's strategy synthesis.",
      estimated_minutes: 45,
      is_free: true
    }
  ],
  "meta-004": [
    {
      url: "https://github.com/lrnrn/resource-hunter",
      title: "The Hunter Algorithm",
      type: "repository",
      creator: "LRNRN Core",
      quality_score: { credibility: 10, recency: 9, depth: 8, accessibility: 9, format_match: 10, total: 9.1 },
      reasoning: "Code for the weighted scoring engine and curated domain filtering.",
      estimated_minutes: 15,
      is_free: true
    }
  ],
  "meta-005": [
    {
      url: "https://reactflow.dev/docs/quickstart/",
      title: "React Flow: Interactive Graphs",
      type: "documentation",
      creator: "React Flow Team",
      quality_score: { credibility: 10, recency: 10, depth: 9, accessibility: 10, format_match: 9, total: 9.6 },
      reasoning: "The library we used to build the interactive roadmap visualization.",
      estimated_minutes: 30,
      is_free: true
    }
  ],
  "meta-006": [
    {
      url: "https://github.com/lrnrn/focus-room",
      title: "Designing for Deep Work",
      type: "article",
      creator: "LRNRN Design",
      quality_score: { credibility: 9, recency: 10, depth: 8, accessibility: 10, format_match: 9, total: 9.2 },
      reasoning: "A breakdown of the UI/UX choices that keep users in 'Flow'.",
      estimated_minutes: 12,
      is_free: true
    }
  ]
};