import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

const TemperatureChart = ({ temperatureData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: temperatureData.map((data) => new Date(data.timestamp)),
        datasets: [
          {
            label: "Temperature",
            data: temperatureData.map((data) => data.value),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
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
  }, [temperatureData]);

  return <canvas ref={chartRef}></canvas>;
};

export default TemperatureChart;
