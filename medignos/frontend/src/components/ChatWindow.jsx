import { useEffect, useRef, useState } from 'react';

import ChatBubble from './ChatBubble.jsx';
import ChatInput from './ChatInput.jsx';
import '../styles/ChatWindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { text: "Hi there! 👋 How can I help you today?", from: "bot" }
  ]);

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

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src="/Temp-PFP.jpeg" alt="Profile" />
        <div className="contact-name">Meddy</div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} message={msg.text} file={msg.file} from={msg.from} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={(msg) => addMessage(msg, "user")} />
    </div>
  );
};

export default ChatWindow;
