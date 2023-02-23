import React from "react";
import { NavLink } from "react-router-dom";
import "./navBar.css";

const NavBar = () => {
  return (
    <div>
      <nav>
        <div className="header-contents">
          <div className="docs">
            <p>
              API{" "}
              <a href="http://localhost:3000/api/docs" target="_blank">
                Documentation
              </a>
            </p>
          </div>
          <div className="logo">
            <a href="/">
              <h1>Budget Planner</h1>
            </a>
          </div>
        </div>
        <div className="nav-container">
          <ul>
            <li>
              <NavLink
                className="link"
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "#6495ed",
                  background: isActive ? "#6495ed" : "#f0f0f0",
                })}
              >
                Envelopes
              </NavLink>
            </li>
            <li>
              <NavLink
                className="link"
                to="/transactions"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "#6495ed",
                  background: isActive ? "#6495ed" : "#f0f0f0",
                })}
              >
                Transactions
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
