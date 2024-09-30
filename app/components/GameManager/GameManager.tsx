"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'; // Import Link for navigation
import styles from './GameManager.module.css';

const GameManager: React.FC = () => {
  // ゲームデータ（仮）
  const games = [
    { id: 1, title: "ゲームタイトル 1", link: "/GameEdit" },
    { id: 2, title: "ゲームタイトル 2", link: "/game/2" },
    { id: 3, title: "ゲームタイトル 3", link: "/game/3" },
    { id: 4, title: "ゲームタイトル 4", link: "/game/4" },
    { id: 5, title: "ゲームタイトル 5", link: "/game/5" },
    { id: 6, title: "ゲームタイトル 6", link: "/game/6" },
    { id: 7, title: "ゲームタイトル 7", link: "/game/7" },
    { id: 8, title: "ゲームタイトル 8", link: "/game/8" },
    { id: 9, title: "ゲームタイトル 9", link: "/game/9" },
    { id: 10, title: "ゲームタイトル 10", link: "/game/10" },
  ];

  // 各ゲームのドロップダウンメニューの表示状態を管理する
  const [visibleMenuId, setVisibleMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // メニューの表示・非表示を切り替える関数
  const toggleMenu = (id: number) => {
    setVisibleMenuId(visibleMenuId === id ? null : id);
  };

  // ドロップダウンメニュー外をクリックしたときにメニューを閉じる処理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setVisibleMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>ゲーム管理画面</h1>
  
      {/* タイトルの下にスクロール可能なコンテナを外枠で囲む */}
      <div className={styles.scrollOuterContainer}>
        <div className={styles.container}>
          {games.map((game, index) => (
            <React.Fragment key={game.id}>
              <div className={styles.outerContainer}>
                <div className={styles.optionRow}>
                  <Link href={game.link} className={styles.optionLabel}>
                    {game.title}
                  </Link>
                  <span className={styles.ellipsis} onClick={() => toggleMenu(game.id)}>...</span>
  
                  {/* ドロップダウンメニュー */}
                  {visibleMenuId === game.id && (
                    <div className={styles.dropdownMenu} ref={menuRef}>
                      <ul>
                        <li><Link href={`/edit/${game.id}`}>編集</Link></li>
                        <li><button onClick={() => console.log(`${game.title} を削除`)}>削除</button></li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {index < games.length - 1 && <hr className={styles.divider} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default GameManager;
