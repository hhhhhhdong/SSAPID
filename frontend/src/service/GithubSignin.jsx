import React from "react";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";
import { authService, githubProvider } from "./fbase";
import style from "../styles/Loginform.module.scss";

function GithubSignin() {
  const navigate = useNavigate();
  const onGithubClick = async (event) => {
    const data = await authService.signInWithPopup(githubProvider);
    const user = authService.currentUser;
    console.log(user.displayName, user.email);
    navigate("/");
  };

  return (
    <i className="fab fa-github" onClick={onGithubClick} aria-hidden="true" />
  );
}
export default GithubSignin;
