import React, { useState } from 'react';
import styles from './LoginForm.module.css'; // CSSモジュールをインポート

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // ログイン処理をここに追加
    console.log('Logging in with', { email, password });
  };

  return (
    <div className={styles['login-container']}>
        <div className={styles['login-section']}>
      <form onSubmit={handleLogin} className={styles['login-form']}>
        <h2 className={styles['login-font']}>TypingGameに<br></br>ログイン</h2>
        <div className={styles['form-group']}>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles['login-button']}>ログイン</button>
      </form>
    </div>
    <div className={styles["divider"]}></div>
    <div className="additional-section">
    <h2 className={styles['login-font']}>はじめての方はこちら</h2>
    <button type="submit" className={styles['login-button']}>新規登録</button>
  </div>
      </div>

  );
};

export default LoginForm;
