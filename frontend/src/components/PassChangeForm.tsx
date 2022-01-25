import React, { useState } from "react";
import axios from "axios";
import Input from "./common/Input";
import Button from "./common/Button";

function PassChangeForm() {
  const [isEmpty, setEmpty] = useState(true);
  const buttonType = "button";
  const [passObj, setPass] = useState({ userPw: "", passwordConfirm: "" });
  const { userPw, passwordConfirm } = passObj;
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
    axios.put("/user/change-pw", { userPw }).then((res) => {
      // user req변경해야함
    });
  };

  return (
    <div>
      <h1>비밀번호 변경 페이지</h1>
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
        text="비밀번호 찾기"
      />
    </div>
  );
}

export default PassChangeForm;
