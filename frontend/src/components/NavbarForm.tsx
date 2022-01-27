import React from "react";
import style from "styles/NavbarForm.module.scss";

function NavbarForm() {
  return (
    <nav className={style.nav}>
      <h2>SSAFID</h2>
      <div>
        <span>글쓰기</span>
        <span>내정보</span>
        <span>로그아웃</span>
        <span>
          <i className="fas fa-align-justify" />
        </span>
      </div>
    </nav>
  );
}

export default NavbarForm;
