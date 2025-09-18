"use client";
import React from "react";
import styles from "../../components/Dashboard.module.css";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div className={styles.dashboardPageRoot}>
      <h1 className={styles.dashboardPageTitle}>Dashboard</h1>
      <p className={styles.dashboardPageDesc}>Welcome to your smart farming dashboard!</p>
      <button
        className={styles.dashboardBackBtn}
        style={{ marginTop: "2.5rem" }}
        onClick={() => router.push("/")}
      >
        Back to Chat
      </button>
      {/* Add dashboard widgets or content here */}
    </div>
  );
}
