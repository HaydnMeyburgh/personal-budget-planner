import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEnvelope = () => {
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/envelopes/", {
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
    <div className="container">
      <button className="btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={budget}
          placeholder="Budget"
          onChange={(e) => setBudget(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddEnvelope;
