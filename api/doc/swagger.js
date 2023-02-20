const swaggerJsDoc = require("swagger-jsdoc");

// Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Budget Planner API",
      version: "1.0.0",
      description:
        "A simple express Budget Planner API that allows you to create budget envelopes as well as transactions where the transaction amount will be deducted from the corresponding envelope budget.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

module.exports = specs;
