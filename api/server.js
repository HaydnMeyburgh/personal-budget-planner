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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-MEthods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
// Swagger UI
const specs = require("./doc/swagger");
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

// Mounting the envelopeRouter
const envelopeRouter = require("./routes/envelopes");
app.use("/envelopes", envelopeRouter);

// Mounting the transactionsRouter
const transactionsRouter = require("./routes/transactions");
app.use("/transactions", transactionsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Personal Budget app listening on port ${PORT}`);
});
