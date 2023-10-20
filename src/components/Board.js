import React, { useState, useEffect } from "react";
import "./Board.css";
import Axios from "axios";

//Framework for adding words to the board:
// 1. Create a grid of random letters
// 1.1 Create a set of used coordinates
// 2. For word in words:
//    a. Find a random starting point
//    b. Find a random direction by generating a random number between 0 and 3
// b.1. If the direction is 0, go up
// b.2. If the direction is 1, go right
// b.3. If the direction is 2, go down
// b.4. If the direction is 3, go left
//    c. Check if the word fits in the grid and doesn't overlap with any other words
//    d. If the word fits, add it to the grid and add the coordinates to the set of used coordinates
//    e. If the word doesn't fit, try again
// 3. Return the grid

const WordSearchBoard = () => {
  //Initialize set of used coordinates

  const usedCoordinates = new Set();
  const [words, setWords] = useState([]);
  useEffect(() => {
    Axios.get("https://random-word-api.vercel.app/api?words=5&length=4").then(
      (response) => {
        setWords(response.data);
      }
    );
  }, []);
  //Make Uppercase
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].toUpperCase();
  }
  console.log(words);
  let randomGrid = [];
  // Initialize the grid with random letters
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      const randomLetter =
        alphabet[Math.floor(Math.random() * alphabet.length)];
      row.push(randomLetter);
    }
    randomGrid.push(row);
  }

  const [grid, setGrid] = useState(() => randomGrid);

  //Create array of objects that has row and col directions
  let newGrid = [...grid];
  const directions = [
    { row: 1, col: 0 }, // up
    { row: 0, col: 1 }, // right
  ];

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    console.log(word);
    let wordFits = false;
    while (!wordFits) {
      let randomRow = Math.floor(Math.random() * 10);
      let randomCol = Math.floor(Math.random() * 10);
      let randomDirection = Math.floor(Math.random() * 2);
      let rowDirection = directions[randomDirection].row;
      let colDirection = directions[randomDirection].col;

      wordFits = true;
      for (let i = 0; i < word.length; i++) {
        let row = randomRow + i * rowDirection;
        let col = randomCol + i * colDirection;

        if (row < 0 || row >= 10 || col < 0 || col >= 10) {
          wordFits = false;
          break;
        }

        if (usedCoordinates.has(`${row}-${col}`)) {
          wordFits = false;
          break;
        }
      }
      if (wordFits) {
        for (let i = 0; i < word.length; i++) {
          let row = randomRow + i * rowDirection;
          let col = randomCol + i * colDirection;
          newGrid[row][col] = word[i];
          usedCoordinates.add(`${row}-${col}`);
        }
      }
    }
  }
  randomGrid = [...newGrid];

  // ...

  // Generate the board

  //Change background color of all used coordinates
  const board = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      const isUsed = usedCoordinates.has(`${i}-${j}`);
      const color = isUsed ? "used" : "default";
      const cell = (
        <div className={color} key={`${i}-${j}`}>
          <div key={`${i}-${j}`} className="word-search-cell">
            {grid[i][j]}
          </div>
        </div>
      );
      row.push(cell);
    }
    board.push(
      <div key={i} className="word-search-row">
        {row}
      </div>
    );
  }
  return <div className="word-search-board">{board}</div>;
};

export default WordSearchBoard;
