import { Component } from "react";
import styles from "./Loader.module.scss";

class Loader extends Component {
  render() {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}>
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className={styles.loaderItem}></div>
          ))}
        </div>
      </div>
    );
  }
}

export default Loader;
