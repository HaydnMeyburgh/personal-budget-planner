import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EnvelopeDetails = () => {
  const [envelopeDetails, setEnvelopeDetails] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchEnvelopeDetails = async () => {
      const response = await fetch(`http://localhost:3000/api/envelopes/${id}`);
      const envelopeDetailsData = await response.json();
      setEnvelopeDetails(envelopeDetailsData.data);
    };
    fetchEnvelopeDetails();
  }, [id]);

  return (
    <div className="container">
      <button className="btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="envelope-details-container">
        {envelopeDetails.map((envelopeDetail) => (
          <div key={envelopeDetail.id}>
            <div className="envelope-text">
              <h3 className="envelope-title">{envelopeDetail.title}</h3>
              <span>{envelopeDetail.budget}</span>
            </div>
          </div>
        ))}
        {/* Need to add in the transactions here related to the envelope */}
      </div>
    </div>
  );
};

export default EnvelopeDetails;
