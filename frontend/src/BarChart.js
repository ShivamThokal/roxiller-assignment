import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@mui/material';

const BarChart = ({ data }) => {
  
  console.log(data);

  
  const chartData = {
    labels: data?.labels, 
    datasets: [
      {
        label: 'Number of Items',
        data: data?.datasets[0].data, 
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

 
  const chartOptions = {
    indexAxis: 'x',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: 'Price Range',
        },
      },
    },
  };

  return (
    <div>
      {/* <Typography variant="h2" align="center">Transactions Bar Chart</Typography> */}
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
