import React, { useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

function App() {
  const [formula, setFormula] = useState("");
  const [data, setData] = useState({ t: [], y: [] });
  const [error, setError] = useState("");

  const handlePlot = async () => {
    try {
      const response = await axios.post("http://localhost:5000/evaluate", {
        formula,
      });
      setData(response.data);
      setError("");
    } catch (err) {
      console.error("Error:", err.response?.data?.error || err.message);
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const addToFormula = (text) => {
    if (
      [
        "sin",
        "cos",
        "tan",
        "exp",
        "log",
        "sqrt",
        "rect",
        "tri",
        "sinc",
        "u",
      ].includes(text)
    ) {
      setFormula((prev) => prev + `${text}(`); // Add opening parenthesis for functions
    } else {
      setFormula((prev) => prev + text); // Append the text
    }
  };

  const handleInputChange = (e) => {
    setFormula(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Signal Visualizer</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={formula}
          onChange={handleInputChange}
          placeholder="Enter a function of t (e.g., 2*sin(t), rect(t-1))"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          autoFocus
        />
        <button
          onClick={handlePlot}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
        >
          Plot Signal
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-2 mt-4 bg-gray-200 p-2">
          {[
            "sin",
            "cos",
            "tan",
            "exp",
            "log",
            "sqrt",
            "rect",
            "tri",
            "sinc",
            "u",
            "(",
            ")",
            "+",
            "-",
            "*",
            "/",
            "^",
            "t",
          ].map((btn) => (
            <button
              key={btn}
              onClick={() => addToFormula(btn)}
              className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 w-full max-w-4xl">
        <Plot
          data={[
            {
              x: data.t,
              y: data.y,
              type: "scatter",
              mode: "lines",
              line: { color: "#4CAF50" },
            },
          ]}
          layout={{
            title: "Signal Visualization",
            xaxis: { title: "Time t" },
            yaxis: { title: "Amplitude" },
            showlegend: false,
          }}
          config={{ responsive: true }}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default App;
