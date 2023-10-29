import { IData } from "./IData";

export interface IAppState {
  data: IData[] | null;
  filteredCharacters: IData[] | null;
  loading: boolean;
  showError: boolean;
}

export interface IAppProps {}
