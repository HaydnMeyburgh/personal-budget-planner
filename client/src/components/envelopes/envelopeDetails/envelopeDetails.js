import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Transactions from "../../transactions/transactions";

const EnvelopeDetails = () => {
  const [envelopeDetails, setEnvelopeDetails] = useState([]);
  const [envelopeTransactions, setEnvelopeTransactions] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchEnvelopeDetails = async () => {
      const response = await fetch(`http://localhost:3000/api/envelopes/${id}`);
      const envelopeDetailsData = await response.json();
      setEnvelopeDetails(envelopeDetailsData.data);
    };
    const fetchTransactions = async () => {
      const response = await fetch(
        `http://localhost:3000/api/envelopes/${id}/transactions`
      );
      if (response.ok) {
        const envelopeTransactions = await response.json();
        setEnvelopeTransactions(envelopeTransactions.data);
      }
    };
    fetchEnvelopeDetails();
    fetchTransactions();
  }, [id]);

  return (
    <div className="container">
      <button className="btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="envelope-details-container">
        {envelopeDetails.map((envelopeDetail) => (
          <div key={envelopeDetail.id}>
            <div className="envelope-details-text">
              <h3 className="envelope-details-title">{envelopeDetail.title}</h3>
              <span>{envelopeDetail.budget}</span>
            </div>
          </div>
        ))}
      </div>
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
