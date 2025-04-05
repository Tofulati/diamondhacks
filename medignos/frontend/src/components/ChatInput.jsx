import { useState } from 'react';
import '../styles/ChatInput.css';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

  const handleSend = () => {
    if (input.trim() || file) {
      const messageData = { message: input, file: file };
      onSend(messageData);
      setInput("");
      setFile(null);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      console.log("File selected:", selectedFile);  // Debugging: Check the selected file
      setFile(selectedFile);
      setInput(selectedFile.name); // Set the file name in the input field
    } else {
      console.error("No file selected or e.target.files is undefined");
    }
  };

  const handleFileButtonClick = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.click();
    }
    console.log("File upload button clicked!");
  };


  return (
    <div className="chat-input">
      <input
        type="file"
        accept="image/*"
        id="file-input"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-input" className="file-label">
        <button 
          type="button"
          onClick={handleFileButtonClick}>
            +
        </button>
      </label>

      <input
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInput;
