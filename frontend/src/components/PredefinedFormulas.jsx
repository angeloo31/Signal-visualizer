import React from "react";

const PredefinedFormulas = ({ setFormula }) => {
  const formulas = [
    { label: "2 * rect(2 * t - 1)", formula: "2 * rect(2 * t - 1)" },
    { label: "tri(t - 1) - tri(t + 1)", formula: "tri(t - 1) - tri(t + 1)" },
    {
      label: "sin(pi * t) * rect(t / 2)",
      formula: "sin(pi * t) * rect(t / 2)",
    },
    { label: "rect(t / 2) - tri(t)", formula: "rect(t / 2) - tri(t)" },
    { label: "tri(2 * t)", formula: "tri(2 * t)" },
    { label: "exp(-t) * u(t - 2)", formula: "exp(-t) * u(t - 2)" },
    { label: "u(t - 2)", formula: "u(t - 2)" },
    { label: "u(3 - t)", formula: "u(3 - t)" },
    {
      label: "2 * u(t + 1) - u(t - 2) + u(t) - 2 * u(t - 1)",
      formula: "2 * u(t + 1) - u(t - 2) + u(t) - 2 * u(t - 1)",
    },
    {
      label: "rect((t - 1) / 2) - rect((t + 1) / 2)",
      formula: "rect((t - 1) / 2) - rect((t + 1) / 2)",
    },
    {
      label: "u(t + 1) - 2 * u(t) + u(t - 1)",
      formula: "u(t + 1) - 2 * u(t) + u(t - 1)",
    },
  ];

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Predefined Signals</h2>
      <div className="grid grid-cols-2 gap-2">
        {formulas.map((item) => (
          <button
            key={item.label}
            onClick={() => setFormula(item.formula)} // Only updates the input field
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PredefinedFormulas;
