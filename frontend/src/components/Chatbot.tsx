import React, { useState, useRef } from 'react';
import styles from './Dashboard.module.css';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function Chatbot({ language }: { language: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const recognitionRef = useRef<any>(null);
  const [synth, setSynth] = useState<any>(null);

  // Ensure synth is only set on client
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setSynth(window.speechSynthesis);
    }
  }, []);

  // Speech-to-Text
  const handleSpeechInput = () => {
    if (typeof window === 'undefined') return;
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
    const utter = new window.SpeechSynthesisUtterance(text);
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
    <div className={`${styles.chatbotContainer} ${styles.chatbotContainerCustom}`}>
      <div className={styles.chatbotBackground} />
      <div className={`${styles.chatbotMessages} ${styles.chatbotMessagesCustom}`}>
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.chatbotMessageRow} ${msg.sender === 'user' ? styles.user : ''}`}>
            <span className={`${styles.chatbotMessage} ${msg.sender === 'user' ? styles.user : ''}`}>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className={`${styles.chatInputBar} ${styles.chatInputBarCustom}`}>
        <img src="/Gallary.png" alt="Gallery" className={styles.inputIcon} />
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className={styles.textInput}
          placeholder="Enter Text....."
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        />
          <button className={styles.sendBtn} onClick={handleSend}>Send</button>
          <img src="/Mic.png" alt="Mic" className={styles.micIcon} onClick={handleSpeechInput} />
      </div>
    </div>
  );
}
