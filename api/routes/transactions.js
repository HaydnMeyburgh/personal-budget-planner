const express = require("express");
const transactionsRouter = express.Router();
const {
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions.controllers");

/**
 * @swagger
 * components:
 *  schemas:
 *    transaction:
 *      type: object
 *      required:
 *        - recipient
 *        - amount
 *        - date
 *        - envelope_id
 *      properties:
 *        id:
 *          type: integer
 *          description: database generated serial id of the transaction
 *        recipient:
 *          type: string
 *          description: The recipient name of the transaction
 *        date:
 *          type: date
 *          description: The date of the transaction
 *        envelope_id:
 *          type: integer
 *          description: The id of the envelope which the transaction was made from
 *      example:
 *        id: 5
 *        recipient: pick n pay
 *        amount: 100
 *        date: 2022-09-24
 *        envelop_id: 3
 * */

/**
 * @swagger
 * /api/transactions:
 *  get:
 *    summary: Returns all transactions
 *    tags: [Transactions]
 *    responses:
 *      200:
 *        description: All available transactions
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/transaction'
 *      404:
 *        description: The transactions could not be found
 *      500:
 *        description: Server Error
 * */
transactionsRouter.get("/", getAllTransactions);

/**
 * @swagger
 * /api/transactions/{transactionId}:
 *  get:
 *    summary: Returns transaction by id
 *    tags: [Transactions]
 *    parameters:
 *      - in: path
 *        name: transactionId
 *        schema:
 *          type: string
 *        required: true
 *        description: The transaction id
 *    responses:
 *      200:
 *        description: Successfully found transaction by id
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/transaction'
 *      404:
 *        description: The transaction could not be found
 *      500:
 *        description: Server Error
 * */
transactionsRouter.get("/:transactionId", getTransactionById);

/**
 * @swagger
 * /api/transactions/{transactionId}:
 *  put:
 *    summary: Update a transaction. If the transaction amount is adjusted, the associated envelopes budget will be adjusted accordingly
 *    tags: [Transactions]
 *    parameters:
 *      - in: path
 *        name: transactionId
 *        schema:
 *          type: string
 *        required: true
 *        description: The transaction id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              recipient:
 *                type: string
 *              amount:
 *                type: integer
 *              date:
 *                type: date
 *            example:
 *              recipient: pick n pay
 *              amount: 100
 *              date: 2022-09-24
 *    responses:
 *      201:
 *        description: The transaction was updated successfully
 *      404:
 *        description: The transaction could not be updated
 *      500:
 *        description: Server Error
 * */
transactionsRouter.put("/:transactionId", updateTransaction);

/**
 * @swagger
 * /api/transactions/{transactionId}:
 *  delete:
 *    summary: Delete transaction by id and adds the amount back into the envelopes budget.
 *    tags: [Transactions]
 *    parameters:
 *      - in: path
 *        name: transactionId
 *        schema:
 *          type: string
 *        required: true
 *        description: The transaction id
 *    responses:
 *      200:
 *        description: Successfully deleted transaction
 *      404:
 *        description: The transaction could not be found
 *      500:
 *        description: Server Error
 * */
transactionsRouter.delete("/:transactionId", deleteTransaction);

module.exports = transactionsRouter;
