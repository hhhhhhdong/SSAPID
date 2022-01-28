import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import { RootState } from "../../redux/_reducers";
import Input from "../common/Input";
import Button from "../common/Button";

function PassChangeForm() {
  const userId = useSelector(
    (state: RootState) => state.userReducer.emailString
  );
  const [isEmpty, setEmpty] = useState(true);
  const buttonType = "button";
  const [passObj, setPass] = useState({ userPw: "", passwordConfirm: "" });
  const { userPw, passwordConfirm } = passObj;
  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (userPw !== "" && passwordConfirm !== "") {
      setEmpty(false);
    }
    setPass({
      ...passObj,
      [name]: value,
    });
  };

  const submit = () => {
    axios.put("/user/change-pw", { userId, userPw }).then(() => {
      alert("정상적으로 바뀌었습니다.");
      navigate("/");
    });
  };

  return (
    <div>
      <Input
        name="userPw"
        value={userPw}
        onChange={onChange}
        placeHolder="비밀번호 입력"
      />
      <Input
        name="passwordConfirm"
        value={passwordConfirm}
        onChange={onChange}
        placeHolder="비밀번호 확인"
      />
      <Button
        buttonType={buttonType}
        handleClick={submit}
        Disabled={isEmpty}
        text="확인"
      />
    </div>
  );
}

export default PassChangeForm;
