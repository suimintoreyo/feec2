// TypingGameLogic.ts

import { useState, useEffect } from "react";
import { generateWordList } from '../generateWordList'; // generateWordListをインポート

export interface TypingGameState {
  currentWord: { furigana: string; kanji: string; typing: string };
  correctKey: string | null;
  incorrectKey: string | null;
  nextKey: string;
  score: number;
  isGameActive: boolean;
  timer: number;
}

export function useTypingGameLogic() {
  const [wordList, setWordList] = useState<{ furigana: string; kanji: string; typing: string }[]>([]); // 単語リストのステート
  const [currentWord, setCurrentWord] = useState({ furigana: "", kanji: "", typing: "" });
  const [typedIndex, setTypedIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctKey, setCorrectKey] = useState<string | null>(null);
  const [incorrectKey, setIncorrectKey] = useState<string | null>(null);
  const [nextKey, setNextKey] = useState<string>(""); // 次にタイプすべきキー
  const [isGameActive, setIsGameActive] = useState(false);
  const [timer, setTimer] = useState(60);

  // 初期化時および新しい単語をセットした時に、次のキーをセットする
  useEffect(function initializeWord() {
    const generatedWords = generateWordList(); // generateWordList() を呼び出す
    setWordList(generatedWords); // 単語リストをステートにセット

    const newWord = generatedWords[Math.floor(Math.random() * generatedWords.length)];
    setCurrentWord(newWord);
    setNextKey(newWord.typing.charAt(0).toLowerCase());  // 最初のキーをセット
  }, []);

  // タイマー管理
  useEffect(() => {
    let interval: number | undefined;
    if (isGameActive && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      endGame();
    }
    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isGameActive, timer]);

  // キー押下時のロジック
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (!isGameActive) return;

      const key = event.key.toLowerCase();
      const expectedChar = currentWord.typing.charAt(typedIndex).toLowerCase();

      if (key === expectedChar) {
        setCorrectKey(key);
        setIncorrectKey(null);
        setTypedIndex((prevIndex) => prevIndex + 1);

        // 全ての文字をタイプした場合
        if (typedIndex + 1 === currentWord.typing.length) {
          setScore((prevScore) => prevScore + 1);
          const newWord = wordList[Math.floor(Math.random() * wordList.length)];
          setCurrentWord(newWord);
          setTypedIndex(0);
          setCorrectKey(null);
          setIncorrectKey(null);
          setNextKey(newWord.typing.charAt(0).toLowerCase());  // 新しい単語の最初のキーをセット
        } else {
          setNextKey(currentWord.typing.charAt(typedIndex + 1).toLowerCase()); // 次のキーを更新
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
  }, [isGameActive, currentWord, typedIndex, wordList]);

  function startGame() {
    setIsGameActive(true);
    setTimer(180);
    setScore(0);
    const newWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(newWord);
    setTypedIndex(0);
    setCorrectKey(null);
    setIncorrectKey(null);
    setNextKey(newWord.typing.charAt(0).toLowerCase());  // 最初のキーをセット
  }

  function endGame() {
    setIsGameActive(false);
  }

  return {
    state: {
      currentWord,
      correctKey,
      incorrectKey,
      nextKey,
      score,
      isGameActive,
      timer
    },
    startGame,
    endGame
  };
}
