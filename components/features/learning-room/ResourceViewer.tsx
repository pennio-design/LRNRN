import React from 'react';
import { Resource } from '../../../types/resources.ts';
import { ExternalLink, PlayCircle, FileText, Code, Globe } from 'lucide-react';
import { cn } from '../../../lib/utils/cn.ts';

interface ResourceViewerProps {
  resource: Resource;
}

export const ResourceViewer: React.FC<ResourceViewerProps> = ({ resource }) => {
  // Try to embed youtube if it's a video
  const isYoutube = resource.url.includes('youtube.com') || resource.url.includes('youtu.be');
  
  const getEmbedUrl = (url: string) => {
    if (isYoutube) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
      }
    }
    return null;
  };

  const embedUrl = getEmbedUrl(resource.url);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-slate-900 text-white p-12 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-12">
          <div className="p-6 bg-white/10 rounded-lg">
            {resource.type === 'video' ? <PlayCircle className="w-4 h-4" /> : 
             resource.type === 'article' ? <FileText className="w-4 h-4" /> :
             resource.type === 'repository' ? <Code className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
          </div>
          <span className="text-xs font-mono uppercase tracking-widest truncate max-w-xs">{resource.title}</span>
        </div>
        <a 
          href={resource.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-8 hover:bg-white/10 rounded-full transition-colors flex items-center gap-8 text-[10px] font-bold"
        >
          Open Original
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="flex-1 bg-white border-x border-b border-slate-200 rounded-b-2xl overflow-hidden relative min-h-[500px]">
        {embedUrl ? (
          <iframe 
            src={embedUrl}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-48 text-center">
            <div className="w-64 h-64 bg-slate-50 rounded-full flex items-center justify-center mb-24">
              <Globe className="w-24 h-24 text-slate-300" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-12">Resource Preview Unavailable</h4>
            <p className="text-slate-500 max-w-md mb-32 leading-relaxed">
              This resource ({resource.url}) doesn't allow embedding. Please visit the original site to consume this content.
            </p>
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-32 py-16 bg-primary text-white rounded-xl font-bold flex items-center gap-12 shadow-xl hover:bg-slate-800 transition-all"
            >
              Go to Resource
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};