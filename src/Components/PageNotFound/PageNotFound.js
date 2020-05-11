import React from "react";
import "./pagenotfound.css";

const PageNotFound = () => {
  return (
    <div id="page-not-container">
      <div id="not-mobile">
        <h1 className="error">404</h1>
        <p className="error-text">Page Not Found</p>
      </div>
    </div>
  );
};
export default PageNotFound;
