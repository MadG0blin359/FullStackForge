import React, { useEffect, useState } from 'react';
import { User, Skull, Wind, CircleDashed } from 'lucide-react';

export function GridBoard({ 
  rows, cols, agentPos, wumpusLoc, pits, 
  visited, safeCells, gameOver 
}) {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const newGrid = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        newGrid.push({ r, c });
      }
    }
    setGrid(newGrid);
  }, [rows, cols]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl flex-1 flex items-center justify-center min-h-[500px]">
      <div 
        className="grid gap-2"
        style={{
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((cell) => {
          const isAgent = agentPos[0] === cell.r && agentPos[1] === cell.c;
          const cellStr = `${cell.r},${cell.c}`;
          const isVisited = visited.has(cellStr);
          const isSafe = safeCells.has(cellStr);
          const isPit = pits.has(cellStr);
          const isWumpus = wumpusLoc && wumpusLoc[0] === cell.r && wumpusLoc[1] === cell.c;
          
          let bgColor = 'bg-slate-800/50 border-slate-700/50';
          let textColor = 'text-slate-600';
          
          if (isVisited) {
            bgColor = 'bg-slate-800 border-slate-600';
          }
          if (isSafe && !isVisited) {
            bgColor = 'bg-emerald-950/30 border-emerald-800/50';
          }
          if (isSafe && isVisited) {
            bgColor = 'bg-emerald-900/40 border-emerald-700';
          }
          
          // Show hazards if game over or if we want to cheat/debug. 
          // Requirements say: "Highlight Confirmed Pits/Wumpus (Red)".
          // We will show them if game over for now.
          const showHazard = gameOver && (isPit || isWumpus);
          if (showHazard) {
            bgColor = 'bg-red-950/50 border-red-800';
          }

          return (
            <div 
              key={cellStr}
              className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg border-2 transition-all duration-300 relative ${bgColor} ${textColor}`}
            >
              {/* Coordinate label */}
              <span className="absolute top-1 right-1 text-[10px] opacity-30 font-mono">
                {cell.r},{cell.c}
              </span>
              
              {/* Cell Content */}
              <div className="flex gap-1 z-10">
                {isAgent && <User className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" size={28} />}
                {showHazard && isWumpus && <Skull className="text-red-500" size={24} />}
                {showHazard && isPit && <CircleDashed className="text-red-400" size={24} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
