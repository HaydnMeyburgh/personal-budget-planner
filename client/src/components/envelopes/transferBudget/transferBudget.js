import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../dropdown/dropdown";
import "./transferBudget.css";

const TransferBudget = () => {
  const [fromId, setFromId] = useState();
  const [toId, setToId] = useState();
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://budget-planner-api.up.railway.app/api/envelopes/transfer/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fromId: fromId,
            toId: toId,
            amount: amount,
          }),
        }
      );
      await response.json();
      if (response.status === 200) {
        setFromId("");
        setToId("");
        setAmount("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button className="btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="budget-transfer-container">
        <form onSubmit={handleSubmit} className="budget-transfer">
          <Dropdown
            onChange={(value) => setFromId(value)}
            placeholder="Select From Envelope"
          />
          <input
            className="transfer-amount"
            type="text"
            value={amount}
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <Dropdown
            onChange={(value) => setToId(value)}
            placeholder="Select To Envelope"
          />
          <button type="submit" className="transfer-btn">
            Transfer
          </button>
        </form>
      </div>
    </>
  );
};

export default TransferBudget;
