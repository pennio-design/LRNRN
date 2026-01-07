import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { Share2 } from 'lucide-react';
import { Info } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * STRATEGIC: Global Orchestration
 * Provides navigation and structural context.
 * The layout is conditionally rendered to support 'Immersive Flows' (like the diagnostic and learning room).
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isQuestionFlow = location.pathname === '/question-flow';
  const isLearningRoom = location.pathname.startsWith('/learn');
  const isMarketing = location.pathname === '/' || location.pathname === '/meta';

  // Immersive flows don't show the global header or footer
  const isImmersive = isQuestionFlow || isLearningRoom;

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-secondary/30">
      {!isImmersive && (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="container mx-auto px-16 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-1 rounded-md group-hover:bg-accent transition-colors">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-primary">LRNRN</span>
            </Link>

            <nav className="hidden md:flex items-center gap-24">
              <Link to="/question-flow" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                Start Learning
              </Link>
              <Link to="/meta" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                The Framework
              </Link>
            </nav>

            <div className="flex items-center gap-12">
              <button className="p-8 text-slate-400 hover:text-primary transition-colors">
                <Info className="w-5 h-5" />
              </button>
              <Link 
                to="/question-flow" 
                className="bg-primary text-white px-16 py-8 rounded-md text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm active:scale-95"
              >
                Get Path
              </Link>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1">
        {children}
      </main>

      {!isImmersive && !isMarketing && (
        <footer className="border-t border-slate-200 bg-white py-24 px-16">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
            <p className="text-xs text-slate-500 font-mono uppercase tracking-tighter">
              © 2024 LRNRN // Strategic Learning Systems
            </p>
            <div className="flex gap-16">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><BookOpen className="w-4 h-4" /></a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Share2 className="w-4 h-4" /></a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};