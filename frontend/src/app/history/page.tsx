"use client";
import React from "react";
import styles from "../../components/Dashboard.module.css";
import { useRouter } from "next/navigation";

export default function GalleryPage() {
  const router = useRouter();
  return (
    <div className={styles.dashboardPageRoot}>
      <h1 className={styles.dashboardPageTitle}>Gallery History</h1>
      <p className={styles.dashboardPageDesc}>Your past images and history will appear here.</p>
      <button
        className={styles.dashboardBackBtn}
        style={{ marginTop: "2.5rem" }}
        onClick={() => router.push("/")}
      >
        Back to Chat
      </button>
      {/* TODO: Render actual history/images here */}
    </div>
  );
}
