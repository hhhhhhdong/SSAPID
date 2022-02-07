import React from "react";
import ChangePWForm from "components/UserEdit/ChangePWForm";
import FormHeader from "components/layout/FormHeader";

function ChangePW() {
  return (
    <div>
      <FormHeader text="Change PW" />
      <ChangePWForm />
    </div>
  );
}

export default ChangePW;
