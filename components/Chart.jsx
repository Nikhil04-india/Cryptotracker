import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ arr = [], currency, days }) => {
  // Initialize prices and dates arrays
  const prices = arr.map((item) => item[1]);
  const dates = arr.map((item) => 
    days === "24h" ? new Date(item[0]).toLocaleTimeString() : new Date(item[0]).toLocaleDateString()
  );

  // Create data object
  const data = {
    labels: dates,
    datasets: [
      {
        label: `Price in ${currency}`,
        data: prices,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Line
      options={{
        responsive: true,
      }}
      data={data}
    />
  );
};

export default Chart;
