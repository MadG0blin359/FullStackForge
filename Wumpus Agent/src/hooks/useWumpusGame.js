import { useState, useEffect, useCallback } from 'react';
import { KnowledgeBase } from '../lib/InferenceEngine';

function getAdjacent(r, c, rows, cols) {
  const adj = [];
  if (r > 0) adj.push([r - 1, c]);
  if (r < rows - 1) adj.push([r + 1, c]);
  if (c > 0) adj.push([r, c - 1]);
  if (c < cols - 1) adj.push([r, c + 1]);
  return adj;
}

export function useWumpusGame(initialRows = 4, initialCols = 4) {
  const [rows, setRows] = useState(initialRows);
  const [cols, setCols] = useState(initialCols);
  
  // Board state
  const [wumpusLoc, setWumpusLoc] = useState(null);
  const [pits, setPits] = useState(new Set());
  
  // Agent state
  const [agentPos, setAgentPos] = useState([0, 0]);
  const [visited, setVisited] = useState(new Set(['0,0']));
  const [kb, setKb] = useState(new KnowledgeBase());
  
  // Metrics
  const [inferenceSteps, setInferenceSteps] = useState(0);
  const [currentPercepts, setCurrentPercepts] = useState({ breeze: false, stench: false });
  const [safeCells, setSafeCells] = useState(new Set(['0,0']));
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const initGame = useCallback((r = rows, c = cols) => {
    setRows(r);
    setCols(c);
    setAgentPos([0, 0]);
    setVisited(new Set(['0,0']));
    setSafeCells(new Set(['0,0']));
    setGameOver(false);
    setGameWon(false);
    setInferenceSteps(0);
    
    const newKB = new KnowledgeBase();
    // Agent knows [0,0] is safe
    newKB.tell(['-P_0_0']);
    newKB.tell(['-W_0_0']);
    setKb(newKB);

    // Randomize hazards
    // Ensure [0,0] has no hazards
    let wLoc = [Math.floor(Math.random() * r), Math.floor(Math.random() * c)];
    while (wLoc[0] === 0 && wLoc[1] === 0) {
      wLoc = [Math.floor(Math.random() * r), Math.floor(Math.random() * c)];
    }
    setWumpusLoc(wLoc);

    const newPits = new Set();
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (i === 0 && j === 0) continue;
        if (i === wLoc[0] && j === wLoc[1]) continue; // Avoid pit on wumpus (optional)
        if (Math.random() < 0.2) {
          newPits.add(`${i},${j}`);
        }
      }
    }
    setPits(newPits);
    
    // Check initial percepts
    checkPercepts([0,0], wLoc, newPits, r, c, newKB);
  }, [rows, cols]);

  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkPercepts = (pos, wLoc, currentPits, r, c, currentKB) => {
    const adj = getAdjacent(pos[0], pos[1], r, c);
    let breeze = false;
    let stench = false;

    for (const [ar, ac] of adj) {
      if (currentPits.has(`${ar},${ac}`)) breeze = true;
      if (wLoc && wLoc[0] === ar && wLoc[1] === ac) stench = true;
    }

    setCurrentPercepts({ breeze, stench });
    
    // TELL KB about percepts
    const pLiteral = `B_${pos[0]}_${pos[1]}`;
    const wLiteral = `S_${pos[0]}_${pos[1]}`;
    
    const pAdjLiterals = adj.map(([ar, ac]) => `P_${ar}_${ac}`);
    const wAdjLiterals = adj.map(([ar, ac]) => `W_${ar}_${ac}`);

    currentKB.addPerceptRule(pLiteral, pAdjLiterals);
    currentKB.addPerceptRule(wLiteral, wAdjLiterals);

    // Tell KB the actual percept values
    if (breeze) {
      currentKB.tell([pLiteral]);
    } else {
      currentKB.tell([`-${pLiteral}`]);
    }

    if (stench) {
      currentKB.tell([wLiteral]);
    } else {
      currentKB.tell([`-${wLiteral}`]);
    }
    
    // Deduce safe cells
    let newSteps = 0;
    const newSafe = new Set(safeCells);
    
    // Check all adjacent cells of visited cells
    const cellsToCheck = new Set();
    visited.forEach(vStr => {
      const [vr, vc] = vStr.split(',').map(Number);
      getAdjacent(vr, vc, r, c).forEach(([ar, ac]) => {
        if (!visited.has(`${ar},${ac}`)) {
          cellsToCheck.add(`${ar},${ac}`);
        }
      });
    });

    cellsToCheck.forEach(cellStr => {
      if (newSafe.has(cellStr)) return;
      const [cr, cc] = cellStr.split(',').map(Number);
      
      const askPit = currentKB.ask(`-P_${cr}_${cc}`);
      newSteps += askPit.steps;
      
      const askWumpus = currentKB.ask(`-W_${cr}_${cc}`);
      newSteps += askWumpus.steps;

      if (askPit.entailed && askWumpus.entailed) {
        newSafe.add(cellStr);
      }
    });

    setSafeCells(newSafe);
    setInferenceSteps(prev => prev + newSteps);
  };

  const moveAgent = (dr, dc) => {
    if (gameOver || gameWon) return;

    const [nr, nc] = [agentPos[0] + dr, agentPos[1] + dc];
    
    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return;
    
    // Move agent
    const newPosStr = `${nr},${nc}`;
    setAgentPos([nr, nc]);
    
    const newVisited = new Set(visited);
    newVisited.add(newPosStr);
    setVisited(newVisited);

    // Check hazard
    if (pits.has(newPosStr) || (wumpusLoc && wumpusLoc[0] === nr && wumpusLoc[1] === nc)) {
      setGameOver(true);
      return;
    }
    
    // Check win (e.g. visited all safe cells, or found gold. We use simple exploration for now)
    // Actually, typical wumpus agent wins if it grabs gold and leaves. We'll just let them explore.

    checkPercepts([nr, nc], wumpusLoc, pits, rows, cols, kb);
  };

  return {
    rows, cols, agentPos, wumpusLoc, pits, visited, safeCells,
    currentPercepts, inferenceSteps, gameOver, gameWon,
    initGame, moveAgent
  };
}
