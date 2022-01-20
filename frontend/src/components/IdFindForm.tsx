import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "api/axios";
import Button from "./common/Button";
import Input from "./common/Input";
import style from "../styles/globalForm.module.scss";

type idFindProps = {
  onSubmit: (form: { userName: string; userPhone: string }) => void;
};

function IdFindForm({ onSubmit }: idFindProps) {
  const submitButtonType = "submit";
  const backButtonType = "button";
  const namePlaceHolder = "이름을 입력하세요";
  const emailPlaceHolder = "휴대폰 번호를 입력하세요";

  const url = ["/"];
  const [isLoad, setLoad] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    userPhone: "",
  });

  const navigate = useNavigate();

  const backOut = () => {
    alert("backOut");
    setLoad(true);
    navigate(url[0]);
  };

  const { userName, userPhone } = form;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const check = /^[0-9]+$/;
    if (name === "userPhone" && (check.test(value) || value === "")) {
      setForm({
        ...form,
        [name]: value,
      });
    } else if (name === "userName" && !check.test(value)) {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (userName === "" || userPhone === "") {
      setEmpty(true);
    } else if (userPhone.length >= 10 && userPhone.length < 12) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  });

  const submit = () => {
    axios.post("/user/find-id", form).then((res) => {
      console.log(res);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);

    setForm({
      userName: "",
      userPhone: "",
    });
  };
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Input
        name="userName"
        value={userName}
        onChange={onChange}
        placeHolder={namePlaceHolder}
      />
      <Input
        name="userPhone"
        value={userPhone}
        onChange={onChange}
        placeHolder={emailPlaceHolder}
      />
      <div className={style.btns}>
        <Button
          buttonType={submitButtonType}
          handleClick={submit}
          Disabled={isEmpty}
          text="찾기"
        />
        <Button
          buttonType={backButtonType}
          text="뒤로가기"
          handleClick={backOut}
          Disabled={isLoad}
        />
      </div>
    </form>
  );
}

export default IdFindForm;
