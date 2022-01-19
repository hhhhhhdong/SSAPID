import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import Input from "./common/Input";
import Button from "./common/Button";
import style from "../styles/globalForm.module.scss";
import Spacer from "./common/Spacer";

const INPUT_MARGIN_BOTTOM = 2;
function RegisterForm() {
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);

  const [form, setForm] = useState({
    userId: "",
    userPw: "",
    userNickname: "",
    userPhone: "",
    userName: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    userId: "",
    userPw: "",
    userNickname: "",
    userPhone: "",
    userName: "",
  });
  const [userPwCheck, setUserPwCheck] = useState("");
  const [userPwCheckError, setUserPwCheckError] = useState("");
  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onChangePwCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPwCheck(e.target.value);
  };

  useEffect(() => {
    if (userPwCheck && form.userPw !== userPwCheck) {
      setUserPwCheckError("비밀번호 확인이 다릅니다.");
    } else {
      setUserPwCheckError("");
    }
  }, [userPwCheck]);
  const onClickSubmit = () => {
    // 비어있는 값이 있을 경우
    if (Object.values(form).some((v) => v === "")) {
      console.log("모든 값을 입력해 주세요");
    }
    axios
      .post("http://localhost:8080/user/register", form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  const onClickCheckEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    // axios email check
    setErrorMessage({
      ...errorMessage,
      userId: "email aleady exist",
    });
    console.log("check email");
  };
  const onClickCheckNickname = (e: React.MouseEvent) => {
    e.preventDefault();
    // axios nickname check
    setErrorMessage({
      ...errorMessage,
      userNickname: "nickname aleady exist",
    });
    console.log("check nickname");
  };

  return (
    <div className={style.wrapper}>
      <h2 style={{ width: "240px" }}>Register</h2>
      <Input
        name="userId"
        placeHolder="email"
        value={form.userId}
        errorMessage={errorMessage.userId}
        onChange={onChangeForm}
        type="email"
        buttonText="중복체크"
        onClickInputButton={onClickCheckEmail}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userName"
        placeHolder="name"
        value={form.userName}
        errorMessage={errorMessage.userName}
        onChange={onChangeForm}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userNickname"
        placeHolder="nickname"
        value={form.userNickname}
        errorMessage={errorMessage.userNickname}
        onChange={onChangeForm}
        buttonText="중복체크"
        onClickInputButton={onClickCheckNickname}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userPw"
        placeHolder="password"
        type="password"
        value={form.userPw}
        errorMessage={errorMessage.userPw}
        onChange={onChangeForm}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userPwCheck"
        placeHolder="password check"
        type="password"
        value={userPwCheck}
        errorMessage={userPwCheckError}
        onChange={onChangePwCheck}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userPhone"
        placeHolder="phone (only number)"
        value={form.userPhone}
        errorMessage={errorMessage.userPhone}
        onChange={onChangeForm}
        type="tel"
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Button buttonType="submit" text="회원가입" handleClick={onClickSubmit} />
    </div>
  );
}

export default RegisterForm;
