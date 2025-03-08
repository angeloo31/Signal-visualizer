import React from "react";

const InputForm = ({ formula, handleInputChange, handlePlot }) => {
  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <input
        type="text"
        value={formula}
        onChange={handleInputChange}
        placeholder="Enter a func of t (e.g., 2*sin(t), rect(t-1))"
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        autoFocus
      />
      <button
        onClick={() => handlePlot(formula)}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
      >
        Plot Signal
      </button>
    </div>
  );
};

export default InputForm;
