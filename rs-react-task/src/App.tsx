import React, { Component, ReactNode } from "react";
import styles from "./App.module.scss";

interface AppProps {}

class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  render(): ReactNode {
    return (
      <div className={styles.wrapper}>
        <section className={styles.searchWrapper}>
          <input className={styles.searchInput} type="text" />
          <button className={styles.searchButton}>Search</button>
        </section>
      </div>
    );
  }
}

export default App;
