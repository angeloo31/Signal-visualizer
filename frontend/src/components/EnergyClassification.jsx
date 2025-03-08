import React, { useState, useEffect } from "react";
import axios from "axios";

const predefinedFormulas = [
  "2*rect(2*t-1)",
  "tri(t-1)-tri(t+1)",
  "sin(pi*t)*rect(t/2)",
  "rect(t/2)-tri(t)",
  "tri(2*t)",
  "exp(-t)*u(t-2)",
  "u(t-2)",
  "u(3-t)",
  "2*u(t+1)-u(t-2)+u(t)-2*u(t-1)",
  "rect((t-1)/2)-rect((t+1)/2)",
  "u(t+1)-2*u(t)+u(t-1)",
];

function EnergyClassification() {
  const [energyList, setEnergyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEnergies = async () => {
      try {
        const responses = await Promise.all(
          predefinedFormulas.map((formula) =>
            axios.post("http://127.0.0.1:5000/evaluate", { formula })
          )
        );
        const energies = responses.map((res, index) => ({
          formula: predefinedFormulas[index],
          energy: res.data.energy,
        }));
        setEnergyList(energies.sort((a, b) => b.energy - a.energy));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch energy values.");
        setLoading(false);
      }
    };
    fetchEnergies();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Signal Energy Classification
      </h1>
      {loading ? (
        <p className="text-center text-blue-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Formula</th>
              <th className="p-3 text-left">Energy</th>
            </tr>
          </thead>
          <tbody>
            {energyList.map(({ formula, energy }, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-3">{formula}</td>
                <td className="p-3 font-semibold">{energy.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EnergyClassification;
