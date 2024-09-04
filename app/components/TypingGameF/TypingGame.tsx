import React, { useState, useEffect } from "react";
import styles from "./TypingGame.module.css";
import Keyboard from './Keyboard';
import { words } from './words';

function TypingGame() {
  const [inputValue, setInputValue] = useState("");
  const [currentWord, setCurrentWord] = useState({ furigana: "", kanji: "", typing: "" });
  const [timer, setTimer] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [isScoreUpdated, setIsScoreUpdated] = useState(false);
  const [correctKey, setCorrectKey] = useState<string | null>(null);
  const [incorrectKey, setIncorrectKey] = useState<string | null>(null);

  // 次に押すべきキーを取得
  const nextKey = currentWord.typing.charAt(inputValue.length).toLowerCase();

  useEffect(function initializeWord() {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  useEffect(() => {
    let interval: number | undefined;
    if (isGameActive && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (!isGameActive || timer === 0) {
      if (interval !== undefined) {
        clearInterval(interval);
      }
      if (timer === 0) {
        endGame();
      }
    }
    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isGameActive, timer]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const lastChar = value.slice(-1).toLowerCase();
    const expectedChar = currentWord.typing.charAt(inputValue.length).toLowerCase();

    if (lastChar === expectedChar) {
      setCorrectKey(lastChar);
      setIncorrectKey(null);
    } else {
      setIncorrectKey(lastChar);
      setCorrectKey(null);
    }

    setInputValue(value);

    if (value.toLowerCase() === currentWord.typing.toLowerCase()) {
      setScore((prevScore) => prevScore + 1);
      setIsScoreUpdated(true);
      setTimeout(() => setIsScoreUpdated(false), 500);
      setInputValue("");
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
      setCorrectKey(null);
      setIncorrectKey(null);
    }
  }

  function startGame() {
    setIsGameActive(true);
    setTimer(60);
    setScore(0);
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    setCorrectKey(null);
    setIncorrectKey(null);
  }

  function endGame() {
    setIsGameActive(false);
  }

  return (
    <div className={styles.typingGameContainer}>
      <div>
        <h1>タイピングゲーム</h1>
        {isGameActive ? (
          <div>
            <p>残り時間: {timer}秒</p>
            <p className={`${styles.score} ${isScoreUpdated ? styles.scoreUpdate : ""}`}>
              現在のスコア: {score}
            </p>
            <p>フリガナ: {currentWord.furigana}</p>
            <p>漢字交じり文: {currentWord.kanji}</p>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              disabled={!isGameActive}
            />
            <Keyboard correctKey={correctKey} incorrectKey={incorrectKey} nextKey={nextKey} />
          </div>
        ) : (
          <div>
            <button onClick={startGame}>ゲームスタート</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TypingGame;
