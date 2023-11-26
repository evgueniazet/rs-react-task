import Head from "next/head";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/src/components/Button/Button";
import Input from "@/src/components/Input/Input";
import { ICharacters } from "@/src/interfaces/IData";
import Card from "@/src/components/Card/Card";
import Loader from "@/src/components/Loader/Loader";
import Header from "@/src/components/Header/Header";
import Pagination from "@/src/components/Pagination/Pagination";
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} from "@/src/store/reducers/loaderSlice";
import { setSearchValue } from "@/src/store/reducers/searchSlice";
import { RootState } from "@/src/store/rootReducer";
import styles from "./Home.module.scss";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loader.loading);
  const charactersDataError = useSelector(
    (state: RootState) => state.loader.error
  );
  const charactersData: ICharacters | null = useSelector(
    (state: RootState) => state.loader.data
  );
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const [showError, setShowError] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const page = localStorage.getItem("pageNumber");

    setPage(page ? Number(page) : 1);
  }, []);

  useEffect(() => {
    const fetchData = async (page: number, searchValue: string) => {
      if (page) {
        dispatch(fetchDataStart());

        try {
          const queryParam = `&name=${searchValue}`;
          const newDataRaw = await fetch(
            `https://rickandmortyapi.com/api/character?page=${page}${
              searchValue ? queryParam : ""
            }`
          );
          const newData = await newDataRaw.json();

          if (newData.error) {
            dispatch(fetchDataFailure(newData.error));
          } else {
            dispatch(fetchDataSuccess(newData));
          }
        } catch (error) {
          console.error("error 228", error);
          dispatch(fetchDataFailure((error as Error).message));
        }
      }
    };

    fetchData(page, search);
  }, [page, searchValue]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    setPage(1);
    dispatch(setSearchValue(search));
  };

  const handleError = () => {
    setShowError(true);
  };

  const handleClickPrev = () => {
    const newPage = page - 1;
    router.query.page = String(page - 1);
    router.push(router);
    setPage(newPage);
  };

  const handleClickNext = () => {
    const newPage = page + 1;
    router.query.page = String(newPage);
    router.push(router);
    setPage(newPage);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.wrapper} data-testid="home-c omponent">
        {loading && (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        )}
        <Header showError={showError} handleError={handleError} />
        <div className={styles.searchPaginationContainer}>
          <section className={styles.searchWrapper}>
            <Input value={search} onChange={handleSearchChange} />
            <Button
              text="Search"
              className={styles.button}
              onClick={handleSearchClick}
            />
            {loading && <Loader />}
          </section>
          <Pagination
            currentPage={page}
            onClickPrev={handleClickPrev}
            onClickNext={handleClickNext}
          />
        </div>

        <div className={styles.cardsWrapper} data-testid="character-card">
          {!!charactersData &&
            !charactersDataError &&
            (charactersData as ICharacters).results.map((character) => (
              <Card
                key={character.id}
                name={character.name}
                location={character.location.name}
                imgUrl={character.image}
              />
            ))}
          {!!charactersDataError && <p>No characters found.</p>}
        </div>
      </main>
    </>
  );
}
