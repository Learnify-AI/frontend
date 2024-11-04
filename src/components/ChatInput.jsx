import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useTheme } from './ThemeContext';

const ChatInput = () => {
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
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className={`px-4 py-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} w-full`}>
      <form 
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto relative"
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isDocumentUploaded ? "Type your message..." : "Please upload a document first"}
          disabled={!isDocumentUploaded}
          className={`
            w-full rounded-lg pl-4 pr-12 py-3 
            min-h-[50px] max-h-[200px] resize-none
            ${!isDocumentUploaded ? 'cursor-not-allowed opacity-50' : ''}
            ${isDark 
              ? 'bg-slate-800 text-white placeholder-slate-400' 
              : 'bg-white text-slate-900 placeholder-slate-500 border border-slate-200'
            }
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
          className={`
            absolute right-2 top-1/2 -translate-y-1/2 
            p-2 rounded-full transition-colors
            ${!isDocumentUploaded ? 'opacity-50 cursor-not-allowed' : ''}
            ${isDark 
              ? 'text-white hover:bg-slate-700' 
              : 'text-slate-900 hover:bg-slate-100'
            }
          `}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;