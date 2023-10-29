import { Component, ReactNode } from "react";
import styles from "./Card.module.scss";
import { ICardProps } from "../../interfaces/ICardProps";

class Card extends Component<ICardProps> {
  constructor(props: ICardProps) {
    super(props);
  }

  render(): ReactNode {
    const { name, location, imgUrl } = this.props;
    return (
      <section className={styles.card}>
        <img className={styles.img} src={imgUrl} alt={name} />
        <h5>Name: {name}</h5>
        <h6>Location: {location}</h6>
      </section>
    );
  }
}

export default Card;
