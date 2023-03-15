import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./envelopeDetails.css";

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
    const response = await fetch(`https://budget-planner-api.vercel.app/api/envelopes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempEnvelope),
    });
    await response.json();
    setEnvelopeDetails(tempEnvelope);
    setChanged(false);
  };

  return (
    <>
      <button className="btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="details-container">
        <div className="envelope-details-container">
          <div key={tempEnvelope.id}>
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
          {changed ? (
            <div className="changed-buttons">
              <button
                className="cancel-button"
                onClick={(e) => {
                  setTempEnvelope({ ...envelopeDetails });
                  setChanged(false);
                }}
              >
                Cancel
              </button>{" "}
              <button className="save-button" onClick={updateEnvelope}>
                Save
              </button>
            </div>
          ) : null}
        </div>
        <button
          className="delete-button"
          onClick={(e) => {
            fetch(`https://budget-planner-api.vercel.app/api/envelopes/${id}`, {
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
        <h2 className="transactions-title">Envelope Transactions</h2>
        <div className="envelope-transactions-container">
          {envelopeTransactions.map((transactions) => (
            <div key={transactions.id} className="envelope-transactions-card">
              <Link to={`/transactions/${transactions.id}`}>
                <div className="transactions-details-text">
                  <p className="recipient" >Recipient: {transactions.recipient}</p>
                  <p className="amount" >Amount: {transactions.amount}</p>
                  <p className="date" >Date: {transactions.date}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EnvelopeDetails;
