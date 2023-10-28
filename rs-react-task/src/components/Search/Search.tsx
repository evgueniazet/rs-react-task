import React, { ChangeEvent, Component, ReactNode } from "react";
import styles from "./Search.module.scss";

interface SearchProps {}

interface SearchState {
  inputValue: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: event.target.value });
  };

  handleClick = (): void => {
    localStorage.setItem("searchValue", this.state.inputValue);
  };

  render(): ReactNode {
    return (
      <section className={styles.searchWrapper}>
        <input
          className={styles.searchInput}
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <button className={styles.searchButton} onClick={this.handleClick}>
          Search
        </button>
      </section>
    );
  }
}

export default Search;
