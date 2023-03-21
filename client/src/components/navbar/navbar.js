import React from "react";
import { NavLink } from "react-router-dom";
import SwaggreUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "./navBar.css";

const NavBar = () => {
  return (
    <div>
      <nav>
        <div className="docs">
          <p>
            API <a href={<SwaggreUI url="/api/docs/" />}>Documentation</a>
          </p>
        </div>
        <div className="header-contents">
          <div className="logo">
            <a href="/">
              <h1>Budget Planner</h1>
            </a>
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
        </div>
        <p className="explanation">
          The all in one budget planner that lets you create budget envelopes to
          track your spending, transfer budgets between envelopes, and create
          transactions when you spend money!
        </p>
      </nav>
    </div>
  );
};

export default NavBar;
