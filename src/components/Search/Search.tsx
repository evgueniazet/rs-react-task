import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Search.module.scss";
import dataFilter from "../../api/dataFilter";
import { saveSearchValue } from "../../store/reducers/searchSlice";
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} from "../../store/reducers/loaderSlice";
import { ISearchProps } from "../../interfaces/ISearch";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Input from "../Input/Input";
import updateUrl from "../../utils/updateUrl";
import { RootState } from "../../store/rootReducer";
import { ICustomError } from '../../interfaces/ICustomError';

const Search: React.FC<ISearchProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const loading = useSelector((state: RootState) => state.loader.loading);

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
      dispatch(fetchDataStart());
      const filteredCharacters = await dataFilter(apiUrl, queryParam);

      localStorage.setItem("pageNumber", "1");
      if (searchValue) {
        localStorage.setItem("isFiltered", "true");
      } else {
        localStorage.setItem("isFiltered", "false");
      }
      updateUrl(1);
      onSubmit(filteredCharacters);
      dispatch(fetchDataSuccess(filteredCharacters));
    } catch (error) {
      const customError: ICustomError = {
        message: "An error occurred",
      };
      console.error("Error filtering characters:", error);
      dispatch(fetchDataFailure(customError));
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
