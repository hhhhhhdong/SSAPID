/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
import React, { useState, ChangeEvent } from "react";
import style from "../../styles/Input.module.scss";

type InputValue = string | number | readonly string[] | undefined;
interface Props {
  value?: InputValue;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeHolder?: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  buttonText?: string;
  width?: number;
}

function Input({
  value,
  onChange,
  placeHolder,
  name,
  type,
  buttonText,
  width = 240,
}: Props) {
  // const [inputValue, setInputValue] = useState<InputValue>(value);
  // const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  //   onChange && onChange(e);
  // };
  return (
    <div className={style.input} style={{ width: `${width}px` }}>
      <label htmlFor="email">
        <span className={value ? style.inValueSpan : ""}>{placeHolder}</span>
        <input
          name={name}
          className={value ? style.inValueInput : ""}
          type={type}
          value={value}
          onChange={onChange}
        />
      </label>
      <div>{buttonText}</div>
    </div>
  );
}
export default Input;
