import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div id="footer-container">
      <div id="footer-text">
        <h3 id="footer-logo">Shortify</h3>
        <p id="footer-author">
          Made with{" "}
          <span role="img" aria-label="emoji">
            ❤️
          </span>{" "}
          by <a href="https://kishore.io">kishore.io</a>
        </p>
      </div>
      <div></div>
    </div>
  );
};
export default Footer;
