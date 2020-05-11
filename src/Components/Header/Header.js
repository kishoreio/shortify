import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import user from "../../Resources/user.png";

const Header = ({ isLoggedIn, onLogout, name }) => {
  return (
    <div id="header-container">
      <div id="logo">
        <Link to="/">
          <h3>Shortify</h3>
        </Link>
      </div>
      {isLoggedIn ? (
        <div id="dashboard-tab">
          <div id="dashboard-contents">
            <div id="dashboard-one">
              <img src={user} alt="user" id="dashboard-img" />
              <p>Hi {name}</p>
            </div>
            <div id="dashboard-two">
              <Link to="/dashboard" className="text-cred">
                Dashboard
              </Link>
              <Link to="/" className="text-cred" onClick={onLogout}>
                logout
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div id="login-logout">
          <Link to="/login">
            <p className="header-text" id="login">
              Login
            </p>
          </Link>
          <Link to="/register">
            <p className="header-text sign-text">SignUp</p>
          </Link>{" "}
        </div>
      )}
    </div>
  );
};
export default Header;
