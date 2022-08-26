const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send("Welcome to your Budget Planner! Go ahead and create your first envelope!");
});

// Parsing middleware that parses request bodies into JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Mounting the envelopeRouter
const envelopeRouter = require('./Server/Routers/envelopes');
app.use('/envelopes', envelopeRouter);

const transfersRouter = require('./Server/Routers/transfers');
app.use('/envelopes/transfer', transfersRouter);

app.listen(PORT, () => {
  console.log(`Personal Budget app listening on port ${PORT}`);
});