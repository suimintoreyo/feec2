import React from 'react';
import styles from './log.module.css';

// logEntries の型定義
type LogEntry = {
  message: string; // ユーザーの入力内容
  wordList: { display: string }[]; // 紐づけられた単語リスト（displayフィールドを含む）
};

type LogProps = {
  logEntries: LogEntry[]; // 複数のログエントリを受け取る
};

const Log: React.FC<LogProps> = ({ logEntries }) => {
  return (
    <div className={styles.logContainer}>
      <h2>ログ履歴</h2>
      <ul className={styles.logList}>
        {logEntries.length > 0 ? (
          logEntries.map((entry, index) => (
            <li key={index} className={styles.logItem}>
              <p>
                <strong>入力内容:</strong> {entry.message}
              </p>
              <p>
                <strong>単語リスト:</strong>{" "}
                {entry.wordList.map(word => word.display).join(", ")} {/* 単語リストの display フィールドを表示 */}
              </p>
            </li>
          ))
        ) : (
          <p>ログがありません</p> // ログがない場合の表示
        )}
      </ul>
    </div>
  );
};

export default Log;
