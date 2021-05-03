import React from "react";
import styled from "styled-components";
import { IBoard } from "../utils/interfaces";
import { calculateWinner } from "../utils/winner";

type AppProps = {
  onClick: (index: number) => void;
  board: IBoard[];
  player: boolean;
};

const App: React.FC<AppProps> = ({ onClick, board, player }) => {
  const winner = calculateWinner(board);
  console.log(winner);

  const classes = (value: string) => {
    if (value === "x") {
      return "x";
    } else if (value === "0") {
      return "o";
    }
    return "";
  };

  const classess = (value: string) => {
    if (value === "x") {
      return "/cross.png";
    } else if (value === "0") {
      return "/zero.png";
    }
    return "";
  };

  return (
    <GameContainer>
      <Game>
        {board.map((value, index) => (
          <Square
            onClick={onClick.bind(null, index)}
            key={index}
            className={classes(value.toString())}
          >
            <img src={classess(value.toString())} />
          </Square>
        ))}
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

const Square = styled.button`
  background-color: #78bec5;
  border: none;
  margin: 5px;
  border-radius: 20px;
`;

export default App;
