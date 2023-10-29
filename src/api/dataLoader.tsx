import { IData } from "../interfaces/IData";

class dataLoader {
  loadData(): Promise<IData[]> {
    return new Promise((resolve, reject) => {
      fetch("https://rickandmortyapi.com/api/character")
        .then((response) => response.json())
        .then((data) => {
          resolve(data.results);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default dataLoader;
