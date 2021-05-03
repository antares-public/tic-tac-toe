import React from "react";
import styled from "styled-components";
import { IBoard } from "../utils/interfaces";
import { calculateWinner } from "../utils/winner";

type AppProps = {
  onClick: (index: number) => void;
  board: IBoard[];
  player: boolean;
};

const WinnerWindow: React.FC = () => {
  return (
    <Modal>
      <ModalInner>
        <h1>Winner X</h1>
        <button>back</button>
      </ModalInner>
    </Modal>
  );
};

const App: React.FC<AppProps> = ({ onClick, board, player }) => {
  const winner = calculateWinner(board);

  const checkImg = (value: string) => {
    switch (value) {
      case "x":
        return "cross";
      case "o":
        return "zero";
      default:
        return "bg";
    }
  };

  return (
    <GameContainer>
      {winner && <WinnerWindow />}

      <Game>
        {board.map((value, index) => (
          <Square
            onClick={onClick.bind(null, index)}
            key={index}
            className={checkImg(value.toString())}
          >
            <img src={`/${checkImg(value.toString())}.png`} alt="" />
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

const Modal = styled.div`
  height: 100%;
  width: 100%;

  background: rgba(245, 245, 245, 0.5);

  position: absolute;
  display: grid;
  place-items: center;
`;

const ModalInner = styled.div``;

export default App;
