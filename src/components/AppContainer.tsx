import React, { useState, useEffect } from "react";
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
  const [player, setPlayer] = useState<boolean | null>(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("board") || "[]") as IBoard[];
    const player = !!localStorage.getItem("player");

    setBoard(saved);
    setPlayer(player);
  }, []);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
    localStorage.setItem("player", JSON.stringify(player));
  }, [board, player]);

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
