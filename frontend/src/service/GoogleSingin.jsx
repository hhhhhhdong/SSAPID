import React from "react";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";
import { authService, googleProvider } from "./fbase";

function GoogleSignin() {
  const navigate = useNavigate();
  const onGoogleClick = async (event) => {
    const data = await authService.signInWithPopup(googleProvider);
    navigate("/");
  };

  return (
    <div>
      <Button handleClick={onGoogleClick} text="구글" />;
    </div>
  );
}
export default GoogleSignin;
