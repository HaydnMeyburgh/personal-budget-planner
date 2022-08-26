const express = require('express');
const envelopeRouter = express.Router();
const {
  createEnvelope, 
  getAllEnvelopes,
  getEnvelopeById,
  deleteEnvelope,
  updateEnvelope,
  transferBudget
} = require('../../db/dbhelpers');

envelopeRouter.post('/', createEnvelope); 

envelopeRouter.get('/', getAllEnvelopes); 

envelopeRouter.get('/:envelopeId', getEnvelopeById); 

envelopeRouter.delete('/:envelopeId', deleteEnvelope); 

envelopeRouter.post('/:envelopeId', updateEnvelope); 

envelopeRouter.post('/transfer/:fromId/:toId', transferBudget); 

module.exports = envelopeRouter;