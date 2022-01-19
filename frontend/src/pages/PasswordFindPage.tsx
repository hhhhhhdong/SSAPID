import React, { useState } from "react";
import PasswordFindForm from "../components/PasswordFindForm";
import style from "../styles/FindPage.module.scss";

function PasswordFindPage() {
  const onSubmit = (form: { id: string }) => {
    // api 통신 로직
    if (form.id === "") {
      alert("이메일을 입력해주세요");
    }
    console.log(form);
  };
  return (
    <div className={style.page}>
      <PasswordFindForm onSubmit={onSubmit} />
    </div>
  );
}

export default PasswordFindPage;
