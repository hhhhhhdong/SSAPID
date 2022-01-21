import React from "react";
import VideoBackground from "components/layout/VideoBackground";
import FormHeader from "components/layout/FormHeader";
import IdFindForm from "../components/IdFindForm";
import style from "../styles/globalPage.module.scss";
// 아이디 찾기 이름이랑 전화번호
function IdFindPage() {
  const onSubmit = (form: { userName: string; userPhone: string }) => {
    // api 통신 로직
    console.log(form);
  };

  return (
    <VideoBackground>
      <div className={style.page}>
        <FormHeader text="Find ID" />
        <IdFindForm onSubmit={onSubmit} />
      </div>
    </VideoBackground>
  );
}

export default IdFindPage;
