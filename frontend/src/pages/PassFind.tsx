import React from "react";
import VideoBackground from "components/layout/VideoBackground";
import FormHeader from "components/layout/FormHeader";
import PassFindForm from "components/PassFindForm";

function PasswordFind() {
  return (
    <VideoBackground>
      <FormHeader text="Find Pw" />
      <PassFindForm />
    </VideoBackground>
  );
}

export default PasswordFind;
