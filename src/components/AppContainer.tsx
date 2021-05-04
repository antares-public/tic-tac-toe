import React, { useState } from "react";
import { IBoard } from "../utils/interfaces";
import App from "./App";

const AppContainer: React.FC = () => {
  const [board, setBoard] = useState<IBoard[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [player, setPlayer] = useState(true);

  const clickHandler = (index: number) => {
    setBoard((prev) => {
      const newStateBoard = prev.map((e, i) => {
        if (i === index) {
          if (player) {
            e = "x";
          } else {
            e = "o";
          }
          setPlayer((prev) => (prev = !prev));
        }

        return e;
      });

      return newStateBoard;
    });
  };

  return <App board={board} setBoard={setBoard} onClick={clickHandler} />;
};

export default AppContainer;
