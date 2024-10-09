import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import BarChart from './BarChart';
import PieChart from './PieChart'; // Import PieChart component
import './App.css'; // Import the new CSS file

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null); // State for pie chart data
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChartData();
    fetchPieChartData(); // Fetch pie chart data
  }, [selectedMonth, currentPage, searchText]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`/task/transactions`, {
        params: { month: selectedMonth, page: currentPage, perPage, search: searchText },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`/task/statistics`, {
        params: { month: selectedMonth },
      });
      setTotalSaleAmount(response.data.totalSaleAmount);
      setTotalSoldItems(response.data.totalSoldItems);
      setTotalNotSoldItems(response.data.totalNotSoldItems);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(`/task/bar`, {
        params: { month: selectedMonth },
      });
      const labels = response.data.map((item) => item._id);
      const data = response.data.map((item) => item.count);
      setBarChartData({
        labels,
        datasets: [
          {
            label: 'Number of Items',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  const fetchPieChartData = async () => {
    try {
      const response = await axios.get(`/task/pie`, {
        params: { month: selectedMonth },
      });
      const labels = response.data.map((item) => item._id);
      const counts = response.data.map((item) => item.count);
      setPieChartData({ labels, counts });
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="container">
      <div className="left-section">
        <h2 className="text-2xl font-bold mb-4">Transactions Table</h2>
        <div className="mb-4 flex gap-4">
          <select value={selectedMonth} onChange={handleMonthChange} className="p-2 border rounded">
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search transactions"
            value={searchText}
            onChange={handleSearch}
            className="p-2 border rounded"
          />
        </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{transaction.title}</td>
                <td className="px-4 py-2 border-b">{transaction.description}</td>
                <td className="px-4 py-2 border-b">${transaction.price.toFixed(2)}</td>
                <td className="px-4 py-2 border-b">{transaction.category}</td>
                <td className="px-4 py-2 border-b">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between">
          <button onClick={handlePreviousPage} className="px-4 py-2 bg-blue-500 text-white rounded">
            Previous
          </button>
          <button onClick={handleNextPage} className="px-4 py-2 bg-blue-500 text-white rounded">
            Next
          </button>
        </div>
      </div>

      <div className="right-section">
        <div className="statistics-square-box">
          <div className="stat-box bg-green-100">
            <h3 className="font-bold">Total Sale Amount</h3>
            <p>${totalSaleAmount.toFixed(2)}</p>
          </div>
          <div className="stat-box bg-blue-100">
            <h3 className="font-bold">Total Sold Items</h3>
            <p>{totalSoldItems}</p>
          </div>
          <div className="stat-box bg-red-100">
            <h3 className="font-bold">Total Not Sold Items</h3>
            <p>{totalNotSoldItems}</p>
          </div>
        </div>

        <div className="charts-container">
          <div className="chart-container small">
            <h2 className="chart-title text-xl font-bold mb-4">Transactions Bar Chart</h2>
            <div>
              <BarChart data={barChartData} />
            </div>
          </div>

          <div className="chart-container small">
            <h2 className="chart-title text-xl font-bold mb-4">Transactions Pie Chart</h2>
            <div className="pie-chart-container">
              <PieChart data={pieChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
