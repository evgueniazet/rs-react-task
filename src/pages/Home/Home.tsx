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

interface IHomeProps {}

const Home: React.FC<IHomeProps> = () => {
  const [filteredCharacters, setFilteredCharacters] = useState<IData[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const page = localStorage.getItem("pageNumber");
  useEffect(() => {
    const fetchData = async () => {
      if (page !== null) {
        const newData = await paginateRequest(Number(page));
        if (newData) {
          setData(newData.results);
          setCurrentPage(Number(page));
        }
      } else {
        updateUrl(1);
      }
    };

    fetchData();
  }, [data]);

  const handleSearch = (filteredCharacters: IData[]) => {
    setFilteredCharacters(filteredCharacters);
  };

  useEffect(() => {
    dataLoader()
      .then((characters) => {
        setData(characters);
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
    data &&
    data.length > 0 &&
    filteredCharacters &&
    filteredCharacters.length === 0 &&
    !loading
  ) {
    cardsToRender = data.map((character) => (
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

  const handleClickPrev = async () => {
    const prevPageNumber = currentPage - 1;
    setLoading(true);

    const newData = await paginateRequest(prevPageNumber);

    if (newData && prevPageNumber > 0) {
      setData(newData.results);
      localStorage.setItem("pageNumber", String(prevPageNumber));
      setCurrentPage(prevPageNumber);
      updateUrl(prevPageNumber);
    }

    setLoading(false);
  };

  const handleClickNext = async () => {
    const nextPageNumber = currentPage + 1;
    setLoading(true);

    const newData = await paginateRequest(nextPageNumber);

    if (newData && nextPageNumber < newData?.info.pages) {
      setData(newData.results);
      localStorage.setItem("pageNumber", String(nextPageNumber));
      setCurrentPage(nextPageNumber);
      updateUrl(nextPageNumber);
    }

    setLoading(false);
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
