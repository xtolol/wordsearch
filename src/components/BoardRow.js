import React from "react";
import "./Board.css";
import BoardCell from "./BoardCell";

export default function BoardRow(props) {
  let rowArray = [];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () =>
    alphabet[Math.floor(Math.random() * alphabet.length)];

  for (let i = 0; i < props.col; i++) {
    const cell = <BoardCell>{() => randomLetter}</BoardCell>;
    rowArray.push(cell);
  }
  return <div className="word-search-row">{rowArray}</div>;
}
