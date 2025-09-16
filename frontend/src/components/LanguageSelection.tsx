import React from 'react';

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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Select Language</h2>
        <div className="grid grid-cols-2 gap-4">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang.code)}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded hover:from-green-500 hover:to-blue-600"
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
