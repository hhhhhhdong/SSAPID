import React from "react";
import axios from "../api/axios";
import { makeUser } from "./function";
import { authService, googleProvider } from "./fbase";

function GoogleSignin() {
  const onGoogleClick = async (event) => {
    await authService.signInWithPopup(googleProvider);
    const user = authService.currentUser;

    await axios
      .post("/social-login", { userId: user.email, userType: 2 })
      .then((res) => {
        makeUser(user.email, res.data.userNickname);
        sessionStorage.setItem("userNickname", res.data.userNickname);
        sessionStorage.setItem("accessToken", res.data.accessToken);
        sessionStorage.setItem("email", user.email);
        window.location.replace("/");
      })
      .catch((error) => {
        console.log("에러", error);
      });
  };

  return (
    <i className="fab fa-google" onClick={onGoogleClick} aria-hidden="true" />
  );
}
export default GoogleSignin;
