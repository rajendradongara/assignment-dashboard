import React from "react";

export default function ProgressBar({ percent = 0 }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden ">
      <div
        style={{ width: `${Math.max(0, Math.min(percent, 100))}%` }}
        className="h-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-green-400"
      />
    </div>
  );
}
