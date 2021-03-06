import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IBoard } from "../utils/interfaces";
import { calculateWinner } from "../utils/winner";

import bg from "../assets/bg.png";
import cross from "../assets/cross.png";
import zero from "../assets/zero.png";

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
        {winner === "Drawn" ? <h1>{winner}</h1> : <h1>Winner {winner}</h1>}
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
        return cross;
      case "o":
        return zero;
      default:
        return bg;
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
            src={checkImg(value)}
          ></Square>
        ))}
      </Game>
    </GameContainer>
  );
};

const Game = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);

  height: 315px;
`;

const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

const Square = styled.img`
  border: none;
  border-radius: 20px;
  width: 95px;
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
  border-radius: 5px;

  > h1 {
    text-transform: capitalize;
    margin: 0 0 5px 0;
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
