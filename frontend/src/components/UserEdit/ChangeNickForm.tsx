import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "components/layout/FormHeader";
import axios from "../../api/axios";
import Input from "../common/Input";
import Button from "../common/Button";
import style from "../../styles/edit.module.scss";

function ChangeNickForm() {
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);
  const [form, setForm] = useState({
    userNickname: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    userNickname: "",
  });

  const navigate = useNavigate();

  const Submit = () => {
    console.log(form);
    axios
      .put("/user/change-nick", form.userNickname, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        alert("닉네임이 변경되었습니다.");
        navigate("/inquire");
      })
      .catch((error) => {
        alert("실패하였습니다.");
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userNameRegex = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z)]/gi;
    const blankPattern = /[\s]/g;

    const { name, value } = e.target;

    if (blankPattern.test(value)) return;

    if (name === "userNickname") {
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

  const onClickCheckNickname = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.userNickname || isCheckedNickname) return;

    axios
      .get(`/user/check-nick/${form.userNickname}`)
      .then(() => {
        setIsCheckedNickname(true);
        setErrorMessage({
          ...errorMessage,
          userNickname: "",
        });
      })
      .catch(() => {
        setErrorMessage({
          ...errorMessage,
          userNickname: "nickname already exist",
        });
      });
  };

  return (
    <div className={style.container}>
      <FormHeader text="Change nickname" />
      <Input
        name="usernickname"
        placeHolder="nickname"
        value={form.userNickname}
        onChange={onChange}
        buttonText={isCheckedNickname ? "✔" : "중복체크"}
        errorMessage={errorMessage.userNickname}
        onClickInputButton={onClickCheckNickname}
      />
      <Button buttonType="submit" text="edit" handleClick={Submit} />
    </div>
  );
}

export default ChangeNickForm;
