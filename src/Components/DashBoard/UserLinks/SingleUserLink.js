import React, { Fragment, useContext } from "react";
import { DashboardContext } from "../DashBoard";

const SingleUserLink = ({ obj }) => {
  const { deleteUserLink } = useContext(DashboardContext);
  const deleteLink = (id) => {
    deleteUserLink(id);
  };
  return (
    <Fragment>
      <div id="user-link-tab">
        <div id="user-link-top">
          <p className="cred">CREATED AT {obj.date}</p>
          <p className="cred">|</p>
          <p className="cred">Click: {obj.click}</p>
        </div>
        <div id="user-link-middle">
          <p>{obj.longUrl}</p>
        </div>
        <div id="user-link-bottom">
          <p className="user-link-shortUrl">{obj.shortUrl}</p>
          <button
            className="user-link-btn"
            onClick={() => navigator.clipboard.writeText(obj.shortUrl)}
          >
            Copy
          </button>
          <button
            className="user-link-btn"
            onClick={() => deleteLink(obj.shortUrl)}
          >
            Delete
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default SingleUserLink;
