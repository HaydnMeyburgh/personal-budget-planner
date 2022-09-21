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

envelopeRouter.post('/', createEnvelope); 

envelopeRouter.get('/', getAllEnvelopes); 

envelopeRouter.get('/:envelopeId', getEnvelopeById); 

envelopeRouter.delete('/:envelopeId', deleteEnvelope); 

envelopeRouter.put('/:envelopeId', updateEnvelope); 

envelopeRouter.put('/transfer/:fromId/:toId', transferBudget); 

module.exports = envelopeRouter;