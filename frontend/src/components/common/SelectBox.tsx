import React from "react";

type optionprops = {
  value: string;
  name: string;
};
type selectprops = {
  options: Array<optionprops>;
};

function SelectBox({ options }: selectprops) {
  return (
    <select>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
