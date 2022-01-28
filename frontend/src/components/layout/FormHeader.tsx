/* eslint-disable react/require-default-props */
import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../../styles/FormHeader.module.scss";

type Props = {
  text: string;
  width?: number;
};
function FormHeader({ text, width = 240 }: Props) {
  const navigate = useNavigate();
  const onClickBack = () => {
    navigate(-1);
  };
  return (
    <div className={style.header} style={{ width: `${width}px` }}>
      <button type="button" onClick={onClickBack}>
        <i className="fas fa-angle-left" />
        {/* <i class="fas fa-arrow-circle-left"></i> */}
      </button>
      <p>{text}</p>
    </div>
  );
}

export default FormHeader;
