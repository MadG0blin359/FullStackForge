// Sample data for profile page
export const userProfile = {
  id: 1,
  name: "Shawaiz Shahid",
  email: "shawaiz.shahid312@gmail.com",
  role: "Administrator",
  avatar: "SS",
  joinDate: "2023-01-15",
  lastLogin: "2025-02-10",
  bio: "Experienced front-end engineer with 2+ years in React and NextJS.",
  skills: [
    "Project Management",
    "Agile/Scrum",
    "React",
    "Node.js",
    "Python",
    "Next.js",
  ],
  department: "Engineering",
  location: "Hyderabad, SD",
  phone: "+1 (555) 123-4567",
  timezone: "PST",
};

export const accountSettings = {
  notifications: {
    email: true,
    push: false,
    sms: true,
    projectUpdates: true,
    deadlineReminders: true,
    teamMessages: false,
  },
  privacy: {
    profileVisibility: "team",
    activityStatus: true,
    showEmail: false,
  },
  preferences: {
    language: "en",
    theme: "light",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
  },
};

export const userStats = {
  totalProjects: 5,
  completedProjects: 1,
  activeProjects: 4,
  totalTasks: 51,
  completedTasks: 28,
  overdueTasks: 3,
  averageCompletionTime: "3.2 days",
  teamMembersManaged: 12,
};

export const recentProjects = [
  {
    id: 1,
    name: "Website Redesign",
    role: "Project Manager",
    status: "In Progress",
    progress: 75,
    deadline: "2025-02-15",
  },
  {
    id: 2,
    name: "Mobile App Development",
    role: "Lead Developer",
    status: "Planning",
    progress: 25,
    deadline: "2025-03-01",
  },
  {
    id: 3,
    name: "E-commerce Platform",
    role: "Project Manager",
    status: "Completed",
    progress: 100,
    deadline: "2025-01-30",
  },
];

export const activityLog = [
  {
    id: 1,
    action: "Updated project deadline",
    project: "Website Redesign",
    timestamp: "2 hours ago",
    type: "update",
  },
  {
    id: 2,
    action: "Completed task",
    project: "E-commerce Platform",
    timestamp: "1 day ago",
    type: "completion",
  },
  {
    id: 3,
    action: "Added new team member",
    project: "Mobile App Development",
    timestamp: "2 days ago",
    type: "addition",
  },
  {
    id: 4,
    action: "Created new project",
    project: "Data Analytics Dashboard",
    timestamp: "1 week ago",
    type: "creation",
  },
  {
    id: 5,
    action: "Updated profile information",
    project: null,
    timestamp: "2 weeks ago",
    type: "update",
  },
];

export const skillProgressData = {
  labels: [
    "Project Management",
    "Agile/Scrum",
    "React",
    "Node.js",
    "Python",
    "Data Analysis",
    "UI/UX Design",
  ],
  datasets: [
    {
      label: "Current Proficiency",
      data: [85, 90, 75, 70, 65, 60, 55],
      backgroundColor: "rgba(59, 130, 246, 0.8)",
    },
    {
      label: "Target Proficiency",
      data: [95, 95, 85, 80, 75, 70, 65],
      backgroundColor: "rgba(156, 163, 175, 0.8)",
    },
  ],
};

export const timeTrackingData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Hours Worked",
      data: [8, 7.5, 9, 8.5, 7, 4, 2],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
    },
  ],
};

export const projectContributionData = {
  labels: [
    "Website Redesign",
    "Mobile App",
    "E-commerce",
    "Analytics",
    "API Dev",
  ],
  datasets: [
    {
      label: "Tasks Completed",
      data: [15, 8, 12, 10, 3],
      backgroundColor: "rgba(16, 185, 129, 0.8)",
    },
    {
      label: "Hours Spent",
      data: [45, 25, 38, 32, 8],
      backgroundColor: "rgba(59, 130, 246, 0.8)",
    },
  ],
};

export const performanceMetricsData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "Productivity Score",
      data: [85, 88, 92, 90],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      tension: 0.4,
    },
    {
      label: "Quality Score",
      data: [82, 85, 88, 87],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
    },
  ],
};

export const learningProgressData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Courses Completed",
      data: [2, 1, 3, 2, 1, 2],
      borderColor: "rgb(139, 92, 246)",
      backgroundColor: "rgba(139, 92, 246, 0.1)",
      tension: 0.4,
    },
    {
      label: "Certifications Earned",
      data: [0, 1, 0, 1, 0, 1],
      borderColor: "rgb(245, 158, 11)",
      backgroundColor: "rgba(245, 158, 11, 0.1)",
      tension: 0.4,
    },
  ],
};
