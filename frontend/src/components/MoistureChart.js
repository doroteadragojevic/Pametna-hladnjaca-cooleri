import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

const MoistureChart = ({ moistureData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: moistureData.map((data) => new Date(data.timestamp)),
        datasets: [
          {
            label: "Moisture",
            data: moistureData.map((data) => data.value),
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "minute",
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [moistureData]);

  return <canvas ref={chartRef}></canvas>;
};

export default MoistureChart;
