import React from "react";
import styles from "./Button.module.scss";
import { IButtonProps } from "../../interfaces/IButtonProps";

const Button: React.FC<IButtonProps> = ({ text,className,onClick }) => {
  return <button className={`${styles.button} ${className}`} onClick={onClick}>{text}</button>;
};

export default Button; 
