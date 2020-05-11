import React, { useState } from "react";
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import axios from "axios";
import "./dashboardlink.css";

const DashBoardLink = ({ updateAddUserLink }) => {
  const [link, setLink] = useState("");
  const [copyButton, setCopyButton] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const inputOnChange = (e) => {
    setLink(e.target.value);
  };
  const onInputSubmit = () => {
    let date = new Date().toDateString();
    let authenticateUser = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8080/api/add/links",
        {
          link,
          date
        },
        {
          headers: {
            Authorization: authenticateUser
          }
        }
      )
      .then((res) => {
        setLink(res.data.shortUrl);
        setCopyButton(true);
        setSuccessMessage(true);
        updateAddUserLink(res.data.result.links);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clipBoardCopy = () => {
    navigator.clipboard.writeText(link);
  };
  return (
    <div id="dashboard-link-container">
      <div id="link-tab">
        <InputGroup>
          <Input
            placeholder="Enter the long url"
            onChange={(e) => {
              inputOnChange(e);
            }}
            value={link}
          />
          {copyButton === true ? (
            <InputGroupAddon addonType="append" onClick={clipBoardCopy}>
              <Button color="dark">Copy</Button>
            </InputGroupAddon>
          ) : (
            ""
          )}
          <InputGroupAddon addonType="append" onClick={onInputSubmit}>
            <Button color="dark">Submit</Button>
          </InputGroupAddon>
        </InputGroup>
        <div id="message">{successMessage ? "Added to clipboard" : ""}</div>
      </div>
    </div>
  );
};

export default DashBoardLink;
