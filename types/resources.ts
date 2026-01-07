
export type ResourceType = 
  | 'video' 
  | 'article' 
  | 'interactive' 
  | 'repository' 
  | 'documentation' 
  | 'course';

export interface QualityScore {
  credibility: number;
  recency: number;
  depth: number;
  accessibility: number;
  format_match: number;
  total: number;
}

export interface Resource {
  url: string;
  title: string;
  type: ResourceType;
  creator?: string;
  quality_score: QualityScore;
  reasoning: string;
  estimated_minutes: number;
  is_free: boolean;
  created_date?: string;
}
