import React, { useState } from "react";
import ReactDOM from "react-dom";

function LoginPageForm() {
  return (
    <form>
      <h1>로그인</h1>
      <input placeholder="email" type="text" required />
      <br />
      <input placeholder="password" type="text" required />
      <br />
      <a href="./LoginPageForm.tsx">아이디 찾기|</a>
      <a href="./LoginPageForm.tsx">비밀번호 찾기|</a>
      <a href="./LoginPageForm.tsx">회원가입</a>
      <br />
      <button type="button">submit</button>
      <br />
      ------------또는-------------
      <br />
    </form>
  );
}

export default LoginPageForm;
