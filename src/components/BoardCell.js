import React from "react";
import "./Board.css";

export default function BoardCell(props) {
  return (
    <div class={props.color}>
      <div className="word-search-cell" key={props.key}>
        {props.letter}
      </div>
    </div>
  );
}
