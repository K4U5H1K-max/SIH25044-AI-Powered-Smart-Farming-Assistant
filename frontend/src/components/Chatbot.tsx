import React, { useState, useRef } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function Chatbot({ language }: { language: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const recognitionRef = useRef<any>(null);
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  // Speech-to-Text
  const handleSpeechInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported');
      return;
    }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = language;
    recognition.onresult = (event: any) => {
      setInput(event.results[0][0].transcript);
    };
    recognition.start();
    recognitionRef.current = recognition;
  };

  // Text-to-Speech
  const speak = (text: string) => {
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = language;
    synth.speak(utter);
  };

  // Simulate AI response (replace with API call)
  const getBotResponse = async (userText: string) => {
    // TODO: Integrate with backend AI API
    return `Bot response to: ${userText}`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    const botText = await getBotResponse(input);
    const botMsg: Message = { sender: 'bot', text: botText };
    setMessages((msgs) => [...msgs, botMsg]);
    speak(botText);
  };

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col h-96">
      <h3 className="text-lg font-bold mb-2">Chatbot</h3>
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-1 rounded ${msg.sender === 'user' ? 'bg-green-200' : 'bg-blue-200'}`}>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type or use mic..."
        />
        <button onClick={handleSpeechInput} className="bg-gray-300 px-2 rounded">🎤</button>
        <button onClick={handleSend} className="bg-green-600 text-white px-4 py-1 rounded">Send</button>
      </div>
    </div>
  );
}
