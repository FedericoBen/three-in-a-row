export const logicGame = (board) =>
  fullRow(board) || fullColumn(board) || fullDiagonal(board);

const fullRow = (board) => board.some(allElementAreEqual);

const fullColumn = (board) => {
  const columnOne = [board[0][0], board[1][0],  board[2][0]];
  const columnTwo = [board[0][1], board[1][1],  board[2][1]];
  const columnThree = [board[0][2], board[1][2],  board[2][2]];
  return (
    allElementAreEqual(columnOne) ||
    allElementAreEqual(columnTwo) ||
    allElementAreEqual(columnThree)
  );
};

const fullDiagonal = (board) => {
  const diagonalOne = [board[0][0], board[1][1], board[2][2]];
  const diagonalTwo = [board[0][2], board[1][1], board[2][0]];
  return allElementAreEqual(diagonalOne) || allElementAreEqual(diagonalTwo);
};

const allElementAreEqual = (row) =>
  row.every((card) => card != 0) && row[0] == row[1] && row[0] == row[2];
