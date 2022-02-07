import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import { makeUser } from "./function";
import { authService, githubProvider } from "./fbase";

function GithubSignin() {
  const onGithubClick = async (event) => {
    await authService.signInWithPopup(githubProvider);
    const User = authService.currentUser;
    // 깃허브는 user email 안줌
    const { multiFactor } = User;
    const { user } = multiFactor;
    const { uid } = user;
    const userData = uid;

    await axios
      .post("/social-login", { userId: userData, userType: 2 })
      .then((res) => {
        makeUser(userData, res.data.userNickname);
        sessionStorage.setItem("userNickname", res.data.userNickname);
        sessionStorage.setItem("accessToken", res.data.accessToken);
        sessionStorage.setItem("email", userData);
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <i className="fab fa-github" onClick={onGithubClick} aria-hidden="true" />
  );
}
export default GithubSignin;
