import React, { useState } from "react";
import Button from "./common/Button";

type IdFindProps = {
  onSubmit: (form: { name: string; phone: string }) => void;
};

function IdFindForm({ onSubmit }: IdFindProps) {
  const [form, setForm] = useState({
    name: "아이디를 입력하세요",
    phone: "비밀번호를 입력하세요",
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
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange} />
      <input name="phone" value={phone} onChange={onChange} />
      <Button buttonType="submit" text="다음" />
    </form>
  );
}

export default IdFindForm;
