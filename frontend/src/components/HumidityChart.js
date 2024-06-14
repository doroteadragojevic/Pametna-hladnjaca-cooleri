import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  Filler,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const HumidityChart = ({ humidityData }) => {
  // Prikaz zadnjih deset vrijednosti
  const dataToShow = humidityData.slice(-10);

  const chartData = {
    labels: dataToShow.map((entry) =>
      new Date(entry.timestamp).toLocaleString()
    ),
    datasets: [
      {
        label: "Humidity",
        data: dataToShow.map((entry) => entry.value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4, // Glatke linije
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Timestamp",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: "Humidity Level (%)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default HumidityChart;
