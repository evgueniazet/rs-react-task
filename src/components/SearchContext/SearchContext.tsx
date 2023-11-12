import { createContext, useState, useContext, ReactNode } from "react";
import { IData } from "../../interfaces/IData";

interface SearchContextProps {
  searchInputValue: string;
  setSearchInputValue: (value: string) => void;
  searchResults: IData[];
  setSearchResults: (results: IData[]) => void;
  filteredCharacters: IData[];
  setFilteredCharacters: (results: IData[]) => void;
}

const SearchContext = createContext<SearchContextProps>({
  searchInputValue: "",
  setSearchInputValue: () => {},
  searchResults: [],
  setSearchResults: () => {},
  filteredCharacters: [],
  setFilteredCharacters: () => {},
});

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<IData[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<IData[]>([]);

  return (
    <SearchContext.Provider
      value={{
        searchInputValue,
        setSearchInputValue,
        searchResults,
        setSearchResults,
        filteredCharacters,
        setFilteredCharacters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
