import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emailString, authString } from "redux/_actions/actions";

import Button from "../common/Button";
import Input from "../common/Input";
import style from "../../styles/globalForm.module.scss";
import SelectBox from "../common/SelectBox";

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
  const dispatch = useDispatch();
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
    const email = form.userId.concat("@", isSelect);
    axios
      .post("/user/find-pw", { userId: email })
      .then((res) => {
        // 로딩 스피너 구현예정.

        dispatch(emailString(email));

        alert("인증번호를 이메일로 보냈습니다.");

        dispatch(authString(res.data.authCode));

        navigate("/authFind");
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
      <div className={style.inform} style={{ marginBottom: "20px" }}>
        <Input
          name="userId"
          value={userId}
          onChange={onChange}
          placeHolder={idPlaceHolder}
          width={150}
        />
        <i className="fas fa-at" style={{ margin: "10px 10px" }} />
        <SelectBox handleClick={handleOption} options={OPTIONS} />
      </div>

      <Button
        marginLeft={5}
        width={10}
        buttonType={submitButtonType}
        handleClick={submit}
        Disabled={isEmpty}
        text="비밀번호 찾기"
      />
    </form>
  );
}

export default PassFindForm;
