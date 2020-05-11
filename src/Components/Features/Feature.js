import React from "react";
import "./feature.css";
import easy from "../../Resources/easy.png";
import unlimited from "../../Resources/infinity.png";
import link from "../../Resources/link.png";
import ssl from "../../Resources/ssl.png";
import dashboard from "../../Resources/dashboard.png";
import analytics from "../../Resources/statistics.png";

const Feature = () => {
  return (
    <div id="feature-container">
      <div className="feature-list">
        <div className="feature-box">
          <img src={easy} alt="easy" className="feature-image" />
          <h3 className="feature-text">Easy To Use</h3>
          <p className="feature-para">
            Very easy to generate the shorten version of any url.
          </p>
        </div>
        <div className="feature-box">
          <img src={link} alt="link" className="feature-image" />
          <h3 className="feature-text">Shorten url</h3>
          <p className="feature-para">
            Shorten url means easy to share away across multiple social media
          </p>
        </div>
        <div className="feature-box">
          <img src={unlimited} alt="umlimited" className="feature-image" />
          <h3 className="feature-text">Unlimited url's</h3>
          <p className="feature-para">
            Yes! it's unlimited and free to have generate multiple url's.
          </p>
        </div>
      </div>
      <div className="feature-list">
        <div className="feature-box">
          <img src={analytics} alt="analytics" className="feature-image" />
          <h3 className="feature-text">Click Analytics</h3>
          <p className="feature-para">
            Analyze the total no.of.click for the link.
          </p>
        </div>
        <div className="feature-box">
          <img src={dashboard} alt="dashboard" className="feature-image" />
          <h3 className="feature-text">Free DashBoard</h3>
          <p className="feature-para">
            A dashboard to manage all your url's in one place.
          </p>
        </div>
        <div className="feature-box">
          <img src={ssl} alt="ssl" className="feature-image" />
          <h3 className="feature-text">Safe to use</h3>
          <p className="feature-para">
            We use SSL certificate to encrypt the user links and data.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Feature;
