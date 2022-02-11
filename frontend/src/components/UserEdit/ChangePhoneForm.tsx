import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "components/layout/FormHeader";
import axios from "../../api/axios";
import Input from "../common/Input";
import Button from "../common/Button";
// import Spacer from "../common/Spacer";
import style from "../../styles/edit.module.scss";

function ChangePhoneForm() {
  const [isEmpty, setEmpty] = useState(true);
  const [form, setForm] = useState({
    userPhone: "",
  });
  const navigate = useNavigate();
  const { userPhone } = form;
  const Submit = () => {
    console.log(form);
    axios
      .put("/user/change-phone", form, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        alert("휴대폰 번호가 변경되었습니다.");
        navigate("/inquire");
      })
      .catch(() => {
        alert("실패하였습니다.");
      });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userPhoneRegex = /^[0-9]+$/;

    const { name, value } = e.target;

    if (name === "userPhone") {
      if (!userPhoneRegex.test(value) && value !== "") return;
    }
    setForm({
      ...form,
      [name]: value,
    });
  };
  useEffect(() => {
    if (userPhone === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  });
  return (
    <div className={style.container}>
      <div>
        <FormHeader text="New Phone" />
      </div>
      <Input
        name="userPhone"
        placeHolder="새 휴대폰 번호"
        value={form.userPhone}
        onChange={onChange}
      />
      <Button
        buttonType="submit"
        text="수정하기"
        handleClick={Submit}
        Disabled={isEmpty}
      />
    </div>
  );
}

export default ChangePhoneForm;
