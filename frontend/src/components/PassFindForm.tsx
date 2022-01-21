import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "./common/Button";
import Input from "./common/Input";
import style from "../styles/globalForm.module.scss";
import SelectBox from "./common/SelectBox";

type PasswordFindProps = {
  onSubmit: (form: { userId: string }) => void;
};

const OPTIONS = [
  {
    value: "select",
    name: "선택",
  },
  {
    value: "naver",
    name: "naver.com",
  },
  {
    value: "google",
    name: "gmail.com",
  },
  {
    value: "yahoo",
    name: "yahoo.co.kr",
  },
];

function PassFindForm({ onSubmit }: PasswordFindProps) {
  const submitButtonType = "submit";
  const idPlaceHolder = "이메일을 입력하세요.";

  const [isEmpty, setEmpty] = useState(true);

  const [form, setForm] = useState({
    userId: "",
  });
  const { userId } = form;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const blankPattern = /[\s]/g;
    const id = /[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g;
    if (id.test(value) || blankPattern.test(value)) {
      alert("유효하지않는 정보입니다.");
      setForm({
        ...form,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (userId === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  });
  const submit = () => {
    axios.post("/user/find-pw", form).then((res) => {
      console.log(res.status);
      if (true) {
        // 인증번호를 보내드렸습니다. 이메일로
        // 인증번호를 입력하세요.
        // 확인되면 비밀번호 변경 페이지
        // 인증번호 입력
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      userId: "",
    });
  };
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.inform}>
        <Input
          name="userId"
          value={userId}
          onChange={onChange}
          placeHolder={idPlaceHolder}
          width={150}
        />
        <span>@</span>
        <SelectBox options={OPTIONS} />
      </div>

      <Button
        buttonType={submitButtonType}
        handleClick={submit}
        Disabled={isEmpty}
        text="비밀번호 찾기"
      />
    </form>
  );
}

export default PassFindForm;
