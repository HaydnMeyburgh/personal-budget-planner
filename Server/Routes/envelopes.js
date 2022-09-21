const express = require('express');
const envelopeRouter = express.Router();
const {
  createEnvelope, 
  getAllEnvelopes,
  getEnvelopeById,
  deleteEnvelope,
  updateEnvelope,
  transferBudget
} = require('../controllers/envelopes.controllers');

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

module.exports = envelopeRouter;