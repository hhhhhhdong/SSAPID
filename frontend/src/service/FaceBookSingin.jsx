import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { authService, facebookProvider } from "./fbase";
import { makeUser } from "./function";

function FacebookSignin() {
  const onFacebookClick = async (event) => {
    await authService.signInWithPopup(facebookProvider);
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
        console.error(error);
      });
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
