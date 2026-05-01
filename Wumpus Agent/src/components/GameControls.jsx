import React, { useState } from 'react';
import { RotateCcw, Play, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

export function GameControls({ onInit, onMove, currentRows, currentCols, gameOver }) {
  const [rows, setRows] = useState(currentRows);
  const [cols, setCols] = useState(currentCols);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl flex flex-col gap-6 w-full max-w-sm">
      <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
        <Play className="text-emerald-400" />
        Game Controls
      </h2>
      
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Rows</label>
          <input 
            type="number" 
            value={rows} 
            onChange={e => setRows(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none focus:border-blue-500 transition-colors"
            min="3" max="10"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Cols</label>
          <input 
            type="number" 
            value={cols} 
            onChange={e => setCols(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none focus:border-blue-500 transition-colors"
            min="3" max="10"
          />
        </div>
        <button 
          onClick={() => onInit(rows, cols)}
          className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="border-t border-slate-800 pt-6">
        <label className="block text-xs font-semibold text-slate-400 mb-3 uppercase text-center">Movement</label>
        <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
          <div />
          <button onClick={() => onMove(-1, 0)} disabled={gameOver} className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 p-4 rounded-lg flex items-center justify-center transition-colors">
            <ArrowUp size={24} />
          </button>
          <div />
          <button onClick={() => onMove(0, -1)} disabled={gameOver} className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 p-4 rounded-lg flex items-center justify-center transition-colors">
            <ArrowLeft size={24} />
          </button>
          <button onClick={() => onMove(1, 0)} disabled={gameOver} className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 p-4 rounded-lg flex items-center justify-center transition-colors">
            <ArrowDown size={24} />
          </button>
          <button onClick={() => onMove(0, 1)} disabled={gameOver} className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 p-4 rounded-lg flex items-center justify-center transition-colors">
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
      
      {gameOver && (
        <div className="mt-4 p-4 bg-red-950/50 border border-red-800 rounded-lg text-center">
          <h3 className="text-red-400 font-bold text-lg mb-1">GAME OVER</h3>
          <p className="text-red-300/80 text-sm">You encountered a hazard!</p>
          <button onClick={() => onInit(rows, cols)} className="mt-3 bg-red-900/50 hover:bg-red-800 text-red-200 px-4 py-2 rounded font-semibold transition-colors text-sm">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
