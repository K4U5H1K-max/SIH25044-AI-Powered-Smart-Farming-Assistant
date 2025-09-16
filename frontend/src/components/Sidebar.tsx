import React, { useState } from 'react';

export default function Sidebar({ language, onLanguageToggle }: { language: string, onLanguageToggle: () => void }) {
  return (
    <aside className="h-full w-64 bg-gradient-to-b from-gray-900 to-gray-700 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-8">Smart Farming</h1>
      <nav className="flex-1 space-y-4">
        <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-800">Dashboard</button>
        <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-800">Upload Soil Image</button>
        <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-800">Chatbot</button>
      </nav>
      <div className="mt-8">
        <span className="mr-2">Language:</span>
        <button onClick={onLanguageToggle} className="bg-gray-800 px-3 py-1 rounded">
          {language.toUpperCase()}
        </button>
      </div>
    </aside>
  );
}
