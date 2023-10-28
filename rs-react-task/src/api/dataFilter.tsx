import { IData } from "../interfaces/IData";

class dataFilter {
  filter = (apiUrl: string, queryParam: string): Promise<IData[]> => {
    return fetch(apiUrl + queryParam)
      .then((response) => response.json())
      .then((data) => {
        return data.results;
      });
  };
}

export default dataFilter;