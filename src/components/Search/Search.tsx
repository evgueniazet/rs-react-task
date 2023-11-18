import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Search.module.scss";
import dataFilter from "../../api/dataFilter";
import { saveSearchValue } from "../../store/reducers/searchSlice";
import { ISearchProps } from "../../interfaces/ISearch";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Input from "../Input/Input";
import updateUrl from "../../utils/updateUrl";
import { RootState } from "../../store/rootReducer";

const Search: React.FC<ISearchProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const inputValueString = localStorage.getItem("inputValue");
    if (inputValueString) {
      dispatch(saveSearchValue(inputValueString));
    }
  }, [dispatch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(saveSearchValue(event.target.value));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    localStorage.setItem("inputValue", searchValue);

    const apiUrl = "https://rickandmortyapi.com/api/character/";
    const queryParam = `?name=${searchValue}`;

    try {
      setLoading(true);
      const filteredCharacters = await dataFilter(apiUrl, queryParam);

      localStorage.setItem("pageNumber", "1");
      if (searchValue) {
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
        <Input value={searchValue} onChange={handleInputChange}></Input>

        <Button text="Search" className={styles.button}></Button>
      </form>
      {loading && <Loader />}
    </section>
  );
};

export default Search;
