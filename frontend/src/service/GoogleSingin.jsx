import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authService, googleProvider } from "./fbase";

function GoogleSignin() {
  const navigate = useNavigate();
  const onGoogleClick = async (event) => {
    await authService.signInWithPopup(googleProvider);
    const user = authService.currentUser;
    axios
      .post("/social-login", { userId: user.email, userType: 2 })
      .then((res) => {
        sessionStorage.setItem("userNickname", res.data.userNickname);
      })
      .catch((error) => {
        console.log("에러", error);
      });

    navigate("/");
  };

  return (
    <i className="fab fa-google" onClick={onGoogleClick} aria-hidden="true" />
  );
}
export default GoogleSignin;
