import React from 'react';
import { Wind, Skull, Target, ShieldCheck } from 'lucide-react';

export function MetricsDashboard({ percepts, inferenceSteps, safeCellsCount }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl flex flex-col gap-6 w-full max-w-sm">
      <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
        <Target className="text-blue-400" />
        Agent Metrics
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col items-center justify-center gap-2">
          <span className="text-slate-400 text-sm font-semibold">Inference Steps</span>
          <span className="text-3xl font-mono text-purple-400 font-bold">{inferenceSteps}</span>
        </div>
        
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col items-center justify-center gap-2">
          <span className="text-slate-400 text-sm font-semibold">Safe Cells Deduced</span>
          <span className="text-3xl font-mono text-emerald-400 font-bold">{safeCellsCount}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Current Percepts</h3>
        <div className="flex gap-4">
          <div className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${percepts.breeze ? 'bg-cyan-950/50 border-cyan-800 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
            <Wind size={24} className={percepts.breeze ? 'animate-pulse' : ''} />
            <span className="text-xs font-bold">BREEZE</span>
          </div>
          <div className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${percepts.stench ? 'bg-orange-950/50 border-orange-800 text-orange-300' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
            <Skull size={24} className={percepts.stench ? 'animate-pulse' : ''} />
            <span className="text-xs font-bold">STENCH</span>
          </div>
        </div>
      </div>
    </div>
  );
}
