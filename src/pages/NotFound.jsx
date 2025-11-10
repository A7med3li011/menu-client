import React from "react";
import { Home, ArrowLeft, Search, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="w-full max-w-2xl text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-800 mb-4 tracking-wider">
            404
          </h1>
          <div
            className="w-32 h-1 mx-auto rounded-full"
            style={{ backgroundColor: "#D4A574" }}
          ></div>
        </div>

        {/* Error Icon */}
        <div className="mb-8">
          <div
            className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center border-4"
            style={{ backgroundColor: "#F5F5DC", borderColor: "#D4A574" }}
          >
            <AlertTriangle className="w-12 h-12" style={{ color: "#D4A574" }} />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500 max-w-md mx-auto">
            It might have been moved, deleted, or you entered the wrong URL.
            Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center sm:items-center mb-12">
          <button
            onClick={handleGoHome}
            className="w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
            style={{ backgroundColor: "#D4A574" }}
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </button>

          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-white border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
            style={{
              backgroundColor: "#F5F5DC",
              borderColor: "#D4A574",
              color: "#D4A574",
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center space-x-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#D4A574" }}
          ></div>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
}
