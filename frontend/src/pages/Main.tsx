import React, { useEffect } from "react";
import MainPage from "components/Main/MainPage";
import Navbar from "components/layout/MainTemplate";
import { useNavigate } from "react-router-dom";

function Main() {
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return (
    <div>
      <Navbar>
        <MainPage />
      </Navbar>
    </div>
  );
}

export default Main;
