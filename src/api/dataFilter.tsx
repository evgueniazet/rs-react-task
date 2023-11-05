import { IData } from "../interfaces/IData";

const dataFilter = (apiUrl: string, queryParam: string): Promise<IData[]> => {
  return fetch(apiUrl + queryParam)
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    });
};

export default dataFilter;
