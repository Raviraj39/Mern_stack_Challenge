import React, { useState, useEffect } from 'react';
import { fetchBarChart } from '../api/api';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ selectedMonth }) => {
    const [data, setData] = useState([]);

    const loadBarChart = async () => {
        const chartData = await fetchBarChart(selectedMonth);
        setData(chartData);
    };

    useEffect(() => {
        loadBarChart();
    }, [selectedMonth]);

    const chartData = {
        labels: data.map((range) => range._id),
        datasets: [
            {
                label: 'Number of Items',
                data: data.map((range) => range.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div>
            <h2>Bar Chart</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default BarChart;
