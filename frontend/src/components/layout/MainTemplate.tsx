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
        <div className={style.containerMove}>{children}</div>
        <SidebarForm />
      </div>
    </div>
  );
}

export default Navbar;
