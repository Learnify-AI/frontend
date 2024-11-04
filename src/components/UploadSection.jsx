import { useRef, useState } from 'react';
import { useTheme } from './ThemeContext';
import { Upload } from 'lucide-react';

const AnimatedButton = ({ children, onClick, disabled }) => {
  const { isDark } = useTheme();
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex-1 sm:flex-none sm:w-40 px-6 py-3 rounded-lg
        transition-all duration-300
        ${disabled 
          ? `${isDark ? 'bg-slate-700' : 'bg-slate-300'} cursor-not-allowed` 
          : isDark 
            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
            : 'bg-purple-500 hover:bg-purple-600 text-white'
        }
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        ${isDark ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-white'}
      `}
    >
      {children}
    </button>
  );
};

const UploadSection = ({ onDocumentUpload, isSidebarOpen }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { isDark } = useTheme();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) handleFiles(files[0]);
  };

  const handleFiles = async (file) => {
    setIsUploading(true);
    setUploadProgress(0);

    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(progress);
      }
    };

    reader.onload = async (event) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        localStorage.setItem('uploadedDocument', event.target.result);
        localStorage.setItem('documentName', file.name);
        setIsUploading(false);
        onDocumentUpload(true);
      } catch (error) {
        console.error('Error storing document:', error);
        setIsUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex-1 flex items-center justify-center w-full max-w-5xl mx-auto px-4">
      <div className="w-full py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Welcome to Learnify AI
        </h1>

        {/* Upload Area */}
        <div
          className={`
            relative border-2 border-dashed rounded-lg
            h-[300px] flex items-center justify-center
            transition-colors duration-200 cursor-pointer
            mx-auto max-w-3xl
            ${isDragging 
              ? 'border-purple-500 bg-slate-800/50' 
              : isDark 
                ? 'border-slate-700 hover:border-slate-500' 
                : 'border-slate-300 hover:border-slate-400'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files[0])}
            accept=".pdf,.doc,.docx,.txt"
          />
          
          {isUploading ? (
            <div className="text-center">
              <div className="mb-4">
                <Upload className="h-8 w-8 mx-auto mb-2 animate-bounce" />
                <p>Uploading... {Math.round(uploadProgress)}%</p>
              </div>
              <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg mb-2">Drop your documents here</p>
              <p className="text-sm">or click to browse</p>
              <p className="text-xs mt-2 opacity-60">Supports PDF, DOC, TXT files</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6 max-w-3xl mx-auto">
          <AnimatedButton 
            onClick={() => console.log('Summary clicked')}
            disabled={!localStorage.getItem('uploadedDocument')}
          >
            Summary
          </AnimatedButton>
          <AnimatedButton 
            onClick={() => console.log('Quiz clicked')}
            disabled={!localStorage.getItem('uploadedDocument')}
          >
            Quiz
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;