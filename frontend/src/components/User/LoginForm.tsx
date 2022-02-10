import React, { useState, useEffect } from "react";
import { makeUser } from "service/function";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import GithubSignin from "../../service/GithubSignin";
import FormHeader from "../layout/FormHeader";
import Input from "../common/Input";
import GoogleSignin from "../../service/GoogleSingin";
import FacebookSignin from "../../service/FaceBookSingin";
import style from "../../styles/Loginform.module.scss";
import Button from "../common/Button";

function LoginForm() {
  const navigate = useNavigate();
  const idPlaceHolder = "아이디를 입력하세요";
  const passwordPlaceHolder = "비밀번호를 입력하세요";
  const [isEmpty, setEmpty] = useState(false);
  const [form, setForm] = useState({
    userId: "",
    userPw: "",
  });
  const { userId, userPw } = form;
  const Submit = () => {
    axios
      .post("/login", form)
      .then((res: any) => {
        makeUser(userId, res.data.userNickname);
        sessionStorage.setItem("userNickname", res.data.userNickname);
        sessionStorage.setItem("accessToken", res.data.accessToken);
        sessionStorage.setItem("email", userId);
        sessionStorage.setItem("userType", res.data.userType);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("로그인에 실패했습니다.");
        setForm({
          ...form,
          userPw: "",
        });
      });
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      Submit();
    }
  };

  useEffect(() => {
    if (userId === "" || userPw === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className={style.wrapper}>
      <FormHeader text="Login" />
      <Input
        name="userId"
        value={userId}
        onChange={onChange}
        placeHolder={idPlaceHolder}
        onKeyPressEventHandler={onEnter}
      />
      <Input
        name="userPw"
        value={userPw}
        type="password"
        onChange={onChange}
        placeHolder={passwordPlaceHolder}
        onKeyPressEventHandler={onEnter}
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
    </div>
  );
}

export default LoginForm;
