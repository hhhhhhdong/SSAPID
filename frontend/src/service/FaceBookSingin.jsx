import React from "react";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";
import { authService, googleProvider } from "./fbase";

function FacebookSignin() {
  const navigate = useNavigate();
  const onGoogleClick = async (event) => {
    const data = await authService.signInWithPopup(googleProvider);
    navigate("/");
  };

  return (
    <div>
      <Button handleClick={onGoogleClick} text="페이스북" />;
    </div>
  );
}
export default FacebookSignin;
