import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addEnvelope.css";

const AddEnvelope = () => {
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/v1/api/envelopes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          budget: budget,
        }),
      });
      const resJson = await response.json();
      if (response.status === 201) {
        setTitle("");
        setBudget("");
      }
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };

  return (
    <>
      <button className="btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="new-envelope-container">
        <form onSubmit={handleSubmit} className="new-envelope">
          <input
            className="new-envelope-title"
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="new-envelope-budget"
            type="text"
            value={budget}
            placeholder="Budget"
            onChange={(e) => setBudget(e.target.value)}
          />
          <button className="submit-new-envelope" type="submit">Create</button>
        </form>
      </div>
    </>
  );
};

export default AddEnvelope;
