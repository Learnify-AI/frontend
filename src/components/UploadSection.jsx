import { useRef, useState } from 'react';
import { useTheme } from './ThemeContext';
import { Upload } from 'lucide-react';
import './UploadSection.css';

const AnimatedButton = ({ children, onClick, disabled }) => {
  const { isDark } = useTheme();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`animated-button ${isDark ? 'animated-button-dark' : 'animated-button-light'} ${
        disabled ? 'animated-button-disabled' : ''
      }`}
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
    <div className="upload-section-container">
      <div className="upload-section-inner">
        <h1 className="upload-title">What Do You Want To Learn Today? Let&apos;s Help you get started</h1>

        {/* Upload Area */}
        <div
          className={`upload-area ${isDragging ? 'upload-area-dragging' : ''} ${
            isDark ? 'upload-area-dark' : 'upload-area-light'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="file-input"
            onChange={(e) => handleFiles(e.target.files[0])}
            accept=".pdf,.doc,.docx,.txt"
          />

          {isUploading ? (
            <div className="upload-progress-container">
              <div className="upload-progress-icon">
                <Upload className="upload-icon" />
                <p>Uploading... {Math.round(uploadProgress)}%</p>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <p className="upload-placeholder-title">Drop your documents here</p>
              <p className="upload-placeholder-subtitle">or click to browse</p>
              <p className="upload-file-support">Supports PDF, DOC, TXT files</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons-container">
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
