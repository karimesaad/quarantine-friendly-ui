import React, { FC } from "react";
import styles from "./SelectButton.module.css";

interface SelectButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

const SelectButton: FC<SelectButtonProps> = ({
  selected,
  ...otherProps
}: SelectButtonProps) => {
  return (
    <button
      {...otherProps}
      className={[styles.root, selected ? styles.selected : "selected"].join(
        " "
      )}
    />
  );
};

export default SelectButton;
