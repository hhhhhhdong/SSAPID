import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openSidebar } from "redux/_actions/actions";
import { RootState } from "redux/_reducers";
import style from "styles/SidebarForm.module.scss";

function SidebarForm() {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.userReducer.openSidebar);

  const onClickSide = () => {
    console.log(open);
    dispatch(openSidebar(!open));
  };

  return (
    <div
      className={
        open ? style.container : `${style.container} ${style.sidebarMove}`
      }
    >
      <button type="button" onClick={onClickSide}>
        side
      </button>
    </div>
  );
}

export default SidebarForm;
