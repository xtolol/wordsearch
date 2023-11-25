import "./GameOver.css";
import React from "react";
function GameOver(props) {
  let { startNewGame } = props;
  return (
    <div class="game-over">
      <h2>Game Over!</h2>
      <button className="game-button" onClick={() => startNewGame()}>
        Rematch
      </button>
    </div>
  );
}

export default GameOver;
