import "./App.css";
import React from "react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar/navbar";
const Envelopes = lazy(() => import("./components/envelopes/envelopes"));
const Transactions = lazy(() =>
  import("./components/transactions/transactions")
);
const EnvelopeDetails = lazy(() =>
  import("./components/envelopes/envelopeDetails/envelopeDetails")
);
const AddEnvelope = lazy(() =>
  import("./components/envelopes/addEnvelope/addEnvelope")
);

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Envelopes />} />
          <Route path="/addEnvelope" element={<AddEnvelope />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/envelopes/:id" element={<EnvelopeDetails />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
