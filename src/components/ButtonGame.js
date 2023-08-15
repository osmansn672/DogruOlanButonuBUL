import React, { useState, useEffect } from "react";
import "./ButtonGame.css";

const ButtonGame = () => {
  const gridRows = 9;
  const gridCols = 9;
  const totalButtons = gridRows * gridCols;

  const [buttons, setButtons] = useState([]);
  const [correctButtonIndex, setCorrectButtonIndex] = useState(-1);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    generateButtons();
  }, []);

  const generateButtons = () => {
    const correctIndex = Math.floor(Math.random() * totalButtons);
    setCorrectButtonIndex(correctIndex);

    const newButtons = Array.from({ length: totalButtons }, (_, index) => ({
      text: "Yanlış",
      isDisabled: false
    }));
    newButtons[correctIndex].text = "Yanlış";

    setButtons(newButtons);
  };

  const handleButtonClick = (index) => {
    if (isGameOver) return;

    if (index === correctButtonIndex) {
      setIsGameOver(true);
      const updatedButtons = buttons.map((button, i) =>
        i === index ? { ...button, isDisabled: true } : button
      );
      setButtons(updatedButtons);
    } else {
      const updatedButtons = buttons.map((button, i) =>
        i === index ? { ...button, isDisabled: true } : button
      );
      setButtons(updatedButtons);
    }
  };

  const handleRestart = () => {
    setIsGameOver(false);
    generateButtons();
  };

  return (
    <div className="button-game-container">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          className={button.isDisabled ? "disabled" : ""}
        >
          {button.text}
        </button>
      ))}
      {isGameOver && (
        <div className="game-over">
          <p>Oyun Bitti!</p>
          <button onClick={handleRestart}>Yeniden Başlat</button>
        </div>
      )}
    </div>
  );
};

export default ButtonGame;
