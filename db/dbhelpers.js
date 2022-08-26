const {findById, findByIndex, createNewId} = require('../Server/Utils/utils')
const envelopes = require('./db');

// Create new envelope
const createEnvelope = (req, res, next) => {
  const {title, budget} = req.body;
  const newId = createNewId(envelopes);
  if(typeof title === 'string' && typeof budget === 'number') {
    let newEnvelope = {id: newId, title, budget}
    envelopes.push(newEnvelope);
    res.status(201).send(newEnvelope);
  } else {
    res.status(404).send();
  }
}

// Fetch all envelopes
const getAllEnvelopes = (req, res, next) => {
  res.status(200).send(envelopes);
}

// Fetch specific envelope by Id
const getEnvelopeById = (req, res) => {
  const envelopeId = req.params.envelopeId;
  const envelope = findById(envelopes, envelopeId);
  if(envelope) {
    res.status(200).send(envelope);
  } else {
    res.status(404).send();
  }
};

// Delete envelope
const deleteEnvelope = (req,  res) => {
  const envelopeId = Number(req.params.envelopeId);
  const envelopeIndex = findByIndex(envelopes, envelopeId);
  if (envelopeIndex >= 0) {
    envelopes.splice(envelopeIndex, 1);
    res.status(204).send()
  } else {
    res.status(404).send()
  }
};

//Updating an envelope
const updateEnvelope = (req, res) => {
  const envelopeId = req.params.envelopeId;
  const envelopeIndex = findByIndex(envelopes, envelopeId);
  if(envelopeIndex >= 0) {                                                                 
    const { title, budget } = req.body;
    envelopes[envelopeIndex] = {id: envelopeId, title : title, budget: Number(budget)}
    res.status(200).send(envelopes[envelopeIndex]);
  } else {
    res.status(404).send();
  }
};

// Transfer budget from one envelope to another
const transferBudget = (req, res) => {
  const {fromId, toId} = req.params;
  const {amount} = req.body;
  const fromEnvelope = findById(envelopes, fromId);
  const toEnvelope = findById(envelopes, toId)
  if(!fromEnvelope || !toEnvelope) {
    res.status(404).send();
  } else if (fromEnvelope.budgt < amount){
    res.status(404).send("Not enough money in the envelope to transfer")
  }
  fromEnvelope.budget -= amount;
  toEnvelope.budget += amount;
  res.status(201).send(fromEnvelope);
};

module.exports = {
  createEnvelope,
  getAllEnvelopes,
  getEnvelopeById,
  deleteEnvelope,
  updateEnvelope,
  transferBudget
};