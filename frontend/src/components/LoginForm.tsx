import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Button from "./common/Button";
import Input from "./common/Input";

function LoginForm() {
  // const buttonType = "submit";
  // const url = ["/"];
  // const [isLoad, setLoad] = useState(false);
  // console.log(id);
  // console.log(pw);

  return (
    <div>
      <h1>로그인</h1>
      {/* <Input
      > */}
      <input placeholder="email" type="text" required />
      <br />
      <input placeholder="password" type="text" required />
      <br />
      <a href="./LoginPageForm">아이디 찾기|</a>
      <a href="./LoginPageForm">비밀번호 찾기|</a>
      <a href="./LoginPageForm">회원가입</a>
      <br />
      {/* <Button
        buttonType={buttonType}
        text="submit"
        handleClick={handle}
        Disabled={isLoad}
        url={url}
      /> */}
      <button type="button">submit</button>
      <br />
      ------------또는-------------
      <br />
    </div>
  );
}

export default LoginForm;
