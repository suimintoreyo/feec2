import React, { useState } from 'react';
import styles from './chat.module.css';
import { generateWordList } from '../WordList';

type ChatProps = {
  logEntries: { message: string; wordList: { display: string }[] }[]; // ログエントリの型
  setLogEntries: React.Dispatch<React.SetStateAction<{ message: string; wordList: { display: string }[] }[]>>; // ログエントリを更新するための関数
};

const Chat: React.FC<ChatProps> = ({ logEntries, setLogEntries }) => {
  const [message, setMessage] = useState<string>(''); // 最新の入力内容のみ保持
  const [inputValue, setInputValue] = useState<string>(''); 
  const [wordList, setWordList] = useState<{ display: string }[]>([]); // 単語リストのステート

  // 入力値をセットし、最新の入力内容を更新、単語リストを生成
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      const newWordList = generateWordList().map((word) => ({ display: word.display }));

      // 最新の入力内容を上書き
      setMessage(inputValue);
      setWordList(newWordList);

      // 入力内容と単語リストをログに追加
      setLogEntries([...logEntries, { message: inputValue, wordList: newWordList }]);

      // 入力フィールドをクリア
      setInputValue('');
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h2 className={styles.chatTitle}>チャット</h2>

      {/* メッセージと単語リストを区切り付きで表示 */}
      <div className={styles.divider}>
        <div className={styles.messageList}>
          <h3>入力内容</h3>
          {/* 最新のメッセージのみ表示 */}
          {message && (
            <div className={styles.messageItem}>
              {message}
            </div>
          )}
        </div>
        <h3>単語リスト</h3>
        <div className={styles.wordList}>
          {wordList.map((word, index) => (
            <div key={index} className={styles.wordItem}>
              {word.display}
            </div>
          ))}
        </div>
      </div>

      {/* 入力フォームとボタン */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.inputField}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className={styles.button}>生成</button> {/* 生成ボタンで処理を実行 */}
        <button type="button" className={styles.button}>決定</button>
      </form>
    </div>
  );
};

export default Chat;
