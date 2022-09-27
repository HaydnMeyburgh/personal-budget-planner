const { db } = require('../../db/config/index')

// Fetch all envelopes
const getAllEnvelopes = async (req, res) => {
  try {
    const envelopes = await db.query("SELECT * FROM envelopes");
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
  try {
    const envelope = await db.query("SELECT * FROM envelopes WHERE id =$1", [envelopeId]);
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
  try {
    const newEnvelope = await db.query("INSERT INTO envelopes (title, budget) VALUES($1, $2) RETURNING *", [title, budget])
    if(newEnvelope.rowCount < 1) {
      return res.status(404).send({
        message: "cannot create envelope"
      })
    }
    res.status(201).send({
      status: "Success",
      message: "New envelope created successfully"
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
  try {
    const deleteEnvelope = await db.query("DELETE FROM envelopes WHERE id = $1 RETURNING *", [envelopeId]);
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
  try {
    const updateEnvelope = await db.query("UPDATE envelopes SET title = $1, budget = $2 WHERE id = $3 RETURNING *", [title, budget, envelopeId]);
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
const transferBudget = async(req, res) => {
  const {fromId, toId} = req.params;
  const {amount} = req.body;
  try {
    const fromEnvelope = await db.query("SELECT budget FROM envelopes WHERE id = $1", [fromId]);
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

// get all transactions for an envelope
const getEnvelopeTransactions = async(req, res) => {
  const {envelopeId} = req.params;
  try {
    const transactions = await db.query("SELECT * FROM transactions WHERE envelope_id = $1", [envelopeId]);
    if(transactions.rowCount < 1) {
      return res.status(404).send({
        message: "Could not fetch transactions"
      })
    }
    res.status(200).send({
      status: "Success",
      message: `Successfully found transactions relating to envelope id - ${envelopeId}`,
      data: transactions.rows
    })
  } catch(err) {
    return res.status(500).send({
      error: err.message
    })
  }
}

// get transaction by id for an envelope
const getEnvelopeTransactionById = async(req, res) => {
  const {envelopeId, transactionId} = req.params;
  try {
    const transaction = await db.query("SELECT * FROM transactions WHERE id = $1 AND envelope_id = $2", [transactionId, envelopeId]);
    if(transaction.rowCount < 1) {
      return res.status(404).send({
        message: "Could not find that transaction"
      })
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully found transaction",
      data: transaction.rows[0]
    })
  } catch(err) {
    return res.status(505).send({
      error: err.message
    })
  }
}

// Create Transaction
const createTransaction = async(req, res) => {
  const {envelopeId} = req.params;
  const {recipient, amount, date} = req.body;
  try {
    const envelopeQuery = await db.query("SELECT * FROM envelopes WHERE id = $1", [envelopeId])
    if(envelopeQuery.rowCount < 0) {
      return res.status(404).send({
        message: "Cannot create transaction"
      })
    }
    await db.query("INSERT INTO transactions (recipient, amount, date, envelope_id) VALUES ($1, $2, $3, $4) RETURNING *", [recipient, amount, date, envelopeId]);
    await db.query("UPDATE envelopes SET budget = budget - $1 WHERE id = $2", [amount, envelopeId]);
    res.status(201).send({
      status: "Success",
      message: "Successfully created transaction"
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
  transferBudget,
  getEnvelopeTransactions,
  getEnvelopeTransactionById,
  createTransaction
};