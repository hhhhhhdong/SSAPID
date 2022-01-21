import React from "react";
import VideoBackground from "components/layout/VideoBackground";
import LoginPageForm from "../components/LoginForm";

function Login() {
  const onSubmit = (form: { userId: string; userPw: string }) => {
    // // api 통신 로직
    console.log(form);
  };
  return (
    <div>
      <VideoBackground>
        <LoginPageForm onSubmit={onSubmit} />
      </VideoBackground>
    </div>
  );
}
export default Login;
