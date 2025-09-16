"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../firebase";
import Login from "../components/Login";
import LanguageSelection from "../components/LanguageSelection";
import Sidebar from "../components/Sidebar";
import ImageUpload from "../components/ImageUpload";
import SoilInfo from "../components/SoilInfo";
import Chatbot from "../components/Chatbot";

export default function AppRoot() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [language, setLanguage] = useState<string | null>(null);

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

  const handleLogout = async () => {
    await signOut(auth);
    setLanguage(null);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-green-50">
      {/* Sidebar */}
      <Sidebar language={language} onLanguageToggle={() => setLanguage(null)} />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between px-8 py-4 bg-white/80 shadow-sm backdrop-blur-md">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <span className="text-sm text-gray-500">Welcome to your smart farming assistant</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">{language.toUpperCase()}</span>
            {user && <span className="text-gray-700 text-sm">{user.email}</span>}
            <button onClick={handleLogout} className="ml-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-semibold transition">Logout</button>
          </div>
        </header>
        {/* Main Widgets */}
        <main className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Soil Info Card */}
          <div className="col-span-1 xl:col-span-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between min-h-[220px]">
            <h3 className="text-lg font-semibold mb-4 text-green-700">Soil & Crop Information</h3>
            <SoilInfo soilHealth="Good" agriHistory="Wheat, Rice" crop="Maize" location="Punjab, India" />
          </div>
          {/* Image Upload Card */}
          <div className="col-span-1 xl:col-span-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between min-h-[220px]">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Upload Soil Image</h3>
            <ImageUpload onUpload={() => {}} />
          </div>
          {/* Chatbot Card */}
          <div className="col-span-1 xl:col-span-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col min-h-[220px]">
            <h3 className="text-lg font-semibold mb-4 text-purple-700">AI Chatbot</h3>
            <Chatbot language={language} />
          </div>
        </main>
      </div>
    </div>
  );
}
