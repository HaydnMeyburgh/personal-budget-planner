import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav>
        <div className="nav-items">
          <div className="logo">
            <a href="/">
              <h1>Budget Planner</h1>
            </a>
          </div>
          <div className="docs">
            <p>
              View the API{" "}
              <a href="http://localhost:3000/api/docs" target="_blank">
                Documentation
              </a>
            </p>
          </div>
          <ul>
            <li>
              <NavLink to="/">Envelopes</NavLink>
            </li>
            <li>
              <NavLink to="/transactions">Transactions</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
