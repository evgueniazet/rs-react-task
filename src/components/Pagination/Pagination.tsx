import React, { useState, ChangeEvent } from "react";
import styles from "./Pagination.module.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";

const Pagination: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const handleClickPrev = () => {
    const prevPageNumber = pageNumber - 1;
    if (prevPageNumber > 0) {
      setPageNumber(prevPageNumber);
    }
  };
  console.log("inputValue", inputValue);

  const handleClickNext = () => {
    const nextPageNumber = pageNumber + 1;
    ///condition that nextPageNumber is not greater than the maximum possible number of pages
    setPageNumber(nextPageNumber);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Button onClick={handleClickPrev} text="<"></Button>
        <div className={styles.pageNumber}>{pageNumber}</div>
        <Button onClick={handleClickNext} text=">"></Button>
      </div>
      <div className={styles.container}>
        Items per page:
        <Input className={styles.input} value={inputValue} onChange={handleInputChange}></Input>
      </div>
    </>
  );
};

export default Pagination;
