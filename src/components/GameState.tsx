import { useState } from "react";

export type Value = 'X' | 'O' | null;

export type BoardState = Value[];
const createBoardState = () => Array(9).fill(null);

function calculateWinner(board: BoardState) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export type GameState = {
  history: BoardState[],
  step: number,
  xIsNext: boolean,
}

export function useGame() {
  const [gameState, setGameState] = useState<GameState>({
    history: [createBoardState()],
    step: 0,
    xIsNext: true,
  });

  const current = gameState.history[gameState.step];

  function jumpTo(step: number) {
    setGameState({
      ...gameState,
      step,
      xIsNext: (step % 2) === 0,
    });
  }

  const winner = calculateWinner(current);

  function handleClick(square: number) {
    const history = gameState.history.slice(0, gameState.step + 1);
    const current = history[history.length - 1];
    const board = current.slice();
    if (calculateWinner(board) || board[square]) {
      return;
    }
    board[square] = gameState.xIsNext ? 'X' : 'O';
    setGameState({
      history: history.concat(board),
      step: history.length,
      xIsNext: !gameState.xIsNext
    });
  }

  return {
    gameState,
    current,
    jumpTo,
    winner,
    handleClick,
  }
}
