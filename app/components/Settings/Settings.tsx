import { useState } from "react";
import styles from "./Settings.module.css";

const Settings = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState("general");

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>設定</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <div className={styles.body}>
          <div className={styles.sidebar}>
            <button
              className={`${styles.tabButton} ${activeTab === "general" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("general")}
            >
              一般
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "appearance" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("appearance")}
            >
              外観
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "security" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("security")}
            >
              セキュリティ
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "personalize" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("personalize")}
            >
              パーソナライズ
            </button>
          </div>
          <div className={styles.content}>
            {activeTab === "general" && (
              <>
                <div className={styles.section}>
                  <label className={styles.label}>
                    言語
                  </label>
                  <select className={styles.input}>
                    <option value="auto">自動検出</option>
                    <option value="ja">日本語</option>
                    <option value="en">英語</option>
                  </select>
                </div>
                <div className={styles.section}>
                  <label className={styles.label}>
                    すべて削除する
                  </label>
                  <button className={styles.deleteAllButton}>削除</button>
                </div>
              </>
            )}
            {activeTab === "appearance" && (
              <>
                <div className={styles.section}>
                  <label className={styles.label}>
                    テーマ
                  </label>
                  <select className={styles.input}>
                    <option value="system">システム</option>
                    <option value="dark">ダーク</option>
                    <option value="light">ライト</option>
                  </select>
                </div>
              </>
            )}
            {activeTab === "security" && (
              <>
                <div className={styles.section}>
                  <label className={styles.label}>
                    データアナリストの使用中は常にコードを表示する
                  </label>
                  <input type="checkbox" className={styles.input} />
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.footer}>
          <button className={styles.archiveButton}>左ボタン</button>
          <button className={styles.deleteButton}>右ボタン</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
