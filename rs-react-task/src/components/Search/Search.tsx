import { ChangeEvent, Component, ReactNode, FormEvent } from "react";
import styles from "./Search.module.scss";
import dataFilter from "../../api/dataFilter";
import { IData } from "../../interfaces/IData";

interface SearchProps {
  onSubmit: (filteredCharacters: IData[]) => void;
}

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

  handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const { inputValue } = this.state;
    const apiUrl = "https://rickandmortyapi.com/api/character/";
    const queryParam = `?name=${inputValue}`;
    const nameFilter = new dataFilter();

    try {
      const filteredCharacters = await nameFilter.filter(apiUrl, queryParam);
      this.props.onSubmit(filteredCharacters);
    } catch (error) {
      console.error("Error filtering characters:", error);
    }
  };

  render(): ReactNode {
    return (
      <section className={styles.searchWrapper}>
        <form onSubmit={this.handleSubmit}>
          <input
            className={styles.searchInput}
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button className={styles.searchButton} type="submit">
            Search
          </button>
        </form>
      </section>
    );
  }
}

export default Search;
