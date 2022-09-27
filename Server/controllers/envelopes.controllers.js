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
  const {envelopeId} = req.params;
  const query = "SELECT * FROM envelopes WHERE id =$1"
  try {
    const envelope = await db.query(query, [envelopeId]);
    if(envelope.rowCount < 1) {
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
    if(newEnvelope.rowCount < 1) {
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
const deleteEnvelope = async(req,  res) => {
  const {envelopeId} = req.params;
  const query = "DELETE FROM envelopes WHERE id = $1 RETURNING *"
  try {
    const deleteEnvelope = await db.query(query, [envelopeId]);
    if(deleteEnvelope.rowCount < 1) {
      return res.status(404).send({
        message: "Cannot find envelope to delete"
      })
    }
    res.status(200).send({
      status: "Success",
      message: `Envelope with id: ${envelopeId} deleted`
    })
  } catch(err) {
    return res.status(500).send({
      error: err.message
    })
  }
};

//Updating an envelope
const updateEnvelope = async (req, res) => {
  const {envelopeId} = req.params;
  const { title, budget } = req.body;
  const query = "UPDATE envelopes SET title = $1, budget = $2 WHERE id = $3 RETURNING *"
  try {
    const updateEnvelope = await db.query(query, [title, budget, envelopeId]);
    if(updateEnvelope.rows < 1) {
      return res.status(404).send({
        message: "Could not update envelope"
      })
    }
    res.status(200).send({
      status: "Success",
      message: `Successfully updated envelope with id: ${envelopeId}`,
      data: updateEnvelope.rows[0]
    })
  } catch(err) {
    return res.status(500).send({
      error: err.message 
    })
  }

};

// Transfer budget from one envelope to another
const transferBudget = async(req, res) => {
  const {fromId, toId} = req.params;
  const {amount} = req.body;
  const envelopeBudget = "SELECT budget FROM envelopes WHERE id = $1";
  try {
    const fromEnvelope = await db.query(envelopeBudget, [fromId]);
    if(fromEnvelope.rows[0].budget < amount) {  
      return res.status(404).send({
        message: "Insufficient amount in budget to transfer"
      })
    }
    await db.query("UPDATE envelopes SET budget = budget - $2 WHERE id = $1", [fromId, amount]);
    await db.query("UPDATE envelopes SET budget = budget + $2 WHERE id = $1", [toId, amount]);
    res.status(201).send({
      status: "Success",
      message: `Successfully transferred budget from ${fromId} to ${toId}`
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