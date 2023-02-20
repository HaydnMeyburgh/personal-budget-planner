import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Envelopes = () => {
  const [envelopes, setEnvelopes] = useState([]);
  // const navigate = useNavigate();
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
            <div className="envelope-text">
              <h3 className="envelope-title">{envelope.title}</h3>
              <span>{envelope.budget}</span>
            </div>
            <Link to={`/envelopes/${envelope.id}`}>
              <div className="btn">View Envelope</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Envelopes;
