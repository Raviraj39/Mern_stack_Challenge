import express from 'express';
import { seedDatabase, listTransactions, getStatistics, getBarChart, getPieChart } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/seed', seedDatabase);
router.get('/list', listTransactions);
router.get('/statistics', getStatistics);
router.get('/barchart', getBarChart);
router.get('/piechart', getPieChart);

export default router;
