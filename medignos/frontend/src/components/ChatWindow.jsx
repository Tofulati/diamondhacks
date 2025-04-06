import { useEffect, useRef, useState } from 'react';

import ChatBubble from './ChatBubble.jsx';
import ChatInput from './ChatInput.jsx';
import '../styles/ChatWindow.css';
import '../styles/ContactPopup.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { text: "Hi there I'm Meddy! How can I help you today? For more information, hover over my contact!", from: "bot" }
  ]);

  const [isHovered, setIsHovered] = useState(false);
  const messagesEndRef = useRef();

  const addMessage = (messageData, from = "user") => {
    const newMessage = messageData.file
      ? { text: messageData.message, file: URL.createObjectURL(messageData.file), from }
      : { text: messageData.message, from };

    setMessages(prev => [...prev, newMessage]);

    if (from === "user") {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { text: `Bot received: ${messageData.message}`, from: "bot" }
        ]);
      }, 1000);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container-wrapper" style={{ position: 'relative' }}>
      {/* External popup that appears outside the phone frame */}
      {isHovered && (
        <div className="external-popup">
          <img src="/medignos_icon.svg" alt="Profile" className="popup-avatar" />
          <div className="popup-bubble">Meet Meddy — your personal virtual dermatologist!
Got a rash, breakout, or mystery spot? Just type in your symptoms or upload a photo — Meddy’s ready to analyze, assist, and guide you toward healthier skin. No judgment, no waiting rooms — just expert insight at your fingertips!
</div>
        </div>
      )}
      
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <img src="/medignos_icon.svg" alt="Profile" />
          <div
            className="contact-name-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="contact-name">Meddy ⓘ</div>
          </div>
        </div>

        {/* Chat Body */}
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} message={msg.text} file={msg.file} from={msg.from} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSend={(msg) => addMessage(msg, "user")} />
      </div>
    </div>
  );
};

export default ChatWindow;