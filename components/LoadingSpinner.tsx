import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"
        role="status"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
