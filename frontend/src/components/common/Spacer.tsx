/* eslint-disable react/require-default-props */
import React from "react";

interface Props {
  size: number;
  axis?: "x" | "y";
}

function Spacer({ size, axis }: Props) {
  const width = axis === "y" ? 1 : size;
  const height = axis === "x" ? 1 : size;
  return <div style={{ width, minWidth: width, height, minHeight: height }} />;
}

export default Spacer;
