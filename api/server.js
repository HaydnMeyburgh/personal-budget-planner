const express = require("express");
const app = express();
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");

dotenv.config({ path: "./config/config.env" });

// Parsing middleware that parses request bodies into JSON
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//CORS middleware
const cors = require("cors");
app.use(cors());

// Swagger UI
const specs = require("./doc/swagger");
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

// Mounting the envelopeRouter
const envelopeRouter = require("./routes/envelopes");
app.use("/api/envelopes", envelopeRouter);

// Mounting the transactionsRouter
const transactionsRouter = require("./routes/transactions");
app.use("/api/transactions", transactionsRouter);

const PORT = process.env.PROD_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Personal Budget app listening on port ${PORT}`);
});
