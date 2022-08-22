const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send("Welcome to your Budget Planner! If you'd like to see all of your envelopes, navigate to /envelopes in your URL");
});

app.listen(PORT, () => {
  console.log(`Personal Budget app listening on port ${PORT}`);
});