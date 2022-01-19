import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";
import Input from "./common/Input";

type PasswordFindProps = {
  onSubmit: (form: { id: string }) => void;
};

function PassWordFindForm({ onSubmit }: PasswordFindProps) {
  const submitButtonType = "submit";
  const backButtonType = "button";
  const idPlaceHolder = "이메일을 입력하세요.";
  const url = ["/"];
  const navigate = useNavigate();
  const [isLoad, setLoad] = useState(false);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      id: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="id"
        value={id}
        onChange={onChange}
        placeHolder={idPlaceHolder}
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
  );
}

export default PassWordFindForm;
