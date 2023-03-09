import React from "react";
import "./transactions.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
      const transactionsFetch = async () => {
        const response = await fetch("http://localhost:3000/api/transactions");
        const transactionData = await response.json();
        if (response.status === 200)
        setTransactions(transactionData.data);
      };
    transactionsFetch();
  }, []);
  
  return (
    <>
      <div className="container">
        <div className="transactions-container">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              <Link to={`/transactions/${transaction.id}`}>
                <div className="transaction-text">
                  <p className="recipient">Recipient: {transaction.recipient}</p>
                  <p className="amount" >Amount: {transaction.amount}</p>
                  <p className="date" >Date: {transaction.date}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Transactions;
