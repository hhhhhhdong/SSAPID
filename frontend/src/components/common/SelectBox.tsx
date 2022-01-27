import React from "react";
import style from "../../styles/Select.module.scss";

type optionprops = {
  value: string;
  name: string;
};

type selectprops = {
  options: Array<optionprops>;
  handleClick: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SelectBox({ options, handleClick }: selectprops) {
  return (
    <select onChange={handleClick} className={style.basic}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
