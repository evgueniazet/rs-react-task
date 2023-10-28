import { Component, ReactNode } from "react";
import styles from "./Card.module.scss";

interface CardProps {
  name: string;
  location: string;
  imgUrl: string;
}

class Card extends Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }

  render(): ReactNode {
    const { name, location, imgUrl } = this.props;
    return (
      <section className={styles.card}>
        <img src={imgUrl} alt="" />
        <h5>Name: {name}</h5>
        <h6>Location: {location}</h6>
      </section>
    );
  }
}

export default Card;
