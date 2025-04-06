import { useState } from 'react';
import '../styles/ChatInput.css';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState(""); 
  const [file, setFile] = useState(null); 
  const [filePreview, setFilePreview] = useState(null); // To store the image preview URL

  const apiBaseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
  const apiUrl = `/api/send_message`;

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
  
          // Check if the response data has a valid bot reply
          console.log("Bot reply:", responseData.response);
  
          // Pass the response correctly to the parent (ChatWindow)
          onSend({
            message: input,
            response: responseData.response,  // Make sure this is the correct field
            file: file
          });
  
          setInput(""); 
          setFile(null);
          setFilePreview(null);  // Clear the image preview after sending
        } else {
          const errorData = await response.text();
          console.error('Failed to send message', errorData);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      console.error("Message or file is empty");
    }
  };  

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      console.log("File selected:", selectedFile);
      setFile(selectedFile);

      // Create an image preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setFilePreview(fileUrl);  // Set the preview URL for the image
      setInput("");  // Clear input text when a file is selected
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
      {/* If a file is selected, show the preview, else show the "+" button */}
      {filePreview ? (
        <div className="file-preview">
          <button 
            onClick={() => setFilePreview(null)} 
            style={{ marginTop: '5px', backgroundColor: 'red', color: 'white', padding: '5px' }}
          >
            🗑️
          </button>
          <img
            src={filePreview}
            alt="Preview"
            style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '4px' }}
          />
        </div>
      ) : (
        <input
          type="file"
          accept="image/*"
          id="file-input"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      )}

      {/* Only show the + button if no file is selected */}
      {!filePreview && (
        <label htmlFor="file-input" className="file-label">
          <button 
            type="button"
            onClick={handleFileButtonClick}>
              +
          </button>
        </label>
      )}

      <input
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        className="message-input"
      />
      <button onClick={handleSend} className="send-button">➤</button>
    </div>
  );
};

export default ChatInput;
