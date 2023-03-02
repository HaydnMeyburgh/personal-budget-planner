import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EnvelopeDetails = () => {
  const [envelopeDetails, setEnvelopeDetails] = useState([]);
  const [tempEnvelope, setTempEnvelope] = useState([]);
  const [envelopeTransactions, setEnvelopeTransactions] = useState([]);
  const [changed, setChanged] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEnvelopeDetails = async () => {
      const response = await fetch(`http://localhost:3000/api/envelopes/${id}`);
      const envelopeDetailsData = await response.json();
      setEnvelopeDetails(envelopeDetailsData.data[0]);
      setTempEnvelope(envelopeDetailsData.data[0]);
    };
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/envelopes/${id}/transactions/`
        );
        const envelopeTransactions = await response.json();
        if (response.status === 200) {
          setEnvelopeTransactions(envelopeTransactions.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchEnvelopeDetails();
    fetchTransactions();
  }, []);

  const updateEnvelope = async () => {
    const response = await fetch(`http://localhost:3000/api/envelopes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempEnvelope),
    });
    await response.json();
    setEnvelopeDetails(tempEnvelope);
    setChanged(false);
  };

  return (
    <div className="container">
      <button className="btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="envelope-details-container">
        <div key={tempEnvelope.id}>
          <div className="envelope-details-text">
            <input
              className="envelope-details-title"
              type="text"
              value={tempEnvelope.title}
              onChange={(e) => {
                setChanged(true);
                setTempEnvelope({ ...tempEnvelope, title: e.target.value });
              }}
            />
            <input
              className="envelope-details-budget"
              type="text"
              value={tempEnvelope.budget}
              onChange={(e) => {
                setChanged(true);
                setTempEnvelope({ ...tempEnvelope, budget: e.target.value });
              }}
            />
          </div>
        </div>
        {changed ? (
          <>
            <button
              onClick={(e) => {
                setTempEnvelope({ ...envelopeDetails });
                setChanged(false);
              }}
            >
              Cancel
            </button>{" "}
            <button onClick={updateEnvelope}>Save</button>
          </>
        ) : null}
      </div>
      <button
        onClick={(e) => {
          fetch(`http://localhost:3000/api/envelopes/${id}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Something went wrong");
              }
              navigate("/");
            })
            .catch(() => {
              console.log(e);
            });
        }}
      >
        Delete
      </button>
      <h2>Transactions</h2>
      <div className="envelope-transactions-container">
        {envelopeTransactions.map((transactions) => (
          <div key={transactions.id}>
            <div className="transactions-details-text">
              <span>Recipient: {transactions.recipient}</span>
              <span>Amount: {transactions.amount}</span>
              <span>Date: {transactions.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnvelopeDetails;
