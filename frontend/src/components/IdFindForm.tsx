import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";
import Input from "./common/Input";
import style from "../styles/IdFindForm.module.scss";

type idFindProps = {
  onSubmit: (form: { name: string; phone: string }) => void;
};

function IdFindForm({ onSubmit }: idFindProps) {
  const submitButtonType = "submit";
  const backButtonType = "button";
  const namePlaceHolder = "이름을 입력하세요";
  const emailPlaceHolder = "휴대폰 번호를 입력하세요";

  const url = ["/"];
  const [isLoad, setLoad] = useState(false);
  const navigate = useNavigate();

  const backOut = () => {
    alert("backOut");
    setLoad(true);
    navigate(url[0]);
  };

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });
  const { name, phone } = form;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: "",
      phone: "",
    });
  };
  return (
    <div className={style.form}>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={name}
          onChange={onChange}
          placeHolder={namePlaceHolder}
        />
        <Input
          name="phone"
          value={phone}
          onChange={onChange}
          placeHolder={emailPlaceHolder}
        />

        <Button buttonType={submitButtonType} text="다음" />
        <Button
          buttonType={backButtonType}
          text="뒤로가기"
          handleClick={backOut}
          Disabled={isLoad}
          url={url[0]}
        />
      </form>
    </div>
  );
}

export default IdFindForm;
