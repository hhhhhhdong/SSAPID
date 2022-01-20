import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

function Home() {
  const buttonType = "button";
  const url = ["/main", "/idFind", "/passwordFind", "/login", "/userDist"];
  const [isLoading, setBool] = useState(false);
  const navigate = useNavigate();

  const handle = (index: number) => {
    setBool(false);
    navigate(url[index]);
  };

  // const handleMain = () => {
  //   setBool(false);
  //   navigate(url[0]);
  // };
  // const handleIdFind = () => {
  //   setBool(false);
  //   navigate(url[1]);
  // };
  // const handlePasswordFind = () => {
  //   setBool(false);
  //   navigate(url[2]);
  // };
  // const handleLogin = () => {
  //   setBool(false);
  //   navigate(url[3]);
  // };

  return (
    <div>
      <Button
        buttonType={buttonType}
        text="메인페이지"
        handleClick={() => {
          handle(0);
        }}
        Disabled={isLoading}
      />
      <Button
        buttonType={buttonType}
        text="아이디찾기"
        handleClick={() => {
          handle(1);
        }}
        Disabled={isLoading}
      />
      <Button
        buttonType={buttonType}
        text="비밀번호찾기"
        handleClick={() => {
          handle(2);
        }}
        Disabled={isLoading}
      />
      <Button
        buttonType={buttonType}
        text="로그인"
        handleClick={() => {
          handle(3);
        }}
        Disabled={isLoading}
      />
      <Button
        buttonType={buttonType}
        text="회원탈퇴"
        handleClick={() => {
          handle(4);
        }}
        Disabled={isLoading}
      />
    </div>
  );
}

export default Home;
