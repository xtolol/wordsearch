import React, { useState } from "react";

function Letter(props) {
  const { letter, clickHandler, isUsed, pos } = props;
  const [isClicked, setIsClicked] = useState(false);
  const { userInput, setuserInput } = props;

  const handleClick = () => {
    if (userInput.find((obj) => obj.pos == pos) != undefined) {
      let editedArray = userInput.filter((obj) => obj.pos != pos);
      setuserInput(editedArray);
      setIsClicked(false);
    } else if (userInput.find((obj) => obj.pos == pos) == undefined) {
      // Invoke the click handler passed from the parent component
      clickHandler(letter, pos);
      // Update the state to mark the letter as clicked
      setIsClicked(true);
    }
  };

  return (
    <div
      className={`letter ${isClicked ? "clicked" : ""}`}
      onClick={handleClick}>
      <div className="word-search-cell">{letter}</div>
    </div>
  );
}

export default Letter;
