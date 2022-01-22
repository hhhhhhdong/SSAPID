import React from "react";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";
import { authService, githubProvider } from "./fbase";

function GithubSignin() {
  const navigate = useNavigate();
  const onGoogleClick = async (event) => {
    const data = await authService.signInWithPopup(githubProvider);
    navigate("/");
  };

  return (
    <div>
      <Button handleClick={onGoogleClick} text="github" />;
    </div>
  );
}
export default GithubSignin;
