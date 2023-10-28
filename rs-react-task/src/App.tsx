import { Component, ReactNode } from "react";
import styles from "./App.module.scss";
import Search from "./components/Search/Search";
import dataLoader from "./api/dataLoader";
import { IData } from "./interfaces/IData";
import Card from "./components/Card/Card";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";

interface AppProps {}

interface AppState {
  data: IData[] | null;
  filteredCharacters: IData[] | null;
  loading: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      filteredCharacters: [],
      data: [],
      loading: true,
    };
  }

  handleSearch = (filteredCharacters: IData[]) => {
    this.setState({ filteredCharacters });
  };

  componentDidMount() {
    const loader = new dataLoader();
    loader
      .loadData()
      .then((data: IData[]) => {
        this.setState({ data, loading: false });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  }

  renderCard(item: IData) {
    return (
      <Card
        key={item.id}
        name={item.name}
        location={item.location.name}
        imgUrl={item.image}
      />
    );
  }

  render(): ReactNode {
    const { filteredCharacters, data, loading } = this.state;

    if (loading) {
      return (
        <>
          <Loader />
        </>
      );
    }

    let cardsToRender;
    if (filteredCharacters && filteredCharacters.length > 0) {
      cardsToRender = filteredCharacters.map((character) => (
        <Card
          key={character.id}
          name={character.name}
          location={character.location.name}
          imgUrl={character.image}
        />
      ));
    } else if (data && data.length > 0) {
      cardsToRender = data.map((character) => (
        <Card
          key={character.id}
          name={character.name}
          location={character.location.name}
          imgUrl={character.image}
        />
      ));
    } else {
      cardsToRender = <p>No characters found.</p>;
    }

    return (
      <div className={styles.wrapper}>
        <Header/>
        <Search onSubmit={this.handleSearch} />
        <div className={styles.cardsWrapper}>{cardsToRender}</div>
      </div>
    );
  }
}

export default App;
