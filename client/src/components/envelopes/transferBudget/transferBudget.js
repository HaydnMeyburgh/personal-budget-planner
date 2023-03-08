import React, { useState } from "react";
import Dropdown from "../../dropdown/dropdown";
import "./transferBudget.css";

const TransferBudget = () => {
  const [fromId, setFromId] = useState();
  const [toId, setToId] = useState();
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/envelopes/transfer/",
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
    <form onSubmit={handleSubmit}>
      <Dropdown onChange={(value) => setFromId(value)}/>
      <input
        type="text"
        value={amount}
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <Dropdown onChange={(value) => setToId(value)}/>
      <button type="submit">Transfer</button>
    </form>
  );
};

export default TransferBudget;
