import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/_reducers";
import style from "styles/SidebarForm.module.scss";

function SidebarForm() {
  const open = useSelector((state: RootState) => state.userReducer.openSidebar);

  return (
    <div
      className={
        open ? style.container : `${style.container} ${style.sidebarMove}`
      }
    >
      sidebar
    </div>
  );
}

export default SidebarForm;
