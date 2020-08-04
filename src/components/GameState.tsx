import { useState } from "react";

export type Value = 'X' | 'O' | null;

export type BoardState = Value[];
const createBoardState = () => Array<Value>(9).fill(null);

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
}

export function useGame() {
  const [gameState, setGameState] = useState<GameState>({
    history: [createBoardState()],
    step: 0,
  });

  const current = gameState.history[gameState.step];
  const xIsNext = (gameState.step % 2) === 0;

  function jumpTo(step: number) {
    setGameState(gameState => ({
      history: gameState.history,
      step,
      xIsNext: (step % 2) === 0,
    }));
  }

  const winner = calculateWinner(current);

  function handleClick(square: number) {
    const history = gameState.history.slice(0, gameState.step + 1);
    const board = history[history.length - 1];
    if (calculateWinner(board) || board[square]) {
      return;
    }
    const newBoard = board.slice();
    newBoard[square] = (gameState.step % 2) === 0 ? 'X' : 'O';
    history.push(newBoard);
    setGameState({
      history: history,
      step: history.length - 1,
    });
  }

  return {
    gameState,
    current,
    xIsNext,
    jumpTo,
    winner,
    handleClick,
  }
}
