import React, { useState } from "react";
import register from "../../Resources/register.png";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (String(password) === String(confirmPassword)) {
      axios
        .post("https://short-fy.herokuapp.com/auth/register", {
          name,
          email,
          password,
        })
        .then((result) => {
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Password is not same. Please check your password");
    }
  };
  return (
    <div id="register-container">
      <div id="register-image">
        <img src={register} alt="login" />
      </div>
      <div id="register-form">
        <h1 id="register-text">Register</h1>
        <form onSubmit={onFormSubmit}>
          <label htmlFor="name" className="form-elements">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter Your Name"
            name="name"
            className="form-elements"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="emailId" className="form-elements">
            E-Mail
          </label>
          <input
            type="text"
            placeholder="Enter the E-mail"
            name="emailId"
            className="form-elements"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="form-elements">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter the password"
            name="password"
            className="form-elements"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword" className="form-elements">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your Password"
            name="confirmPassword"
            className="form-elements"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="form-elements">
            Register
          </button>
          {success ? (
            <p id="success-text">Registered Successfully. Please login</p>
          ) : null}
        </form>
      </div>
    </div>
  );
};
export default Register;
