import React, { ChangeEvent } from "react";
import style from "../styles/Navbar.module.scss";
// import NavigationForm from "components/NavbarForm";

function NavigationForm() {
  return (
    <nav className={style.navbar}>
      <li>SSAFID</li>
      <div>
        <li>
          <a href="../pages/Login.tsx">글쓰기</a>
        </li>
        <li>
          <a href="../pages/Login.tsx">내정보</a>
        </li>
        <li>
          <a href="../pages/Login.tsx">로그아웃</a>
        </li>
        {/* <NavigationForm /> */}
      </div>
    </nav>
  );
  // if 로그인 되었을때 로그아웃 나오게?
  // if
}
export default NavigationForm;
