import { ChangeEvent, Component, ReactNode, FormEvent } from "react";
import styles from "./Search.module.scss";
import dataFilter from "../../api/dataFilter";
import { ISearchProps, ISearchState } from "../../interfaces/ISearch";
import Loader from "../Loader/Loader";

class Search extends Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      inputValue: "",
      loading: false,
    };
  }

  componentDidMount() {
    const inputValueString = localStorage.getItem("inputValue");
    if (inputValueString) {
      this.setState({ inputValue: inputValueString });
    }
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const { inputValue } = this.state;

    localStorage.setItem("inputValue", inputValue);

    const apiUrl = "https://rickandmortyapi.com/api/character/";
    const queryParam = `?name=${inputValue}`;
    const nameFilter = new dataFilter();

    try {
      this.setState({ loading: true });
      const filteredCharacters = await nameFilter.filter(apiUrl, queryParam);
      this.props.onSubmit(filteredCharacters);
    } catch (error) {
      console.error("Error filtering characters:", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render(): ReactNode {
    const { loading } = this.state;

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
        {loading && <Loader />}
      </section>
    );
  }
}

export default Search;
