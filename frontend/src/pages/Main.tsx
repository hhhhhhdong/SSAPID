import React from "react";
import MainPage from "components/Main/MainPage";
import Navbar from "components/layout/MainTemplate";

function Main() {
  return (
    <div>
      <Navbar>
        <MainPage />
      </Navbar>
    </div>
  );
}

export default Main;
