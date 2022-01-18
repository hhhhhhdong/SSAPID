import React from "react";
import style from "../../styles/Button.module.scss";

export interface buttonProps {
  buttonType?: "submit" | "button"; // or directly JSX.IntrinsicElements['button']['type']
  handleClick?: () => void;
  url?: string;
  Disabled?: boolean;
  Loading?: boolean;
  text: string;
  variant?: "dark" | "light";
}

function Button({ buttonType, text, handleClick, Disabled }: buttonProps) {
  return (
    <button
      type={buttonType === "submit" ? "submit" : "button"}
      className={style.button}
      onClick={handleClick}
      disabled={Disabled}
    >
      {text}
    </button>
  );
}

export default Button;