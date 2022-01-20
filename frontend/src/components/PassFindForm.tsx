import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";
import Input from "./common/Input";
import style from "../styles/globalForm.module.scss";

type PasswordFindProps = {
  onSubmit: (form: { id: string }) => void;
};

function PassFindForm({ onSubmit }: PasswordFindProps) {
  const submitButtonType = "submit";
  const backButtonType = "button";
  const idPlaceHolder = "이메일을 입력하세요.";
  const url = ["/"];
  const navigate = useNavigate();
  const [isLoad, setLoad] = useState(false);
  const [isEmpty, setEmpty] = useState(true);
  const backOut = () => {
    // 뒤로가기 로직
    alert("backOut");
    setLoad(true);
    navigate(url[0]);
  };
  const [form, setForm] = useState({
    id: "",
  });
  const { id } = form;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    if (id === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      id: "",
    });
  };
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Input
        name="id"
        value={id}
        onChange={onChange}
        placeHolder={idPlaceHolder}
      />
      <Button buttonType={submitButtonType} Disabled={isEmpty} text="다음" />
      <Button
        buttonType={backButtonType}
        text="뒤로가기"
        handleClick={backOut}
        Disabled={isLoad}
      />
    </form>
  );
}

export default PassFindForm;
