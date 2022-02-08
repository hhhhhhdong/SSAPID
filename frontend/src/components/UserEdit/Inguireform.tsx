import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";
import Input from "../common/Input";
import Button from "../common/Button";
import Spacer from "../common/Spacer";
import FormHeader from "../layout/FormHeader";
import style from "../../styles/edit.module.scss";

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

  return (
    <div className={style.container}>
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
      <p className={style.Link}>
        <Link to="/changenick">닉네임 변경</Link>
      </p>
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userPhone"
        placeHolder="phone number"
        value={form.userPhone}
        onChange={undefined}
        type="tel"
      />
      <p className={style.Link}>
        <Link to="/changephone">휴대폰 번호 변경</Link>
        <hr />
        <Link to="/changepw">비밀번호 변경</Link>
        <br />
        <Link to="/userDist">회원탈퇴</Link>
      </p>
    </div>
  );
}

export default InquireForm;
