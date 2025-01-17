import React, { useState, useEffect } from 'react';
import { fetchPieChart } from '../api/api';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ selectedMonth }) => {
    const [data, setData] = useState([]);

    const loadPieChart = async () => {
        const chartData = await fetchPieChart(selectedMonth);
        setData(chartData);
    };

    useEffect(() => {
        loadPieChart();
    }, [selectedMonth]);

    const chartData = {
        labels: data.map((category) => category._id),
        datasets: [
            {
                data: data.map((category) => category.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    return (
        <div>
            <h2>Pie Chart</h2>
            <Pie data={chartData} />
        </div>
    );
};

export default PieChart;
