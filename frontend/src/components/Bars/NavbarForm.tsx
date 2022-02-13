/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openSidebar } from "redux/_actions/actions";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "redux/_reducers";
import style from "styles/NavbarForm.module.scss";

function NavbarForm() {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.userReducer.openSidebar);
  const [openIcon, setOpenIcon] = useState<boolean>(false);
  const navigate = useNavigate();
  const onClickLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const displayMenuIcon = () => {
    if (open) {
      return <i className="fas fa-angle-right" style={{ fontSize: "18px" }} />;
    }
    if (openIcon) {
      return <i className="fas fa-angle-left" style={{ fontSize: "18px" }} />;
    }
    return <i className="fas fa-align-justify" />;
  };
  return (
    <nav className={open ? `${style.nav} ${style.navMove}` : style.nav}>
      <h2 className={open ? style.navHomeDisNone : ""}>
        <Link to="/">SSAPID</Link>
      </h2>
      <div className={style.navItemsWrapper}>
        <div className={open ? style.navItemsDisNone : ""}>
          <span>
            <Link to="/createboard">글쓰기</Link>
          </span>
          <span>
            <Link to="/pwcheck">내정보</Link>
          </span>
          <span onClick={onClickLogout}>로그아웃</span>
        </div>
        <span
          onMouseEnter={() => !open && setOpenIcon(true)}
          onMouseLeave={() => setOpenIcon(false)}
          onClick={() => dispatch(openSidebar(!open))}
          role="button"
          className={style.navSidebarIcon}
        >
          {displayMenuIcon()}
        </span>
      </div>
    </nav>
  );
}

export default NavbarForm;
