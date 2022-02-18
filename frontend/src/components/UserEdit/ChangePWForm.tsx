import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "components/layout/FormHeader";
import axios from "../../api/axios";
import Input from "../common/Input";
import Button from "../common/Button";
import style from "../../styles/edit.module.scss";

function ChangePWForm() {
  const [form, setForm] = useState({
    userId: "",
    userPw: "",
    userPwCheck: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    userId: "",
    userPw: "",
    userPwCheck: "",
  });
  const [isEmpty, setEmpty] = useState(true);
  const navigate = useNavigate();

  const Submit = () => {
    if (form.userPw !== form.userPwCheck) return;
    axios
      .put("/user/change-pw", form)
      .then(() => {
        alert("비밀번호가 변경되었습니다.");
        navigate("/inquire");
      })
      .catch((error) => {
        alert("실패하였습니다.");
      });
  };
  useEffect(() => {
    if (form.userPw !== "" && form.userPwCheck !== "") {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [form.userPw, form.userPwCheck]);
  useEffect(() => {
    if (form.userPwCheck && form.userPw !== form.userPwCheck) {
      setErrorMessage({
        ...errorMessage,
        userPwCheck: "비밀번호가 다릅니다.",
      });
    } else {
      setErrorMessage({
        ...errorMessage,
        userPwCheck: "",
      });
    }
  }, [form.userPwCheck, form.userPw]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <div className={style.container}>
      <div>
        <FormHeader text="New PW" />
      </div>
      <Input
        name="userPw"
        placeHolder="새 비밀번호"
        value={form.userPw}
        errorMessage={errorMessage.userPw}
        onChange={onChange}
        type="password"
      />
      <Input
        name="userPwCheck"
        placeHolder="비밀번호 확인"
        value={form.userPwCheck}
        errorMessage={errorMessage.userPwCheck}
        onChange={onChange}
        type="password"
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

export default ChangePWForm;
