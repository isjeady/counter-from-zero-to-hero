import React, { FC } from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

const buttonsVariants = {
  primary:
    "bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
  secondary:
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
};

const Button: FC<ButtonProps> = ({ label, onClick, variant }) => {
  return (
    <button
      onClick={onClick}
      className={variant ? buttonsVariants[variant] : buttonsVariants.primary}
    >
      {label}
    </button>
  );
};

export default Button;
