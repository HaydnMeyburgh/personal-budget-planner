const express = require('express');
const envelopeRouter = express.Router();
// const { getAllEnvelopes, createEnvelope } = require('../Utils/utils');

const envelopes = []
let envelopeIdCounter = 1;

const createEnvelope = (req, res, next) => {
  const {title, budget} = req.body;
  if(typeof title === 'string' && typeof budget === 'number') {
    let newEnvelope = {id: envelopeIdCounter, title, budget}
    envelopes.push(newEnvelope);
    ++envelopeIdCounter;
    res.status(201).send(newEnvelope);
  } else {
    res.status(404).send();
  }
}

// Create new envelope with required data
envelopeRouter.post('/', createEnvelope);

// Fetch all envelopes
envelopeRouter.get('/', (req, res) => {
  res.status(200).send(envelopes)
});

// Fetch specific envelope by Id
envelopeRouter.get('/:envelopeId', (req, res) => {
  const envelopeId = Number(req.params.envelopeId);
  const envelopeIndex = envelopes.findIndex(envelope => envelope.id === envelopeId);
  if(envelopeIndex >= 0) {
    res.status(200).send(envelopes[envelopeIndex]);
  } else {
    res.status(404).send();
  }
});

// Delete envelope
envelopeRouter.delete('/:envelopeId', (req,  res) => {
  const envelopeId = Number(req.params.envelopeId);
  const envelopeIndex = envelopes.findIndex(envelope => envelope.id === envelopeId);
  if (envelopeIndex >= 0) {
    envelopes.splice(envelopeIndex, 1);
    res.status(204).send()
  } else {
    res.status(404).send()
  }
});

//Updating an envelope, either the title or budget, or title and budget together.
envelopeRouter.post('/:envelopeId', (req, res) => {
  const envelopeId = Number(req.params.envelopeId);
  const envelopeIndex = envelopes.findIndex(envelope => envelope.id === envelopeId); 
  if(envelopeIndex >= 0) {                                                                 
    const { title, budget } = req.body;
    envelopes[envelopeIndex] = {id: envelopeId, title : title, budget: Number(budget)}
    res.status(200).send(envelopes[envelopeIndex]);
  } else {
    res.status(404).send();
  }
});

module.exports = envelopeRouter;