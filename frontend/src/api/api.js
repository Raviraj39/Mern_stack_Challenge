import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/transactions';

// Fetch bar chart data for a specific month
export const fetchBarChart = async (month) => {
    const response = await axios.get(`${BASE_URL}/barchart`, { params: { month } });
    return response.data;
};
