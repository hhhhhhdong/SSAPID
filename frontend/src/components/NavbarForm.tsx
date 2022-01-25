import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import style from "../styles/Navbar.module.scss";
// import { IconContext } from "react-icons";

function NavigationForm() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
    console.log(sidebar);
  };
  return (
    <div>
      <nav className={style.navbar}>
        <li>SSAFID</li>
        <li>
          <a href="../pages/Login.tsx">글쓰기</a>
        </li>
        <li>
          <a href="../pages/Login.tsx">내정보</a>
        </li>
        <li>
          <a href="../pages/Login.tsx">로그아웃</a>
        </li>
        {/* <li>
          <Link to="#!" className={style.menu_bars}>
            <p>
              <FaIcons.FaBars onClick={showSidebar} />
            </p>
          </Link>
        </li>
        <nav className={sidebar ? style.nav_menu_active : style.nav_menu}>
          <ul className={style.nav_menu_items}>
            {SidebarData.map((item, index) => {
              return (
                <li className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav> */}
      </nav>
    </div>
  );
  // if 로그인 되었을때 로그아웃 나오게?
  // if
}
export default NavigationForm;
