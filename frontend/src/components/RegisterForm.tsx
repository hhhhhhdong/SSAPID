import React, { ChangeEvent, useState, MouseEvent } from "react";
import axios from "axios";
import Input from "./common/Input";
import Button from "./common/Button";
import style from "../styles/globalForm.module.scss";
import Spacer from "./common/Spacer";

function RegisterForm() {
  const inputSpace = 15;
  const [form, setForm] = useState({
    userId: "",
    userPw: "",
    userPwCheck: "",
    userNickname: "",
    userPhone: "",
    userName: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onClick = () => {
    // 비어있는 값이 있을 경우
    if (Object.values(form).some((v) => v === "")) {
      console.log("모든 값을 입력해 주세요");
    }
    console.log(form);

    axios.post("http://localhost:8080/user/register", form).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className={style.wrapper}>
      <h2 style={{ width: "240px" }}>Register</h2>
      <Input
        name="userId"
        placeHolder="email"
        value={form.userId}
        onChange={onChange}
        type="email"
        buttonText="중복체크"
      />
      <Spacer size={inputSpace} />
      <Input
        name="userName"
        placeHolder="name"
        value={form.userName}
        onChange={onChange}
      />
      <Spacer size={inputSpace} />
      <Input
        name="userNickname"
        placeHolder="nickname"
        value={form.userNickname}
        onChange={onChange}
        buttonText="중복체크"
      />
      <Spacer size={inputSpace} />
      <Input
        name="userPw"
        placeHolder="password"
        type="password"
        value={form.userPw}
        onChange={onChange}
      />
      <Spacer size={inputSpace} />
      <Input
        name="userPwCheck"
        placeHolder="password check"
        type="password"
        value={form.userPwCheck}
        onChange={onChange}
      />
      <Spacer size={inputSpace} />
      <Input
        name="userPhone"
        placeHolder="phone (only number)"
        value={form.userPhone}
        onChange={onChange}
        type="tel"
      />
      <Spacer size={inputSpace} />
      <Button buttonType="submit" text="회원가입" handleClick={onClick} />
    </div>
  );
}

export default RegisterForm;
