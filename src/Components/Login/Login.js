import React, { useState } from "react";
import axios from "axios";
import login from "../../Resources/login.png";
import "./login.css";

const Login = ({ changeIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/auth/login", {
        email,
        password
      })
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        changeIsLoggedIn(result.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div id="login-container">
      <div id="login-image">
        <img src={login} alt="login" />
      </div>
      <div id="login-form">
        <h1 id="login-text">Login In</h1>
        <form onSubmit={onFormSubmit}>
          <label htmlFor="emailId" className="input-form-elements">
            E-Mail
          </label>
          <input
            type="text"
            placeholder="Enter the E-mail"
            name="emailId"
            className="input-form-elements"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="input-form-elements">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter the password"
            name="password"
            className="input-form-elements"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="input-form-elements">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
