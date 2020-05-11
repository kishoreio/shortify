import React from "react";
import { InputGroupAddon, Button } from "reactstrap";

const LinkButton = ({ text, handleFunction }) => {
  return (
    <div>
      <InputGroupAddon addonType="append" onClick={handleFunction}>
        <Button color="dark">{text}</Button>
      </InputGroupAddon>
    </div>
  );
};

export default LinkButton;
