
export interface CuratedSource {
  domain: string;
  type: 'video' | 'article' | 'documentation' | 'interactive' | 'repository';
  quality_tier: 1 | 2 | 3;  // 1 = highest quality
  specialization?: string[];
  notes: string;
}

/**
 * STRATEGIC: High-signal sources we trust for quality.
 * Vetted list beats web-wide scraping for strategic fidelity.
 */
export const CURATED_SOURCES: CuratedSource[] = [
  {
    domain: 'youtube.com/@Fireship',
    type: 'video',
    quality_tier: 1,
    specialization: ['web development', 'quick overviews', 'modern tech'],
    notes: 'Concise, high-production value, great for conceptual overviews'
  },
  {
    domain: 'youtube.com/@WebDevSimplified',
    type: 'video',
    quality_tier: 1,
    specialization: ['web development', 'tutorials', 'clear explanations'],
    notes: 'Excellent for step-by-step learning'
  },
  {
    domain: 'youtube.com/@freecodecamp',
    type: 'video',
    quality_tier: 1,
    specialization: ['comprehensive courses', 'beginner-friendly', 'full-stack'],
    notes: 'Long-form comprehensive tutorials'
  },
  {
    domain: 'developer.mozilla.org',
    type: 'documentation',
    quality_tier: 1,
    specialization: ['web standards', 'javascript', 'html', 'css'],
    notes: 'MDN - authoritative web documentation'
  },
  {
    domain: 'react.dev',
    type: 'documentation',
    quality_tier: 1,
    specialization: ['react', 'modern practices'],
    notes: 'Official React docs'
  },
  {
    domain: 'joshwcomeau.com',
    type: 'article',
    quality_tier: 1,
    specialization: ['css', 'react', 'visual learning'],
    notes: 'Exceptional visual and interactive explanations'
  },
  {
    domain: 'kentcdodds.com',
    type: 'article',
    quality_tier: 1,
    specialization: ['react', 'testing', 'javascript'],
    notes: 'React and testing expert'
  },
  {
    domain: 'exercism.org',
    type: 'interactive',
    quality_tier: 1,
    specialization: ['practice', 'mentorship'],
    notes: 'Practice with mentor feedback'
  },
  {
    domain: 'github.com/awesome-*',
    type: 'repository',
    quality_tier: 1,
    specialization: ['curated lists'],
    notes: 'Community-curated resource collections'
  }
];

export function isCuratedSource(url: string): CuratedSource | null {
  try {
    const urlObj = new URL(url);
    const source = CURATED_SOURCES.find(s => 
      urlObj.hostname.includes(s.domain.split('/')[0])
    );
    return source || null;
  } catch {
    return null;
  }
}
