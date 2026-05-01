import React from 'react';
import { useWumpusGame } from './hooks/useWumpusGame';
import { GridBoard } from './components/GridBoard';
import { MetricsDashboard } from './components/MetricsDashboard';
import { GameControls } from './components/GameControls';

function App() {
  const gameState = useWumpusGame(4, 4);

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-6xl mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          Dynamic Wumpus Logic Agent
        </h1>
        <p className="text-slate-400 mt-2">
          Knowledge-Based Agent utilizing Propositional Logic & Resolution Refutation
        </p>
      </header>
      
      <main className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        {/* Left Side: Game Board */}
        <GridBoard 
          rows={gameState.rows}
          cols={gameState.cols}
          agentPos={gameState.agentPos}
          wumpusLoc={gameState.wumpusLoc}
          pits={gameState.pits}
          visited={gameState.visited}
          safeCells={gameState.safeCells}
          gameOver={gameState.gameOver}
        />
        
        {/* Right Side: Panels */}
        <aside className="flex flex-col gap-6 items-center lg:items-start lg:w-[350px]">
          <MetricsDashboard 
            percepts={gameState.currentPercepts}
            inferenceSteps={gameState.inferenceSteps}
            safeCellsCount={gameState.safeCells.size}
          />
          
          <GameControls 
            onInit={gameState.initGame}
            onMove={gameState.moveAgent}
            currentRows={gameState.rows}
            currentCols={gameState.cols}
            gameOver={gameState.gameOver}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;
