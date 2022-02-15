import React, { useEffect, useState } from "react";
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

  const [isEmpty, setEmpty] = useState(true);
  useEffect(() => {
    if (userNickname === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  });
  const { userNickname } = form;

  const navigate = useNavigate();

  const Submit = () => {
    if (Object.values(form).some((v) => v === "")) return;

    // 닉네임 중복체크
    if (!isCheckedNickname) {
      setErrorMessage({
        ...errorMessage,
        userNickname: "중복체크 해주시기 바랍니다.",
      });
      return;
    }
    console.log(form);
    axios
      .put("/user/change-nick", form, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        alert("닉네임이 변경되었습니다.");
        navigate("/inquire");
      })
      .catch(() => {
        alert("실패하였습니다.");
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    if (!form.userNickname) {
      setErrorMessage({
        ...errorMessage,
        userNickname: "",
      });
    }
  }, [form.userNickname]);

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
  console.log(form);

  return (
    <div className={style.container}>
      <div>
        <FormHeader text="New Nick" />
      </div>
      <Input
        name="userNickname"
        placeHolder="새 닉네임"
        value={form.userNickname}
        onChange={onChange}
        buttonText={isCheckedNickname ? "✔" : "중복체크"}
        errorMessage={errorMessage.userNickname}
        onClickInputButton={onClickCheckNickname}
      />
      <Button
        buttonType="submit"
        text="수정하기"
        handleClick={Submit}
        Disabled={isEmpty}
      />
    </div>
  );
}

export default ChangeNickForm;
