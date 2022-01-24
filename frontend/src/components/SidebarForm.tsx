import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import style from "../styles/Sidebar.module.scss";

function SidebarForm() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
    console.log(sidebar);
  };

  return (
    <>
      <div className={style.navbar}>
        <Link to="#!" className={style.menu_bars}>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
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
      </nav>
    </>
  );
}
export default SidebarForm;
