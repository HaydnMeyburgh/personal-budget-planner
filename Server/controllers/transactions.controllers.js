const { db } = require('../../db/config/index');

// get all transactions
const getAllTransactions = async(req, res) => {
  try {
    const transactions = await db.query("SELECT * FROM transactions");
    if(transactions.rowCount < 1) {
      return res.status(404).send({
        message: "No transactions were found"
      })
    }
    res.status(200).send({
      status: "Success",
      message: "Info regarding transactions received",
      data: transactions.rows
    }) 
  } catch(err) {
    return res.status(500).send({
      error: err.message
    })
  } 
}

// get transaction by id
const getTransactionById = async(req, res) => {
  const {transactionId} = req.params;
  try {
    const transaction = await db.query("SELECT * FROM transactions WHERE id = $1", [transactionId])
    if(transaction.rowCount < 1) {
      return res.status(404).send({
        message: "Transaction could not be found"
      })
    }
    res.status(200).send({
      status: "Success",
      message: `Successfully found transaction with id - ${transactionId}`,
      data: transaction.rows[0]
    })
  } catch(err) {
    return res.status(500).send({
      error: err.message
    })
  }
}

// Update a transaction
const updateTransaction = async(req, res) => {
  const {transactionId} = req.params;
  const {recipient, amount, date} = req.body
  try {
    const transaction = await db.query("SELECT * FROM transactions WHERE id = $1", [transactionId]);
    if(transaction.rowCount < 1) {
      return res.status(404).send({
        message: "cannot find transaction"
      })
    }
    const currentAmount = transaction.rows[0].amount;
    const envelopeId = transaction.rows[0].envelope_id;
    await db.query("UPDATE envelopes SET budget = budget - ($1::numeric - $2::numeric) WHERE id = $3", [amount, currentAmount, envelopeId]);
    await db.query("UPDATE transactions SET recipient = $1, amount = $2, date = $3 WHERE id = $4", [recipient, amount, date, transactionId]);
    res.status(201).send({
      status: "Success",
      message: `Successfully updated transaction with id - ${transactionId}`
    })
  } catch(err) {
    return res.status(500).send({
      error: err.message
    })
  }
};

// Delete Transaction
const deleteTransaction = async(req, res) => {
  const {transactionId} = req.params;
  try {
    const transaction = await db.query("SELECT * FROM transactions WHERE id = $1", [transactionId]);
    if(transaction.rowCount < 1) {
      return res.status(404).send({
        message: "Could not find transaction"
      })
    }
    const transactionAmount = transaction.rows[0].amount;
    const envelopeId = transaction.rows[0].envelope_id;
    await db.query("UPDATE envelopes SET budget = budget + $1 WHERE id = $2", [transactionAmount, envelopeId]); 
    await db.query("DELETE FROM transactions WHERE id = $1", [transactionId]);
    res.status(200).send({
      status: "Success",
      message: `Successfully deleted transaction with id - ${transactionId}`
    })
  } catch(err) {
    return res.status(500).send({
      error: err.message
    })
  }

}

module.exports = {
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
}