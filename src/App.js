import React from "react";
import InputUser from "./components/InputUser.js";
import { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import "./components/WordList.css";
import WordSearchBoard from "./components/Board.js";
import { shuffleLetters, wordFitting, arraysEqual } from "./util/functions.js";
import GameOver from "./components/GameOver.js";

function App() {
  const [words, setWords] = useState([]);
  const [userWords, setUserWords] = useState([]);
  const [grid, setGrid] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [foundWords, setfoundWords] = useState([]);
  const [userInput, setuserInput] = useState([]);

  function letterHandler(letter, coords) {
    //Check if letter has already been clicked
    setuserInput((prevuserInput) => {
      const newEntry = { let: letter, pos: coords };
      return [...prevuserInput, newEntry];
    });
  }

  // Function to start a new game
  const startNewGame = () => {
    let wordArray = [];
    const requests = [];

    for (let i = 0; i < 2; i++) {
      const randomwordLength = Math.floor(Math.random() * (6 - 3) + 3);
      let link =
        "https://random-word-api.vercel.app/api?words=1&length=" +
        randomwordLength;

      requests.push(
        Axios.get(link).then((response) => {
          wordArray[i] = response.data[0].toUpperCase();
        })
      );
    }

    Promise.all(requests).then(() => {
      setWords(wordArray);
      const dashWord = wordArray.map((word) => "_".repeat(word.length));
      setUserWords(dashWord);
    });
  };

  function checkHandler(userInput) {
    //Loop through userinput,
  }

  const randomGrid = shuffleLetters();

  useEffect(() => {
    startNewGame();
  }, []);

  console.log(userWords);
  console.log(words);

  const { updatedGrid, updatedCoordinates } = useMemo(
    () => wordFitting(randomGrid, words),
    [words]
  );

  useEffect(() => {
    setBoard(updatedGrid, updatedCoordinates);
  }, [words]);

  function setBoard(grid, coord) {
    setGrid(grid);
    setCoordinates(coord);
  }
  //PlaceWords

  console.log("rendered");
  return (
    <div className="App">
      <h1>Word(search)le</h1>
      <div className="tracker-container">
        {userWords.map((word, index) => (
          <p key={index}>{word}</p>
        ))}
      </div>
      {arraysEqual(userWords, words) && (
        <GameOver startNewGame={startNewGame} />
      )}
      <WordSearchBoard
        words={words}
        userInput={userInput}
        clickHandler={letterHandler}
        board={grid}
        coords={coordinates}
        setuserInput={setuserInput}
      />
      <InputUser
        userInput={userInput}
        userWords={userWords}
        words={words}
        foundWords={foundWords}
        coordinates={coordinates}
        setUserWords={setUserWords}
        setuserInput={setuserInput}
        setfoundWords={setfoundWords}
      />
    </div>
  );
}

export default App;
