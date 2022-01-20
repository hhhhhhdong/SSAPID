import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";
import Input from "./common/Input";
import style from "../styles/Loginform.module.scss";

// onclick - 로그인버튼 클릭했을때 로그인 되었습니다. 라는 문구 나오게?//
// true일때만 메인페이지로 보내는 방식 navigate사용해서 만들면 될듯?//

type loginPageProps = {
  onSubmit: (form: { userId: string; userPw: string }) => void;
};

function LoginForm({ onSubmit }: loginPageProps) {
  const idPlaceHolder = "아이디를 입력하세요";
  const passwordPlaceHolder = "비밀번호를 입력하세요";

  const Submit = () => {
    axios.post("http://localhost:8080/login", form).then((res) => {
      console.log(res);
      console.log(form);
    });
  };

  const [form, setForm] = useState({
    userId: "",
    userPw: "",
  });

  const { userId, userPw } = form;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      userId: "",
      userPw: "",
    });
  };

  return (
    <div className={style.wrapper}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="userId"
          value={userId}
          onChange={onChange}
          placeHolder={idPlaceHolder}
        />
        <br />
        <Input
          name="userPw"
          value={userPw}
          onChange={onChange}
          placeHolder={passwordPlaceHolder}
        />
        <h4>
          <a href="../idFind">아이디 찾기|</a>
          <a href="../passwordFind">비밀번호 찾기|</a>
          <a href="../login">회원가입</a>
        </h4>
        <br />
        <Button buttonType="submit" text="로그인" handleClick={Submit} />
        <br />
        <h4>---------------또는----------------</h4>
        <br />
      </form>
    </div>
  );
}

export default LoginForm;
