const express = require('express');
const app = express();
const PORT = 3000;

// Parsing middleware that parses request bodies into JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Mounting the envelopeRouter
const envelopeRouter = require('./Server/Routes/envelopes');
app.use('/envelopes', envelopeRouter);

app.listen(PORT, () => {
  console.log(`Personal Budget app listening on port ${PORT}`);
});