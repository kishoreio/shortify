import React, { useEffect, useState } from "react";
import Analysis from "./Analysis/Analysis";
import UserLinks from "./UserLinks/UserLinks";
import axios from "axios";
import "./dashboard.css";
import DashBoardLink from "./DashBoardLink/DashBoardLink";
import { Redirect } from "react-router-dom";

export const DashboardContext = React.createContext();
const DashBoard = ({ isLoggedIn }) => {
  const [userData, setUserData] = useState([]);
  let authenticateUser = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/links", {
        headers: {
          Authorization: authenticateUser
        }
      })
      .then((result) => {
        setUserData(result.data.links);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authenticateUser]);

  const deleteUserLink = (id) => {
    console.log("called");
    axios
      .post(
        "http://localhost:8080/api/delete/links",
        {
          urlLinkId: id
        },
        {
          headers: {
            Authorization: authenticateUser
          }
        }
      )
      .then((result) => {
        setUserData(result.data.links);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateAddUserLink = (data) => {
    setUserData(data);
  };
  console.log(userData);
  return (
    <div id="dashboard-container">
      {isLoggedIn ? (
        <DashboardContext.Provider value={{ userData, deleteUserLink }}>
          <Analysis />
          <div id="link-tab-section">
            <DashBoardLink updateAddUserLink={updateAddUserLink} />
            <UserLinks />
          </div>
        </DashboardContext.Provider>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default DashBoard;
