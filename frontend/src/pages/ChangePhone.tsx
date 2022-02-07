import React from "react";
import FormHeader from "components/layout/FormHeader";
import ChangePhoneForm from "components/UserEdit/ChangePhoneForm";

function ChangePhone() {
  return (
    <div>
      <FormHeader text="Change PW" />
      <ChangePhoneForm />
    </div>
  );
}

export default ChangePhone;
