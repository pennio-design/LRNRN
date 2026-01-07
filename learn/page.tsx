import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuestionStore } from '../../lib/stores/question-store.ts';
import { 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  BookOpen, 
  PenLine, 
  BrainCircuit, 
  Star,
  ChevronLeft,
  XCircle,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import { Button } from '../../components/ui/button.tsx';
import { ResourceViewer } from '../../components/features/learning-room/ResourceViewer.tsx';
import { cn } from '../../lib/utils/cn.ts';

const LearningRoomPage: React.FC = () => {
  const { nodeId } = useParams<{ nodeId: string }>();
  const navigate = useNavigate();
  const { 
    curriculum, 
    resources, 
    progress, 
    updateNodeProgress, 
    toggleNodeCompletion 
  } = useQuestionStore();

  const [activeResourceId, setActiveResourceId] = useState(0);
  const [localNotes, setLocalNotes] = useState('');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'dirty'>('saved');

  const nodeIndex = curriculum?.nodes.findIndex(n => n.id === nodeId) ?? -1;
  const node = curriculum?.nodes[nodeIndex];
  const nodeResources = resources[nodeId ?? ''] || [];
  const nodeProgress = progress[nodeId ?? ''] || { completed: false, confidence: 0, notes: '', timeSpent: 0 };

  useEffect(() => {
    if (node) {
      setLocalNotes(nodeProgress.notes);
    }
  }, [node?.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localNotes !== nodeProgress.notes) {
        updateNodeProgress(nodeId!, { notes: localNotes });
        setSaveStatus('saved');
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [localNotes]);

  if (!node || !curriculum) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-16">Node not found.</p>
          <Button onClick={() => navigate('/question-flow')}>Return to Roadmap</Button>
        </div>
      </div>
    );
  }

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalNotes(e.target.value);
    setSaveStatus('dirty');
  };

  const nextNodeId = curriculum.nodes[nodeIndex + 1]?.id;
  const prevNodeId = curriculum.nodes[nodeIndex - 1]?.id;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-16 py-12 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-16">
          <Link to="/question-flow" className="p-8 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-24 w-[1px] bg-slate-200" />
          <div>
            <div className="flex items-center gap-8 mb-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                Node {nodeIndex + 1} of {curriculum.nodes.length}
              </span>
              {nodeProgress.completed && (
                <div className="flex items-center gap-4 text-[10px] font-bold text-success bg-success/10 px-6 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </div>
              )}
            </div>
            <h1 className="text-sm font-bold text-slate-900 truncate max-w-[300px]">{node.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="hidden md:flex items-center gap-4 mr-16">
            {[1, 2, 3, 4, 5].map(rating => (
              <button 
                key={rating}
                onClick={() => updateNodeProgress(nodeId!, { confidence: rating })}
                className={cn(
                  "p-4 transition-all hover:scale-110",
                  nodeProgress.confidence >= rating ? "text-secondary" : "text-slate-200"
                )}
              >
                <Star className={cn("w-5 h-5", nodeProgress.confidence >= rating && "fill-current")} />
              </button>
            ))}
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Confidence</span>
          </div>

          <Button 
            variant={nodeProgress.completed ? "outline" : "primary"}
            size="sm"
            onClick={() => toggleNodeCompletion(nodeId!)}
            className="rounded-full"
          >
            {nodeProgress.completed ? "Redo Node" : "Mark as Complete"}
          </Button>
        </div>
      </header>

      <div className="flex-1 grid lg:grid-cols-[1fr_400px] overflow-hidden">
        <div className="p-24 md:p-32 overflow-y-auto custom-scrollbar flex flex-col gap-24">
          <section className="bg-white p-24 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center gap-12">
                <div className="p-8 bg-accent/10 rounded-xl text-accent">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Handpicked for this Node</h2>
              </div>
              <div className="flex gap-4">
                {nodeResources.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveResourceId(idx)}
                    className={cn(
                      "w-12 h-12 rounded-full transition-all border-2",
                      activeResourceId === idx ? "bg-accent border-accent" : "bg-slate-200 border-transparent hover:bg-slate-300"
                    )}
                  />
                ))}
              </div>
            </div>

            {nodeResources.length > 0 ? (
              <div className="space-y-24">
                <ResourceViewer resource={nodeResources[activeResourceId]} />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                  {nodeResources.map((res, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveResourceId(idx)}
                      className={cn(
                        "p-12 rounded-xl border text-left transition-all",
                        activeResourceId === idx ? "border-accent bg-accent/[0.03] ring-2 ring-accent/10" : "border-slate-100 bg-slate-50 hover:border-slate-300"
                      )}
                    >
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4 truncate">{res.type}</p>
                      <p className="text-[11px] font-bold text-slate-900 truncate leading-tight">{res.title}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-64 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                <div className="w-64 h-64 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-16">
                  <XCircle className="w-24 h-24 text-slate-200" />
                </div>
                <p className="text-slate-400 font-mono text-xs uppercase">No embedded resources available</p>
              </div>
            )}
          </section>

          <div className="grid md:grid-cols-2 gap-24">
            <div className="bg-white p-24 rounded-3xl border border-slate-200">
              <div className="flex items-center gap-12 mb-16">
                <BrainCircuit className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-slate-900">Strategist's Reasoning</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic">"{node.reasoning}"</p>
            </div>
            <div className="bg-white p-24 rounded-3xl border border-slate-200">
              <div className="flex items-center gap-12 mb-16">
                <Target className="w-5 h-5 text-success" />
                <h3 className="font-bold text-slate-900">Learning Outcomes</h3>
              </div>
              <ul className="space-y-8">
                {node.learning_outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-8 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-success mt-2 shrink-0" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border-l border-slate-200 flex flex-col h-full sticky top-16">
          <div className="p-24 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-12">
              <PenLine className="w-5 h-5 text-slate-400" />
              <h3 className="font-bold text-slate-900 tracking-tight">Active Notes</h3>
            </div>
            <span className={cn(
              "text-[10px] font-mono font-bold uppercase",
              saveStatus === 'saved' ? "text-success" : "text-amber-500"
            )}>
              {saveStatus === 'saved' ? 'Saved' : 'Saving...'}
            </span>
          </div>

          <div className="flex-1 p-0">
            <textarea
              value={localNotes}
              onChange={handleNoteChange}
              placeholder="Breakthroughs or friction points..."
              className="w-full h-full p-24 resize-none outline-none text-slate-700 leading-relaxed text-sm bg-slate-50/30 focus:bg-white transition-colors"
            />
          </div>

          <div className="p-24 bg-slate-50 border-t border-slate-200 space-y-12">
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-16">Path Navigation</p>
            
            <div className="flex gap-8">
              <Button 
                variant="outline" 
                className="flex-1"
                disabled={!prevNodeId}
                onClick={() => navigate(`/learn/${prevNodeId}`)}
              >
                <ChevronLeft className="w-4 h-4 mr-8" />
                Previous
              </Button>
              <Button 
                className="flex-1"
                disabled={!nextNodeId}
                onClick={() => navigate(`/learn/${nextNodeId}`)}
              >
                Next Node
                <ChevronRight className="w-4 h-4 ml-8" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningRoomPage;