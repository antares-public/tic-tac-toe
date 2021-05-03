import React from "react";
import styled from "styled-components";
import {IBoard} from "../utils/interfaces"
import {calculateWinner} from "../utils/winner"

type AppProps = {
  onClick: (index: number) => void
  board: IBoard[]
}

const App: React.FC<AppProps> = ({onClick, board}) => {
  const winner = calculateWinner(board)
  console.log(winner)

  return (
    <GameContainer>
      <Game>
        {board.map((value, index) => <Square onClick={onClick.bind(null, index)} key={index}>{value}</Square>)}
      </Game>
    </GameContainer>
  );
};

const Game = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  width: 500px;
  height: 500px;
`;

const GameContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

const Square = styled.button``;

export default App;

