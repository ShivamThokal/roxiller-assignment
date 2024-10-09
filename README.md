# Product Transaction Dashboard - MERN Stack Application

## Overview

This project is a MERN (MongoDB, Express.js, React, Node.js) stack application designed to manage and analyze product transactions. The backend fetches and seeds data from a third-party API, and provides various APIs to retrieve transaction data, statistics, and chart data. The frontend visualizes this data in a table and charts, offering search and pagination features.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Backend Setup](#backend-setup)
  - [API Endpoints](#api-endpoints)
- [Frontend Setup](#frontend-setup)
- [How to Run](#how-to-run)
- [APIs Description](#apis-description)
  - [Seed Data API](#seed-data-api)
  - [Transactions API](#transactions-api)
  - [Statistics API](#statistics-api)
  - [Bar Chart Data API](#bar-chart-data-api)
  - [Pie Chart Data API](#pie-chart-data-api)
  - [Combined Data API](#combined-data-api)

## Features

### Backend:
1. **Seed Data**: Fetch product transaction data from a third-party API and store it in MongoDB.
2. **Transaction Management**: Retrieve product transactions based on the selected month, with support for search and pagination.
3. **Statistics API**: Provide monthly statistics such as total sale amount, total sold items, and unsold items.
4. **Bar Chart Data**: Generate data for bar chart visualization based on item price ranges.
5. **Pie Chart Data**: Generate data for pie chart visualization based on product categories.

### Frontend:
1. **Transaction Table**: List transactions with search and pagination functionality.
2. **Statistics Display**: Display the total sale amount, sold items, and unsold items for a selected month.
3. **Bar Chart**: Visualize the number of items in price ranges for a selected month.
4. **Pie Chart**: Visualize the item distribution among different categories.

## Technologies Used
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Axios, Moment.js
- **Frontend**: React.js, Axios, Chart.js
- **Others**: HTML, CSS, JSON

## Backend Setup

### API Endpoints
The backend offers the following endpoints:

| HTTP Method | Endpoint            | Description                                                   |
|-------------|---------------------|---------------------------------------------------------------|
| GET         | `/task/seed-data`    | Seeds the database with product transaction data from the API. |
| GET         | `/task/transactions` | Fetches transactions with pagination and search support.       |
| GET         | `/task/statistics`   | Fetches statistics for the selected month.                     |
| GET         | `/task/bar`          | Fetches bar chart data for the selected month.                 |
| GET         | `/task/pie`          | Fetches pie chart data for the selected month.                 |
| GET         | `/task/combined-data`| Combines and returns data from all APIs.                       |

## Frontend Setup

The frontend is built using React and Chart.js to display data in tables and charts. It dynamically interacts with the backend using Axios to fetch data.

## How to Run

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

4. **Run Backend**:
   ```bash
   cd backend
   node app.js
   ```

5. **Run Frontend**:
   ```bash
   cd frontend
   npm start
   ```

## APIs Description

### Seed Data API

**URL**: `/task/seed-data`

**Method**: `GET`

Fetches product transaction data from a third-party API and populates the MongoDB database.

### Transactions API

**URL**: `/task/transactions`

**Method**: `GET`

**Parameters**:
- `month` (required): The month for which the transactions are fetched.
- `search` (optional): Search string to filter transactions by title or description.
- `page` (optional): Page number for pagination (default: 1).
- `perPage` (optional): Number of items per page (default: 10).

Returns paginated transactions for the selected month.

### Statistics API

**URL**: `/task/statistics`

**Method**: `GET`

**Parameters**:
- `month` (required): The month for which statistics are calculated.

Returns the total sale amount, total sold items, and total not sold items for the selected month.

### Bar Chart Data API

**URL**: `/task/bar`

**Method**: `GET`

**Parameters**:
- `month` (required): The month for which the bar chart data is fetched.

Returns the number of items in different price ranges for the selected month.

### Pie Chart Data API

**URL**: `/task/pie`

**Method**: `GET`

**Parameters**:
- `month` (required): The month for which pie chart data is fetched.

Returns the number of items per category for the selected month.

### Combined Data API

**URL**: `/task/combined-data`

**Method**: `GET`

Combines and returns data from the Transactions, Statistics, Bar Chart, and Pie Chart APIs for the selected month.

## Conclusion

This MERN stack application efficiently manages product transaction data and visualizes it through interactive charts and tables. The backend APIs provide robust data handling, while the frontend delivers a smooth user experience for viewing and analyzing the data.

---

This README file is based on the specifications provided in the MERN Stack coding challenge【5†source】.
