import { IData } from "./IData";

export interface ISearchProps {
  onSubmit: (filteredCharacters: IData[]) => void;
}