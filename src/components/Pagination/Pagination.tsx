import React, { useState, ChangeEvent } from "react";
import styles from "./Pagination.module.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";

interface IPaginationProps {
  currentPage: number;
  onClickPrev: () => void;
  onClickNext: () => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  onClickPrev,
  onClickNext,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Button onClick={onClickPrev} text="<"></Button>
        <div className={styles.pageNumber}>{currentPage}</div>
        <Button onClick={onClickNext} text=">"></Button>
      </div>
      <div className={styles.container}>
        Items per page:
        <Input
          className={styles.input}
          value={inputValue}
          onChange={handleInputChange}
        ></Input>
      </div>
    </>
  );
};

export default Pagination;
