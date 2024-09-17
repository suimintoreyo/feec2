import React, { useState } from 'react';
import styles from './chatlist.module.css';
import { generateWordList } from '../generateWordList'; // 修正

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [wordList, setWordList] = useState<{ display: string }[]>([]); // 単語リストのステート

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');
      setWordList(generateWordList().map((word) => ({ display: word.display }))); // display のみ取得
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h2 className={styles.chatTitle}>チャット</h2>

      {/* メッセージと単語リストを区切り付きで表示 */}
      <div className={styles.divider}>
        <div className={styles.messageList}>
          <h3>入力内容</h3>
          {messages.map((message, index) => (
            <div key={index} className={styles.messageItem}>
              {message}
            </div>
          ))}
        </div>
        <h3>単語リスト</h3>
        <div className={styles.wordList}>
          {wordList.map((word, index) => (
            <div key={index} className={styles.wordItem}>
              {word.display} {/* display のみ表示 */}
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
        <button type="submit" className={styles.button}>生成</button>
        <button type="button" className={styles.button}>決定</button>
      </form>
    </div>
  );
};

export default Chat;
