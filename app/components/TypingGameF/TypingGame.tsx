// TypingGame.tsx

import React, { useState, useEffect } from "react";
import styles from "./TypingGame.module.css";
import Keyboard from './Keyboard';
import { words } from './words';

function TypingGame() {
  const [currentWord, setCurrentWord] = useState({ furigana: "", kanji: "", typing: "" });
  const [timer, setTimer] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [isScoreUpdated, setIsScoreUpdated] = useState(false);
  const [correctKey, setCorrectKey] = useState<string | null>(null);
  const [incorrectKey, setIncorrectKey] = useState<string | null>(null);
  const [typedIndex, setTypedIndex] = useState(0);  // キーをタイプした位置を管理

  // 次に押すべきキーを取得
  const nextKey = currentWord.typing.charAt(typedIndex).toLowerCase();

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

  // キー押下時に直接判定を行う関数
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (!isGameActive) return;

      const key = event.key.toLowerCase();
      const expectedChar = currentWord.typing.charAt(typedIndex).toLowerCase();

      if (key === expectedChar) {
        setCorrectKey(key);
        setIncorrectKey(null);
        setTypedIndex((prevIndex) => prevIndex + 1);

        // すべての文字をタイプした場合
        if (typedIndex + 1 === currentWord.typing.length) {
          setScore((prevScore) => prevScore + 1);
          setIsScoreUpdated(true);
          setTimeout(() => setIsScoreUpdated(false), 500);
          setTypedIndex(0);  // 次の単語のためにリセット
          setCurrentWord(words[Math.floor(Math.random() * words.length)]);
          setCorrectKey(null);
          setIncorrectKey(null);
        }
      } else {
        setIncorrectKey(key);
        setCorrectKey(null);
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isGameActive, typedIndex, currentWord]);

  function startGame() {
    setIsGameActive(true);
    setTimer(60);
    setScore(0);
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    setCorrectKey(null);
    setIncorrectKey(null);
    setTypedIndex(0);
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
            {/* フリガナ */}
            <p>{currentWord.furigana}</p>
            {/* 交じりテキスト */}
            <p>{currentWord.kanji}</p> 
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
