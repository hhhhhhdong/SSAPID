import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Input from "../common/Input";
import Button from "../common/Button";
import Spacer from "../common/Spacer";
import FormHeader from "../layout/FormHeader";
import style from "../../styles/Editform.module.scss";

const INPUT_MARGIN_BOTTOM = 2;

function InquireForm() {
  const token = sessionStorage.getItem("accessToken");
  const [form, setForm] = useState({
    userId: "",
    userNickname: "",
    userPw: "",
    userPwCheck: "",
    userPhone: "",
    userName: "",
  });
  useEffect(() => {
    axios
      .get("/user/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setForm(res.data);
      });
  }, []);
  console.log(form);
  const submit = () => {
    axios.put(`/user/S{form.userId}`).then((res) => {
      console.log(res);
    });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className={style.wrapper}>
      <FormHeader text="Inform" />
      <Input
        name="userId"
        placeHolder="email"
        value={form.userId}
        onChange={undefined}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="username"
        placeHolder="name"
        value={form.userName}
        onChange={undefined}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userNickname"
        placeHolder="nickname"
        value={form.userNickname}
        onChange={undefined}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userPhone"
        placeHolder="phone number"
        value={form.userPhone}
        onChange={undefined}
      />
      <Button buttonType="submit" text="edit" handleClick={submit} />
    </div>
  );
}

export default InquireForm;
