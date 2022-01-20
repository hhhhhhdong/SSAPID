import React from "react";
import LoginPageForm from "../components/LoginPageForm";

function LoginPage() {
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
export default LoginPage;
