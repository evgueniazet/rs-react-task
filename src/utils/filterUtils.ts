import dataFilter from "../api/dataFilter";
import setFilteredCharacters from "../pages/Home/Home";

export const filterCharacters = async (inputValue: string) => {
  const apiUrl = "https://rickandmortyapi.com/api/character/";
  const queryParam = `?name=${inputValue}`;
  try {
    const filteredCharacters = await dataFilter(apiUrl, queryParam);
    setFilteredCharacters(filteredCharacters);
  } catch (error) {
    console.error("Error filtering characters:", error);
  }
};
