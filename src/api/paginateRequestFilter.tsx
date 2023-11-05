import { IPaginateRequest } from "../interfaces/IPaginateRequest";

const paginateRequestFilter = async (pageNumber: number, name: string) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${name}`
    );
    const data: IPaginateRequest = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default paginateRequestFilter;
