const ChatBubble = ({ message, from }) => {
    return (
      <div className={`chat-bubble ${from}`}>
        {message}
      </div>
    );
  };
  
  export default ChatBubble;
  