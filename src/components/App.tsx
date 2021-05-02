import React, { useState } from "react";
import styled from "styled-components";

interface IBoard {
  [index: number]: string;
}

const App: React.FC = () => {
  const [board, setBoard] = useState<IBoard[]>([
    "", "", "", 
    "", "", "",
    "", "", ""
  ]);
  const [player, setPlayer] = useState(true)

  const clickHandler = (index: number) => {
    setBoard(prev => {
      const newStateBoard = prev.map((e, i) => {
        if (i === index) {
          if (player) {
            e = "x"
          } else {
            e = "0"
          }
          setPlayer(prev => prev = !prev)
          console.log(player)
        }

        return e
      })
    
      return newStateBoard
    })
  }

  return (
    <Game>
      {board.map((value, index) => <Square onClick={clickHandler.bind(null, index)} key={index}>{value}</Square>)}
    </Game>
  );
};

const Game = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  width: 500px;
  height: 500px;
`;
const Square = styled.button``;

export default App;
