import React, { useContext } from "react";
import clicks from "../../../Resources/click.png";
import brokenLink from "../../../Resources/broken-link.png";
import chat from "../../../Resources/chat.png";
import { DashboardContext } from "../DashBoard";
import "./analysis.css";

const Analysis = () => {
  const { userData } = useContext(DashboardContext);
  const totalClick = userData.reduce((accumulator, element) => {
    return accumulator + element.click;
  }, 0);
  const totalLink = userData.length;
  return (
    <div id="analysis-container">
      <div id="analysis-left">
        <div className="analysis-tab tab1">
          <div id="analysis-content">
            <div className="analysis-text">
              <p>Total Clicks</p>
              <p className="mobile-res">{totalClick}</p>
            </div>
            <div className="analysis-icon">
              <img src={clicks} alt="clicks" />
            </div>
          </div>
        </div>
        <div className="analysis-tab tab2">
          <div id="analysis-content">
            <div className="analysis-text">
              <p>Total Links</p>
              <p className="mobile-res">{totalLink}</p>
            </div>
            <div className="analysis-icon">
              <img src={brokenLink} alt="clicks" />
            </div>
          </div>
        </div>
        <div className="analysis-tab tab3">
          <div id="analysis-content">
            <div className="analysis-text">
              <p>Need Help?</p>
              <p className="mobile-res">kishore.S</p>
            </div>
            <div className="analysis-icon">
              <img src={chat} alt="clicks" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Analysis;
