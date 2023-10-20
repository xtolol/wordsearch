import React from "react";
import Board from "./components/Board";
import InputUser from "./components/InputUser.js";

function App() {
  return (
    <div className="App">
      <h1>Word Search</h1>
      <Board numRows={10} numCols={10} />
      <InputUser />
    </div>
  );
}

export default App;
