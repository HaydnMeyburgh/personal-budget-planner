const express = require('express');
const transactionsRouter = express.Router();
const {
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactions.controllers')

// Get all transactions
transactionsRouter.get('/', getAllTransactions);
// Get transaction by id
transactionsRouter.get('/:transactionId', getTransactionById);
// Update a transaction
// If it is the transaction amount that is updated then the budget of the corresponding envelope needs to be updated as well to reflect the new transaction amount
transactionsRouter.put('/:transactionId', updateTransaction);
// Delete a transaction by id
// If a transaction is deleted then the budget needs to be adjusted for the corresponding envelope (The budget amount should increase)
transactionsRouter.delete('/:transactionId', deleteTransaction);

module.exports = transactionsRouter;