import React, { ChangeEvent } from "react";
import styles from "./Input.module.scss";

export interface IInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value: string;
}

const Input: React.FC<IInputProps> = ({ className, onChange, value }) => {
  return (
    <input
      className={`${styles.input} ${className}`}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
