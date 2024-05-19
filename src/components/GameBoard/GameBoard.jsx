import { useEffect, useState } from "react";
import styles from "./GameBoard.module.scss";
import CardBoard from "../CardBoard/CardBoard";
import { logicGame } from "../../utils/logicGame";
import { VALUE_CARD } from "../../constants/valueCards";
import ModalWinner from "../ModalWinner/ModalWinner";
import useSound from 'use-sound';
import pop from '../../assets/sounds/pop.mp3'

const INITIAL_STATE = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const GameBoard = () => {
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState(INITIAL_STATE);
  const [play] = useSound(pop);
  const [counter, setCounter] = useState({
    x: 0,
    o: 0,
    e: 0,
  });

  const selectCard = (i, j) => {
    play();
    const newBoard = board.map((row, ib) =>
      ib != i ? [...row] : row.map((card, jb) => (jb != j ? card : turn))
    );
    setBoard(newBoard);
    if (logicGame(newBoard)) {
      setWinner(turn);
      setCounter({
        ...counter,
        x: turn == 1 ? counter.x + 1 : counter.x,
        o: turn == 2 ? counter.o + 1 : counter.o,
      });
      return;
    }

    if (newBoard.every((row) => row.every((card) => card != 0))) {
      setWinner(3);
      setCounter({
        ...counter,
        e: counter.e + 1,
      });
      return;
    }
    setTurn(turn == 1 ? 2 : 1);
  };

  const reload = () => {
    setBoard(INITIAL_STATE);
    setWinner(null);
    setTurn(1);
  };

  useEffect(() => {
    if (turn == 1) return;
    const boardMap = board.map((row, i) =>
      row.map((card, j) => ({ free: card == 0, position: [i, j] }))
    );
    const previouslyBoardFree = [
      ...boardMap[0],
      ...boardMap[1],
      ...boardMap[2],
    ].filter((card) => card.free);
    const numberMissingCards = previouslyBoardFree.length;
    const random = getRandomIntInclusive(0, numberMissingCards-1);
    const [i, j] = previouslyBoardFree[random].position;

    selectCard(i, j);
  }, [turn]);

  return (
    <>
      {winner && <ModalWinner onClick={reload} winner={VALUE_CARD[winner]} />}
      <div className={styles.container_game_board}>
        <h1>Xs & Os</h1>
        <div className={styles.header_game_board}>
          <div className={styles.container_option_game_board}>
            <span
              className={styles.option}
              style={{ border: turn == 1 ? `2px solid #ffffff` : "" }}
            >
              x
            </span>
            <span
              className={styles.option}
              style={{ border: turn == 2 ? `2px solid #ffffff` : "" }}
            >
              o
            </span>
          </div>
          <button className={styles.reload} onClick={reload}>
            reload
          </button>
        </div>
        <div className={styles.counter_victories}>
          <h3 className={styles.x_victories}>X victories: {counter.x}</h3>
          <h3 className={styles.y_victories}>O Victories: {counter.o}</h3>
          <h3 className={styles.ties}>Ties: {counter.e}</h3>
        </div>
        <div className={styles.game_board}>
          {board.map((row, i) => (
            <div key={`row-${i}`} className={styles.row_game_board}>
              {row.map((card, j) => (
                <CardBoard
                  key={`card-${i},${j}`}
                  value={VALUE_CARD[card]}
                  onClick={() => selectCard(i, j)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GameBoard;
