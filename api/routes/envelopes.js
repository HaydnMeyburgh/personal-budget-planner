const express = require("express");
const envelopeRouter = express.Router();
const {
  createEnvelope,
  getAllEnvelopes,
  getEnvelopeById,
  deleteEnvelope,
  updateEnvelope,
  transferBudget,
  getEnvelopeTransactions,
} = require("../controllers/envelopes.controllers");
const {
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions.controllers");

/**
 * @swagger
 * components:
 *  schemas:
 *    envelope:
 *      type: object
 *      required:
 *        - title
 *        - budget
 *      properties:
 *        id:
 *          type: integer
 *          description: database generated serial id of the envelope
 *        title:
 *          type: string
 *          description: The envelope title
 *        budget:
 *          type: numeric
 *          description: The budget for the envelope
 *      example:
 *        id: 12
 *        title: Fuel
 *        budget: 400
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
 *        amount:
 *          type: numeric
 *          description: The amount of money spent that gets removed from the corresponding envelope budget
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
 * tags:
 *  - name: Envelopes
 *    description: The Envelopes API
 *  - name: Envelope Transactions
 *    description: The Envelope Transactions API
 *  - name: Transactions
 *    description: The general Transactions API
 * */

/**
 * @swagger
 * /api/envelopes:
 *  get:
 *    summary: Returns all the envelopes
 *    tags: [Envelopes]
 *    responses:
 *      200:
 *        description: All available envelopes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/envelope'
 *      404:
 *        description: Cannot find envelopes
 *      500:
 *        description: Server Error
 * */
envelopeRouter.get("/", getAllEnvelopes);

/**
 * @swagger
 * /api/envelopes/{id}:
 *  get:
 *    summary: Returns envelope by id
 *    tags: [Envelopes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The envelope id
 *    responses:
 *      200:
 *        description: Successfully found envelope by id
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/envelope'
 *      404:
 *        description: The envelope was not found
 *      500:
 *        description: Server Error
 * */
envelopeRouter.get("/:envelopeId", getEnvelopeById);

/**
 * @swagger
 * /api/envelopes:
 *  post:
 *    summary: Create a new envelope
 *    tags: [Envelopes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              budget:
 *                type: numeric
 *            example:
 *              title: Internet
 *              budget: 389
 *    responses:
 *      201:
 *        description: The envelope was created successfully
 *      404:
 *        description: The envelope could not be created
 *      500:
 *        description: Server Error
 * */
envelopeRouter.post("/", createEnvelope);

/**
 * @swagger
 * /api/envelopes/{id}:
 *  delete:
 *    summary: Delete envelope by id
 *    tags: [Envelopes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The envelope id
 *    responses:
 *      200:
 *        description: The envelope was deleted successfully
 *      404:
 *        description: The envelope could not be found
 *      500:
 *        description: Server Error
 * */
envelopeRouter.delete("/:envelopeId", deleteEnvelope);

/**
 * @swagger
 * /api/envelopes/{id}:
 *  put:
 *    summary: Updates an envelope
 *    tags: [Envelopes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The envelope id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              budget:
 *                type: numeric
 *            example:
 *              title: Internet
 *              budget: 389
 *    responses:
 *      200:
 *        description: The envelope was updated successfully
 *      404:
 *        description: The envelope could not be found
 *      500:
 *        description: Server Error
 * */
envelopeRouter.put("/:envelopeId", updateEnvelope);

/**
 * @swagger
 * /api/envelopes/transfer/:
 *  post:
 *    summary: Transfers budget from one envelope to another
 *    tags: [Envelopes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fromId:
 *                type: integer
 *              toId:
 *                type: integer
 *              amount:
 *                type: numeric
 *            example:
 *              fromId: 2
 *              amount: 100
 *              toId: 3
 *    responses:
 *      200:
 *        description: The amount was transfered successfully
 *      404:
 *        description: The insufficient amount in budget
 *      500:
 *        description: Server Error
 * */
envelopeRouter.post("/transfer", transferBudget);

/**
 * @swagger
 * /api/envelopes/{id}/transactions:
 *  get:
 *    summary: Returns all transactions associated with an envelope
 *    tags: [Envelope Transactions]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The envelope id
 *    responses:
 *      200:
 *        description: All available transactions for that envelope
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

envelopeRouter.get("/:envelopeId/transactions", getEnvelopeTransactions);

module.exports = envelopeRouter;
