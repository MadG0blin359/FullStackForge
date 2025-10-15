import React from "react";
import { accountSettings, userProfile } from "../../data/profileData";
import { Settings, Bell } from "lucide-react";

const SettingsTab = () => (
  <div className="space-y-6">
    {/* Account Settings */}
    <div
      className="rounded-xl shadow-lg border"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div
        className="p-6 border-b"
        style={{ borderColor: "var(--card-border)" }}
      >
        <h3
          className="text-lg font-semibold flex items-center gap-2"
          style={{ color: "var(--text-primary)" }}
        >
          <Settings size={20} />
          Account Settings
        </h3>
      </div>
      <div className="p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
              defaultValue={userProfile.name}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
              defaultValue={userProfile.email}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Phone
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
              defaultValue={userProfile.phone}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Location
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
              defaultValue={userProfile.location}
            />
          </div>
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Bio
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-primary)",
              color: "var(--text-primary)",
            }}
            defaultValue={userProfile.bio}
          />
        </div>
        <button
          className="px-6 py-2 rounded-lg font-medium transition-all hover:scale-105"
          style={{
            backgroundColor: "var(--accent-primary)",
            color: "white",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>

    {/* Notification Settings */}
    <div
      className="rounded-xl shadow-lg border"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div
        className="p-6 border-b"
        style={{ borderColor: "var(--card-border)" }}
      >
        <h3
          className="text-lg font-semibold flex items-center gap-2"
          style={{ color: "var(--text-primary)" }}
        >
          <Bell size={20} />
          Notification Preferences
        </h3>
      </div>
      <div className="p-6 space-y-4">
        {Object.entries(accountSettings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span
              className="text-sm font-medium capitalize"
              style={{ color: "var(--text-primary)" }}
            >
              {key.replace(/([A-Z])/g, " $1").toLowerCase()}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked={value}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SettingsTab;
