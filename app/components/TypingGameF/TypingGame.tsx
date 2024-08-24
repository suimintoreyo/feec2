import React, { useState, useEffect } from "react";
import styles from "./TypingGame.module.css";
import Keyboard from './Keyboard';
import { words } from './words';  // 更新された words をインポート

function TypingGame() {
  const [inputValue, setInputValue] = useState("");
  const [currentWord, setCurrentWord] = useState({ display: "", typing: "" });
  const [timer, setTimer] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState<number[]>([]);
  const [isScoreUpdated, setIsScoreUpdated] = useState(false);

  // ゲームの初期化と単語の設定
  useEffect(function initializeWord() {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  // タイマーの管理
  useEffect(() => {
    let interval: number | undefined;  // Corrected type declaration
    if (isGameActive && timer > 0) {
      interval = window.setInterval(() => {  // Use window.setInterval for clarity
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

  
  // 入力処理
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);

    if (value.toLowerCase() === currentWord.typing.toLowerCase()) {
      setScore(function updateScore(prevScore) {
        return prevScore + 1;
      });
      setIsScoreUpdated(true);
      setTimeout(() => setIsScoreUpdated(false), 500); // アニメーション後にフラグをリセット
      setInputValue("");
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    }
  }

  // ゲーム開始
  function startGame() {
    setIsGameActive(true);
    setTimer(60);
    setScore(0);
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
  }

  // ゲーム終了
  function endGame() {
    setIsGameActive(false);
    updateHighScores(score);
  }

  // ハイスコアの更新
  function updateHighScores(newScore: number) {
    const updatedScores = [...highScores, newScore]
      .sort((a, b) => b - a)
      .slice(0, 5);
    setHighScores(updatedScores);
    localStorage.setItem("highScores", JSON.stringify(updatedScores));
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
            <p>単語: {currentWord.display}</p>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              disabled={!isGameActive}
            />
            <Keyboard />
          </div>
        ) : (
          <div>
            <button onClick={startGame}>ゲームスタート</button>
            <h2>リーダーボード</h2>
            <ol>
              {highScores.map((highScore, index) => (
                <li key={index}>スコア: {highScore}</li>
              ))}
            </ol>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default TypingGame;
