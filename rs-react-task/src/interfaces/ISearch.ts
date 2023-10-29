import { IData } from "./IData";

export interface ISearchProps {
  onSubmit: (filteredCharacters: IData[]) => void;
}

export interface ISearchState {
  inputValue: string;
}
