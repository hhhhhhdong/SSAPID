import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authService, facebookProvider } from "./fbase";
import { makeUser } from "./function";

function FacebookSignin() {
  const navigate = useNavigate();
  const onFacebookClick = async (event) => {
    await authService.signInWithPopup(facebookProvider);
    const user = authService.currentUser;
    await axios
      .post("/social-login", { userId: user.email, userType: 2 })
      .then((res) => {
        sessionStorage.setItem("userNickname", res.data.userNickname);
        sessionStorage.setItem("accessToken", res.data.accessToken);
        sessionStorage.setItem("email", user.email);
        window.location.reload();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  makeUser(
    sessionStorage.getItem("email"),
    sessionStorage.getItem("userNickname")
  );
  return (
    <i
      className="fab fa-facebook"
      onClick={onFacebookClick}
      aria-hidden="true"
    />
  );
}
export default FacebookSignin;
