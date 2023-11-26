interface ILocation {
  name: string;
  url: string;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  url: string;
  image: string;
  gender: string;
  episode: string[];
  location: ILocation;
  origin: ILocation;
  type: string;
}

export interface ICharacters {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: ICharacter[];
}
