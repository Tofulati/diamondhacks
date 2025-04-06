import { useState } from 'react';
import '../styles/ChatInput.css';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState(""); 
  const [file, setFile] = useState(null); 

  const apiBaseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
  const apiUrl = `${apiBaseUrl}/api/send_message`; 

  const handleSend = async () => {
    if (input.trim() || file) {
      console.log("Sending message:", input); 

      const formData = new FormData();
      formData.append('message', input); 
      if (file) formData.append('file', file); 

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Message sent successfully!", responseData);
          setInput(""); 
          setFile(null); 
        } else {
          const errorData = await response.text();
          console.error('Failed to send message', errorData);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }

      onSend({ message: input, file: file });
      setInput(""); 
      setFile(null); 
    } else {
      console.error("Message or file is empty");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      console.log("File selected:", selectedFile); 
      setFile(selectedFile);
      setInput(""); 
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
