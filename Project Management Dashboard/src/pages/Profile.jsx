import React from "react";
import Layout from "../components/layout/Layout";
import {
  userProfile,
  accountSettings,
  userStats,
  recentProjects,
  activityLog,
} from "../data/profileData";

const Profile = ({ activeItem, setActiveItem }) => {
  return (
    <Layout
      pageTitle="Profile Settings"
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    >
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Profile Information</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {userProfile.avatar}
              </div>
              <div>
                <h4 className="text-xl font-semibold">{userProfile.name}</h4>
                <p className="text-gray-600">{userProfile.role}</p>
                <p className="text-gray-500">{userProfile.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">
              Total Projects
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {userStats.totalProjects}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="text-3xl font-bold text-gray-900">
              {userStats.completedProjects}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Active</h3>
            <p className="text-3xl font-bold text-gray-900">
              {userStats.activeProjects}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Account Settings</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                defaultValue={userProfile.name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                defaultValue={userProfile.email}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                defaultValue={userProfile.role}
              >
                <option>Administrator</option>
                <option>Manager</option>
                <option>Developer</option>
              </select>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
