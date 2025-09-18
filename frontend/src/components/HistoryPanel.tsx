import React from "react";
import styles from "../components/Dashboard.module.css";

export default function HistoryPanel({ onClose, hideCloseBtn }: { onClose: () => void, hideCloseBtn?: boolean }) {
  return (
    <div className={styles.historyPanel}>
      {!hideCloseBtn && (
        <button className={styles.closeHistoryBtn} onClick={onClose}>&times;</button>
      )}
      <h1 className={styles.historyTitle}>Gallery History</h1>
      <p className={styles.historyDesc}>Your past images and history will appear here.</p>
      {/* TODO: Render actual history/images here */}
    </div>
  );
}
