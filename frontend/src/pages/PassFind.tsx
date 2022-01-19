import React, { useState } from "react";
import PassFindForm from "../components/PassFindForm";
import style from "../styles/FindPage.module.scss";

function PasswordFind() {
  const onSubmit = (form: { id: string }) => {
    // api 통신 로직
    if (form.id === "") {
      alert("이메일을 입력해주세요");
    }
    console.log(form);
  };
  return (
    <div className={style.page}>
      <PassFindForm onSubmit={onSubmit} />
    </div>
  );
}

export default PasswordFind;
