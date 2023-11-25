function shuffleLetters() {
  const ab = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let letters = [];
  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < 10; j++) {
      const letter = ab[Math.floor(Math.random() * 26)];
      row.push(letter);
    }
    letters.push(row);
  }
  return letters;
}

function wordFitting(grid, words) {
  const directions = [
    { row: 1, col: 0 }, // up
    { row: 0, col: 1 }, // right
  ];

  const updatedGrid = [...grid];
  const updatedCoordinates = new Set();

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
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

        if (updatedCoordinates.has(`${row}-${col}`)) {
          wordFits = false;
          break;
        }
      }
      if (wordFits) {
        for (let i = 0; i < word.length; i++) {
          let row = randomRow + i * rowDirection;
          let col = randomCol + i * colDirection;
          updatedGrid[row][col] = word[i];
          updatedCoordinates.add(`${row}-${col}`);
        }
      }
    }
  }
  return { updatedGrid, updatedCoordinates };
}

function checkInput(coords, userInput) {
  //check each letter in userinput against the whole set of coords
  for (let i = 0; i < userInput.length; i++) {
    const letterCoord = userInput[i].pos;
    if (!coords.has(letterCoord)) {
      return false;
    }
  }
  return true;
}

function updatewordList(foundWords, words) {
  console.log(foundWords);
  return words.map((word) => {
    if (!foundWords.includes(word)) {
      return "_".repeat(word.length);
    }
    return word;
  });
}

function arraysEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

export { wordFitting, shuffleLetters, checkInput, updatewordList, arraysEqual };
