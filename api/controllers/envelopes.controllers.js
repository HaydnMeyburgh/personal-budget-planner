const { db } = require("../config/index");

// Fetch all envelopes
const getAllEnvelopes = async (req, res) => {
  try {
    const envelopes = await db.query("SELECT * FROM envelopes");
    if (envelopes.rows.length === 0) {
      return res.status(404).send({
        message: "Cannot find envelopes",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Information regarding envelopes received",
      data: envelopes.rows,
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// Fetch specific envelope by Id and associated transactions
const getEnvelopeById = async (req, res) => {
  const { envelopeId } = req.params;
  try {
    const envelope = await db.query("SELECT * FROM envelopes WHERE id = $1", [
      envelopeId,
    ]);
    if (envelope.rows.length === 0) {
      return res.status(404).send({
        message: "Cannot find envelope",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Inforamtion regarding envelope received",
      data: envelope.rows,
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// Create new envelope
/* using SERIAL in the database to auto increment id's */
const createEnvelope = async (req, res, next) => {
  const { title, budget } = req.body;
  try {
    const newEnvelope = await db.query(
      "INSERT INTO envelopes (title, budget) VALUES($1, $2)",
      [title, budget]
    );
    if (newEnvelope.rowCount < 1) {
      return res.status(400).send({
        message: "Cannot create envelope, ensure correct data is submitted.",
        data: newEnvelope,
      });
    }
    res.status(201).send({
      status: "Success",
      message: "New envelope created successfully",
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// Delete envelope
const deleteEnvelope = async (req, res) => {
  const { envelopeId } = req.params;
  try {
    const envelope = await db.query("SELECT * FROM envelopes WHERE id = $1", [
      envelopeId,
    ]);
    if (envelope.rows === 0) {
      return res.status(404).send({
        message: "Envelope does not exist",
      });
    }
    await db.query("DELETE FROM envelopes WHERE id = $1", [envelopeId]);
    res.status(200).send({
      status: "Success",
      message: "Envelope deleted successfully",
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

//Updating an envelope
const updateEnvelope = async (req, res) => {
  const { envelopeId } = req.params;
  const { title, budget } = req.body;
  try {
    const updateEnvelope = await db.query(
      "UPDATE envelopes SET title = $1, budget = $2 WHERE id = $3",
      [title, budget, envelopeId]
    );
    if (updateEnvelope.rows.length === 0) {
      return res.status(400).send({
        message:
          "Envelope could not be updated, ensure correct data is submitted",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully updated envelope",
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// I may have to come back and change this, to make it work on the frontend
// Transfer budget from one envelope to another
const transferBudget = async (req, res) => {
  const { amount, fromId, toId } = req.body;
  try {
    const fromEnvelope = await db.query(
      "SELECT budget FROM envelopes WHERE id = $1",
      [fromId]
    );
    if (fromEnvelope.rows[0].budget < amount) {
      return res.status(400).send({
        message: "Insufficient amount in budget to transfer",
      });
    }
    await db.query(
      "UPDATE envelopes SET budget = budget - $1 WHERE id = $2",
      [amount, fromId]
    );
    await db.query(
      "UPDATE envelopes SET budget = budget + $1 WHERE id = $2",
      [amount, toId]
    );
    res.status(200).send({
      status: "Success",
      message: "Successfully transferred budget",
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// Transactions are fetched when a specific envelope is fetched SEEN ABOVE *I might come back and change this.
const getEnvelopeTransactions = async (req, res) => {
  const { envelopeId } = req.params;
  try {
    const transactions = await db.query(
      "SELECT id, recipient, amount, TO_CHAR(date, 'Mon dd, yyyy') AS date FROM transactions WHERE envelope_id = $1",
      [envelopeId]
    );
    if (transactions.rows.length === 0) {
      return res.status(404).send({
        status: 404,
        message: "No Transactions available for this envelope",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Information regarding transaction received.",
      data: transactions.rows,
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// I dont think this is needed as of now, may need it once ive built the frontend
// const getEnvelopeTransactionById = async (req, res) => {
//   const { envelopeId, transactionId } = req.params;
//   try {
//     const transaction = await db.query(
//       "SELECT * FROM transactions WHERE id = $1 AND envelope_id = $2",
//       [transactionId, envelopeId]
//     );
//     if (transaction.rowCount < 1) {
//       return res.status(404).send({
//         message: "Could not find that transaction",
//       });
//     }
//     res.status(200).send({
//       status: "Success",
//       message: "Successfully found transaction",
//       data: transaction.rows[0],
//     });
//   } catch (err) {
//     return res.status(505).send({
//       error: err.message,
//     });
//   }
// };

module.exports = {
  createEnvelope,
  getAllEnvelopes,
  getEnvelopeById,
  deleteEnvelope,
  updateEnvelope,
  transferBudget,
  getEnvelopeTransactions,
};
