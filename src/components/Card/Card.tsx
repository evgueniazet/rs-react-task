import React from "react";
import styles from "./Card.module.scss";
import { ICardProps } from "../../interfaces/ICardProps";

const Card: React.FC<ICardProps> = ({ name, location, imgUrl }) => {
  return (
    <section className={styles.card}>
      <img className={styles.img} src={imgUrl} alt={name} />
      <h5>Name: {name}</h5>
      <h6>Location: {location}</h6>
    </section>
  );
};

export default Card;
