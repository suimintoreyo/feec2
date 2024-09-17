import React, { useState } from 'react';
import styles from './Chat.module.css'; // CSSをインポート

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      setMessages([...messages, inputValue]);
      setInputValue(''); // メッセージ送信後にフィールドをクリア
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h2 className={styles.chatTitle}>Chat</h2>
      <div className={styles.messageList}>
        {messages.map((message, index) => (
          <div key={index} className={styles.messageItem}>
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          className={styles.inputField}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
