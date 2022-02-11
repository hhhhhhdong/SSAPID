import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";
import Input from "../common/InquireInput";
import Button from "../common/Button";
import Spacer from "../common/Spacer";
import FormHeader from "../layout/FormHeader";
import style from "../../styles/edit.module.scss";

const INPUT_MARGIN_BOTTOM = 15;

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
        console.log(res);
        setForm(res.data);
      });
  }, []);
  console.log(form);

  return (
    <div className={style.container}>
      <div>
        <FormHeader text="Inform" />
      </div>
      <div>
        <Input
          name="userId"
          placeHolder="이메일"
          value={form.userId}
          onChange={undefined}
        />
      </div>
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="username"
        placeHolder="이름"
        value={form.userName}
        onChange={undefined}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userNickname"
        placeHolder="닉네임"
        value={form.userNickname}
        onChange={undefined}
      />

      <p className={style.Link}>
        <Link to="/changenick">닉네임 변경</Link>
      </p>
      <Input
        name="userPhone"
        placeHolder="휴대폰 번호"
        value={form.userPhone}
        onChange={undefined}
        type="tel"
      />
      <p className={style.Link}>
        <Link to="/changephone">휴대폰 번호 변경</Link>
        <hr />
        <div className={style.a}>
          <Link className={style.b} to="/changepw">
            비밀번호 변경
          </Link>
          <Link className={style.b} to="/userDist">
            회원탈퇴
          </Link>
        </div>
      </p>
    </div>
  );
}

export default InquireForm;
