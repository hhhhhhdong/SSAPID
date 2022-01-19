import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

function Home() {
  const buttonType = "button";
  const url = ["/main", "/idFind", "/passwordFind", "/login"];
  const [isLoading, setBool] = useState(false);
  const navigate = useNavigate();

  const handleMain = () => {
    setBool(false);
    navigate(url[0]);
  };
  const handleIdFind = () => {
    setBool(false);
    navigate(url[1]);
  };
  const handlePasswordFind = () => {
    setBool(false);
    navigate(url[2]);
  };
  const handleLogin = () => {
    setBool(false);
    navigate(url[3]);
  };

  return (
    <div>
      <Button
        buttonType={buttonType}
        text="메인페이지"
        handleClick={handleMain}
        Disabled={isLoading}
        url={url[0]}
      />
      <Button
        buttonType={buttonType}
        text="아이디찾기"
        handleClick={handleIdFind}
        Disabled={isLoading}
        url={url[1]}
      />
      <Button
        buttonType={buttonType}
        text="비밀번호찾기"
        handleClick={handlePasswordFind}
        Disabled={isLoading}
        url={url[2]}
      />
      <Button
        buttonType={buttonType}
        text="로그인"
        handleClick={handleLogin}
        Disabled={isLoading}
        url={url[3]}
      />
    </div>
  );
}

export default Home;
