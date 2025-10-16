import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Page Not Found | PanelFlow";
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div
        className="max-w-md w-full text-center p-8 rounded-xl shadow-2xl"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
          border: "1px solid var(--card-border)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold mb-4 opacity-20">404</div>
          <div
            className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
            }}
          >
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.98-5.5-2.5"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Page Not Found
        </h1>
        <p
          className="text-lg mb-8 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Oops! The page you're looking for doesn't exist. It might have been
          moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
              boxShadow: "0 4px 20px var(--card-shadow)",
            }}
          >
            <Home size={20} />
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 border"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-primary)",
              color: "var(--text-primary)",
              boxShadow: "0 4px 20px var(--card-shadow)",
            }}
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div
          className="mt-8 pt-6 border-t"
          style={{ borderColor: "var(--border-primary)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
