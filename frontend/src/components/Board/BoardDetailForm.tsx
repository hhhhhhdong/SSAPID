import React from "react";
import style from "styles/BoardDetailForm.module.scss";
import { useParams } from "react-router-dom";

function BoardDetailForm() {
  const { boardSeq } = useParams();
  return <div className={style.container}>{boardSeq}</div>;
}

export default BoardDetailForm;
