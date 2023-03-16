import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./addTransaction.css";
import Dropdown from "../../dropdown/dropdown";

const AddTransaction = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [envelopeId, setEnvelopeId] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://budget-planner-api.up.railway.app/api/transactions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: recipient,
          amount: amount,
          date: date,
          envelope_id: envelopeId,
        }),
      });
      await response.json();
      if (response.status === 201) {
        setRecipient("");
        setAmount("");
        setDate("");
        setEnvelopeId();
      }
    } catch (err) {
      console.log(err);
    }
    navigate("/transactions");
  };

  return (
    <>
      <button className="btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="new-transaction-container">
        <form onSubmit={handleSubmit} className="new-transaction">
          <input
            type="text"
            value={recipient}
            placeholder="Recipient"
            onChange={(e) => setRecipient(e.target.value)}
            className="new-transaction-recipient"
          />
          <input
            type="text"
            value={amount}
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
            className="new-transaction-amount"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="new-transaction-date"
          />
          <Dropdown onChange={(value) => setEnvelopeId(value)} placeholder="Select Envelope" />
          <button type="submit" className="submit-new-transaction">Create</button>
        </form>
      </div>
    </>
  );
};

export default AddTransaction;
