import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { authService, githubProvider } from "./fbase";

function GithubSignin() {
  const navigate = useNavigate();
  const onGithubClick = async (event) => {
    await authService.signInWithPopup(githubProvider);
    const User = authService.currentUser;
    // 깃허브는 user email 안줌
    const { multiFactor } = User;
    const { user } = multiFactor;
    const { uid } = user;
    const userData = uid;
    axios
      .post("/social-login", { userId: userData, userType: 2 })
      .then((res) => {
        sessionStorage.setItem("userNickname", res.data.userNickname);
        sessionStorage.setItem("accessToken", res.data.accessToken);
        window.location.reload();
        navigate("/");
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
