import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

const MoistureChart = ({ moistureData }) => {
  const chartData = {
    labels: moistureData.map((entry) =>
      new Date(entry.timestamp).toLocaleString()
    ),
    datasets: [
      {
        label: "Moisture",
        data: moistureData.map((entry) => entry.value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return <Line data={chartData} />;
};

export default MoistureChart;
