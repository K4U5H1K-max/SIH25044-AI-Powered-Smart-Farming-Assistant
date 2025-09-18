import React from "react";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles["loader-bg"]}>
      <div className={styles.loader}>
        <div className={styles["loader-square"]}></div>
        <div className={styles["loader-square"]}></div>
        <div className={styles["loader-square"]}></div>
        <div className={styles["loader-square"]}></div>
        <div className={styles["loader-square"]}></div>
        <div className={styles["loader-square"]}></div>
        <div className={styles["loader-square"]}></div>
        <div className={styles["loader-square"]}></div>
      </div>
    </div>
  );
}
