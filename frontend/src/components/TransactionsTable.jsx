import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../api/api';

const TransactionsTable = ({ selectedMonth }) => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [perPage] = useState(10); // Default items per page

    const loadTransactions = async () => {
        const data = await fetchTransactions(selectedMonth, search, page, perPage);
        setTransactions(data);
    };

    useEffect(() => {
        loadTransactions();
    }, [selectedMonth, search, page]);

    return (
        <div>
            <h2>Transactions</h2>
            <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table border="1">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date of Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((txn) => (
                        <tr key={txn._id}>
                            <td>{txn.title}</td>
                            <td>{txn.description}</td>
                            <td>{txn.price}</td>
                            <td>{txn.dateOfSale.slice(0, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default TransactionsTable;
