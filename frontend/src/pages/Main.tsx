import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

function Main() {
  const buttonType = "button";
  const url = "/";
  const [isLoading, setBool] = useState(false);
  const navigate = useNavigate();
  const handle = () => {
    setBool(false);
    navigate(url);
  };
  return (
    <div>
      <Button
        buttonType={buttonType}
        text="Home"
        handleClick={handle}
        Disabled={isLoading}
      />
    </div>
  );
}

export default Main;
