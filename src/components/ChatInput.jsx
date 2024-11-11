import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useTheme } from './ThemeContext';
import './ChatInput.css';

const ChatInput = ({ addMessage }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);
  const { isDark } = useTheme();
  const isDocumentUploaded = !!localStorage.getItem('uploadedDocument');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || !isDocumentUploaded) return;

    addMessage(message, 'User 2'); // Send user message to parent
    setMessage('');
  };

  return (
    <div className={`chat-input-container ${isDark ? 'chat-input-container--dark' : 'chat-input-container--light'}`}>
      <form onSubmit={handleSubmit} className="chat-form">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isDocumentUploaded ? 'Type your message...' : 'Please upload a document first'}
          disabled={!isDocumentUploaded}
          className={`chat-textarea 
            ${!isDocumentUploaded ? 'chat-textarea--disabled' : ''}
            ${isDark ? 'chat-textarea--dark' : 'chat-textarea--light'}
          `}
          rows="1"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && isDocumentUploaded) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button
          type="submit"
          disabled={!isDocumentUploaded}
          className={`chat-submit-button 
            ${!isDocumentUploaded ? 'chat-submit-button--disabled' : ''}
            ${isDark ? 'chat-submit-button--dark' : 'chat-submit-button--light'}
          `}
        >
          <Send className="icon-size" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
