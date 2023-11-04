import React from "react";
import styles from "./Loader.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className={styles.loaderItem}></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
