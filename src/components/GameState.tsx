import { useState, useCallback } from "react";

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
  xIsNext: boolean,
}

export function useGame() {
  const [gameState, setGameState] = useState<GameState>({
    history: [createBoardState()],
    step: 0,
    xIsNext: true,
  });

  console.log(gameState.step, gameState.history);
  const current = gameState.history[gameState.step];

  function jumpTo(step: number) {
    setGameState(state => ({
      history: state.history,
      step,
      xIsNext: (step % 2) === 0,
    }));
  }

  const winner = calculateWinner(current);

  const handleClick = useCallback((square: number) => {
    const history = gameState.history;
    const board = history[history.length - 1];
    if (calculateWinner(board) || board[square]) {
      return;
    }
    const newBoard = board.slice();
    newBoard[square] = gameState.xIsNext ? 'X' : 'O';
    const newHistory = history.slice();
    newHistory.push(newBoard);
    setGameState({
      history: newHistory,
      step: newHistory.length - 1,
      xIsNext: !gameState.xIsNext
    });
  }, [gameState]);

  return {
    gameState,
    current,
    jumpTo,
    winner,
    handleClick,
  }
}
