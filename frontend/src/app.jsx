import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import InputForm from "./components/InputForm";
import ButtonGrid from "./components/ButtonGrid";
import PredefinedFormulas from "./components/PredefinedFormulas";
import SignalPlot from "./components/SignalPlot";
import EnergyClassification from "./components/EnergyClassification";

function App() {
  const [formula, setFormula] = useState("");
  const [data, setData] = useState({ t: [], y: [], energy: null });
  const [error, setError] = useState("");

  const handlePlot = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/evaluate", {
        formula,
      });
      setData(response.data);
      setError(""); // Clear errors
    } catch (err) {
      console.error(
        "Backend Error Response:",
        err.response?.data || err.message
      );
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const addToFormula = (text) => {
    setFormula((prev) => prev + text);
  };

  const handleInputChange = (e) => {
    setFormula(e.target.value);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between">
          <h1 className="text-2xl font-bold">Signal Visualizer</h1>
          <div>
            <Link to="/" className="mr-4">
              Home
            </Link>
            <Link to="/energy-classification">Energy Classification</Link>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-1">
                <aside className="w-1/4 bg-white shadow-md p-4 border-r">
                  <h2 className="text-lg font-semibold mb-4">Functions</h2>
                  <ButtonGrid addToFormula={addToFormula} />
                  <PredefinedFormulas setFormula={setFormula} />
                </aside>
                <main className="flex-1 p-6">
                  <section className="bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">
                      Enter Formula
                    </h2>
                    <InputForm
                      formula={formula}
                      handleInputChange={handleInputChange}
                      handlePlot={handlePlot}
                    />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                  </section>
                  <section className="mt-6 bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Graph</h2>
                    <SignalPlot data={data} />
                    {data.energy !== null && (
                      <p className="text-blue-600 font-semibold mt-4">
                        Signal Energy: {data.energy.toFixed(4)}
                      </p>
                    )}
                  </section>
                </main>
              </div>
            }
          />
          <Route
            path="/energy-classification"
            element={<EnergyClassification />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
