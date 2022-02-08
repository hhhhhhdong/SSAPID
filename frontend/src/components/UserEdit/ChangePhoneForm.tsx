import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "components/layout/FormHeader";
import axios from "../../api/axios";
import Input from "../common/Input";
import Button from "../common/Button";
// import Spacer from "../common/Spacer";
import style from "../../styles/edit.module.scss";

function ChangePhoneForm() {
  const [form, setForm] = useState({
    userPhone: "",
  });
  const navigate = useNavigate();
  const Submit = () => {
    console.log(form);
    axios
      .put("/user/change-phone", form.userPhone, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        alert("휴대폰 번호가 변경되었습니다.");
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
      <FormHeader text="Change Phone" />
      <Input
        name="userPhone"
        placeHolder="phone number"
        value={form.userPhone}
        onChange={onChange}
      />
      <Button buttonType="submit" text="edit" handleClick={Submit} />
    </div>
  );
}

export default ChangePhoneForm;
