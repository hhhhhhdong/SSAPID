import React, { useEffect, useState, createContext, Children } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";
import Input from "./common/Input";
import style from "../styles/globalForm.module.scss";
import SelectBox from "./common/SelectBox";
import authString from "../redux/actions";
import store from "../redux/store.js";

const OPTIONS = [
  {
    value: "select",
    name: "선택",
  },
  {
    value: "naver.com",
    name: "naver.com",
  },
  {
    value: "gmail.com",
    name: "gmail.com",
  },
  {
    value: "yahoo.co.kr",
    name: "yahoo.co.kr",
  },
];

function PassFindForm() {
  const submitButtonType = "submit";
  const idPlaceHolder = "이메일을 입력하세요.";
  const navigate = useNavigate();
  const [isEmpty, setEmpty] = useState(true);
  const [isSelect, setSelect] = useState("");
  const [form, setForm] = useState({
    userId: "",
  });
  const { userId } = form;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const blankPattern = /[\s]/g;
    const id = /[^a-z|0-9]/g;
    if (id.test(value) || blankPattern.test(value) || value.length > 15) {
      alert("유효하지 않는 정보입니다.");
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
    if (userId === "" || isSelect === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  });
  const submit = () => {
    axios
      .post("/user/find-pw", { userId: form.userId.concat("@", isSelect) })
      .then((res) => {
        // 액션을 날려줘야함
        // console.log(res.data.authCode);
        store.dispatch({ type: authString, text: res.data.authCode });
        navigate("/authNum");
      })
      .catch((err) => {
        console.log(err);
        alert("잘못된 이메일입니다.");
      });
  };
  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        <SelectBox handleClick={handleOption} options={OPTIONS} />
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
