import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  if (!data) {
    return <p>Loading Pie Chart...</p>;
  }

  const pieChartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.counts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ]
      }
    ]
  };

  return <Pie data={pieChartData} />;
};

export default PieChart;
