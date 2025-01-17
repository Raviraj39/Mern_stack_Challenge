import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../api/api';

const StatisticsBox = ({ selectedMonth }) => {
    const [statistics, setStatistics] = useState({});

    const loadStatistics = async () => {
        const data = await fetchStatistics(selectedMonth);
        setStatistics(data);
    };

    useEffect(() => {
        loadStatistics();
    }, [selectedMonth]);

    return (
        <div>
            <h2>Statistics</h2>
            <p>Total Sales: {statistics.totalSales || 0}</p>
            <p>Sold Items: {statistics.soldItems || 0}</p>
            <p>Unsold Items: {statistics.unsoldItems || 0}</p>
        </div>
    );
};

export default StatisticsBox;
