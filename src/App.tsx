import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import Search from "./components/Search/Search";
import dataLoader from "./api/dataLoader";
import dataFilter from "./api/dataFilter";
import { IData } from "./interfaces/IData";
import Card from "./components/Card/Card";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";

interface IAppProps {}

const App: React.FC<IAppProps> = () => {
  const [filteredCharacters, setFilteredCharacters] = useState<IData[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);

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

  return (
    <div className={styles.wrapper}>
      {loading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
      <Header showError={showError} handleError={handleError} />
      <Search onSubmit={handleSearch} />
      <div className={styles.cardsWrapper}>{cardsToRender}</div>
    </div>
  );
};

export default App;
