"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './GameEdit.module.css';

const GameEdit: React.FC = () => {
  // ゲームデータ（仮）
  const [games, setGames] = useState([
    { id: 1, title: "ゲームタイトル 1" },
    { id: 2, title: "ゲームタイトル 2" },
    { id: 3, title: "ゲームタイトル 3" },
    { id: 4, title: "ゲームタイトル 4" },
    { id: 5, title: "ゲームタイトル 5" },
    { id: 6, title: "ゲームタイトル 6" },
    { id: 7, title: "ゲームタイトル 7" },
    { id: 8, title: "ゲームタイトル 8" },
    { id: 9, title: "ゲームタイトル 9" },
    { id: 10, title: "ゲームタイトル 10" },
  ]);

  // 編集中のゲームID、編集中の新タイトル、元のタイトルを管理
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [originalTitle, setOriginalTitle] = useState<string>(""); // 元のタイトルを保持
  const [errorMessage, setErrorMessage] = useState<string>("");

  // input要素への参照を保持
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ゲームを削除する関数
  const handleDelete = (id: number) => {
    setGames(games.filter((game) => game.id !== id));
  };

  // タイトルを編集モードにする関数
  const handleEditClick = (id: number, currentTitle: string) => {
    setEditingId(id);
    setNewTitle(currentTitle);
    setOriginalTitle(currentTitle); // 編集開始時の元のタイトルを保持
    setErrorMessage(""); // エラーメッセージをリセット
  };

  // 編集モードに切り替わった際に、自動で入力にフォーカスを与える
  useEffect(() => {
    if (editingId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  // タイトルの文字数制限を適用（50文字以上でエラーメッセージを表示）
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewTitle(value);
    if (value.length > 50) {
      setErrorMessage("タイトルは50文字以内で入力してください。");
    } else {
      setErrorMessage(""); // エラーメッセージをリセット
    }
  };

  // 編集を保存する関数
  const handleSaveEdit = (id: number) => {
    if (newTitle.trim() === "") {
      setErrorMessage("タイトルは空にできません。");
      return; // タイトルが空の場合、保存処理を中断
    }
    if (newTitle.length > 50) {
      setErrorMessage("タイトルは50文字以内にしてください。");
      return; // 50文字を超えている場合は保存しない
    }
    setGames(
      games.map((game) =>
        game.id === id ? { ...game, title: newTitle } : game
      )
    );
    setEditingId(null); // 編集モードを解除
    setErrorMessage(""); // エラーメッセージをリセット
  };

  // 編集をキャンセルする関数
  const handleCancelEdit = () => {
    setNewTitle(originalTitle); // 編集前のタイトルに戻す
    setEditingId(null); // 編集モードを解除
    setErrorMessage(""); // エラーメッセージをリセット
  };

  // フォーカスを外した際に自動的に保存
  const handleBlur = (id: number) => {
    handleSaveEdit(id); // フォーカスを外したときに保存
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>ゲーム管理画面</h1>

      {/* ゲームタイトルを表示 */}
      <div className={styles.container}>
        {games.map((game, index) => (
          <React.Fragment key={game.id}>
            <div className={styles.optionRow}>
              {/* 編集中の場合は入力フィールドを表示、それ以外はタイトルを表示 */}
              {editingId === game.id ? (
                <div className={styles.editField}>
                  <input
                    type="text"
                    ref={inputRef} // input要素にrefを設定
                    value={newTitle}
                    onChange={handleTitleChange}
                    onBlur={() => handleBlur(game.id)} // フォーカスを外した際に保存
                    className={styles.input}
                  />
                  <button
                    className={styles.cancelButton}
                    onClick={handleCancelEdit}
                  >
                    キャンセル
                  </button>
                  {errorMessage && (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                  )}
                </div>
              ) : (
                <span
                  className={styles.optionLabel}
                  onClick={() => handleEditClick(game.id, game.title)}
                >
                  {game.title}
                </span>
              )}

              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(game.id)}
              >
                削除
              </button>
            </div>
            {index < games.length - 1 && <hr className={styles.divider} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default GameEdit;
