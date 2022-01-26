import React, { useState } from "react";
import style from "styles/SidebarForm.module.scss";

function SidebarForm() {
  const [open, setOpen] = useState(true);
  const onClickSide = () => {
    setOpen((prev) => !prev);
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
