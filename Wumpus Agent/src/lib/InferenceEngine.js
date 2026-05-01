/**
 * InferenceEngine.js
 * Implements a Propositional Logic Knowledge Base with a Resolution Refutation inference engine.
 */

// Helper: negate a literal
export function negate(literal) {
  if (literal.startsWith('-')) {
    return literal.substring(1);
  }
  return '-' + literal;
}

// Helper: check if two clauses are equivalent (same literals)
function clausesEqual(c1, c2) {
  return c1.size === c2.size && [...c1].every(l => c2.has(l));
}

// Helper: resolve two clauses
// Returns a set of new clauses obtained by resolving c1 and c2.
export function plResolve(ci, cj) {
  const resolvents = [];
  
  for (const di of ci) {
    for (const dj of cj) {
      if (di === negate(dj)) {
        // Resolve on di and dj
        const newClause = new Set();
        for (const l of ci) if (l !== di) newClause.add(l);
        for (const l of cj) if (l !== dj) newClause.add(l);
        
        // Check if newClause is trivially true (contains A and -A)
        let isTrivial = false;
        for (const l of newClause) {
          if (newClause.has(negate(l))) {
            isTrivial = true;
            break;
          }
        }
        
        if (!isTrivial) {
          resolvents.push(newClause);
        }
      }
    }
  }
  return resolvents;
}

// Resolution Refutation
// Returns true if KB |= query, else false
// Also returns the number of resolution steps taken.
export function resolution(kbClauses, query) {
  let steps = 0;
  
  // Create a copy of KB clauses and add the negated query
  const clauses = kbClauses.map(c => new Set(c));
  
  // Query is expected to be a single literal in this simple implementation
  // e.g., query = "-P_2_2" (meaning safe from pit). We negate it to add to KB.
  // We want to prove query, so we add NOT query.
  clauses.push(new Set([negate(query)]));
  
  const newClauses = new Set();
  
  while (true) {
    steps++;
    const n = clauses.length;
    const currentNew = [];
    
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const resolvents = plResolve(clauses[i], clauses[j]);
        
        for (const res of resolvents) {
          if (res.size === 0) {
            return { entailed: true, steps }; // Contradiction found!
          }
          currentNew.push(res);
        }
      }
    }
    
    let addedNew = false;
    for (const c of currentNew) {
      // Check if c is already in clauses
      let exists = false;
      for (const existing of clauses) {
        if (clausesEqual(existing, c)) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        clauses.push(c);
        addedNew = true;
      }
    }
    
    // Safety break for infinite loops (resolution is complete but can be slow)
    if (steps > 50) {
      return { entailed: false, steps };
    }
    
    if (!addedNew) {
      return { entailed: false, steps }; // No new clauses, cannot entail
    }
  }
}

export class KnowledgeBase {
  constructor() {
    this.clauses = []; // Array of Arrays (each inner array is a clause = disjunction of literals)
  }

  // Add a clause (array of literals) to KB
  tell(clause) {
    // Avoid duplicates
    const clauseSet = new Set(clause);
    for (const existing of this.clauses) {
      if (clausesEqual(new Set(existing), clauseSet)) return;
    }
    this.clauses.push(clause);
  }
  
  // Ask if a literal is entailed by the KB
  ask(query) {
    return resolution(this.clauses, query);
  }
  
  // Add rule: cell (r,c) has percept iff adjacent cells have hazard
  // perceptLiteral: e.g. "B_1_1"
  // adjacentHazardLiterals: e.g. ["P_1_2", "P_2_1"]
  addPerceptRule(perceptLiteral, adjacentHazardLiterals) {
    // P <=> (A v B) is equivalent to:
    // 1. P => (A v B)  -->  ~P v A v B
    // 2. (A v B) => P  -->  (~A ^ ~B) => P  --> (~A v P) ^ (~B v P)
    
    // 1. ~P v A v B
    this.tell([negate(perceptLiteral), ...adjacentHazardLiterals]);
    
    // 2. ~A v P, ~B v P, etc.
    for (const hazard of adjacentHazardLiterals) {
      this.tell([negate(hazard), perceptLiteral]);
    }
  }
}
