import React, { ChangeEvent, useState, MouseEvent } from "react";
import Input from "./common/Input";
import Button from "./common/Button";
import style from "../styles/RegisterForm.module.scss";

function RegisterForm() {
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
      <div className={style.container}>
        <div>
          <Input
            name="userId"
            placeHolder="email"
            value={form.userId}
            onChange={onChange}
            type="email"
          />
          <Input
            name="userName"
            placeHolder="name"
            value={form.userName}
            onChange={onChange}
          />
          <Input
            name="userNickname"
            placeHolder="nickname"
            value={form.userNickname}
            onChange={onChange}
          />
          <Input
            name="userPw"
            placeHolder="password"
            type="password"
            value={form.userPw}
            onChange={onChange}
          />
          <Input
            name="userPwCheck"
            placeHolder="password check"
            type="password"
            value={form.userPwCheck}
            onChange={onChange}
          />
          <Input
            name="userPhone"
            placeHolder="phone number"
            value={form.userPhone}
            onChange={onChange}
            type="tel"
          />
        </div>
        <Button buttonType="submit" text="회원가입" handleClick={onClick} />
      </div>
    </div>
  );
}

export default RegisterForm;
