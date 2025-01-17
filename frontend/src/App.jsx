import React, { useState } from 'react';
import BarChart from './components/BarChart';

const App = () => {
    const [selectedMonth, setSelectedMonth] = useState('03'); // Default to March

    return (
        <div style={{ padding: '20px' }}>
            <h1>Bar Chart Dashboard</h1>
            <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
            >
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <BarChart selectedMonth={selectedMonth} />
        </div>
    );
};

export default App;
