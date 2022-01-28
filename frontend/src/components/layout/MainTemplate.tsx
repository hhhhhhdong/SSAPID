import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/_reducers";
import style from "../../styles/MainTemplate.module.scss";
import NavbarForm from "../Bars/NavbarForm";
import SidebarForm from "../Bars/SidebarForm";

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
