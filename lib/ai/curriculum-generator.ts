import { GoogleGenAI, Type } from "@google/genai";
import { Curriculum, CurriculumContext } from "../../types/curriculum.ts";

/**
 * STRATEGIC: Generate opinionated curriculum with transparent reasoning.
 * This is the core differentiator - intelligence, not aggregation.
 */
export async function generateCurriculum(
  context: CurriculumContext
): Promise<Curriculum> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `You are a world-class curriculum strategist. Create ONE opinionated learning path.

LEARNER CONTEXT:
Goal: Build ${context.goal.project}
Domain: ${context.goal.domain}
Current Phase: ${context.current_level.learning_phase}
Known Skills: ${context.current_level.existing_skills.join(', ')}
Hours: ${context.constraints.hours_per_week}/week

CRITICAL REQUIREMENTS:
1. START WHERE THEY ARE: Skip what they know. Omit "Standard" intro if redundant.
2. SEQUENCE BY DEPENDENCY: Node A only before B if A is strictly required for B.
3. 6-10 NODES MAX: Focus beats completeness.
4. TRANSPARENT REASONING: Explain WHY every node exists and WHY it's in this order.
5. HONEST ESTIMATES: Include practice/debugging time.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 4000 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          learner_context: { type: Type.STRING },
          path_strategy: { type: Type.STRING },
          nodes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                reasoning: { type: Type.STRING },
                estimated_hours: { type: Type.NUMBER },
                prerequisites: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                learning_outcomes: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ['id', 'title', 'description', 'reasoning', 'estimated_hours', 'prerequisites', 'learning_outcomes']
            }
          },
          total_estimated_hours: { type: Type.NUMBER },
          completion_milestone: { type: Type.STRING }
        },
        required: ['title', 'description', 'learner_context', 'path_strategy', 'nodes', 'total_estimated_hours', 'completion_milestone']
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Failed to generate curriculum");
  return JSON.parse(text) as Curriculum;
}