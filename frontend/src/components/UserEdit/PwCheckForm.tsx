import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Input from "../common/Input";
import Button from "../common/Button";
import Spacer from "../common/Spacer";
import FormHeader from "../layout/FormHeader";
import style from "../../styles/edit.module.scss";

const INPUT_MARGIN_BOTTOM = 2;

function PwCheckForm() {
  const token = sessionStorage.getItem("userType");
  const [form, setForm] = useState({
    userPw: "",
  });
  const [isEmpty, setEmpty] = useState(true);
  const navigate = useNavigate();
  const { userPw } = form;
  useEffect(() => {
    if (!token) {
      navigate("/inquire");
      window.location.replace("/inquire");
    }
  }, []);
  const Submit = () => {
    console.log(form.userPw);
    axios
      .post("/user/check-pw", form, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        navigate("/inquire");
      })
      .catch((error) => {
        alert("비밀번호가 틀렸습니다.");
      });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  useEffect(() => {
    if (userPw === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  });

  return (
    <div className={style.container}>
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <div>
        <FormHeader text="Check Pw" />
      </div>
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userPw"
        placeHolder="비밀번호 확인"
        value={form.userPw}
        onChange={onChange}
        type="password"
      />
      <Button
        buttonType="button"
        text="확인"
        handleClick={Submit}
        Disabled={isEmpty}
      />
    </div>
  );
}

export default PwCheckForm;
