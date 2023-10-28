import { Component, ReactNode } from "react";
import styles from "./App.module.scss";
import Search from "./components/Search/Search";
import dataLoader from "./api/dataLoader";
import { IData } from "./interfaces/IData";
import Card from "./components/Card/Card";

interface AppProps {}

interface AppState {
  data: IData[] | null;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const loader = new dataLoader();
    loader
      .loadData()
      .then((data: IData[]) => {
        this.setState({ data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderCard(item: IData) {
    return (
      <Card
        name={item.name}
        location={item.location.name}
        imgUrl={item.image}
      />
    );
  }

  render(): ReactNode {
    const { data } = this.state;

    return (
      <div className={styles.wrapper}>
        <Search />
        {data && data.map((item: IData) => this.renderCard(item))}
      </div>
    );
  }
}

export default App;
