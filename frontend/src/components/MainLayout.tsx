import React, { useState } from 'react';

export default function MainLayout({ children, language, onLanguageToggle }: { children: React.ReactNode, language: string, onLanguageToggle: () => void }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="hidden md:block">
        {/* Sidebar component will be rendered here */}
      </div>
      {/* Main content */}
      <main className="flex-1 bg-gradient-to-br from-blue-100 to-green-50 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
