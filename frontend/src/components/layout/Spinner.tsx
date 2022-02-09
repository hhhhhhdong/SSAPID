import React from "react";
import style from "styles/Spinner.module.scss";

function Spinner() {
  return (
    <div className={style.spinner}>
      <i className="fas fa-spinner fa-spin" />
    </div>
  );
}

export default Spinner;
