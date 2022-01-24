import React from "react";
import { useNavigate } from "react-router-dom";
import { authService, facebookProvider } from "./fbase";

function FacebookSignin() {
  const navigate = useNavigate();
  const onFacebookClick = async (event) => {
    const data = await authService.signInWithPopup(facebookProvider);
    const user = authService.currentUser;
    console.log(user.email, user.displayName);
    navigate("/");
  };

  return (
    <i
      className="fab fa-facebook"
      onClick={onFacebookClick}
      aria-hidden="true"
    />
  );
}
export default FacebookSignin;
