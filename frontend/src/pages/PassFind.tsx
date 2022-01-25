import React from "react";
import PassFindForm from "../components/PassFindForm";
import style from "../styles/globalPage.module.scss";

function PasswordFind() {
  return (
    <div className={style.page}>
      <PassFindForm />
    </div>
  );
}

export default PasswordFind;
