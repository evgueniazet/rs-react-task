import { IData } from "../interfaces/IData";

export interface IPaginateRequest {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: IData[];
}
