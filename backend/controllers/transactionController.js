import axios from 'axios';
import Transaction from '../models/Transaction.js';

export const seedDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        // Clear existing data
        await Transaction.deleteMany();
        // Save new data
        await Transaction.insertMany(transactions);

        res.status(200).json({ message: 'Database seeded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const listTransactions = async (req, res) => {
    const { month, search = '', page = 1, perPage = 10 } = req.query;

    try {
        const query = {
            dateOfSale: { $regex: `^\\d{4}-${month.padStart(2, '0')}` }, // Match month
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: { $regex: search, $options: 'i' } },
            ],
        };

        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getStatistics = async (req, res) => {
    const { month } = req.query;

    try {
        const query = { dateOfSale: { $regex: `^\\d{4}-${month.padStart(2, '0')}` } };
        const totalSales = await Transaction.aggregate([{ $match: query }, { $group: { _id: null, total: { $sum: '$price' } } }]);
        const soldItems = await Transaction.countDocuments({ ...query, sold: true });
        const unsoldItems = await Transaction.countDocuments({ ...query, sold: false });

        res.status(200).json({
            totalSales: totalSales[0]?.total || 0,
            soldItems,
            unsoldItems,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBarChart = async (req, res) => {
    const { month } = req.query;

    try {
        const query = { dateOfSale: { $regex: `^\\d{4}-${month.padStart(2, '0')}` } };
        const priceRanges = await Transaction.aggregate([
            { $match: query },
            {
                $bucket: {
                    groupBy: '$price',
                    boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
                    default: '901+',
                    output: { count: { $sum: 1 } },
                },
            },
        ]);

        res.status(200).json(priceRanges);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getPieChart = async (req, res) => {
    const { month } = req.query;

    try {
        const query = { dateOfSale: { $regex: `^\\d{4}-${month.padStart(2, '0')}` } };
        const categoryData = await Transaction.aggregate([
            { $match: query },
            { $group: { _id: '$category', count: { $sum: 1 } } },
        ]);

        res.status(200).json(categoryData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

