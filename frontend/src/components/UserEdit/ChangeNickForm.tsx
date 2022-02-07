import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "components/layout/FormHeader";
import axios from "../../api/axios";
import Input from "../common/Input";
import Button from "../common/Button";
import style from "../../styles/edit.module.scss";

function ChangeNickForm() {
  const [form, setForm] = useState({
    usernickname: "",
  });
  const navigate = useNavigate();
  const Submit = () => {
    console.log(form);
    axios
      .put("/user/change-nick", form)
      .then(() => {
        alert("닉네임이 변경되었습니다.");
        navigate("/inquire");
      })
      .catch((error) => {
        alert("실패하였습니다.");
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
    <div className={style.container}>
      <FormHeader text="Change nickname" />
      <Input
        name="usernickname"
        placeHolder="nickname"
        value={form.usernickname}
        onChange={onChange}
      />
      <Button buttonType="submit" text="edit" handleClick={Submit} />
    </div>
  );
}

export default ChangeNickForm;
