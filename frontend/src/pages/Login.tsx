import React from "react";
import LoginPageForm from "../components/LoginForm";

function Login() {
  const onSubmit = (form: { userId: string; userPw: string }) => {
    // // api 통신 로직
    console.log(form);
  };
  return (
    <div>
      <LoginPageForm onSubmit={onSubmit} />
    </div>
  );
}
export default Login;
