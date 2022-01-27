import React from "react";
import AuthFindForm from "components/AuthFindForm";
import VideoBackground from "components/layout/VideoBackground";
import FormHeader from "components/layout/FormHeader";

function AuthNum() {
  return (
    <VideoBackground>
      <FormHeader text="Auth" />
      <AuthFindForm />
    </VideoBackground>
  );
}

export default AuthNum;
