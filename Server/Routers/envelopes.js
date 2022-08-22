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
  const envelope = envelopes.find(envelope => envelope.id === envelopeId);
  if(envelope) {
    res.status(200).send(envelope);
  } else {
    res.status(404).send();
  }
});

module.exports = envelopeRouter;