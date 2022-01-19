import React, { useState } from "react";
import PassWordFindForm from "../components/PasswordFindForm";

function PasswordFindPage() {
  const onSubmit = (form: { id: string }) => {
    // api 통신 로직
    if (form.id === "") {
      alert("이메일을 입력해주세요");
    }
    console.log(form);
  };
  return (
    <div>
      <PassWordFindForm onSubmit={onSubmit} />
    </div>
  );
}

export default PasswordFindPage;
