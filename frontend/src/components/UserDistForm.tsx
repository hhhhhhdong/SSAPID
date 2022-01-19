import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "../styles/UserDistPage.module.scss";
import Input from "./common/Input";
import Button from "./common/Button";

function UserDistForm() {
  // 회원탈퇴 Form
  // 라우팅 함수
  const navigate = useNavigate();
  // 로딩 중일 때 버튼의 동작을 막는 State
  const [isLoad, setLoad] = useState(false);
  // submit의 작동을 제한하는 State
  const [isAble, setAble] = useState(false);
  // form의 input을 관리하는 State
  const [form, setForm] = useState({ password: "" });
  const passPlaceHolder = "비밀번호를 입력해주세요";
  const backButtonType = "button";
  const submitButtonType = "submit";
  const { password } = form;
  // 뒤로 이동
  const backOut = () => {
    alert("메인 페이지로 이동합니다.");
    navigate("/");
    setLoad(true);
  };
  // axios delete 함수

  async function deleteUser() {
    try {
      // 응답 성공
      const response = await axios.delete("user/delete", {});
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // 탈퇴 버튼 클릭 시
  const handleSubmit = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      // axios 통신
      alert("탈퇴");
    }
  };
  // 입력이 변화할 시
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeHolder={passPlaceHolder}
      />
      <Button buttonType={submitButtonType} Disabled={isAble} text="탈퇴" />
      <Button
        buttonType={backButtonType}
        text="뒤로가기"
        handleClick={backOut}
        Disabled={isLoad}
      />
    </form>
  );
}

export default UserDistForm;
