import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import Search from "../../components/Search/Search";
import dataLoader from "../../api/dataLoader";
import dataFilter from "../../api/dataFilter";
import { IData } from "../../interfaces/IData";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import Pagination from "../../components/Pagination/Pagination";
import paginateRequest from "../../api/paginateRequest";
import updateUrl from "../../utils/updateUrl";
import paginateRequestFilter from "../../api/paginateRequestFilter";
import { useSearchContext } from "../../components/SearchProvider/SearchProvider";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = () => {
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    searchResults,
    setSearchResults,
    filteredCharacters,
    setFilteredCharacters,
  } = useSearchContext();

  const page = localStorage.getItem("pageNumber");
  const isFiltered = localStorage.getItem("isFiltered");

  useEffect(() => {
    const fetchData = async () => {
      if (page !== null) {
        const newData = await paginateRequest(Number(page));
        if (newData) {
          setSearchResults(newData.results);
          setCurrentPage(Number(page));
        }
      } else {
        updateUrl(1);
      }
    };

    fetchData();
  }, [page]);

  const handleSearch = (filteredCharacters: IData[]) => {
    setFilteredCharacters(filteredCharacters);
  };

  useEffect(() => {
    dataLoader()
      .then((characters) => {
        setSearchResults(characters);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

    const inputValue = localStorage.getItem("inputValue");

    if (inputValue) {
      filterCharacters(inputValue);
    }
  }, []);

  const filterCharacters = async (inputValue: string) => {
    const apiUrl = "https://rickandmortyapi.com/api/character/";
    const queryParam = `?name=${inputValue}`;
    try {
      const filteredCharacters = await dataFilter(apiUrl, queryParam);

      setFilteredCharacters(filteredCharacters);
    } catch (error) {
      console.error("Error filtering characters:", error);
    }
  };

  const handleError = () => {
    setShowError(true);
  };

  let cardsToRender;

  if (filteredCharacters && filteredCharacters.length > 0) {
    cardsToRender = filteredCharacters.map((character) => (
      <Card
        key={character.id}
        name={character.name}
        location={character.location.name}
        imgUrl={character.image}
      />
    ));
  } else if (
    searchResults &&
    searchResults.length > 0 &&
    filteredCharacters &&
    filteredCharacters.length === 0 &&
    !loading
  ) {
    cardsToRender = searchResults.map((character) => (
      <Card
        key={character.id}
        name={character.name}
        location={character.location.name}
        imgUrl={character.image}
      />
    ));
  } else {
    cardsToRender = <p>No characters found.</p>;
  }

  const handlePagination = async (pageNumber: number, isNext: boolean) => {
    setLoading(true);
    let newData = null;

    if (isFiltered !== "true") {
      newData = await paginateRequest(pageNumber);
    } else if (isFiltered === "true") {
      const inputValue = localStorage.getItem("inputValue");
      if (inputValue) {
        newData = await paginateRequestFilter(pageNumber, inputValue);
      }
    }

    if (newData) {
      if (
        (isNext && pageNumber < newData.info.pages) ||
        (!isNext && pageNumber > 0)
      ) {
        if (isFiltered !== "true") {
          setSearchResults(newData.results);
          setFilteredCharacters([]);
        } else if (isFiltered === "true") {
          setFilteredCharacters(newData.results);
        }

        localStorage.setItem("pageNumber", String(pageNumber));
        setCurrentPage(pageNumber);
        updateUrl(pageNumber);
      }
    }

    setLoading(false);
  };

  const handleClickPrev = () => {
    const prevPageNumber = currentPage - 1;
    handlePagination(prevPageNumber, false);
  };

  const handleClickNext = () => {
    const nextPageNumber = currentPage + 1;
    handlePagination(nextPageNumber, true);
  };

  return (
    <div className={styles.wrapper}>
      {loading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
      <Header showError={showError} handleError={handleError} />
      <div className={styles.searchPaginationContainer}>
        <Search onSubmit={handleSearch} />
        <Pagination
          currentPage={currentPage}
          onClickPrev={handleClickPrev}
          onClickNext={handleClickNext}
        />
      </div>

      <div className={styles.cardsWrapper}>{cardsToRender}</div>
    </div>
  );
};

export default Home;
