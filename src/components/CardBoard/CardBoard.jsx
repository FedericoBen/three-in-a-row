import styles from "./CardBoard.module.scss";

const CardBoard = ({ value, onClick }) => {
  return (
    <span
      className={styles.card_game}
      style={{ color: value == "x" ? "#9DDE8B" : "#AD88C6" }}
      onClick={onClick}
    >
      {value}
    </span>
  );
};

export default CardBoard;
