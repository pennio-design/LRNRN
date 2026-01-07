import { GoogleGenAI, Type } from "@google/genai";
import { CurriculumContext } from "../../types/curriculum.ts";

/**
 * STRATEGIC: Extract structured context from free-form answers.
 * This determines curriculum quality - garbage in, garbage out.
 */
export async function analyzeAnswers(
  answers: Record<string, string>
): Promise<CurriculumContext> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `You are a curriculum strategist analyzing diagnostic answers to extract structured learner context.

USER ANSWERS:
Question 1 (Goal Discovery): ${answers.goal_discovery}
Question 2 (Level Assessment): ${answers.level_assessment}
Question 3 (Constraints): ${answers.constraint_mapping}

TASK:
Extract the DNA of this learner. Identify their specific deliverable, their "knowledge cliff", and their psychological constraints.

GUIDELINES:
- Be specific: "Build a chat app" not "Learn React"
- Infer realistically: "2 hours daily" = 14 hours/week
- Detect learning style: "watch tutorials" = visual, "read docs" = textual
- Assess level honestly: Detect "expert" language vs "beginner" terminology.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          goal: {
            type: Type.OBJECT,
            properties: {
              project: { type: Type.STRING },
              domain: { type: Type.STRING },
              success_criteria: { type: Type.STRING },
              complexity_level: { type: Type.NUMBER }
            },
            required: ['project', 'domain', 'success_criteria', 'complexity_level']
          },
          current_level: {
            type: Type.OBJECT,
            properties: {
              existing_skills: { type: Type.ARRAY, items: { type: Type.STRING } },
              mental_models: { type: Type.ARRAY, items: { type: Type.STRING } },
              knowledge_gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
              learning_phase: { type: Type.STRING }
            },
            required: ['existing_skills', 'mental_models', 'knowledge_gaps', 'learning_phase']
          },
          constraints: {
            type: Type.OBJECT,
            properties: {
              hours_per_week: { type: Type.NUMBER },
              learning_style: { type: Type.STRING },
              depth_preference: { type: Type.STRING },
              pace_preference: { type: Type.STRING }
            },
            required: ['hours_per_week', 'learning_style', 'depth_preference', 'pace_preference']
          }
        },
        required: ['goal', 'current_level', 'constraints']
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Failed to extract context");
  return JSON.parse(text) as CurriculumContext;
}