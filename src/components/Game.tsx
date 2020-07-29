import * as React from 'react';
import styled from 'styled-components';
import { useGameState, Value } from './GameState';

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
  } = useGameState();

  return (
    <Row spacing={20}>
      <Column spacing={20}>
        <div>Status</div>
        <Board />
      </Column>
      <Log />
    </Row>
  );
}


function Board() {
  return (
    <Column spacing={0}>
      <Row spacing={0}>
        <Square value={null} />
        <Square value={null} />
        <Square value={null} />
      </Row>
      <Row spacing={0}>
        <Square value={null} />
        <Square value={null} />
        <Square value={null} />
      </Row>
      <Row spacing={0}>
        <Square value={null} />
        <Square value={null} />
        <Square value={null} />
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
  value: Value;
}
function Square(props: SquareProps) {
  return (
    <StyledSquare>
      {props.value}
    </StyledSquare>
  );
}

function Log() {
  return (
    <ol>
      <li><button>Go to move</button></li>
    </ol>
  );
}

export default Game;