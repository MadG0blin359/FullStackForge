import type { GeneratedLayout, ReadingMode } from '../lib/types';

export const layouts: GeneratedLayout[] = [
  // =========================================================================
  // STORY 1: The Quiet Revolution in Battery Technology
  // Slug: 'quiet-revolution-battery-technology'
  // =========================================================================

  // Mode: brief
  {
    storySlug: 'quiet-revolution-battery-technology',
    mode: 'brief',
    generatedAt: '2026-10-18T10:00:00Z',
    blocks: [
      {
        type: 'brief',
        title: 'Executive Brief: Solid-State Battery Breakthrough & Reality Check',
        summary:
          'Next-generation solid-state battery cells have reached 500 Wh/kg in testing—nearly doubling lithium-ion energy density and eliminating fire risks through non-flammable solid electrolytes. However, commercial mass-market adoption faces severe cleanroom manufacturing hurdles and capital investment barriers before 2027–2030.',
        whatChanged:
          'Laboratory benchmarks achieved 500+ Wh/kg with complete thermal runaway immunity, while pilot integration vehicle trials are officially slated for late 2027.',
        sourceRefs: [{ paragraphId: 'battery-p2' }, { paragraphId: 'battery-p3' }, { paragraphId: 'battery-p9' }]
      },
      {
        type: 'key-facts',
        title: 'Key Facts & Performance Metrics',
        facts: [
          {
            text: '500+ Wh/kg energy density achieved in labs, compared to the 270 Wh/kg standard of top commercial lithium-ion cells.',
            sourceRefs: [{ paragraphId: 'battery-p2' }]
          },
          {
            text: 'Estimated 750+ miles of electric vehicle range on equivalent-weight packs with 15-minute ultra-fast charging.',
            sourceRefs: [{ paragraphId: 'battery-p3' }]
          },
          {
            text: 'Thermal runaway immunity eliminates catastrophic fire risks by replacing flammable liquid solvents with solid ceramic or polymer conductors.',
            sourceRefs: [{ paragraphId: 'battery-p3' }]
          },
          {
            text: 'Over $180 billion is locked in existing gigafactories that cannot process solid electrolytes without costly assembly retooling.',
            sourceRefs: [{ paragraphId: 'battery-p6' }]
          },
          {
            text: 'Early commercial deployment will be confined to luxury flagships, aerospace drones, and defense applications where cell cost is secondary.',
            sourceRefs: [{ paragraphId: 'battery-p7' }]
          }
        ]
      }
    ]
  },

  // Mode: explainer
  {
    storySlug: 'quiet-revolution-battery-technology',
    mode: 'explainer',
    generatedAt: '2026-10-18T10:00:00Z',
    blocks: [
      {
        type: 'timeline',
        title: 'The Evolution of Rechargeable Electrochemistry',
        events: [
          {
            date: '1991',
            label: 'Commercial Lithium-Ion Debut',
            description: 'Sony commercializes the first rechargeable liquid electrolyte lithium-ion cell, initiating the portable electronics and modern EV revolution.',
            sourceRefs: [{ paragraphId: 'battery-p1' }, { paragraphId: 'battery-p4' }]
          },
          {
            date: '2020–2024',
            label: 'The Energy Density Ceiling',
            description: 'Standard liquid cells approach their chemical limits around 270 Wh/kg, while ultra-fast charging thermal hazards prompt safety concerns.',
            sourceRefs: [{ paragraphId: 'battery-p1' }, { paragraphId: 'battery-p3' }]
          },
          {
            date: 'October 2026',
            label: 'Solid-State Lab Milestone',
            description: 'Published lab benchmarks confirm solid ceramic electrolyte cells crossing 500 Wh/kg with safe lithium metal anodes.',
            sourceRefs: [{ paragraphId: 'battery-p2' }, { paragraphId: 'battery-p4' }]
          },
          {
            date: 'Late 2027',
            label: 'Pilot Vehicle Integrations',
            description: 'Automakers across Japan, Germany, and the U.S. initiate road trials for luxury vehicles and high-altitude aerospace applications.',
            sourceRefs: [{ paragraphId: 'battery-p7' }, { paragraphId: 'battery-p9' }]
          }
        ]
      },
      {
        type: 'glossary',
        title: 'Electrochemistry Glossary',
        terms: [
          {
            term: 'Solid Electrolyte',
            definition: 'A non-flammable solid ceramic, polymer, or glassy ionic conductor that replaces volatile liquid organic solvents in a battery cell.',
            sourceRefs: [{ paragraphId: 'battery-p2' }, { paragraphId: 'battery-p3' }]
          },
          {
            term: 'Energy Density (Wh/kg)',
            definition: 'The amount of electrical energy stored per unit of mass; higher density translates directly to extended vehicle range without extra weight.',
            sourceRefs: [{ paragraphId: 'battery-p2' }]
          },
          {
            term: 'Thermal Runaway',
            definition: 'An uncontrolled chain reaction of exothermic overheating that can trigger intense fires in liquid electrolyte batteries.',
            sourceRefs: [{ paragraphId: 'battery-p1' }, { paragraphId: 'battery-p3' }]
          },
          {
            term: 'Lithium Dendrites',
            definition: 'Microscopic needle-like lithium formations that can grow through damaged separators, creating internal short circuits.',
            sourceRefs: [{ paragraphId: 'battery-p5' }]
          }
        ]
      },
      {
        type: 'why-it-matters',
        title: 'Why Solid-State Batteries Matter to the Clean Transition',
        explanation:
          'Energy storage is the fundamental linchpin of decarbonization. Reaching 500+ Wh/kg without combustible organic solvents unlocks viable electric aviation, heavy zero-emission trucking, and consumer EVs that eliminate range anxiety and recharge in minutes.',
        sourceRefs: [{ paragraphId: 'battery-p1' }, { paragraphId: 'battery-p3' }]
      },
      {
        type: 'section',
        title: 'The Cleanroom Manufacturing Chasm',
        content:
          'While the scientific foundation is validated, scaling production requires micrometric separator ribbons without microscopic pinholes or fissures. Any defect allows metallic dendrites to puncture the barrier, short-circuiting the cell. Transitioning from roll-to-roll liquid slurry lines to high-pressure isostatic pressing requires billions in retooling capital.',
        sourceRefs: [{ paragraphId: 'battery-p5' }, { paragraphId: 'battery-p6' }]
      }
    ]
  },

  // Mode: comparison
  {
    storySlug: 'quiet-revolution-battery-technology',
    mode: 'comparison',
    generatedAt: '2026-10-18T10:00:00Z',
    blocks: [
      {
        type: 'comparison',
        title: 'Next-Gen Solid-State vs. Incumbent Liquid Lithium-Ion / LFP',
        sideA:
          {
            label: 'Solid-State Technology (SSB)',
            points: [
              {
                text: 'Reaches 500+ Wh/kg, enabling 750+ miles on a single charge with comparable pack mass.',
                sourceRefs: [{ paragraphId: 'battery-p2' }, { paragraphId: 'battery-p3' }]
              },
              {
                text: 'Inherently non-flammable solid separator eliminates thermal runaway risks during 15-minute ultra-fast charging.',
                sourceRefs: [{ paragraphId: 'battery-p3' }, { paragraphId: 'battery-p4' }]
              },
              {
                text: 'High cleanroom production costs and fragile ceramic handling limit early adoption to luxury and aerospace sectors.',
                sourceRefs: [{ paragraphId: 'battery-p5' }, { paragraphId: 'battery-p7' }]
              }
            ]
          },
        sideB:
          {
            label: 'Liquid Lithium-Ion & LFP Chemistries',
            points: [
              {
                text: 'Massive volume scale with budget chemistries like LFP dropping below $55/kWh for commuter vehicles and grid storage.',
                sourceRefs: [{ paragraphId: 'battery-p8' }]
              },
              {
                text: 'Mature global supply chains backed by $180B+ invested in existing roll-to-roll manufacturing facilities.',
                sourceRefs: [{ paragraphId: 'battery-p6' }]
              },
              {
                text: 'Approaching chemical energy limits (~270 Wh/kg) with lingering vulnerability to fire under extreme thermal stress.',
                sourceRefs: [{ paragraphId: 'battery-p1' }, { paragraphId: 'battery-p2' }]
              }
            ]
          }
      },
      {
        type: 'quote',
        text: 'We are witnessing the most consequential electrochemistry breakthrough since Sony commercialized the rechargeable lithium cell in 1991. Solid electrolytes rewrite the safety envelope entirely, permitting lithium metal anodes that were previously deemed impossibly unstable.',
        attribution: 'Dr. Marcus Thorne, Director of the Advanced Energy Systems Laboratory at Cambridge',
        sourceRefs: [{ paragraphId: 'battery-p4' }]
      },
      {
        type: 'quote',
        text: 'The science is indisputably proven, but the industrial scaling is brutal. Anyone promising ten-thousand-dollar mass-market solid-state sedans by 2027 is selling fiction.',
        attribution: 'Sarah Lin, Chief Analyst at CleanTech Horizons',
        sourceRefs: [{ paragraphId: 'battery-p7' }]
      },
      {
        type: 'key-facts',
        title: 'Trade-off Summary',
        facts: [
          {
            text: 'Solid-state delivers double the energy capacity of conventional cells, but at significantly higher initial manufacturing cost.',
            sourceRefs: [{ paragraphId: 'battery-p2' }, { paragraphId: 'battery-p7' }]
          },
          {
            text: 'Low-cost LFP and sodium alternatives continue to dominate volume economics in price-sensitive urban transit.',
            sourceRefs: [{ paragraphId: 'battery-p8' }]
          },
          {
            text: 'Automakers will run split strategies: solid-state for premium long-range flagships, LFP for budget commuters.',
            sourceRefs: [{ paragraphId: 'battery-p7' }, { paragraphId: 'battery-p9' }]
          }
        ]
      }
    ]
  },

  // Mode: calm
  {
    storySlug: 'quiet-revolution-battery-technology',
    mode: 'calm',
    generatedAt: '2026-10-18T10:00:00Z',
    blocks: [
      {
        type: 'section',
        title: 'The Architecture of Quiet Progress',
        content:
          'For more than three decades, modern mobility and digital communication have rested upon the chemistry of liquid lithium-ion cells. As that familiar technology approaches its natural physical ceiling, research laboratories are methodically replacing volatile liquid solutions with solid, fire-resistant ceramic materials.',
        sourceRefs: [{ paragraphId: 'battery-p1' }, { paragraphId: 'battery-p2' }]
      },
      {
        type: 'section',
        title: 'Rethinking Distance and Safety',
        content:
          'The transition promises electric vehicles that travel hundreds of additional miles quietly and recharge without extreme thermal stress. Because solid conductors do not ignite, the anxiety of battery fire diminishes into an engineered relic of early electric transport.',
        sourceRefs: [{ paragraphId: 'battery-p3' }]
      },
      {
        type: 'quote',
        text: 'Solid electrolytes rewrite the safety envelope entirely, permitting lithium metal anodes that were previously deemed impossibly unstable.',
        attribution: 'Dr. Marcus Thorne, Cambridge Energy Systems Laboratory',
        sourceRefs: [{ paragraphId: 'battery-p4' }]
      },
      {
        type: 'section',
        title: 'A Steady, Measured Transition',
        content:
          'Change at industrial scale moves deliberately. With existing factories deeply invested in current methods, solid-state technology will arrive in stages—first in specialized aerospace and luxury designs, then gradually diffusing into everyday vehicles as manufacturing science matures.',
        sourceRefs: [{ paragraphId: 'battery-p6' }, { paragraphId: 'battery-p7' }, { paragraphId: 'battery-p9' }]
      }
    ]
  },

  // =========================================================================
  // STORY 2: City Council Approves Controversial Zoning Overhaul
  // Slug: 'city-council-zoning-overhaul'
  // =========================================================================

  // Mode: brief
  {
    storySlug: 'city-council-zoning-overhaul',
    mode: 'brief',
    generatedAt: '2026-10-18T10:00:00Z',
    blocks: [
      {
        type: 'brief',
        title: 'Civic Brief: Oakridge Abolishes Single-Family Zoning Mandate',
        summary:
          'In a 7-2 vote following an eight-hour public hearing, Oakridge City Council passed the Comprehensive Land Use Modernization Act. The legislation ends single-family-only residential zoning across the city, legalizing duplexes, triplexes, and garden courtyard cottages by-right on all residential parcels.',
        whatChanged:
          'Single-family-only zoning ends on January 1, allowing up to four units per lot with reduced parking minimums near transit and tenant anti-demolition protections.',
        sourceRefs: [{ paragraphId: 'zoning-p1' }, { paragraphId: 'zoning-p4' }, { paragraphId: 'zoning-p9' }]
      },
      {
        type: 'key-facts',
        title: 'Key Provisions of the New Land Use Code',
        facts: [
          {
            text: 'Approved 7 to 2 after an eight-hour public hearing with over 150 registered speakers.',
            sourceRefs: [{ paragraphId: 'zoning-p1' }]
          },
          {
            text: 'Median home prices rose 68% over five years, driving rental vacancies down to 1.8%.',
            sourceRefs: [{ paragraphId: 'zoning-p2' }]
          },
          {
            text: 'Allows up to 4 residential units per parcel by-right, subject to a 35-foot height ceiling and 20% permeable ground cover.',
            sourceRefs: [{ paragraphId: 'zoning-p4' }]
          },
          {
            text: 'Abolishes mandatory parking minimums within 1/4 mile of high-frequency bus and light rail corridors.',
            sourceRefs: [{ paragraphId: 'zoning-p4' }]
          },
          {
            text: 'Requires 30% affordability for redevelopments that replace tenant-occupied rental housing.',
            sourceRefs: [{ paragraphId: 'zoning-p8' }]
          }
        ]
      }
    ]
  },

  // Mode: explainer
  {
    storySlug: 'city-council-zoning-overhaul',
    mode: 'explainer',
    generatedAt: '2026-10-18T10:00:00Z',
    blocks: [
      {
        type: 'timeline',
        title: 'Evolution of Oakridge Housing Policy',
        events: [
          {
            date: '1954',
            label: 'Post-War Single-Family Mandates Enacted',
            description: 'Oakridge adopts comprehensive suburban Euclidean zoning, designating detached single-family houses as the only lawful structure on 72% of residential land.',
            sourceRefs: [{ paragraphId: 'zoning-p3' }]
          },
          {
            date: '2021–2025',
            label: 'Acute Housing Affordability Crisis',
            description: 'Median home values surge 68% and rental vacancies drop below 1.8%, forcing municipal and service workers into 90-minute commutes.',
            sourceRefs: [{ paragraphId: 'zoning-p2' }]
          },
          {
            date: 'October 2026',
            label: 'Land Use Modernization Act Approved',
            description: 'Council votes 7-2 after an eight-hour hearing to legalize missing-middle housing citywide with anti-demolition safeguards.',
            sourceRefs: [{ paragraphId: 'zoning-p1' }, { paragraphId: 'zoning-p8' }]
          },
          {
            date: 'January 1, 2027',
            label: 'New Code Takes Effect',
            description: 'Administrative by-right permitting commences for duplexes, triplexes, and courtyard cottages across all standard residential lots.',
            sourceRefs: [{ paragraphId: 'zoning-p9' }]
          }
        ]
      },
      {
        type: 'glossary',
        title: 'Urban Planning Terminology',
        terms: [
          {
            term: 'By-Right Development',
            definition: 'Construction proposals that comply with zoning standards and receive administrative building permits without requiring discretionary city council approval.',
            sourceRefs: [{ paragraphId: 'zoning-p4' }, { paragraphId: 'zoning-p6' }]
          },
          {
            term: 'Missing Middle Housing',
            definition: 'Multi-unit residential structures—such as duplexes, fourplexes, and courtyard apartments—that are compatible in scale with single-family neighborhoods.',
            sourceRefs: [{ paragraphId: 'zoning-p1' }, { paragraphId: 'zoning-p4' }]
          },
          {
            term: 'Parking Minimums',
            definition: 'Municipal rules requiring developers to build a fixed number of parking spots per housing unit, significantly increasing construction costs.',
            sourceRefs: [{ paragraphId: 'zoning-p4' }]
          },
          {
            term: 'Deed-Restricted Affordable Housing',
            definition: 'Housing units legally bound by covenants to remain affordable for households below a designated income threshold for a fixed duration.',
            sourceRefs: [{ paragraphId: 'zoning-p8' }]
          }
        ]
      },
      {
        type: 'why-it-matters',
        title: 'Why Missing-Middle Reform Matters',
        explanation:
          'Decades of single-family exclusivity created an artificial scarcity of homes near job centers and transit. By legalizing moderate-density housing, cities expand supply, reduce automobile commutes, and enable working families to live in the communities they serve.',
        sourceRefs: [{ paragraphId: 'zoning-p2' }, { paragraphId: 'zoning-p3' }, { paragraphId: 'zoning-p7' }]
      },
      {
        type: 'section',
        title: 'Anti-Displacement and Preservation Safeguards',
        content:
          'To prevent predatory buyouts of existing affordable rentals, progressive council members incorporated an anti-demolition provision. Any site with tenant-occupied rentals in the previous three years cannot be razed unless 30 percent of replacement homes are deed-restricted for families earning under 60 percent of area median income.',
        sourceRefs: [{ paragraphId: 'zoning-p8' }]
      }
    ]
  },

  // Mode: comparison
  {
    storySlug: 'city-council-zoning-overhaul',
    mode: 'comparison',
    generatedAt: '2026-10-18T10:00:00Z',
    blocks: [
      {
        type: 'comparison',
        title: 'Housing Abundance Advocates vs. Neighborhood Preservationists',
        sideA:
          {
            label: 'Pro-Housing Coalition & City Leadership',
            points: [
              {
                text: 'Legalizes gentle missing-middle housing to counter a 68% home price surge and expand inventory.',
                sourceRefs: [{ paragraphId: 'zoning-p2' }, { paragraphId: 'zoning-p3' }]
              },
              {
                text: 'Promotes walkable transit-oriented neighborhoods by removing costly off-street parking mandates.',
                sourceRefs: [{ paragraphId: 'zoning-p4' }]
              },
              {
                text: 'Points to documented peer city data (Minneapolis, Auckland) proving that upzoning curtails rent inflation over time.',
                sourceRefs: [{ paragraphId: 'zoning-p7' }]
              }
            ]
          },
        sideB:
          {
            label: 'Neighborhood Associations & Preservationists',
            points: [
              {
                text: 'Fears loss of tree canopy, architectural character, and quiet residential street scale.',
                sourceRefs: [{ paragraphId: 'zoning-p5' }]
              },
              {
                text: 'Raises alarm over stormwater runoff, congested curbside parking, and school district overcrowding.',
                sourceRefs: [{ paragraphId: 'zoning-p6' }]
              },
              {
                text: 'Contends that by-right allowances enrich speculative private builders without guaranteeing widespread rent relief.',
                sourceRefs: [{ paragraphId: 'zoning-p6' }]
              }
            ]
          }
      },
      {
        type: 'quote',
        text: 'We can no longer preserve exclusionary 1950s zoning laws while our workforce is systematically priced out of the city they serve.',
        attribution: 'Mayor Julianna Morales, Oakridge',
        sourceRefs: [{ paragraphId: 'zoning-p3' }]
      },
      {
        type: 'quote',
        text: 'This ordinance was written for speculative private developers, not everyday residents. We are stripping neighborhood residents of meaningful design review while placing unprecedented strain on our storm runoff drainage, street parking, and aging school feeder networks.',
        attribution: 'Councilmember Arthur Sterling, Dissenting Vote',
        sourceRefs: [{ paragraphId: 'zoning-p6' }]
      },
      {
        type: 'key-facts',
        title: 'Balanced View Summary',
        facts: [
          {
            text: 'Passed by a clear 7-2 council majority after exhaustive citizen engagement and procedural amendments.',
            sourceRefs: [{ paragraphId: 'zoning-p1' }]
          },
          {
            text: 'Height caps (35 ft) and permeable ground requirements (20%) were preserved to balance neighborhood aesthetics.',
            sourceRefs: [{ paragraphId: 'zoning-p4' }]
          },
          {
            text: 'Anti-displacement clauses mandate 30% affordable housing for any redevelopment replacing existing tenant rentals.',
            sourceRefs: [{ paragraphId: 'zoning-p8' }]
          }
        ]
      }
    ]
  },

  // Mode: calm
  {
    storySlug: 'city-council-zoning-overhaul',
    mode: 'calm',
    generatedAt: '2026-10-18T10:00:00Z',
    blocks: [
      {
        type: 'section',
        title: 'A Changing City Fabric',
        content:
          'In a late-night session following hours of heartfelt citizen comments, the city of Oakridge reached a turning point in its housing policies. By permitting duplexes, triplexes, and courtyard homes across residential streets, the city seeks to gently welcome more neighbors into established communities.',
        sourceRefs: [{ paragraphId: 'zoning-p1' }, { paragraphId: 'zoning-p2' }]
      },
      {
        type: 'section',
        title: 'Honoring Community while Welcoming Newcomers',
        content:
          'The transition aims to harmonize density with the neighborhood environment. The ordinance introduces strict height limitations, preserves green permeable yards, and places thoughtful conditions on redevelopment to protect longstanding renters.',
        sourceRefs: [{ paragraphId: 'zoning-p4' }, { paragraphId: 'zoning-p8' }]
      },
      {
        type: 'quote',
        text: 'We can no longer preserve exclusionary 1950s zoning laws while our workforce is systematically priced out of the city they serve.',
        attribution: 'Julianna Morales, Mayor of Oakridge',
        sourceRefs: [{ paragraphId: 'zoning-p3' }]
      },
      {
        type: 'section',
        title: 'Looking Toward January',
        content:
          'As planning teams begin organizing pre-application workshops, residents and builders alike are beginning to envision how these gentle, multi-unit homes will settle quietly into the streets over the seasons ahead.',
        sourceRefs: [{ paragraphId: 'zoning-p9' }]
      }
    ]
  },

  // =========================================================================
  // STORY 3: New Global Climate Agreement Faces Implementation Hurdles
  // Slug: 'global-climate-agreement-hurdles'
  // =========================================================================

  // Mode: brief
  {
    storySlug: 'global-climate-agreement-hurdles',
    mode: 'brief',
    generatedAt: '2026-10-18T10:00:00Z',
    blocks: [
      {
        type: 'brief',
        title: 'Policy Brief: Geneva Climate Accord Signed',
        summary:
          'Delegations representing 142 nations have signed the Geneva Accord on Accelerated Decarbonization, pledging a collective 55% reduction in greenhouse gas emissions below 2015 levels by 2035. While the accord launches a $300 billion annual transition fund, it contains no punitive trade sanctions or enforcement penalties for non-compliance.',
        whatChanged:
          '142 nations committed to binding accounting standards and a 55% emissions drop by 2035, but reliance on peer reviews and debt-heavy financing sparks implementation skepticism.',
        sourceRefs: [{ paragraphId: 'climate-p1' }, { paragraphId: 'climate-p2' }, { paragraphId: 'climate-p4' }]
      },
      {
        type: 'key-facts',
        title: 'Key Accord Benchmarks & Provisions',
        facts: [
          {
            text: '142 signatory countries committed to a collective 55% emissions cut below 2015 levels by 2035.',
            sourceRefs: [{ paragraphId: 'climate-p1' }]
          },
          {
            text: '$300 billion annual climate resilience fund created to support decarbonization across developing economies.',
            sourceRefs: [{ paragraphId: 'climate-p2' }]
          },
          {
            text: 'No economic penalties, trade sanctions, or automated funding cancellations exist for missed targets.',
            sourceRefs: [{ paragraphId: 'climate-p4' }]
          },
          {
            text: 'Over 65% of international finance is structured as commercial loans and export credits, deepening sovereign debt worries.',
            sourceRefs: [{ paragraphId: 'climate-p6' }]
          },
          {
            text: 'Private clean technology investments spurred by the pact are estimated to reach $4 trillion globally.',
            sourceRefs: [{ paragraphId: 'climate-p8' }]
          }
        ]
      }
    ]
  },

  // Mode: explainer
  {
    storySlug: 'global-climate-agreement-hurdles',
    mode: 'explainer',
    generatedAt: '2026-10-18T10:00:00Z',
    blocks: [
      {
        type: 'timeline',
        title: 'The Trajectory of International Climate Accords',
        events: [
          {
            date: '2015',
            label: 'The Paris Agreement',
            description: 'World leaders establish national self-determined pledges (NDCs) aiming to cap warming below 2°C, but without standardized timelines.',
            sourceRefs: [{ paragraphId: 'climate-p1' }, { paragraphId: 'climate-p3' }]
          },
          {
            date: '2022–2025',
            label: 'The Loss & Damage Financing Struggle',
            description: 'Developing countries demand predictable capital grants rather than high-interest loans to cope with extreme climate disruptions.',
            sourceRefs: [{ paragraphId: 'climate-p2' }, { paragraphId: 'climate-p6' }]
          },
          {
            date: 'October 2026',
            label: 'Geneva Accord Signed',
            description: '142 nations adopt legally registered accounting standards and a 55% emissions reduction target by 2035.',
            sourceRefs: [{ paragraphId: 'climate-p1' }, { paragraphId: 'climate-p3' }]
          },
          {
            date: '2027–2035',
            label: 'National Legislative Reckoning',
            description: 'Signatories must pass domestic carbon pricing, fossil fuel phase-outs, and grid modernization laws to meet international commitments.',
            sourceRefs: [{ paragraphId: 'climate-p8' }, { paragraphId: 'climate-p9' }]
          }
        ]
      },
      {
        type: 'glossary',
        title: 'International Policy & Climate Terms',
        terms: [
          {
            term: 'Unabated Coal',
            definition: 'Coal-fired power generation operating without carbon capture, utilization, and storage (CCUS) technologies to mitigate greenhouse emissions.',
            sourceRefs: [{ paragraphId: 'climate-p1' }]
          },
          {
            term: 'Transparency Review Committee',
            definition: 'A non-punitive oversight panel that evaluates national emissions reports and highlights discrepancies without the power to impose fines.',
            sourceRefs: [{ paragraphId: 'climate-p4' }, { paragraphId: 'climate-p5' }]
          },
          {
            term: 'Sovereign Debt Distress',
            definition: 'A condition where a government is overwhelmed by loan obligations, impairing its capacity to fund essential public infrastructure.',
            sourceRefs: [{ paragraphId: 'climate-p6' }]
          },
          {
            term: 'Baseload Energy Demand',
            definition: 'The minimum continuous supply of electric power required by a power grid, traditionally supplied by coal, natural gas, or nuclear plants.',
            sourceRefs: [{ paragraphId: 'climate-p7' }]
          }
        ]
      },
      {
        type: 'why-it-matters',
        title: 'Why the Geneva Agreement Matters',
        explanation:
          'The 2035 milestone marks the critical decade for global climate action. Reaching consensus across 142 sovereign nations provides predictable regulatory signals for trillions in clean infrastructure investments, yet its lack of coercive teeth means success depends on domestic political fortitude.',
        sourceRefs: [{ paragraphId: 'climate-p1' }, { paragraphId: 'climate-p4' }, { paragraphId: 'climate-p8' }]
      },
      {
        type: 'section',
        title: 'The Financing Conundrum: Grants vs. Debt',
        content:
          'While Western donor nations celebrated the $300 billion headline figure, developing countries caution that two-thirds of the funds consist of sovereign loans and export guarantees. Without direct grant financing, vulnerable nations risk compounding balance-of-payments crises while racing to modernize electrical grids that still rely on cheap coal for baseload reliability.',
        sourceRefs: [{ paragraphId: 'climate-p6' }, { paragraphId: 'climate-p7' }]
      }
    ]
  },

  // Mode: comparison
  {
    storySlug: 'global-climate-agreement-hurdles',
    mode: 'comparison',
    generatedAt: '2026-10-18T10:00:00Z',
    blocks: [
      {
        type: 'comparison',
        title: 'Diplomatic Breakthrough vs. Implementation Reality',
        sideA:
          {
            label: 'UN Negotiators & Clean Tech Consortiums',
            points: [
              {
                text: 'Secured commitment from 142 nations, including major developing economies previously opposed to hard limits.',
                sourceRefs: [{ paragraphId: 'climate-p1' }, { paragraphId: 'climate-p2' }]
              },
              {
                text: 'Replaces vague mid-century net-zero rhetoric with binding accounting standards and a near-term 2035 target.',
                sourceRefs: [{ paragraphId: 'climate-p3' }]
              },
              {
                text: 'Mobilizes an estimated $4 trillion in private capital for green hydrogen, energy storage, and clean transmission.',
                sourceRefs: [{ paragraphId: 'climate-p8' }]
              }
            ]
          },
        sideB:
          {
            label: 'Environmental Scholars & Developing Nations',
            points: [
              {
                text: 'Complete absence of economic penalties or carbon border tariffs leaves compliance at the mercy of domestic political swings.',
                sourceRefs: [{ paragraphId: 'climate-p4' }, { paragraphId: 'climate-p5' }]
              },
              {
                text: '65% of the $300B financial aid package is loan-based, exacerbating debt vulnerabilities across island and African nations.',
                sourceRefs: [{ paragraphId: 'climate-p6' }]
              },
              {
                text: 'Unrealistic phase-out schedules for baseload coal threaten electric grid stability in fast-growing manufacturing economies.',
                sourceRefs: [{ paragraphId: 'climate-p7' }]
              }
            ]
          }
      },
      {
        type: 'quote',
        text: 'Geneva proves that multilateralism is resilient in the face of planetary crisis. We have transitioned from vague mid-century net-zero aspirations into legally registered, near-term accountability with binding accounting standards.',
        attribution: 'Tariq Al-Mansoor, UN Climate Secretariat Envoy',
        sourceRefs: [{ paragraphId: 'climate-p3' }]
      },
      {
        type: 'quote',
        text: 'A treaty without teeth is an exercise in diplomatic optimism. Without carbon border adjustments, trade sanctions, or automated loss-of-funding triggers, compliance relies entirely on reputational peer pressure.',
        attribution: 'Dr. Helene Berg, Senior Fellow at the Stockholm Institute for International Affairs',
        sourceRefs: [{ paragraphId: 'climate-p5' }]
      },
      {
        type: 'key-facts',
        title: 'Core Realities of the Accord',
        facts: [
          {
            text: 'Binds 142 nations to a 55% emissions reduction by 2035.',
            sourceRefs: [{ paragraphId: 'climate-p1' }]
          },
          {
            text: 'Violations result only in referral to an advisory transparency review panel.',
            sourceRefs: [{ paragraphId: 'climate-p4' }]
          },
          {
            text: 'Developing countries require massive storage investments before retiring coal baseload.',
            sourceRefs: [{ paragraphId: 'climate-p7' }]
          }
        ]
      }
    ]
  },

  // Mode: calm
  {
    storySlug: 'global-climate-agreement-hurdles',
    mode: 'calm',
    generatedAt: '2026-10-18T10:00:00Z',
    blocks: [
      {
        type: 'section',
        title: 'The Geneva Gathering',
        content:
          'After weeks of dialogue in Geneva, diplomats from around the globe reached an accord to curtail greenhouse emissions over the next decade. The agreement reflects a quiet, shared recognition that collective coordination across national borders remains indispensable.',
        sourceRefs: [{ paragraphId: 'climate-p1' }, { paragraphId: 'climate-p2' }]
      },
      {
        type: 'section',
        title: 'The Complex Balance of Transition',
        content:
          'The pathway from conference halls to communities requires patience and balance. Nations must weigh the urgent imperative to decarbonize against the daily necessities of electric power and economic stability for their people.',
        sourceRefs: [{ paragraphId: 'climate-p6' }, { paragraphId: 'climate-p7' }]
      },
      {
        type: 'quote',
        text: 'Geneva proves that multilateralism is resilient in the face of planetary crisis. We have transitioned from vague mid-century net-zero aspirations into legally registered, near-term accountability.',
        attribution: 'Tariq Al-Mansoor, UN Climate Secretariat Envoy',
        sourceRefs: [{ paragraphId: 'climate-p3' }]
      },
      {
        type: 'section',
        title: 'The Work Ahead at Home',
        content:
          'As delegates return home, the focus shifts to steady, localized implementation. Over the coming years, policies, clean investments, and regional initiatives will translate these global aspirations into practical, enduring reality.',
        sourceRefs: [{ paragraphId: 'climate-p8' }, { paragraphId: 'climate-p9' }]
      }
    ]
  }
];

export function getLayout(storySlug: string, mode: ReadingMode): GeneratedLayout | undefined {
  return layouts.find((l) => l.storySlug === storySlug && l.mode === mode);
}

export function getLayoutsForStory(storySlug: string): GeneratedLayout[] {
  return layouts.filter((l) => l.storySlug === storySlug);
}

export function getAllLayouts(): GeneratedLayout[] {
  return layouts;
}
