// TypingGame.tsx

import React from "react";
import styles from "./TypingGame.module.css";
import Keyboard from './Keyboard';
import { useTypingGameLogic } from './TypingGameLogic';

function TypingGame() {
  const { state, startGame, endGame } = useTypingGameLogic();
  const { currentWord, correctKey, incorrectKey, nextKey, score, isGameActive, timer } = state;

  return (
    <div className={styles.typingGameContainer}>
      <div>
        <h1>タイピングゲーム</h1>
        {isGameActive ? (
          <div>
            <p>残り時間: {timer}秒</p>
            <p className={styles.score}>現在のスコア: {score}</p>
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
