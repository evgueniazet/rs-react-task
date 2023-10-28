interface ILocation {
    name: string;
    url: string;
}

export interface IData {
    id: number;
    name: string;
    status: string;
    species: string;
    url: string;
    image: string;
    gender: string;
    episode: string[];
    location: ILocation
    origin: ILocation;
    type: string;
}