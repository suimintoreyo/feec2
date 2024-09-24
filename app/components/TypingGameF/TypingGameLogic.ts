import { useState, useEffect } from "react";
import { generateWordList } from '../WordList';
import { romajiTable } from '../Table/table'; // Import the table

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
  const [wordList, setWordList] = useState<{ furigana: string; kanji: string; typing: string }[]>([]);
  const [currentWord, setCurrentWord] = useState({ furigana: "", kanji: "", typing: "" });
  const [typedIndex, setTypedIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctKey, setCorrectKey] = useState<string | null>(null);
  const [incorrectKey, setIncorrectKey] = useState<string | null>(null);
  const [nextKey, setNextKey] = useState<string>(""); 
  const [isGameActive, setIsGameActive] = useState(false);
  const [timer, setTimer] = useState(60);

  // ローマ字の変換ルールはtable.tsxから参照
  const romajiVariations = (char: string) => {
    return romajiTable[char] || [char]; 
  };

  useEffect(function initializeWord() {
    const generatedWords = generateWordList();
    setWordList(generatedWords);

    const newWord = generatedWords[Math.floor(Math.random() * generatedWords.length)];
    setCurrentWord(newWord);
    setNextKey(newWord.typing.charAt(0).toLowerCase());
  }, []);

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

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (!isGameActive) return;

      const key = event.key.toLowerCase();
      const expectedSegment = currentWord.typing.substring(typedIndex).toLowerCase();
      const maxLength = Math.min(3, expectedSegment.length);

      let matched = false;

      for (let length = 1; length <= maxLength; length++) {
        const expectedChar = expectedSegment.substring(0, length);
        const expectedCharVariations = romajiVariations(expectedChar);

        if (expectedCharVariations.includes(key)) {
          matched = true;
          setCorrectKey(key);
          setIncorrectKey(null);
          setTypedIndex((prevIndex) => prevIndex + length);

          if (typedIndex + length === currentWord.typing.length) {
            setScore((prevScore) => prevScore + 1);
            const newWord = wordList[Math.floor(Math.random() * wordList.length)];
            setCurrentWord(newWord);
            setTypedIndex(0);
            setCorrectKey(null);
            setIncorrectKey(null);
            setNextKey(newWord.typing.charAt(0).toLowerCase());
          } else {
            setNextKey(currentWord.typing.charAt(typedIndex + length).toLowerCase());
          }
          break;
        }
      }

      if (!matched) {
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
    setNextKey(newWord.typing.charAt(0).toLowerCase());
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
