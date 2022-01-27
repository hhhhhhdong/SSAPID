import React, { ReactNode } from "react";
import NavbarForm from "components/NavbarForm";
import style from "styles/MainTemplate.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "redux/_reducers";
import SidebarForm from "../SidebarForm";

type Props = {
  children: ReactNode;
};
function Navbar({ children }: Props) {
  const open = useSelector((state: RootState) => state.userReducer.openSidebar);

  return (
    <div>
      <NavbarForm />
      <div className={style.wrapper}>
        <div className={open ? style.containerMove : style.container}>
          {children}
        </div>
        <SidebarForm />
      </div>
    </div>
  );
}

export default Navbar;
