import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [envelopes, setEnvelopes] = useState();

  useEffect(() => {
    // I think i rather want to use async await here for the fetch request
    fetch("http://localhost:3000/api/envelopes", {})
      .then((res) => res.json())
      .then((envelopeData) => setEnvelopes(envelopeData));
  }, []);

  return (
    <div className="App">
      <header>
        <h1 className="title">Budget Planner</h1>
        <p>
          View the API{" "}
          <a href="http://localhost:3000/api/docs" target="_blank">Documentation</a>
        </p>
        <p>
          Use these budget envelopes to track your spending and add transactions
          when you spend money
        </p>
      </header>

      {/* Need to use .map? to extract the object and use the title and budget values */}
      <footer>
        <div>
          Developed by{" "}
          <a href="https://github.com/HaydnMeyburgh" target="_blank">
            Haydn
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
