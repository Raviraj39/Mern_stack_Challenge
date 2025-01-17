import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/transactions';

// Fetch transactions with pagination and search
export const fetchTransactions = async (month, search = '', page = 1, perPage = 10) => {
    const response = await axios.get(`${BASE_URL}/list`, {
        params: { month, search, page, perPage },
    });
    return response.data;
};

// Fetch statistics for a specific month
export const fetchStatistics = async (month) => {
    const response = await axios.get(`${BASE_URL}/statistics`, { params: { month } });
    return response.data;
};

// Fetch bar chart data for a specific month
export const fetchBarChart = async (month) => {
    const response = await axios.get(`${BASE_URL}/barchart`, { params: { month } });
    return response.data;
};

// Fetch pie chart data for a specific month
export const fetchPieChart = async (month) => {
    const response = await axios.get(`${BASE_URL}/piechart`, { params: { month } });
    return response.data;
};
