import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { authService, githubProvider } from "./fbase";

function GithubSignin() {
  const navigate = useNavigate();
  const onGithubClick = async (event) => {
    await authService.signInWithPopup(githubProvider);
    const user = authService.currentUser;
    // 깃허브는 user email 안줌
    axios
      .post("/social-login", { userId: user.email, userType: 2 })
      .then((res) => {
        sessionStorage.setItem("userNickname", res.data.userNickname);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  return (
    <i className="fab fa-github" onClick={onGithubClick} aria-hidden="true" />
  );
}
export default GithubSignin;
