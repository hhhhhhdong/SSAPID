import React from "react";

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
    <div>
      <button
        type={buttonType === "submit" ? "submit" : "button"}
        onClick={handleClick}
        disabled={Disabled}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
