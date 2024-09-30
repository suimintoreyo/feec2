import React, { useState } from 'react';
import styles from './RegistrForm.module.css'; // CSSモジュールをインポート

const RegistrForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const handleRegistr = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with', { email, password, user});
  };

  return (
    <div className={styles['registr-container']}>
      <form onSubmit={handleRegistr} className={styles['registr-form']}>
        <h2 className={styles['registr-font']}>アカウント登録</h2>
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

        <div className={styles['form-group']}>
          <label htmlFor="user">ユーザー名</label>
          <input
            type="user"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles['registr-button']}>アカウント登録</button>
      </form>
    </div>
  );
};

export default RegistrForm;
