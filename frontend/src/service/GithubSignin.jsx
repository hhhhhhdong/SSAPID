import React from "react";
import { useNavigate } from "react-router-dom";
import { makeUser } from "./function";
import axios from "../api/axios";
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
    await axios
      .post("/social-login", {
        userId: userData,
        userType: 2,
        loginType: "github",
      })
      .then((res) => {
        makeUser(userData, res.data.userNickname, uid);
        sessionStorage.setItem("userNickname", res.data.userNickname);
        sessionStorage.setItem("accessToken", res.data.accessToken);
        sessionStorage.setItem("email", userData);
        sessionStorage.setItem("uid", uid);
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
