const express = require('express');
const app = express();
const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express');

dotenv.config({ path: "./db/config/config.env"});

// Parsing middleware that parses request bodies into JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Swagger UI
const specs = require('./swagger');
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs));

// Mounting the envelopeRouter
const envelopeRouter = require('./Server/Routes/envelopes');
app.use('/api/envelopes', envelopeRouter);

// Mounting the transactionsRouter
const transactionsRouter = require('./Server/Routes/transactions');
app.use('/api/transactions', transactionsRouter); 

const PORT = process.env.DEV_PORT || 3000
app.listen(PORT, () => {
  console.log(`Personal Budget app listening on port ${PORT}`);
});