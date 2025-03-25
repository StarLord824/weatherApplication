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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphProps {
  data?: {
    time: string[];
    temp: number[];
    precipitation: number[];
  };
}

const Graph = ({ data }: GraphProps) => {
  if (!data) return null;

  // Format hours for display
  const labels = data.time
    .slice(0, 24) // Show next 24 hours
    .map(time => new Date(time).getHours() + ':00');

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.temp.slice(0, 24),
        borderColor: 'rgb(255, 255, 255)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Precipitation (%)',
        data: data.precipitation.slice(0, 24),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: 'rgba(54, 162, 235, 0.8)',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
  };

  return (
    <div>
      <h3 className="text-white text-lg font-semibold mb-4">24-Hour Forecast</h3>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default Graph;