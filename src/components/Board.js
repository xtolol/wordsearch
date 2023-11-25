import "./Board.css";
import "./Letter";
import Letter from "./Letter";

const WordSearchBoard = (props) => {
  const { userInput, setuserInput } = props;
  const { clickHandler } = props;
  const { board, coords } = props;

  return (
    <div className="word-search-board">
      {board.map(function (row, rowIndex) {
        return (
          <div className="word-search-row" key={rowIndex}>
            {row.map(function (letter, index) {
              const coord = `${rowIndex}-${index}`;
              const isUsed = coords.has(coord) ? true : false;
              return (
                <Letter
                  letter={letter}
                  key={index}
                  pos={coord}
                  isUsed={isUsed}
                  clickHandler={clickHandler}
                  userInput={userInput}
                  setuserInput={setuserInput}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default WordSearchBoard;
