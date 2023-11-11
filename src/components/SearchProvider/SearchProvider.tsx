import { createContext, useState, useContext, ReactNode } from "react";

interface SearchContextProps {
  searchInputValue: string;
  setSearchInputValue: (value: string) => void;
}

const SearchContext = createContext<SearchContextProps>({
  searchInputValue: "",
  setSearchInputValue: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchInputValue, setSearchInputValue] = useState("");

  return (
    <SearchContext.Provider value={{ searchInputValue, setSearchInputValue }}>
      {children}
    </SearchContext.Provider>
  );
};
