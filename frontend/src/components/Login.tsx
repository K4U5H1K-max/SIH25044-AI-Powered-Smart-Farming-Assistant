import React, { useState } from 'react';
import styles from './Login.module.css';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import Head from 'next/head';

export default function Login({ onLogin }: { onLogin: () => void }) {
  function showPopup(msg: string) {
    const popup = document.createElement('div');
    popup.textContent = msg;
    popup.style.position = 'fixed';
    popup.style.top = '32px';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.background = 'rgba(30,40,30,0.98)';
    popup.style.color = '#fff';
    popup.style.padding = '1.1rem 2.2rem';
    popup.style.borderRadius = '1rem';
    popup.style.fontSize = '1.2rem';
    popup.style.fontWeight = 'bold';
    popup.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
    popup.style.zIndex = '9999';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.3s';
    document.body.appendChild(popup);
    setTimeout(() => { popup.style.opacity = '1'; }, 10);
    setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => { document.body.removeChild(popup); }, 400);
    }, 2600);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin();
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential') {
        setError('');
        showPopup('Invalid credentials. Please check your username and password.');
      } else {
        setError(err.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onLogin();
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential') {
        setError('');
        showPopup('Invalid credentials. Please check your username and password.');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Michroma&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.authBg}>
        <div className={styles.authCardHorizontal}>
          <div className={styles.authFormSection}>
            <h2 className={styles.loginTitleMichroma}>Login</h2>
            <form onSubmit={handleEmailAuth}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.inputField}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={styles.inputField}
                required
              />
              <div style={{ display: 'flex', gap: '4%', marginBottom: '1.2rem', justifyContent: 'flex-start' }}>
                <button type="submit" className={styles.submitBtnMichroma}>
                  {isSignUp ? 'Sign Up' : 'Login'}
                </button>
                <button type="button" onClick={handleGoogleLogin} className={styles.googleBtn}>
                  Sign in with Google
                </button>
              </div>
            </form>
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className={styles.switchBtn}
            >
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
            {error && <p className={styles.errorMsg}>{error}</p>}
          </div>
        </div>
        <div className={styles.logoFixedBottomLeft}>
          <div className={styles.logoBottomBox}>
            <img src="/logo.jpg" alt="Logo" className={styles.logoBottomImg} />
          </div>
        </div>
      </div>
    </>
  );
}
