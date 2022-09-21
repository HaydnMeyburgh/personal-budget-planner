const express = require('express');
const transactionsRouter = express.Router();
const {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactions.controllers')

// Get all transactions
transactionsRouter.get('/transactions', getAllTransactions);
// Get transaction by id
transactionsRouter.get('/transactions/:transactionId', getTransactionById);
// Create a new transaction
transactionsRouter.post('/:evelopeId/transactions', createTransaction);
// Update a transaction
transactionsRouter.put('/transactions/:transactionId', updateTransaction);
// Delete a transaction by id
transactionsRouter.delete('/transactions/:transactionId', deleteTransaction);

module.exports = transactionsRouter;