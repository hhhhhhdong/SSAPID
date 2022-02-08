import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "components/layout/FormHeader";
import axios from "../../api/axios";
import Input from "../common/Input";
import Button from "../common/Button";
import Spacer from "../common/Spacer";
import style from "../../styles/edit.module.scss";

function UserDistForm() {
  const [isEmpty, setEmpty] = useState(true);
  const navigate = useNavigate();
  const Submit = () => {
    axios
      .delete("/user/delete", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        alert("회원탈퇴가 완료되었습니다.");
        navigate("/");
        sessionStorage.removeItem("userNickname");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("email");
      })
      .catch((error) => {
        alert("회원탈퇴를 실패하였습니다.");
      });
  };
  return (
    <div className={style.container}>
      <FormHeader text="회원탈퇴" />
      <textarea
        name="contents"
        placeholder="회원탈퇴하시는 이유를 적어주세요"
      />
      <Button buttonType="submit" text="탈퇴하기" handleClick={Submit} />
    </div>
  );
}

export default UserDistForm;
