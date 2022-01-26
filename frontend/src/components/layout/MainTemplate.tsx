import React, { ReactNode } from "react";
import NavbarForm from "components/NavbarForm";
import style from "styles/MainTemplate.module.scss";
import SidebarForm from "../SidebarForm";

type Props = {
  children: ReactNode;
};
function Navbar({ children }: Props) {
  return (
    <div>
      <NavbarForm />
      <div className={style.wrapper}>
        <div style={{ width: "100%" }}>{children}</div>
        <SidebarForm />
      </div>
    </div>
  );
}

export default Navbar;
