import React from "react";
import { Link } from "react-router-dom";

const navbar = () => {
  return (
    <div>
      <li>
        <Link to="/">Envelopes</Link>
      </li>
      <li>
        <Link to="/transactions">Transactions</Link>
      </li>
    </div>
  );
};

export default navbar;
