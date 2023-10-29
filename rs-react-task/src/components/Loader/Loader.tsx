import { Component } from "react";
import styles from "./Loader.module.scss";

class Loader extends Component {
  render() {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}>
          <div className={styles.loaderItem}></div>
          <div className={styles.loaderItem}></div>
          <div className={styles.loaderItem}></div>
          <div className={styles.loaderItem}></div>
          <div className={styles.loaderItem}></div>
          <div className={styles.loaderItem}></div>
        </div>
      </div>
    );
  }
}

export default Loader;
