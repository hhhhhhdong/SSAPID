import React, { useState } from "react";
import axios from "axios";
import Input from "../common/Input";
import Button from "../common/Button";
import Spacer from "../common/Spacer";
import FormHeader from "../layout/FormHeader";

const INPUT_MARGIN_BOTTOM = 2;

function PwCheckForm() {
  const [form, setForm] = useState({
    password: "",
  });
  const Submit = () => {
    axios.post(`/user/check-pw`);
    console.log(form);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div>
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <FormHeader text="Check Pw" />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="password"
        placeHolder="Password check"
        value={form.password}
        onChange={onChange}
      />
      <Button buttonType="submit" text="submit" handleClick={Submit} />
    </div>
  );
}

export default PwCheckForm;
