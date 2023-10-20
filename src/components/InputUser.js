import React from "react";
import "./InputUser.css";

function InputUser() {
  const getWords = () => {
    //Get Word from Input Box
    const word = document.querySelector("input").value;
    console.log(word);
  };
  return (
    <div className="answer-box">
      <div>
        <label className="label-style" htmlFor="user-input">
          Enter a word:
        </label>
      </div>
      <div>
        <input type="text" />
        <br />
      </div>
      <button className="check-btn" onClick={getWords}>
        Check
      </button>
    </div>
  );
}

export default InputUser;
