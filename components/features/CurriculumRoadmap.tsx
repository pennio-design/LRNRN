import React from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import ReactFlow from 'reactflow';
import { Background } from 'reactflow';
import { Controls } from 'reactflow';
import { ConnectionLineType } from 'reactflow';
import { MarkerType } from 'reactflow';
import { useNodesState } from 'reactflow';
import { useEdgesState } from 'reactflow';
import { Position } from 'reactflow';
import dagre from 'dagre';
import { BookOpen } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { X } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { BrainCircuit } from 'lucide-react';
import { Sparkles } from 'lucide-react';

import ConceptNode from './roadmap/ConceptNode.tsx';
import MilestoneNode from './roadmap/MilestoneNode.tsx';
import StartNode from './roadmap/StartNode.tsx';

const NODE_WIDTH = 280;
const NODE_HEIGHT = 120;

const nodeTypes = {
  concept: ConceptNode,
  milestone: MilestoneNode,
  start: StartNode,
};

function getLayoutedElements(nodes: any[], edges: any[]) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'TB', nodesep: 100, ranksep: 120 });
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
  dagre.layout(dagreGraph);
  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = Position.Top;
    node.sourcePosition = Position.Bottom;
    node.position = {
      x: nodeWithPosition.x - NODE_WIDTH / 2,
      y: nodeWithPosition.y - NODE_HEIGHT / 2,
    };
  });
  return { nodes, edges };
}

export const CurriculumRoadmap = ({ curriculum, resources, onNodeSelect }: any) => {
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const { initialNodes, initialEdges } = useMemo(() => {
    const rfNodes: any[] = [{ id: 'start', type: 'start', data: {}, position: { x: 0, y: 0 } }];
    const rfEdges: any[] = [];
    curriculum.nodes.forEach((node: any, index: number) => {
      const isMilestone = index === curriculum.nodes.length - 1;
      rfNodes.push({
        id: node.id,
        type: isMilestone ? 'milestone' : 'concept',
        data: { 
          node, 
          resources: resources[node.id],
          onSelect: setSelectedNode,
          onLearn: (n: any) => { if (typeof window !== 'undefined') window.location.hash = `/learn/${n.id}`; }
        },
        position: { x: 0, y: 0 },
      });
      if (node.prerequisites && node.prerequisites.length > 0) {
        node.prerequisites.forEach((preIdx: number) => {
          const preNode = curriculum.nodes[preIdx];
          if (preNode) {
            rfEdges.push({
              id: `e-${preNode.id}-${node.id}`,
              source: preNode.id,
              target: node.id,
              animated: true,
              style: { stroke: '#94a3b8' },
              markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' },
            });
          }
        });
      } else if (index === 0) {
        rfEdges.push({ id: `e-start-${node.id}`, source: 'start', target: node.id, animated: true, style: { stroke: '#94a3b8' } });
      } else {
        const prevNodeId = curriculum.nodes[index - 1].id;
        rfEdges.push({ id: `e-${prevNodeId}-${node.id}`, source: prevNodeId, target: node.id, style: { stroke: '#cbd5e1' } });
      }
    });
    return getLayoutedElements(rfNodes, rfEdges);
  }, [curriculum, resources]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="relative w-full h-[800px] bg-slate-50 border border-slate-200 rounded-[40px] overflow-hidden">
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} nodeTypes={nodeTypes} connectionLineType={ConnectionLineType.SmoothStep} fitView>
        <Background color="#cbd5e1" gap={20} />
        <Controls />
      </ReactFlow>
      {selectedNode && (
        <div className="absolute inset-y-0 right-0 w-[400px] bg-white shadow-2xl z-50 animate-in slide-in-from-right duration-300 border-l border-slate-200 flex flex-col">
          <div className="p-24 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-12">
              <div className="p-8 bg-primary text-white rounded-lg"><BookOpen className="w-5 h-5" /></div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Node Insight</h2>
            </div>
            <button onClick={() => setSelectedNode(null)} className="p-8 hover:bg-slate-100 rounded-full text-slate-400"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-24 space-y-32">
            <section>
              <h3 className="text-2xl font-black text-slate-900 mb-8">{selectedNode.title}</h3>
              <p className="text-slate-600 mb-24">{selectedNode.description}</p>
              <div className="bg-accent/5 border border-accent/10 p-16 rounded-2xl">
                <div className="flex items-center gap-8 mb-8"><BrainCircuit className="w-4 h-4 text-accent" /><span className="text-[10px] font-bold text-accent uppercase tracking-widest">Reasoning</span></div>
                <p className="text-sm text-slate-700 italic">"{selectedNode.reasoning}"</p>
              </div>
            </section>
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-16">Outcomes</h4>
              <div className="space-y-8">{selectedNode.learning_outcomes.map((o: any, i: any) => (<div key={i} className="flex items-start gap-12"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-2" /><span className="text-sm text-slate-600">{o}</span></div>))}</div>
            </section>
          </div>
          <div className="p-24 bg-slate-50 border-t border-slate-200">
            <button onClick={() => { if (typeof window !== 'undefined') window.location.hash = `/learn/${selectedNode.id}`; }} className="w-full bg-slate-900 text-white py-16 rounded-xl font-bold flex items-center justify-center gap-8 shadow-lg">Enter Room <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}
    </div>
  );
};