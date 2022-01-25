import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../redux/store.js";
import Input from "./common/Input";
import Button from "./common/Button";

function AuthNumForm() {
  const buttonType = "button";
  const namePlaceHolder = "인증번호";
  const [authString, setAuth] = useState({ auth: "" });
  const [isEmpty, setEmpty] = useState(true);
  const navigate = useNavigate();
  const { auth } = authString;
  const select = authStore.getState();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value !== "") {
      setEmpty(false);
    }

    setAuth({
      ...authString,
      [name]: value,
    });
  };
  const Conf = () => {
    if (select === auth) {
      alert("인증이 완료되었습니다.");
      authStore.dispatch({ type: authString, text: "" });
      navigate("/passChange");
    } else {
      alert("인증번호가 옳바르지 않습니다.");
    }
  };

  return (
    <div>
      <h2>인증 번호를 입력해주세요</h2>

      <Input
        name="auth"
        value={auth}
        onChange={onChange}
        placeHolder={namePlaceHolder}
      />

      <Button
        buttonType={buttonType}
        handleClick={Conf}
        Disabled={isEmpty}
        text="확인"
      />
    </div>
  );
}

export default AuthNumForm;
