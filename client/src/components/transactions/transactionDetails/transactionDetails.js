import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./transactionDetails.css";

const TransactionDetails = () => {
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [tempTransaction, setTempTransaction] = useState([]);
  const [changed, setChanged] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      const response = await fetch(
        `http://localhost:3000/api/transactions/${id}`
      );
      const transactionDetailsData = await response.json();
      setTransactionDetails(transactionDetailsData.data);
      setTempTransaction(transactionDetailsData.data);
    };

    fetchTransactionDetails();
  }, []);

  const updateTransaction = async () => {
    const response = await fetch(
      `http://localhost:3000/api/transactions/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempTransaction),
      }
    );
    await response.json();
    setTransactionDetails(tempTransaction);
    setChanged(false);
    navigate("/transactions");
  };

  return (
    <>
      <button className="btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="details-container">
        <div className="transaction-details-container">
          <div key={tempTransaction.id}>
            <input
              className="transaction-details-recipient"
              type="text"
              value={tempTransaction.recipient}
              onChange={(e) => {
                setChanged(true);
                setTempTransaction({
                  ...tempTransaction,
                  recipient: e.target.value,
                });
              }}
            />
            <input
              className="transaction-details-amount"
              type="text"
              value={tempTransaction.amount}
              onChange={(e) => {
                setChanged(true);
                setTempTransaction({
                  ...tempTransaction,
                  amount: e.target.value,
                });
              }}
            />
            <input
              className="transaction-details-date"
              type="date"
              value={tempTransaction.date}
              onChange={(e) => {
                setChanged(true);
                setTempTransaction({
                  ...tempTransaction,
                  date: e.target.value,
                });
              }}
            />
          </div>
          {changed ? (
            <div className="changed-buttons">
              <button
                className="cancel-button"
                onClick={(e) => {
                  setTempTransaction({ ...transactionDetails });
                  setChanged(false);
                }}
              >
                Cancel
              </button>{" "}
              <button className="save-button" onClick={updateTransaction}>
                Save
              </button>
            </div>
          ) : null}
        </div>
        <button
          className="delete-button"
          onClick={(e) => {
            fetch(`http://localhost:3000/api/transactions/${id}`, {
              method: "DELETE",
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Something went wrong");
                }
                navigate("/transactions");
              })
              .catch(() => {
                console.log(e);
              });
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default TransactionDetails;
