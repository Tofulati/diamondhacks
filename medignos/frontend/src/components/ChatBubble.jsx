import '../styles/ChatBubble.css';

const ChatBubble = ({ message, file, from }) => {
  return (
    <div className={`chat-bubble ${from}`}>
      {file ? (
        <div className="file-message">
          <img src={file} alt="Uploaded File" className="file-preview" />
          <div>{message}</div>
        </div>
      ) : (
        <div>{message}</div>
      )}
    </div>
  );
};

export default ChatBubble;
