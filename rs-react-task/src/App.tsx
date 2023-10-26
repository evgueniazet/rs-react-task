import React, { Component, ReactNode } from "react";
import styles from "./App.module.scss";
import Search from "./components/Search/Search";

interface AppProps {}

class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  render(): ReactNode {
    return (
      <div className={styles.wrapper}>
        <Search />
      </div>
    );
  }
}

export default App;
