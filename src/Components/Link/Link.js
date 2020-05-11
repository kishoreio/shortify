import React, { useState } from "react";
import { InputGroup, Input } from "reactstrap";
import LinkButton from "./LinkButton";
import axios from "axios";
import "./link.css";

const Link = () => {
  const [link, setLink] = useState("");
  const [copyButton, setCopyButton] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const inputOnChange = (e) => {
    setLink(e.target.value);
  };
  const onInputSubmit = () => {
    axios
      .post("http://localhost:8080", {
        link
      })
      .then((res) => {
        setLink(res.data);
        setCopyButton(true);
        setSuccessMessage(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clipBoardCopy = () => {
    navigator.clipboard.writeText(link);
  };
  return (
    <div id="link-container">
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
            <LinkButton text="Copy Link" handleFunction={clipBoardCopy} />
          ) : (
            ""
          )}
          <LinkButton text="Submit" handleFunction={onInputSubmit} />
        </InputGroup>
        <div id="message">
          {successMessage
            ? "Short Link Generated. Copy and Paste in Address Bar"
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Link;
