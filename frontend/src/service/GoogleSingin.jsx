import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { makeUser } from "./function";
import { authService, googleProvider } from "./fbase";

function GoogleSignin() {
  const navigate = useNavigate();
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
        window.location.reload();
        navigate("/");
      })
      .catch((error) => {
        console.log("에러", error);
      });
  };

  makeUser(
    sessionStorage.getItem("email"),
    sessionStorage.getItem("userNickname")
  );

  return (
    <i className="fab fa-google" onClick={onGoogleClick} aria-hidden="true" />
  );
}
export default GoogleSignin;
