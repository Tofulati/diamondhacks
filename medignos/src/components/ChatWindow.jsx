import { useEffect, useRef, useState } from 'react';
import ChatBubble from './ChatBubble.jsx';
import ChatInput from './ChatInput.jsx';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { text: "Hi there! 👋 How can I help you today?", from: "bot" }
  ]);

  const messagesEndRef = useRef();

  const addMessage = (text, from = "user") => {
    setMessages(prev => [...prev, { text, from }]);
    if (from === "user") {
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "🤖 I'm just a demo bot!", from: "bot" }]);
      }, 1000);
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
          <ChatBubble key={idx} message={msg.text} from={msg.from} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={(msg) => addMessage(msg, "user")} />
    </div>
  );
};

export default ChatWindow;
