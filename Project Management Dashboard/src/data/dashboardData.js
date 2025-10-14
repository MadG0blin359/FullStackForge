// Sample data for dashboard overview
export const dashboardStats = {
  totalProjects: 5,
  totalEarnings: 108000,
  tasksDue: 12,
  completedTasks: 28,
};

export const recentActivity = [
  {
    id: 1,
    type: "project_created",
    message: 'New project "Website Redesign" created',
    timestamp: "2 hours ago",
    color: "blue",
  },
  {
    id: 2,
    type: "task_completed",
    message: 'Task "Update homepage" completed',
    timestamp: "4 hours ago",
    color: "green",
  },
  {
    id: 3,
    type: "meeting_scheduled",
    message: "Client meeting scheduled for tomorrow",
    timestamp: "1 day ago",
    color: "yellow",
  },
  {
    id: 4,
    type: "milestone_reached",
    message: 'Milestone "Phase 1 Complete" reached',
    timestamp: "2 days ago",
    color: "purple",
  },
  {
    id: 5,
    type: "payment_received",
    message: "Payment of $5,000 received from TechCorp Inc.",
    timestamp: "3 days ago",
    color: "green",
  },
];

export const projectProgressData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Projects Completed",
      data: [4, 6, 8, 10, 12, 15],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
    },
    {
      label: "Projects Started",
      data: [2, 4, 6, 8, 10, 12],
      borderColor: "rgb(139, 92, 246)",
      backgroundColor: "rgba(139, 92, 246, 0.1)",
      tension: 0.4,
    },
  ],
};

export const earningsData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Monthly Earnings",
      data: [6500, 7800, 9200, 10500, 11800, 13200],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.4,
    },
  ],
};

export const taskStatusData = {
  labels: ["Completed", "In Progress", "Pending", "Overdue"],
  datasets: [
    {
      data: [28, 12, 8, 3],
      backgroundColor: [
        "rgb(16, 185, 129)",
        "rgb(59, 130, 246)",
        "rgb(245, 158, 11)",
        "rgb(239, 68, 68)",
      ],
      borderWidth: 0,
    },
  ],
};

export const monthlyRevenueData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Revenue",
      data: [
        18000, 22000, 25000, 28000, 32000, 35000, 38000, 42000, 45000, 48000,
        52000, 55000,
      ],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      tension: 0.4,
    },
    {
      label: "Expenses",
      data: [
        12000, 15000, 18000, 20000, 22000, 25000, 27000, 29000, 31000, 33000,
        35000, 37000,
      ],
      borderColor: "rgb(239, 68, 68)",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      tension: 0.4,
    },
  ],
};

export const teamPerformanceData = {
  labels: [
    "John Doe",
    "Jane Smith",
    "Bob Johnson",
    "Alice Brown",
    "Charlie Wilson",
  ],
  datasets: [
    {
      label: "Tasks Completed",
      data: [45, 38, 52, 29, 41],
      backgroundColor: "rgba(59, 130, 246, 0.8)",
    },
    {
      label: "Projects Led",
      data: [3, 2, 4, 1, 2],
      backgroundColor: "rgba(16, 185, 129, 0.8)",
    },
  ],
};

export const projectStatusOverTime = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
  datasets: [
    {
      label: "Planning",
      data: [3, 2, 2, 2, 2, 2],
      borderColor: "rgb(245, 158, 11)",
      backgroundColor: "rgba(245, 158, 11, 0.1)",
      tension: 0.4,
    },
    {
      label: "In Progress",
      data: [1, 2, 2, 2, 2, 2],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
    },
    {
      label: "Completed",
      data: [1, 1, 1, 1, 1, 1],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.4,
    },
  ],
};

export const clientRevenueData = {
  labels: [
    "TechCorp Inc.",
    "StartupXYZ",
    "RetailPlus",
    "DataCorp",
    "ServiceNow",
  ],
  datasets: [
    {
      label: "Revenue by Client",
      data: [25000, 35000, 48000, 28000, 22000],
      backgroundColor: [
        "rgb(59, 130, 246)",
        "rgb(139, 92, 246)",
        "rgb(16, 185, 129)",
        "rgb(245, 158, 11)",
        "rgb(239, 68, 68)",
      ],
    },
  ],
};
