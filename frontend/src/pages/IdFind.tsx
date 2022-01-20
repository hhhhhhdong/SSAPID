import React from "react";
import IdFindForm from "../components/IdFindForm";
import style from "../styles/globalPage.module.scss";
// 아이디 찾기 이름이랑 전화번호
function IdFindPage() {
  const onSubmit = (form: { name: string; phone: string }) => {
    // api 통신 로직
    console.log(form);
  };

  return (
    <div className={style.page}>
      <IdFindForm onSubmit={onSubmit} />
    </div>
  );
}

export default IdFindPage;
