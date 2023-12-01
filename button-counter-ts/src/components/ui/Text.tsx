import React, { FC } from "react";

export interface TextProps {
  label: string | number;
  size?: "small" | "medium" | "large";
}

const textSizes = {
  small: "text-sm",
  medium: "text-2xl",
  large: "text-7xl font-bold",
};

const Text: FC<TextProps> = ({ label, size }) => {
  return (
    <div className={size ? textSizes[size] : textSizes.medium}>{label}</div>
  );
};

export default Text;
