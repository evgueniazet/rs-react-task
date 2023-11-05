import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import styles from "./Search.module.scss";
import dataFilter from "../../api/dataFilter";
import { ISearchProps } from "../../interfaces/ISearch";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Input from "../Input/Input";
import updateUrl from "../../utils/updateUrl";

const Search: React.FC<ISearchProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const inputValueString = localStorage.getItem("inputValue");
    if (inputValueString) {
      setInputValue(inputValueString);
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    localStorage.setItem("inputValue", inputValue);

    const apiUrl = "https://rickandmortyapi.com/api/character/";
    const queryParam = `?name=${inputValue}`;

    try {
      setLoading(true);
      const filteredCharacters = await dataFilter(apiUrl, queryParam);

      localStorage.setItem("pageNumber", "1");
      if (inputValue) {
        localStorage.setItem("isFiltered", "true");
      } else {
        localStorage.setItem("isFiltered", "false");
      }
      updateUrl(1);
      onSubmit(filteredCharacters);
    } catch (error) {
      console.error("Error filtering characters:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.searchWrapper}>
      <form onSubmit={handleSubmit}>
        <Input value={inputValue} onChange={handleInputChange}></Input>
        <Button text="Search" className={styles.button}></Button>
      </form>
      {loading && <Loader />}
    </section>
  );
};

export default Search;
