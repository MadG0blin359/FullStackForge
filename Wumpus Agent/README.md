# Dynamic Wumpus Logic Agent (React App)

This project implements a Web-based Dynamic Pathfinding Agent that acts as a Knowledge-Based Agent. It navigates a Wumpus World-style grid, receiving dynamic percepts (Breeze, Stench) as it moves, and uses **Propositional Logic** and **Resolution Refutation** to deduce safe cells in real-time.

## Features

* **Dynamic Grid Sizing:** Configurable rows and columns (e.g., 4x4, 5x5).
* **Dynamic Hazards:** Pits and a Wumpus are randomly placed at the start of every episode.
* **Percept Generation:** Agent receives a 'Breeze' when adjacent to a Pit, and a 'Stench' when adjacent to a Wumpus.
* **Knowledge Base (KB):** Uses Propositional Logic (Conjunctive Normal Form).
* **Resolution Refutation:** Custom pure-JavaScript inference engine that resolves clauses to prove whether an unvisited adjacent cell is safe to move to.
* **Real-Time Metrics:** Dashboard tracking the total number of inference steps taken by the Resolution algorithm and the current active percepts.

## Tech Stack
* **React:** Frontend UI framework.
* **Tailwind CSS:** For dynamic, responsive styling and glassmorphism UI.
* **Lucide React:** Beautiful SVG iconography.
* **Vite:** Fast build tool.

## Setup & Running Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the localhost URL provided (usually `http://localhost:5173`).

## Project Structure
* `src/lib/InferenceEngine.js`: Core Propositional Logic engine implementing `tell()`, `ask()`, and `resolution()` algorithms.
* `src/hooks/useWumpusGame.js`: Custom React hook managing the entire state of the Wumpus world environment.
* `src/components/`: Reusable UI components for the Grid, Controls, and Metrics Dashboard.
