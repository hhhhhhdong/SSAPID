import PassChangeForm from "components/UserFind/PassChangeForm";
import VideoBackground from "components/layout/VideoBackground";
import FormHeader from "components/layout/FormHeader";
import React from "react";

function PassChange() {
  return (
    <VideoBackground>
      <FormHeader text="Change Pw" />
      <PassChangeForm />
    </VideoBackground>
  );
}

export default PassChange;
