import React from "react";
import VideoBackground from "components/layout/VideoBackground";
import FormHeader from "components/layout/FormHeader";
import IdFindForm from "../components/UserFind/IdFindForm";
// 아이디 찾기 이름이랑 전화번호
function IdFindPage() {
  const onSubmit = (form: { userName: string; userPhone: string }) => {
    // api 통신 로직
    console.log(form);
  };

  return (
    <VideoBackground>
      <div>
        <FormHeader text="Find ID" />
        <IdFindForm onSubmit={onSubmit} />
      </div>
    </VideoBackground>
  );
}

export default IdFindPage;
