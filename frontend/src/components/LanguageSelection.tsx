import React, { useEffect, useState } from 'react';
import styles from './LanguageSelection.module.css';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'gu', label: 'ગુજરાતી' },
  // Add more Indian languages as needed
];

export default function LanguageSelection({ onSelect }: { onSelect: (lang: string) => void }) {
  const [bgUrl, setBgUrl] = useState<string | null>(null);

  useEffect(() => {
    // Unsplash random farming image
    const unsplashUrl =
      'https://source.unsplash.com/random/1200x800/?farm,agriculture,field,crop,farmer';
    setBgUrl(unsplashUrl + '&' + Math.random()); // Add random param to force reload
  }, []);

  return (
    <div
      className={`${styles.languageBg} ${bgUrl ? styles.languageBgWithImage : ''}`}
      data-bg-url={bgUrl || ''}
    >
      <div className={styles.languageCard}>
        <h2 className={styles.languageTitle}>Select Language</h2>
        <div className={styles.languageGrid}>
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang.code)}
              className={styles.languageBtn}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
