// Sample data for projects page
export const projects = [
  {
    id: 1,
    name: "Website Redesign",
    client: "TechCorp Inc.",
    status: "In Progress",
    deadline: "2024-02-15",
    progress: 75,
    budget: 15000,
    spent: 11250,
    team: ["John Doe", "Jane Smith", "Bob Johnson"],
    description: "Complete redesign of corporate website with modern UI/UX",
    tasks: [
      { id: 1, name: "Wireframing", completed: true },
      { id: 2, name: "Design Mockups", completed: true },
      { id: 3, name: "Frontend Development", completed: false },
      { id: 4, name: "Backend Integration", completed: false },
      { id: 5, name: "Testing", completed: false },
    ],
  },
  {
    id: 2,
    name: "Mobile App Development",
    client: "StartupXYZ",
    status: "Planning",
    deadline: "2024-03-01",
    progress: 25,
    budget: 25000,
    spent: 6250,
    team: ["Alice Brown", "Charlie Wilson"],
    description: "Native mobile app for iOS and Android platforms",
    tasks: [
      { id: 1, name: "Requirements Gathering", completed: true },
      { id: 2, name: "UI/UX Design", completed: false },
      { id: 3, name: "iOS Development", completed: false },
      { id: 4, name: "Android Development", completed: false },
      { id: 5, name: "Testing & Deployment", completed: false },
    ],
  },
  {
    id: 3,
    name: "E-commerce Platform",
    client: "RetailPlus",
    status: "Completed",
    deadline: "2024-01-30",
    progress: 100,
    budget: 35000,
    spent: 34000,
    team: ["David Lee", "Emma Davis", "Frank Miller"],
    description: "Full-featured e-commerce platform with payment integration",
    tasks: [
      { id: 1, name: "Platform Setup", completed: true },
      { id: 2, name: "Product Catalog", completed: true },
      { id: 3, name: "Payment Integration", completed: true },
      { id: 4, name: "User Authentication", completed: true },
      { id: 5, name: "Deployment", completed: true },
    ],
  },
  {
    id: 4,
    name: "Data Analytics Dashboard",
    client: "DataCorp",
    status: "In Progress",
    deadline: "2024-02-28",
    progress: 60,
    budget: 20000,
    spent: 12000,
    team: ["Grace Taylor", "Henry Wilson"],
    description:
      "Interactive dashboard for business intelligence and analytics",
    tasks: [
      { id: 1, name: "Data Source Integration", completed: true },
      { id: 2, name: "Dashboard Design", completed: true },
      { id: 3, name: "Chart Implementation", completed: false },
      { id: 4, name: "User Testing", completed: false },
      { id: 5, name: "Final Deployment", completed: false },
    ],
  },
  {
    id: 5,
    name: "API Development",
    client: "ServiceNow",
    status: "Planning",
    deadline: "2024-03-15",
    progress: 10,
    budget: 18000,
    spent: 1800,
    team: ["Ivy Chen", "Jack Thompson"],
    description: "RESTful API development for third-party integrations",
    tasks: [
      { id: 1, name: "API Design", completed: true },
      { id: 2, name: "Database Schema", completed: false },
      { id: 3, name: "Endpoint Implementation", completed: false },
      { id: 4, name: "Authentication & Security", completed: false },
      { id: 5, name: "Documentation", completed: false },
    ],
  },
];

export const projectStatusCounts = {
  completed: 1,
  inProgress: 2,
  planning: 2,
};

export const projectTimelineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Projects Due",
      data: [2, 3, 4, 3, 2, 1],
      borderColor: "rgb(239, 68, 68)",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      tension: 0.4,
    },
    {
      label: "Projects Completed",
      data: [1, 2, 3, 3, 2, 1],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.4,
    },
  ],
};

export const budgetUtilizationData = {
  labels: projects.map((p) => p.name),
  datasets: [
    {
      label: "Budget Spent",
      data: projects.map((p) => p.spent),
      backgroundColor: "rgba(59, 130, 246, 0.8)",
    },
    {
      label: "Budget Remaining",
      data: projects.map((p) => p.budget - p.spent),
      backgroundColor: "rgba(156, 163, 175, 0.8)",
    },
  ],
};

export const projectPriorityData = {
  labels: ["High", "Medium", "Low"],
  datasets: [
    {
      data: [2, 2, 1],
      backgroundColor: [
        "rgb(239, 68, 68)",
        "rgb(245, 158, 11)",
        "rgb(16, 185, 129)",
      ],
      borderWidth: 0,
    },
  ],
};

export const projectComplexityData = {
  labels: ["Simple", "Medium", "Complex"],
  datasets: [
    {
      label: "Projects by Complexity",
      data: [1, 3, 1],
      backgroundColor: [
        "rgb(16, 185, 129)",
        "rgb(245, 158, 11)",
        "rgb(239, 68, 68)",
      ],
    },
  ],
};

export const teamWorkloadData = {
  labels: [
    "John Doe",
    "Jane Smith",
    "Bob Johnson",
    "Alice Brown",
    "Charlie Wilson",
    "David Lee",
    "Emma Davis",
    "Frank Miller",
    "Grace Taylor",
    "Henry Wilson",
    "Ivy Chen",
    "Jack Thompson",
  ],
  datasets: [
    {
      label: "Active Tasks",
      data: [5, 4, 6, 3, 4, 2, 3, 2, 4, 3, 2, 3],
      backgroundColor: "rgba(59, 130, 246, 0.8)",
    },
    {
      label: "Completed Tasks",
      data: [12, 10, 15, 8, 11, 6, 9, 7, 13, 9, 5, 8],
      backgroundColor: "rgba(16, 185, 129, 0.8)",
    },
  ],
};

export const projectTimelineGanttData = [
  {
    id: 1,
    name: "Website Redesign",
    start: "2024-01-01",
    end: "2024-02-15",
    progress: 75,
    dependencies: [],
  },
  {
    id: 2,
    name: "Mobile App Development",
    start: "2024-01-15",
    end: "2024-03-01",
    progress: 25,
    dependencies: [],
  },
  {
    id: 3,
    name: "E-commerce Platform",
    start: "2023-12-01",
    end: "2024-01-30",
    progress: 100,
    dependencies: [],
  },
  {
    id: 4,
    name: "Data Analytics Dashboard",
    start: "2024-01-10",
    end: "2024-02-28",
    progress: 60,
    dependencies: [1],
  },
  {
    id: 5,
    name: "API Development",
    start: "2024-02-01",
    end: "2024-03-15",
    progress: 10,
    dependencies: [4],
  },
];

export const riskAssessmentData = {
  labels: ["Low Risk", "Medium Risk", "High Risk"],
  datasets: [
    {
      data: [2, 2, 1],
      backgroundColor: [
        "rgb(16, 185, 129)",
        "rgb(245, 158, 11)",
        "rgb(239, 68, 68)",
      ],
      borderWidth: 0,
    },
  ],
};
