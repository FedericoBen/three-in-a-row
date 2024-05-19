import styles from "./App.module.scss";
import GameBoard from "./components/GameBoard/GameBoard";

function App() {
  return (
    <div className={styles.container_app}>
      <GameBoard />
    </div>
  );
}

export default App;
