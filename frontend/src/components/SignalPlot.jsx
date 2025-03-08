import React from "react";
import Plot from "react-plotly.js";

const SignalPlot = ({ data }) => {
  return (
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
  );
};

export default SignalPlot;
