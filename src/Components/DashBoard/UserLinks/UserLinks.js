import React, { useContext } from "react";
import SingleUserLink from "./SingleUserLink";
import { DashboardContext } from "../DashBoard";
import "./user-links.css";

const UserLinks = () => {
  const { userData } = useContext(DashboardContext);
  const userArr = userData.map((element, index) => {
    return <SingleUserLink obj={element} key={index} />;
  });
  return <div id="user-link-container">{userArr}</div>;
};
export default UserLinks;
