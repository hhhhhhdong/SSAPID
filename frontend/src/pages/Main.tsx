import React, { useEffect } from "react";
import MainPage from "components/Main/MainPage";
import Navbar from "components/layout/MainTemplate";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Navbar>
        <MainPage />
      </Navbar>
    </div>
  );
}

export default Main;
