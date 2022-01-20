import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import Input from "./common/Input";
import Button from "./common/Button";
import style from "../styles/Register.module.scss";
import Spacer from "./common/Spacer";

const INPUT_MARGIN_BOTTOM = 2;
function RegisterForm() {
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);

  const [form, setForm] = useState({
    userId: "",
    userPw: "",
    userPwCheck: "",
    userNickname: "",
    userPhone: "",
    userName: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    userId: "",
    userPw: "",
    userPwCheck: "",
    userNickname: "",
    userPhone: "",
    userName: "",
  });

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 전화번호 숫자만 입력받기
    if (name === "userPhone") {
      const regex = /^[0-9\b -]{0,13}$/;
      if (regex.test(e.target.value)) {
        setForm({
          ...form,
          [name]: value,
        });
      }
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  // 휴대폰 번호 형식 설정
  useEffect(() => {
    if (form.userPhone.length === 10) {
      setForm({
        ...form,
        userPhone: form.userPhone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
      });
    }
    if (form.userPhone.length === 13) {
      setForm({
        ...form,
        userPhone: form.userPhone
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
      });
    }
  }, [form.userPhone]);

  // 비밀번호 확인
  useEffect(() => {
    if (form.userPwCheck && form.userPw !== form.userPwCheck) {
      setErrorMessage({
        ...errorMessage,
        userPwCheck: "비밀번호가 다릅니다.",
      });
    } else {
      setErrorMessage({
        ...errorMessage,
        userPwCheck: "",
      });
    }
  }, [form.userPwCheck]);

  // Id, Nickname 비어있으면 에러메세지 삭제
  useEffect(() => {
    if (!form.userId) {
      setErrorMessage({
        ...errorMessage,
        userId: "",
      });
    }
    if (!form.userNickname) {
      setErrorMessage({
        ...errorMessage,
        userNickname: "",
      });
    }
  }, [form.userId, form.userNickname]);

  // 회원가입 버튼 클릭
  const onClickSubmit = () => {
    // 비어있는 값이 있을 경우
    if (Object.values(form).some((v) => v === "")) {
      console.log("모든 값을 입력해 주세요");
    }

    axios
      .post("http://localhost:8080/user/register", form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  const onClickCheckEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.userId) return;
    // axios email check
    setErrorMessage({
      ...errorMessage,
      userId: "email aleady exist",
    });
    console.log("check email");
  };
  const onClickCheckNickname = (e: React.MouseEvent) => {
    e.preventDefault();
    // axios nickname check
    setErrorMessage({
      ...errorMessage,
      userNickname: "nickname aleady exist",
    });
    console.log("check nickname");
  };

  return (
    <div className={style.wrapper}>
      <h2 style={{ width: "240px" }}>Register</h2>
      <Input
        name="userId"
        placeHolder="email"
        value={form.userId}
        errorMessage={errorMessage.userId}
        onChange={onChangeForm}
        type="email"
        buttonText="중복체크"
        onClickInputButton={onClickCheckEmail}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userName"
        placeHolder="name"
        value={form.userName}
        errorMessage={errorMessage.userName}
        onChange={onChangeForm}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userNickname"
        placeHolder="nickname"
        value={form.userNickname}
        errorMessage={errorMessage.userNickname}
        onChange={onChangeForm}
        buttonText="중복체크"
        onClickInputButton={onClickCheckNickname}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userPw"
        placeHolder="password"
        type="password"
        value={form.userPw}
        errorMessage={errorMessage.userPw}
        onChange={onChangeForm}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userPwCheck"
        placeHolder="password check"
        type="password"
        value={form.userPwCheck}
        errorMessage={errorMessage.userPwCheck}
        onChange={onChangeForm}
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Input
        name="userPhone"
        placeHolder="phone number"
        value={form.userPhone}
        errorMessage={errorMessage.userPhone}
        onChange={onChangeForm}
        type="tel"
      />
      <Spacer size={INPUT_MARGIN_BOTTOM} />
      <Button buttonType="submit" text="회원가입" handleClick={onClickSubmit} />
    </div>
  );
}

export default RegisterForm;
