const { db } = require('../../db/config/index')

// Fetch all envelopes
const getAllEnvelopes = async (req, res) => {
  const query = "SELECT * FROM envelopes";
  try {
    const envelopes = await db.query(query);
    if(envelopes.rowCount < 1) {
      return res.status(404).send({
        message: "Cannot find records"
      })
    }
    res.status(200).send({
      status: "Success",
      message: "Information regarding envelopes received",
      data: envelopes.rows
    })
  } catch(err) {
      return res.status(500).send({
        error: err.message
      })
  }
};

// Fetch specific envelope by Id
const getEnvelopeById = async(req, res) => {
  const envelopeId = parseInt(req.params.envelopeId);
  const query = "SELECT * FROM envelopes WHERE id =$1"
  try {
    const envelope = await db.query(query, [envelopeId]);
    if(envelope.rows < 1) {
      return res.status(404).send({
        message: "Cannot find envelope"
      })
    }
    res.status(200).send({
      status: "Success",
      message: "Inforamtion regarding envelope received",
      data: envelope.rows[0]
    })
  } catch(err) {
    return res.status(500).send({
      error: err.message
    })
  }
};

// Create new envelope
/* using SERIAL in the database to auto increment id's */
const createEnvelope = async(req, res, next) => {
  const {title, budget} = req.body;
  const query = "INSERT INTO envelopes (title, budget) VALUES($1, $2) RETURNING *"
  try {
    const newEnvelope = await db.query(query, [title, budget])
    if(!newEnvelope) {
      return res.status(404).send({
        message: "cannot create envelope"
      })
    }
    res.status(201).send({
      status: "Success",
      message: "New envelope created successfully",
      data: newEnvelope.rows[0]
    })
  } catch(err) {
    return res.status(500).send({
      error: err.message
    })
  }
}

// Delete envelope
// **Need to figure out how to check if the envelope wasnt deleted in order to get a message to display** //
const deleteEnvelope = async(req,  res) => {
  const envelopeId = parseInt(req.params.envelopeId);
  const query = "DELETE FROM envelopes WHERE id = $1"
  try {
    const deleteEnvelope = await db.query(query, [envelopeId]);
    if(deleteEnvelope.rowCount = 0) {
      return res.status(404).send({
        message: "Cannot find envelope to delete"
      })
    }
    res.status(200).send({
      status: "Success",
      message: `Envelope with id: ${envelopeId} deleted`,
      data: deleteEnvelope
    })
  } catch(err) {
    return res.status(500).send({
      error: err.message
    })
  }
};

//Updating an envelope
const updateEnvelope = async (req, res) => {
  const envelopeId = parseInt(req.params.envelopeId);
  const { title, budget } = req.body;
  const query = "UPDATE envelopes SET title = $1, budget = $2 WHERE id = $3"
  try {
    const updateEnvelope = db.query(query, [title, budget, envelopeId]);
    if(updateEnvelope.rows < 1) {
      return res.status(404).send({
        message: "Could not update envelope"
      })
    }
    res.status(200).send({
      status: "Success",
      message: `Successfully updated envelope with id: ${envelopeId}`
    })
  } catch(err) {
    return res.status(500).send({
      error: err.message 
    })
  }

};

// Transfer budget from one envelope to another
/* This one is stumping me... Need to figure out how to write the query, or if the query should be 2 seperate ones....*/
const transferBudget = async(req, res) => {
  const {fromId, toId} = req.params;
  const {amount} = req.body;
  const queryFrom = "UPDATE envelopes SET budget = budget - $2 WHERE id = $1";
  const queryTo = "UPDATE envelopes SET budget = budget + $2 WHERE id = $1";
  try {
    const fromBudget = await db.query(queryFrom, [fromId, amount]);
    const toBudget = await db.query(queryTo, [toId, amount]);
    // const budgetCheck = await db.query("SELECT budget FROM envelopes WHERE id = $1", [fromId])
    //**  Need to find a check that will allow this to fail if the amount wanting to transfer is greater than the original budget amount
    if(!fromBudget || !toBudget) {  
      return res.status(404).send({
        message: "Insufficient amount in budget to transfer"
      })
    }
    res.status(201).send({
      status: "Success",
      message: `Successfully transferred budget from id: ${fromId} to id: ${toId}`
    })
  } catch(err) {
    return res.status(500).send({
      error: err.message
    })
  }
};

module.exports = {
  createEnvelope,
  getAllEnvelopes,
  getEnvelopeById,
  deleteEnvelope,
  updateEnvelope,
  transferBudget
};