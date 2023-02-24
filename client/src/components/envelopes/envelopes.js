import React from "react";
import "./envelopes.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Envelopes = () => {
  const [envelopes, setEnvelopes] = useState([]);
  useEffect(() => {
    const fetchEnvelopes = async () => {
      const response = await fetch("http://localhost:3000/api/envelopes");
      const envelopeData = await response.json();
      setEnvelopes(envelopeData.data);
    };
    fetchEnvelopes();
  }, []);
  return (
    <div className="container">
      <div className="envelopes-container">
        {envelopes.map((envelope) => (
          <div key={envelope.id} className="envelope-card">
            <Link to={`/envelopes/${envelope.id}`}>
              <div className="envelope-text">
                <h3 className="envelope-title">{envelope.title}</h3>
                <hr></hr>
                <span>Budget: {envelope.budget}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Envelopes;
