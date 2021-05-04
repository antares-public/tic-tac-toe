import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IBoard } from "../utils/interfaces";
import { calculateWinner } from "../utils/winner";

type AppProps = {
  onClick: (index: number) => void;
  board: IBoard[];
  setBoard: (value: React.SetStateAction<IBoard[]>) => void;
};

const WinnerWindow: React.FC<{
  winner: IBoard;
  setWinner: (value: React.SetStateAction<IBoard | null>) => void;
  setBoard: (value: React.SetStateAction<IBoard[]>) => void;
}> = ({ winner, setWinner, setBoard }) => {
  const gameAgain = () => {
    setWinner(null);
    setBoard(["", "", "", "", "", "", "", "", ""]);
  };

  return (
    <Modal>
      <ModalInner>
        <h1>Winner {winner}</h1>
        <button onClick={() => gameAgain()}>Game Again</button>
      </ModalInner>
    </Modal>
  );
};

const App: React.FC<AppProps> = ({ onClick, board, setBoard }) => {
  const [winner, setWinner] = useState<IBoard | null>(null);

  useEffect(() => {
    setWinner(calculateWinner(board));
  }, [board]);

  const checkImg = (value: IBoard) => {
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
      {winner && (
        <WinnerWindow
          winner={winner}
          setBoard={setBoard}
          setWinner={setWinner}
        />
      )}

      <Game>
        {board.map((value, index) => (
          <Square
            onClick={onClick.bind(null, index)}
            key={index}
            className={checkImg(value)}
          >
            <Image src={`/${checkImg(value)}.png`} alt="" />
          </Square>
        ))}
      </Game>
    </GameContainer>
  );
};

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

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

  background: rgba(65, 65, 65, 0.5);

  position: absolute;
  display: grid;
  place-items: center;
`;

const ModalInner = styled.div`
  position: absolute;
  background-color: #fff;

  text-align: center;
  padding: 20px 80px;
  border-radius: 2px;

  > h1 {
    text-transform: capitalize;
  }
  > button {
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-weight: 600;
    background-color: black;
    color: white;
  }
`;

export default App;
