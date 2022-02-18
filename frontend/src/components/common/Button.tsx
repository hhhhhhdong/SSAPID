import React from "react";
import style from "../../styles/Button.module.scss";

export interface buttonProps {
  buttonType?: "submit" | "button";
  handleClick?: () => void;
  Disabled?: boolean;
  Loading?: boolean;
  text: string;
  variant?: "dark" | "light";
  marginLeft?: number;
  width?: number;
}

function Button({
  buttonType,
  text,
  handleClick,
  Disabled,
  marginLeft,
  width,
}: buttonProps) {
  return (
    <button
      type={buttonType === "submit" ? "submit" : "button"}
      className={Disabled ? `${style.button} ${style.disable}` : style.button}
      onClick={handleClick}
      disabled={Disabled}
      style={{ marginLeft: `${marginLeft}rem`, width: `${width}rem` }}
    >
      {text}
    </button>
  );
}

export default Button;
