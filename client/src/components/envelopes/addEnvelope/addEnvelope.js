import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEnvelope = () => {
  const [newEnvelope, setNewEnvelope] = useState({ title: "", budget: "" });
  const navigate = useNavigate();
  const addNewEnvelope = () => {
    fetch("http://localhost:3000/api/envelopes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEnvelope)
    });
  };
  return (
    <div className="container">
      <button className="btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <form>
        <input label="Title" value={title}></input>
        <input label="budget"></input>
        <button onClick={addNewEnvelope}>Submit</button>
      </form>
    </div>
  );
};

export default AddEnvelope;
