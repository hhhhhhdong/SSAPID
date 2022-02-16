import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "components/layout/FormHeader";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import Input from "../common/Input";
import Button from "../common/Button";
import Spacer from "../common/Spacer";
import style from "../../styles/edit.module.scss";

function UserDistForm() {
  const [isEmpty, setEmpty] = useState(true);
  const navigate = useNavigate();

  const firebaseUserisDist = async () => {
    const db = getDatabase();
    const getUid = sessionStorage.getItem("uid");
    await set(ref(db, `users/${getUid}`), {
      dist: true,
    });
  };

  const Submit = () => {
    axios
      .delete("/user/delete", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        alert("회원탈퇴가 완료되었습니다.");
        firebaseUserisDist();
        sessionStorage.removeItem("userNickname");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("email");
        navigate("/");
      })
      .catch((error) => {
        alert("회원탈퇴를 실패하였습니다.");
      });
  };
  return (
    <div className={style.container}>
      <div>
        <FormHeader text="Withdrawal" />
      </div>
      <textarea
        className={style.textarea}
        name="contents"
        placeholder="SSAPID를 탈퇴하시는 이유가 무엇인가요?"
      />
      <Button buttonType="submit" text="탈퇴하기" handleClick={Submit} />
    </div>
  );
}

export default UserDistForm;
