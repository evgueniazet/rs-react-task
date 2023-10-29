import { Component, ReactNode } from "react";
import styles from "./App.module.scss";
import Search from "./components/Search/Search";
import dataLoader from "./api/dataLoader";
import { IData } from "./interfaces/IData";
import Card from "./components/Card/Card";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import { IAppState } from "./interfaces/IAppState";

class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      filteredCharacters: [],
      data: [],
      loading: true,
      showError: false,
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

  handleError = () => {
    this.setState({ showError: true });
  };

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
        <Header
          showError={this.state.showError}
          handleError={this.handleError}
        />
        <Search onSubmit={this.handleSearch} />
        <div className={styles.cardsWrapper}>{cardsToRender}</div>
      </div>
    );
  }
}

export default App;
