import { GoogleGenAI, Type } from "@google/genai";
import { CurriculumNode } from "../../types/curriculum.ts";
import { Resource } from "../../types/resources.ts";
import { CURATED_SOURCES } from "./curated-sources.ts";

/**
 * STRATEGIC: Hunt resources with a quality-first approach.
 * Uses Gemini to evaluate candidates and select 2-4 best resources.
 */
export async function huntResources(
  node: CurriculumNode,
  learningStyle: string = 'mixed',
  complexityLevel: number = 3
): Promise<Resource[]> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Step 1: Suggest real resources from curated domains using Gemini
  const suggestionPrompt = `
    You are a learning resource librarian. Hunt for 5 specific, high-quality resources (URLs) for the following topic.
    
    TOPIC: ${node.title}
    DESCRIPTION: ${node.description}
    OUTCOMES: ${node.learning_outcomes.join(', ')}
    LEARNER STYLE: ${learningStyle}
    LEVEL: ${complexityLevel}/5

    PRIORITIZE THESE DOMAINS IF RELEVANT:
    ${CURATED_SOURCES.map(s => s.domain).join(', ')}

    Return a list of specific, valid URLs that teach this topic.
  `;

  const suggestionResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: suggestionPrompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            url: { type: Type.STRING },
            title: { type: Type.STRING },
            type: { type: Type.STRING },
            creator: { type: Type.STRING }
          },
          required: ['url', 'title', 'type']
        }
      }
    }
  });

  const candidates = JSON.parse(suggestionResponse.text || '[]');
  
  // Step 2: Score and evaluate the candidates
  const evaluationPrompt = `
    Evaluate these learning resource candidates for the topic "${node.title}".
    Scoring weights: Credibility (30%), Depth (25%), Recency (15%), Accessibility (15%), Style Match (15%).
    
    Candidates:
    ${JSON.stringify(candidates)}

    Return a scored list of the top 3 resources.
  `;

  const evaluationResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: evaluationPrompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            url: { type: Type.STRING },
            title: { type: Type.STRING },
            type: { type: Type.STRING },
            creator: { type: Type.STRING },
            quality_score: {
              type: Type.OBJECT,
              properties: {
                credibility: { type: Type.NUMBER },
                recency: { type: Type.NUMBER },
                depth: { type: Type.NUMBER },
                accessibility: { type: Type.NUMBER },
                format_match: { type: Type.NUMBER },
                total: { type: Type.NUMBER }
              }
            },
            reasoning: { type: Type.STRING },
            estimated_minutes: { type: Type.NUMBER },
            is_free: { type: Type.BOOLEAN }
          },
          required: ['url', 'title', 'type', 'quality_score', 'reasoning', 'estimated_minutes', 'is_free']
        }
      }
    }
  });

  return JSON.parse(evaluationResponse.text || '[]') as Resource[];
}