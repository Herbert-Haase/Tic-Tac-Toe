const gameBoard = [];
const gameController = (() => {
  const players = ["X", "O"];
  let currentPlayerIndex = 0;

  function _switchPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    return players[currentPlayerIndex];
  }

  function handleClick(event) {
    let col = +event.target.parentNode.getAttribute("col");
    let row = +event.target.getAttribute("row");
    let player = _switchPlayer();
    let cell = Cell(col, row, player);
    let gameState = cell.evaluateBoard();
    gameBoard.push(cell);
    _judgeGame(gameState);
    return player;
  }

  function _judgeGame(gameState) {
    if (gameBoard.length < 9) {
      if (typeof gameState == "string") {
        displaycontroller.announceWinner(gameState);
      }
    } else if (typeof gameState == "string") {
      displaycontroller.announceWinner(gameState);
    } else {
      displaycontroller.announceTie();
    }
  }
  return { handleClick };
})();

const displaycontroller = (() => {
  // pass Cell coordinates, annouce winner/tie, reset game

  function announceWinner(name) {
    document.querySelector("#status").textContent = `${name} won the game`;
    _lockAllCells();
  }
  function _lockAllCells() {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.removeEventListener("click", _handleCellClick, { once: true });
    });
  }
  function _handleCellClick(e) {
    e.target.textContent = gameController.handleClick(e);
  }

  function announceTie() {
    document.querySelector("#status").textContent = `Tie`;
  }

  (function _resetGame() {
    document.querySelector("#new-game").addEventListener("click", () => {
      location.reload();
    });
  })();

  // pass Cell coordinates
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", _handleCellClick, { once: true });
  });

  return { announceWinner, announceTie };
})();

function Cell(c, r, p) {
  const col = c;
  const row = r;
  const player = p;
  function evaluateBoard() {
    let sameRow = 1;
    let sameCol = 1;
    let samedia = 1;

    for (let cell of gameBoard) {
      if (cell.player === player) {
        if (cell.row === row) sameRow++;
        if (cell.col === col) sameCol++;
        if (cell.row === cell.col && col === row) samedia++;
        else if (
          (cell.row === 2 &&
            cell.col === 0 &&
            ((row === 0 && col === 2) || (row === 1 && col === 1))) ||
          (cell.row === 0 && cell.col === 2 && row === 2 && col === 0) ||
          (row === 1 && col === 1) ||
          (row === 2 && cell.row === 0 && cell.col === 2) ||
          (row === 0 && col === 2 && cell.row === 2 && cell.col === 0) ||
          (cell.row === 1 && cell.col === 1)
        ) {
          samedia++;
        }
        // winning player
        if (sameCol > 2 || sameRow > 2 || samedia > 2) {
          return player;
        }
      }
    }
  }
  return { col, row, player, evaluateBoard };
}
