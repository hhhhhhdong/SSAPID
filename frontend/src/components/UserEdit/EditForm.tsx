import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Input from "../common/Input";
import Button from "../common/Button";
import Spacer from "../common/Spacer";
import FormHeader from "../layout/FormHeader";

const INPUT_MARGIN_BOTTOM = 2;

function EditForm() {
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
    axios.put(`/user/update`, form).then(() => alert("수정되었습니다."));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <div>
      <FormHeader text="Edit" />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userId"
        placeHolder="email"
        value={form.userId}
        onChange={onChange}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="username"
        placeHolder="name"
        value={form.userName}
        onChange={onChange}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userNickname"
        placeHolder="nickname"
        value={form.userNickname}
        onChange={onChange}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userPw"
        placeHolder="new password"
        type="password"
        value={form.userPw}
        onChange={onChange}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userPwcheck"
        placeHolder="new password check"
        type="password check"
        value={form.userPwCheck}
        onChange={onChange}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userPhone"
        placeHolder="phone number"
        value={form.userPhone}
        onChange={onChange}
        type="tel"
      />
      <Button buttonType="submit" text="save" handleClick={submit} />

      <br />
      <a href="/userdist">Do you want distroy?</a>
    </div>
  );
}

export default EditForm;
