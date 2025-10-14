// Sample data for profile page
export const userProfile = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Administrator",
  avatar: "JD",
  joinDate: "2023-01-15",
  lastLogin: "2024-01-10",
  bio: "Experienced project manager with 8+ years in software development and team leadership.",
  skills: ["Project Management", "Agile/Scrum", "React", "Node.js", "Python"],
  department: "Engineering",
  location: "San Francisco, CA",
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
    deadline: "2024-02-15",
  },
  {
    id: 2,
    name: "Mobile App Development",
    role: "Lead Developer",
    status: "Planning",
    progress: 25,
    deadline: "2024-03-01",
  },
  {
    id: 3,
    name: "E-commerce Platform",
    role: "Project Manager",
    status: "Completed",
    progress: 100,
    deadline: "2024-01-30",
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
