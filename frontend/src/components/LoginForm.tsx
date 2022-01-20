import React, { useState, useEffect } from "react";
import axios from "api/axios";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";
import Input from "./common/Input";
import style from "../styles/Loginform.module.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fab } from "@fortawesome/free-brands-svg-icons";

// library.add(fab);

type loginPageProps = {
  onSubmit: (form: { userId: string; userPw: string }) => void;
};

function LoginForm({ onSubmit }: loginPageProps) {
  const idPlaceHolder = "아이디를 입력하세요";
  const passwordPlaceHolder = "비밀번호를 입력하세요";

  const Submit = () => {
    axios.post("/login", form).then((res: object) => {
      console.log(res);
      console.log(form);
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
          <a href="../register">회원가입</a>
        </h4>
        <br />
        <Button
          buttonType="submit"
          Disabled={isEmpty}
          text="로그인"
          handleClick={Submit}
        />
        <br />
        <h4>---------------또는----------------</h4>
        <br />

        {/* <div>
          <FontAwesomeIcon icon={["fab", "facebook"]} size="3x" />
          <FontAwesomeIcon icon={["fab", "microsoft"]} size="3x" />
          <FontAwesomeIcon icon={["fab", "google"]} size="3x" />
        </div> */}
      </form>
    </div>
  );
}

export default LoginForm;
