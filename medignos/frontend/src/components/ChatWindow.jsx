import { useEffect, useRef, useState } from 'react';

import ChatBubble from './ChatBubble.jsx';
import ChatInput from './ChatInput.jsx';
import DownloadChat from './DownloadChat.jsx'; // Add this near the top
import '../styles/ChatWindow.css';
import '../styles/ContactPopup.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { text: "Hi there I'm Meddy! How can I help you today? For more information or a recap of your conversation, click on my contact!", from: "bot" }
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false); // Changed from isHovered to isPopupOpen
  const messagesEndRef = useRef();

  const addMessage = (messageData, from = "user") => {
    console.log("Received message data:", messageData);  // Log messageData to check structure
    
    if (messageData.file) {
      const fileUrl = URL.createObjectURL(messageData.file);
      setMessages(prev => [
        ...prev,
        { text: messageData.message, file: fileUrl, from }
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        { text: messageData.message, from }
      ]);
    }
    
    if (from === "user") {
      setTimeout(() => {
        if (messageData.response) {
          console.log("Bot's reply:", messageData.response);  // Log bot's response
          setMessages(prev => [
            ...prev,
            { text: messageData.response, from: "bot" }
          ]);
        } else {
          console.error("Bot response is missing");
        }
      }, 1000);  // Delay the bot's response by 1 second
    }
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      const contactName = document.querySelector('.contact-name-wrapper');
      const popup = document.querySelector('.external-popup');
      
      if (isPopupOpen && 
          contactName && 
          popup && 
          !contactName.contains(event.target) && 
          !popup.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <div className="chat-container-wrapper" style={{ position: 'relative' }}>
      {/* External popup that appears outside the phone frame */}
      {isPopupOpen && (
        <div className="external-popup">
          <img src="/medignos_icon.svg" alt="Profile" className="popup-avatar" />
          <div className="popup-bubble">
            <div>
             Meet Meddy — your personal virtual dermatologist! Got a rash, breakout, or mystery spot? Just type in your symptoms or upload a photo. Meddy's ready to analyze, assist, and guide you toward better healthcare. No judgment, no waiting rooms — just expert insight at your fingertips!
          </div>
          <DownloadChat messages={messages} /> {/* New button here */}
        </div>
      </div>
)}

      
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <img src="/medignos_icon.svg" alt="Profile" />
          <div
            className="contact-name-wrapper"
          >
            {/* Changed from hover events to click event */}
            <div 
              className="contact-name" 
              onClick={() => setIsPopupOpen(!isPopupOpen)} // Toggle popup on click
            >
              Meddy ⓘ
            </div>
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