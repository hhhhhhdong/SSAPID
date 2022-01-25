import React, { useState, useEffect } from "react";
import axios from "api/axios";
import FacebookSignin from "service/FaceBookSingin";
import GithubSignin from "service/GithubSignin";
import FormHeader from "./layout/FormHeader";
import Input from "./common/Input";
import GoogleSignin from "../service/GoogleSingin";
import style from "../styles/Loginform.module.scss";
import { nickStore } from "../redux/store";
import Button from "./common/Button";

type loginPageProps = {
  onSubmit: (form: { userId: string; userPw: string }) => void;
};

function LoginForm({ onSubmit }: loginPageProps) {
  const idPlaceHolder = "아이디를 입력하세요";
  const passwordPlaceHolder = "비밀번호를 입력하세요";

  const Submit = () => {
    axios.post("/login", form).then((res: object) => {
      // userNickname을 스토어에 저장
      // 미구현
      // nickStore.dispatch(res);
    });
  };
  const [isEmpty, setEmpty] = useState(false);
  const [form, setForm] = useState({
    userId: "",
    userPw: "",
  });
  useEffect(() => {
    if (userId === "" || userPw === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  });

  const { userId, userPw } = form;
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
      userId: "",
      userPw: "",
    });
  };

  return (
    <div className={style.wrapper}>
      <FormHeader text="Login" />
      <form onSubmit={handleSubmit}>
        <Input
          name="userId"
          value={userId}
          onChange={onChange}
          placeHolder={idPlaceHolder}
        />
        <Input
          name="userPw"
          value={userPw}
          onChange={onChange}
          placeHolder={passwordPlaceHolder}
        />
        <h4>
          <a href="../idFind">아이디 찾기 | </a>
          <a href="../passFind">비밀번호 찾기 | </a>
          <a href="../register">회원가입</a>
        </h4>
        <Button
          buttonType="submit"
          Disabled={isEmpty}
          text="로그인"
          handleClick={Submit}
        />
        <div className={style.img}>
          <GithubSignin />
          <GoogleSignin />
          <FacebookSignin />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
