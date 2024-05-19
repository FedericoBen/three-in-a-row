import styles from "./ModalWinner.module.scss";
import React from "react";

const ModalWinner = ({ onClick, winner}) => {
  return (
    <div className={styles.modal_winner} onClick={() => onClick()}>
      <div className={styles.background_modal} />
      <div className={styles.container_message}>
        <h2>The winner is the:</h2>
        <h1>{winner}</h1>
      </div>
    </div>
  );
};

export default ModalWinner;
