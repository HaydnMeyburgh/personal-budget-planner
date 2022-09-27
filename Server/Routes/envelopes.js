const express = require('express');
const envelopeRouter = express.Router();
const {
  createEnvelope, 
  getAllEnvelopes,
  getEnvelopeById,
  deleteEnvelope,
  updateEnvelope,
  transferBudget,
  getEnvelopeTransactions,
  getEnvelopeTransactionById,
  createTransaction
} = require('../controllers/envelopes.controllers');
const { updateTransaction, deleteTransaction } = require('../controllers/transactions.controllers');

// Create a new envelope
envelopeRouter.post('/', createEnvelope);
// Fetch all envelopes 
envelopeRouter.get('/', getAllEnvelopes);
// Fetch an envelope by id 
envelopeRouter.get('/:envelopeId', getEnvelopeById);
// Delete an envelope by id
envelopeRouter.delete('/:envelopeId', deleteEnvelope);
// Update an envelope 
envelopeRouter.put('/:envelopeId', updateEnvelope);
// Transfer amount from one envelope to another envelope 
envelopeRouter.put('/transfer/:fromId/:toId', transferBudget); 
// Get all transactions relating to an envelope
envelopeRouter.get('/:envelopeId/transactions', getEnvelopeTransactions);
// Get transaction by id relating to an envelope
envelopeRouter.get('/:envelopeId/transactions/:transactionId', getEnvelopeTransactionById);
// Create a new transaction
// Need to make sure that the corresponding envelopes budget is adjusted to reflect the new transaction
envelopeRouter.post('/:envelopeId/transactions', createTransaction);
// Update a transaction
// If it is the transaction amount that is updated then the budget of the corresponding envelope needs to be updated as well to reflect the new transaction amount
envelopeRouter.put('/:envelopeId/transactions/:transactionId', updateTransaction);
// Delete a transaction by id
// If a transaction is deleted then the budget needs to be adjusted for the corresponding envelope (The budget amount should increase)
envelopeRouter.delete('/:envelopeId/transactions/:transactionId', deleteTransaction);

module.exports = envelopeRouter;