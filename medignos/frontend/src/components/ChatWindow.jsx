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
    // If there's a file, create a URL for it
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

    // If the message is from the user, make the bot respond
    if (from === "user") {
      setTimeout(() => {
        // Here, we are simulating the bot response based on backend data
        setMessages(prev => [
          ...prev,
          { text: `Bot received: ${messageData.message}`, from: "bot" }
        ]);
      }, 1000); // Bot's reply will be delayed by 1 second
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">ChatBot</div>
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
