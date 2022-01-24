import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "api/axios";
import { useNavigate } from "react-router-dom";
import Input from "./common/Input";
import Button from "./common/Button";
import Spacer from "./common/Spacer";
import FormHeader from "./layout/FormHeader";

const INPUT_MARGIN_BOTTOM = 2;
function RegisterForm() {
  const navigate = useNavigate();
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

  // Form 데이터 onChange
  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const userPhoneRegex = /^[0-9]+$/;
    const userNameRegex = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z)]/gi;
    const blankPattern = /[\s]/g;

    const { name, value } = e.target;

    // 빈 칸 체크
    if (blankPattern.test(value)) return;

    // 전화번호 입력 유효성 체크
    if (name === "userPhone") {
      if (userPhoneRegex.test(value) || value === "") {
        setForm({
          ...form,
          [name]: value,
        });
      }
      return;
    }

    // 이름 입력 유효성 체크
    if (name === "userName") {
      if (!userNameRegex.test(value)) {
        setForm({
          ...form,
          [name]: value,
        });
      }
      return;
    }

    // userId, userNickname 변경시 중복체크초기화
    if (name === "userId") {
      setIsCheckedEmail(false);
      setErrorMessage({
        ...errorMessage,
        userId: "",
      });
    } else if (name === "userNickname") {
      setIsCheckedNickname(false);
      setErrorMessage({
        ...errorMessage,
        userNickname: "",
      });
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

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

  // 이메일 중복 체크
  const onClickCheckEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    // 값이 비어있거나 이미 체크했으면 리턴
    if (!form.userId || isCheckedEmail) return;

    axios
      .get(`/user/check-id/${form.userId}`)
      .then(() => {
        setIsCheckedEmail(true);
        setErrorMessage({
          ...errorMessage,
          userId: "",
        });
      })
      .catch(() => {
        setErrorMessage({
          ...errorMessage,
          userId: "email aleady exist",
        });
      });
  };
  // 닉네임 중복체크
  const onClickCheckNickname = (e: React.MouseEvent) => {
    e.preventDefault();
    // 값이 비어있거나 이미 체크했으면 리턴
    if (!form.userNickname || isCheckedNickname) return;

    axios
      .get(`/user/check-nick/${form.userNickname}`)
      .then((res) => {
        setIsCheckedNickname(true);
        setErrorMessage({
          ...errorMessage,
          userNickname: "",
        });
      })
      .catch(() => {
        setErrorMessage({
          ...errorMessage,
          userNickname: "nickname aleady exist",
        });
      });
  };

  // 회원가입 버튼 클릭
  const onClickSubmit = () => {
    // 비어있는 값이 있을 경우 리턴
    if (Object.values(form).some((v) => v === "")) return;

    // 이메일 형식 체크
    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!emailRegex.test(form.userId)) {
      setErrorMessage({
        ...errorMessage,
        userId: "이메일 형식이 아닙니다.",
      });
      return;
    }

    // 아이디 중복체크 안되있으면 리턴
    if (!isCheckedEmail) {
      setErrorMessage({
        ...errorMessage,
        userId: "중복체크 해주시기 바랍니다.",
      });
      return;
    }

    // 닉네임 중복체크 안되있으면 리턴
    if (!isCheckedNickname) {
      setErrorMessage({
        ...errorMessage,
        userNickname: "중복체크 해주시기 바랍니다.",
      });
      return;
    }

    // 비밀번호 확인 다르면 리턴
    if (form.userPw !== form.userPwCheck) return;

    axios
      .post("/user/register", form)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.dir(err);
        alert("회원가입에 실패했습니다.");
      });
  };

  return (
    <div>
      <FormHeader text="Register" />
      <Input
        name="userId"
        placeHolder="email"
        value={form.userId}
        errorMessage={errorMessage.userId}
        onChange={onChangeForm}
        type="email"
        buttonText={isCheckedEmail ? "✔" : "중복체크"}
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
        buttonText={isCheckedNickname ? "✔" : "중복체크"}
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
