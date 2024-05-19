export const logicGame = (board) =>
  fullRow(board) || fullColumn(board) || fullDiagonal(board);

const fullRow = (board) => board.some(allElementAreEqual);

const fullColumn = (board) => {
  const rowOne = board[0];
  const rowTwo = board[1];
  const rowThree = board[2];

  const columnOne = [rowOne[0], rowTwo[0], rowThree[0]];
  const columnTwo = [rowOne[1], rowTwo[1], rowThree[1]];
  const columnThree = [rowOne[2], rowTwo[2], rowThree[2]];

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
