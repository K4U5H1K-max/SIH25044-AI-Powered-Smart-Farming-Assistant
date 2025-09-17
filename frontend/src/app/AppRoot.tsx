"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../firebase";
import Login from "../components/Login";
import styles from "../components/Dashboard.module.css";
import LanguageSelection from "../components/LanguageSelection";
import Sidebar from "../components/Sidebar";
import ImageUpload from "../components/ImageUpload";
import SoilInfo from "../components/SoilInfo";
import Chatbot from "../components/Chatbot";
import { useRouter } from "next/navigation";

export default function AppRoot() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [language, setLanguage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
      if (!firebaseUser) {
        setLanguage(null); // Reset language on logout
      }
    });
    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-50">
        <span className="text-lg text-gray-600 animate-pulse">Loading...</span>
      </div>
    );
  }

  // Always require login before language selection
  if (!user) {
    return <Login onLogin={() => {}} />;
  }
  if (!language) {
    return <LanguageSelection onSelect={setLanguage} />;
  }

  return (
    <div className={styles.dashboardRoot}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <img src="/logo.jpg" alt="Logo" className={styles.logo} />
        <button className={styles.galleryBtn} onClick={() => router.push('/history')}>
          Gallary
        </button>
        <img src="/Gallary.png" alt="Gallery" className={styles.galleryImg} />
        <button className={`${styles.galleryBtn} ${styles.signOutBtn}`} onClick={() => { signOut(auth); }}>
          Sign Out
        </button>
      </aside>
      {/* Main Area */}
      <main className={styles.mainArea}>
        <div className={styles.chatbotContainer}>
          <Chatbot language={language} />
        </div>
      </main>
    </div>
  );
}
