import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./addTransaction.css";

const AddTransaction = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [envelopeId, setEnvelopeId] = useState();
  const [envelopes, setEnvelopes] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedEnvelope, setSelectedEnvelope] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnvelopes = async () => {
      const response = await fetch("http://localhost:3000/api/envelopes");
      const envelopeData = await response.json();
      setEnvelopes(envelopeData.data);
    };
    fetchEnvelopes();

    const handler = () => setShowMenu(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/transactions/", {
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
        setEnvelopeId("");
      }
    } catch (err) {
      console.log(err);
    }
    navigate("/transactions");
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (selectedEnvelope) {
      return selectedEnvelope.title;
    }
    return "Select Envelope";
  };

  const onItemClick = (item) => {
    setSelectedEnvelope(item);
    setEnvelopeId(item.id);
  };

  const isSelected = (envelope) => {
    if (!selectedEnvelope) {
      return false;
    }
    return selectedEnvelope.title === envelope.title;
  };

  const Icon = () => {
    return (
      <svg height="20" width="20" viewBox="0 0 20 20">
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
      </svg>
    );
  };

  return (
    <div className="container">
      <button className="btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={recipient}
          placeholder="Recipient"
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          type="text"
          value={amount}
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="dropdown-container">
          <div onClick={handleInputClick} className="dropdown-input">
            <div className="dropdown-selected-view">{getDisplay()}</div>
            <div className="dropdown-tools">
              <div className="dropdown-tool">
                <Icon />
              </div>
            </div>
          </div>
          {showMenu && (
            <div className="dropdown-menu">
              {envelopes.map((envelope) => (
                <div
                  onClick={() => onItemClick(envelope)}
                  key={envelope.id}
                  className={`dropdown-item ${
                    isSelected(envelope) && "selected"
                  }`}
                >
                  {envelope.title}
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddTransaction;
