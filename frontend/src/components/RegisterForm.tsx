import React, { ChangeEvent, useState, MouseEvent } from "react";
import axios from "axios";
import Input from "./common/Input";
import Button from "./common/Button";
import style from "../styles/RegisterForm.module.scss";
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
    console.log(form);
  };
  return (
    <div className={style.wrapper}>
      <Input
        name="userId"
        placeHolder="email"
        value={form.userId}
        onChange={onChange}
        type="email"
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
        placeHolder="phone number"
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
