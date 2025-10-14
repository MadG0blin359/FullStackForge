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
