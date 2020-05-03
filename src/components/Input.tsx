import React, { FC } from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = (props) => {
  return (
    <input {...props} className={[styles.root, props.className].join(" ")} />
  );
};

export default Input;
