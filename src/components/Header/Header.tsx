import { Component } from "react";
import styles from "./Header.module.scss";
import rickMortyLogo from "../../images/rickMorty.png";
import { IHeaderProps } from "../../interfaces/IHeaderProps";

class Header extends Component<IHeaderProps> {
  render() {
    if (this.props.showError) {
      throw new Error("Seems like an error occurred! Please reload the page.");
    }

    return (
      <header className={styles.header}>
        <img
          className={styles.logo}
          src={rickMortyLogo}
          alt="Rick and Morty Logo"
        ></img>
        <button className={styles.button} onClick={this.props.handleError}>
          Show error
        </button>
      </header>
    );
  }
}

export default Header;
