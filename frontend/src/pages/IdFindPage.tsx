import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import IdFindForm from "../components/IdFindForm";
// 아이디 찾기 이름이랑 전화번호
function IdFindPage() {
  const url = ["/"];
  const [isLoad, setLoad] = useState(false);
  const navigate = useNavigate();

  const backOut = () => {
    alert("backOut");
    setLoad(true);
    navigate(url[0]);
  };

  const onSubmit = (form: { name: string; phone: string }) => {
    console.log(form);
  };

  return (
    <div>
      <IdFindForm onSubmit={onSubmit} />
      <Button
        buttonType="button"
        text="뒤로가기"
        handleClick={backOut}
        Disabled={isLoad}
        url={url[0]}
      />
    </div>
  );
}

export default IdFindPage;
