import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/_reducers";
import { authString } from "redux/_actions/actions";
import Input from "../common/Input";
import Button from "../common/Button";

function AuthNumForm() {
  const buttonType = "button";
  const namePlaceHolder = "인증번호를 입력해주세요.";
  const [auth, setAuth] = useState("");
  const [isEmpty, setEmpty] = useState(true);
  const navigate = useNavigate();

  const select = useSelector(
    (state: RootState) => state.userReducer.authString
  );
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value !== "") {
      setEmpty(false);
    }

    setAuth(value);
  };
  const Conf = () => {
    if (select === auth) {
      alert("인증이 완료되었습니다.");
      dispatch(authString(""));
      navigate("/passChange");
    } else {
      alert("인증번호가 옳바르지 않습니다.");
    }
  };

  return (
    <div>
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
