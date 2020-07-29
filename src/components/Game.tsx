import * as React from 'react';
import styled from 'styled-components';
import { useGame, Value, BoardState } from './GameState';

type LayoutProps = {
  spacing: number
}

const Row = styled.div<LayoutProps>`
  display: flex;
  flex-direction: row;
  *:not(:last-child) {
    margin-right: ${(props) => props.spacing}px;
  }
`;

const Column = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  *:not(:last-child) {
    margin-bottom: ${(props) => props.spacing}px;
  }
`;


function Game() {
  const {
    gameState,
    current,
    jumpTo,
    winner,
    handleClick,
  } = useGame();

  return (
    <Row spacing={20}>
      <Column spacing={20}>
        <div>{
          winner
            ? `Winner ${winner}`
            : `Next Player ${gameState.xIsNext ? 'X' : 'O'}`
        }</div>
        <Board board={current} onClick={handleClick} />
      </Column>
      <Log history={gameState.history} jumpTo={jumpTo} />
    </Row>
  );
}


type BoardProps = {
  board: BoardState,
  onClick: (square: number) => void,
}
function Board({ board, onClick }: BoardProps) {
  const createProps = (square: number): SquareProps => {
    return {
      value: board[square],
      onClick: () => onClick(square),
    }
  };
  return (
    <Column spacing={0}>
      <Row spacing={0}>
        <Square {...createProps(0)} />
        <Square {...createProps(1)} />
        <Square {...createProps(2)} />
      </Row>
      <Row spacing={0}>
        <Square {...createProps(3)} />
        <Square {...createProps(4)} />
        <Square {...createProps(5)} />
      </Row>
      <Row spacing={0}>
        <Square {...createProps(6)} />
        <Square {...createProps(7)} />
        <Square {...createProps(8)} />
      </Row>
    </Column>
  );
}

const StyledSquare = styled.button`
  background: #fff;
  border: 1px solid #999;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  width: 34px;
  height: 34px;
  line-height: 34px;
  padding: 0;
`;
type SquareProps = {
  value: Value,
  onClick: () => void,
}
function Square(props: SquareProps) {
  return (
    <StyledSquare onClick={props.onClick}>
      {props.value}
    </StyledSquare>
  );
}

type LogProps = {
  history: BoardState[],
  jumpTo: (step: number) => void,
}
function Log(props: LogProps) {
  return (
    <ol>
      {props.history.map((_, index) => {
        return (
          <li key={index}>
            <button onClick={() => props.jumpTo(index)}>
              Go to {index === 0 ? 'start' : `move #${index}`}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export default Game;