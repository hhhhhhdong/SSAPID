import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Input from "../common/Input";
import Button from "../common/Button";
import Spacer from "../common/Spacer";

function ChangePWForm() {
  const token = sessionStorage.getItem("accessToken");
  const [form, setForm] = useState({
    userId: "",
    userPw: "",
    userPwCheck: "",
  });
  const [isEmpty, setEmpty] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/user/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(form);
        setForm(res.data);
      });
  }, []);
  const Submit = () => {
    console.log(form);
    axios
      .put("/user/change-pw", form)
      .then(() => {
        alert("비밀번호가 변경되었습니다.");
        navigate("/inquire");
      })
      .catch((error) => {
        alert("실패하였습니다.");
      });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <div>
      <Input
        name="userPw"
        placeHolder="password"
        value={form.userPw}
        onChange={onChange}
      />
      <Button buttonType="submit" text="edit" handleClick={Submit} />
    </div>
  );
}

export default ChangePWForm;
