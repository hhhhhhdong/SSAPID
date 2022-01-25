import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { nickString } from "redux/actions";
import { nickStore } from "../redux/store";
import { authService, facebookProvider } from "./fbase";

function FacebookSignin() {
  const navigate = useNavigate();
  const onFacebookClick = async (event) => {
    await authService.signInWithPopup(facebookProvider);
    const user = authService.currentUser;
    axios
      .post("/social-login", { userId: user.email, userType: 2 })
      .then((res) => {
        nickStore.dispatch({ type: nickString, text: res.userNickName });
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
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
