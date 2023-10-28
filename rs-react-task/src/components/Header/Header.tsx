import { Component } from "react";
import styles from "./Header.module.scss";
import rickMortyLogo from "../../images/rickMorty.png";

class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <img className={styles.logo} src={rickMortyLogo}></img>
        <button className={styles.button}>Show error</button>
      </header>
    );
  }
}

export default Header;
