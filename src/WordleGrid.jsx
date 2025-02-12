import React, { useState } from "react";

const WordleGrid = () => {
  const rows = 6;
  const columns = 5;
  const emptyGrid = Array.from({ length: rows }, ()=>    Array(columns).fill("")
  );

  const [grid, setGrid] = useState(emptyGrid);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");

  const handleKeyPress = (event) => {
    if (currentRow >= rows) return;

    if (event.key === "Enter") {
      if (currentGuess.length === columns) {
        const newGrid = [...grid];
        newGrid[currentRow] = currentGuess.split("");
        setGrid(newGrid);
        setCurrentRow(currentRow + 1);
        setCurrentGuess("");
      }
    } else if (event.key === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(event.key)) {
      if (currentGuess.length < columns) {
        setCurrentGuess(currentGuess + event.key.toUpperCase());
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentGuess, currentRow]);

  return (
    <div className="grid grid-rows-6 gap-2 p-4">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-2">
          {row.map((letter, colIndex) => (
            <div
              key={colIndex}
              className="w-16 h-16 background-blue border-2 border-gray-300 flex items-center justify-center text-2xl font-bold"
            >
              {rowIndex === currentRow && colIndex < currentGuess.length
                ? currentGuess[colIndex]
                : letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordleGrid;


/* function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Fuddle Puzzle</h1>
    </div>
  );
}

export default App; */
