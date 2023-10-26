import React, { Component, ReactNode } from "react";
import styles from "./Search.module.scss";

interface SearchProps {}

class Search extends Component<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {};
  }

  render(): ReactNode {
    return (
      <section className={styles.searchWrapper}>
        <input className={styles.searchInput} type="text" />
        <button className={styles.searchButton}>Search</button>
      </section>
    );
  }
}

export default Search;
