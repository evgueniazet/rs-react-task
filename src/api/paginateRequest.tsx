import { IPaginateRequest } from "../interfaces/IPaginateRequest";

const paginateRequest = async (pageNumber: number) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${pageNumber}`
    );
    const data: IPaginateRequest = await response.json();
    
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default paginateRequest;
