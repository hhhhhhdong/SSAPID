import React, { useState } from "react";
import { To, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

function Home() {
  const type = "button";
  const url = ["/Main", "/IdFind"];
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

  return (
    <div>
      <Button
        buttonType={type}
        text="메인페이지"
        handleClick={handleMain}
        Disabled={isLoading}
        url={url[0]}
      />
      <Button
        buttonType={type}
        text="아이디찾기"
        handleClick={handleIdFind}
        Disabled={isLoading}
        url={url[1]}
      />
    </div>
  );
}

export default Home;
