"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../firebase";
import Login from "../components/Login";
import styles from "../components/Dashboard.module.css";
import LanguageSelection from "../components/LanguageSelection";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import HistoryPanel from "../components/HistoryPanel";
import ImageUpload from "../components/ImageUpload";
import SoilInfo from "../components/SoilInfo";
import Chatbot from "../components/Chatbot";
import { useRouter } from "next/navigation";

export default function AppRoot() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [language, setLanguage] = useState<string | null>(null);
  const [showLang, setShowLang] = useState(false);
  const [swipe, setSwipe] = useState<'login'|'lang'>('login');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const router = useRouter();

  // Restore state from localStorage on mount
  useEffect(() => {
    const savedPage = localStorage.getItem('app_page');
    const savedLang = localStorage.getItem('app_language');
    if (savedPage === 'lang') {
      setSwipe('lang');
      setShowLang(true);
    }
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    if (!user) {
      localStorage.setItem('app_page', 'login');
    } else if (!language) {
      localStorage.setItem('app_page', 'lang');
    } else {
      localStorage.setItem('app_page', 'dashboard');
    }
    if (language) {
      localStorage.setItem('app_language', language);
    } else {
      localStorage.removeItem('app_language');
    }
  }, [user, language]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
      if (!firebaseUser) {
        setLanguage(null); // Reset language on logout
        setShowLang(false); // Reset language selection visibility
        setSwipe('login'); // Reset swipe state to login
        localStorage.setItem('app_page', 'login');
        localStorage.removeItem('app_language');
      }
    });
    return () => unsubscribe();
  }, []);

  if (authLoading || loading) {
    return <Loader />;
  }

  // Always require login before language selection
  if (!user) {
    return <Login onLogin={() => {
      setLoading(true);
      setTimeout(() => {
        setShowLang(true);
        setSwipe('lang');
        setLoading(false);
        localStorage.setItem('app_page', 'lang');
      }, 1000);
    }} />;
  }
  if (!language) {
    return <LanguageSelection onSelect={(lang) => {
      setLoading(true);
      setTimeout(() => {
        setLanguage(lang);
        setLoading(false);
        localStorage.setItem('app_page', 'dashboard');
        localStorage.setItem('app_language', lang);
      }, 1000);
    }} />;
  }

  return (
    <div className={styles.dashboardRoot}>
      {/* History Button Top Right */}
      {!historyOpen && (
        <button
          className={styles.historyBtn}
          style={{ position: 'absolute', top: 24, right: 24, zIndex: 20, padding: 0, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setHistoryOpen(true)}
          aria-label="Open history"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </button>
      )}
      {historyOpen && (
        <button
          className={styles.historyBtn}
          style={{ position: 'absolute', top: 24, right: 24, zIndex: 40, padding: 0, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setHistoryOpen(false)}
          aria-label="Close history"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      )}
      {/* Menu Button */}
      <button
        className={styles.menuBtn}
        aria-label="Open menu"
        onClick={() => setSidebarOpen((v) => !v)}
        style={{ position: 'absolute', top: 24, left: 24, zIndex: 20 }}
      >
        <span style={{ display: 'block', width: 32, height: 32 }}>
          <span style={{
            display: 'block',
            width: 32,
            height: 4,
            background: '#222',
            borderRadius: 2,
            marginBottom: 6
          }} />
          <span style={{
            display: 'block',
            width: 32,
            height: 4,
            background: '#222',
            borderRadius: 2,
            marginBottom: 6
          }} />
          <span style={{
            display: 'block',
            width: 32,
            height: 4,
            background: '#222',
            borderRadius: 2
          }} />
        </span>
      </button>
      {/* Sidebar Slide-in */}
      <aside
        className={
          styles.sidebar + ' ' + (sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed)
        }
        style={{ zIndex: 15 }}
      >
        <div className={sidebarOpen ? styles.sidebarContentOpen : styles.sidebarContentClosed}>
          <button className={styles.galleryBtn} onClick={() => router.push('/dashboard')}>
            Dashboard
          </button>
          <button className={styles.galleryBtn} onClick={() => router.push('/history')}>
            Gallery
          </button>
          <button className={styles.galleryBtn} onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLanguage(null);
              setShowLang(true);
              setSwipe('lang');
              setLoading(false);
              localStorage.setItem('app_page', 'lang');
            }, 1000);
          }}>
            Change Language
          </button>
          <button className={`${styles.galleryBtn} ${styles.signOutBtn}`} onClick={() => { signOut(auth); }}>
            Sign Out
          </button>
        </div>
      </aside>
      {/* Main Area */}
      <main className={
        styles.mainArea + ' ' + (sidebarOpen ? styles.mainAreaSidebarOpen : styles.mainAreaSidebarClosed)
      }>
        <div className={styles.chatbotContainer}>
          <Chatbot language={language} />
        </div>
        {/* Sliding History Panel */}
        <div className={
          styles.historyPanel + ' ' + (historyOpen ? styles.historyPanelOpen : '')
        }>
          {historyOpen && <HistoryPanel onClose={() => setHistoryOpen(false)} hideCloseBtn />}
        </div>
      </main>
    </div>
  );
}
