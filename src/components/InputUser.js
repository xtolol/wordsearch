import React, { useState } from "react";
import "./InputUser.css";
import { updatewordList, checkInput } from "../util/functions";
function InputUser(props) {
  const {
    userInput,
    userWords,
    words,
    foundWords,
    setfoundWords,
    setuserInput,
    setUserWords,
    coordinates,
  } = props;
  const joinedLetters = userInput.map((entry) => entry.let).join("");

  function checkHandler() {
    if (checkInput(coordinates, userInput)) {
      setfoundWords((prevfoundwords) => {
        const newFoundWords = [...prevfoundwords, joinedLetters];
        const newList = updatewordList(newFoundWords, words);
        setUserWords(newList);
        return newFoundWords;
      });
      setuserInput([]);
    }
  }

  return (
    <div className="answer-box">
      <label className="label-style" htmlFor="user-input">
        Select letters to form a word...
      </label>
      <input
        type="text"
        id="user-input"
        value={joinedLetters}
        className="input-style"
        readOnly
      />
      <button className="check-btn" onClick={checkHandler}>
        Check
      </button>
      {/* Assume 'Letter' component is where you click a letter and pass it to 'handleLetterClick' */}
      {/* <Letter onClick={(clickedLetter) => handleLetterClick(clickedLetter)} /> */}
    </div>
  );
}

export default InputUser;
