import React from "react";
import styles from "./Loader.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderWrapper} data-testid="loaderWrapper">
      <div className={styles.loader}>
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className={styles.loaderItem} data-testid="loaderItem"></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;