import React from "react";
import styles from "./Header.module.scss";
import rickMortyLogo from "@/src/images/rickMorty.png";
import { IHeaderProps } from "@/src/interfaces/IHeaderProps";

const Header: React.FC<IHeaderProps> = ({ showError, handleError }) => {
  if (showError) {
    throw new Error("Seems like an error occurred! Please reload the page.");
  }

  return (
    <header className={styles.header} data-testid="header">
      <img
        className={styles.logo}
        src={rickMortyLogo.src}
        alt="Rick and Morty Logo"
      />
      <button data-testid="error-button" className={styles.button} onClick={handleError}>
        Show error
      </button>
    </header>
  );
};

export default Header;
