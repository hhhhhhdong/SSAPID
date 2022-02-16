/* eslint-disable react/require-default-props */
import React from "react";
import style from "../../styles/InquireInput.module.scss";

type InputValue = string | number | readonly string[] | undefined;

type Props = {
  value: InputValue;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeHolder: string;
  name: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  width?: number;
  buttonText?: string;
  onClickInputButton?: (e: React.MouseEvent) => void;
  noBackground?: boolean;
};

function Input({
  value,
  onChange,
  placeHolder,
  name,
  type = "text",
  buttonText,
  width = 240,
  onClickInputButton,
  noBackground = false,
}: Props) {
  return (
    <div
      className={
        noBackground ? `${style.input} ${style.noBackground}` : style.input
      }
      style={{ width: `${width}px` }}
    >
      <label htmlFor={name}>
        <span className={value ? style.inValueSpan : ""}>{placeHolder}</span>
        <input
          name={name}
          className={value ? style.inValueInput : ""}
          type={type}
          readOnly
          value={value}
          onChange={onChange}
        />
      </label>
      {buttonText && (
        <button type="button" onClick={onClickInputButton}>
          {buttonText}
        </button>
      )}
    </div>
  );
}
export default Input;
