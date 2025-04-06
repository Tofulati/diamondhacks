// components/DownloadChat.jsx
import '../styles/DownloadChat.css';

const DownloadChat = ({ messages }) => {
  const handleDownload = () => {
    const textContent = messages.map(m => `${m.from.toUpperCase()}: ${m.text}`).join('\n\n');
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat_log.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button className="download-button" onClick={handleDownload}>
      📄 Download Chat
    </button>
  );
};

export default DownloadChat;
