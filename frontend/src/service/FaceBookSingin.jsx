import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { authService, facebookProvider } from "./fbase";
import { makeUser } from "./function";

function FacebookSignin() {
  const navigate = useNavigate();
  const pattern = /[.#/$]/;
  const regexAllCase = new RegExp(pattern, "gi");
  const onFacebookClick = async (event) => {
    await authService.signInWithPopup(facebookProvider);
    const user = authService.currentUser;
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
