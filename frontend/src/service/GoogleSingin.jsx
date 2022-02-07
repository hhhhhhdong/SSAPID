import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { makeUser } from "./function";
import { authService, googleProvider } from "./fbase";

function GoogleSignin() {
  const navigate = useNavigate();
  const onGoogleClick = async (event) => {
    await authService.signInWithPopup(googleProvider);
    const user = authService.currentUser;
    const pattern = /[.#/$]/;
    const regexAllCase = new RegExp(pattern, "gi");
    await axios
      .post("/social-login", { userId: user.email, userType: 2 })
      .then((res) => {
        const token = res.data.accessToken.replace(regexAllCase, "");
        makeUser(user.email, res.data.userNickname, token);
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

  return (
    <i className="fab fa-google" onClick={onGoogleClick} aria-hidden="true" />
  );
}
export default GoogleSignin;
