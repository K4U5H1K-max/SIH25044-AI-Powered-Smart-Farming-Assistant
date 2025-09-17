
import React, { useState } from 'react';
import styles from './Login.module.css';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import Head from 'next/head';

export default function Login({ onLogin }: { onLogin: () => void }) {
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
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onLogin();
    } catch (err: any) {
      setError(err.message);
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
                placeholder="Username"
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
              <button type="submit" className={styles.submitBtnMichroma}>
                {isSignUp ? 'Sign Up' : 'Login'}
              </button>
            </form>
            <button onClick={handleGoogleLogin} className={styles.googleBtn}>
              Sign in with Google
            </button>
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
