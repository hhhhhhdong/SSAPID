import React from "react";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";
import { authService, googleProvider } from "./fbase";

function GoogleSignin() {
  const navigate = useNavigate();
  const onGoogleClick = async (event) => {
    const data = await authService.signInWithPopup(googleProvider);
    const user = authService.currentUser;
    console.log(user.displayName, user.email);

    navigate("/");
  };

  return (
    <i className="fab fa-google" onClick={onGoogleClick} aria-hidden="true" />
  );
}
export default GoogleSignin;
