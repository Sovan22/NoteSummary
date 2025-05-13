'use client';

import { useState, useRef, useCallback } from 'react';
import { 
  Upload,
  FileIcon,
  FileText,
  Image,
  FileAudio2,
  FileType,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// File types we accept
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'text/plain',
  'application/epub+zip',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'audio/mpeg',
  'audio/wav',
  'audio/mp4',
  'image/jpeg', 
  'image/png',
  'image/webp'
];

// File type helpers
const getFileTypeIcon = (fileType: string) => {
  if (fileType.includes('pdf')) {
    return <FileType className="w-8 h-8 text-red-500" />;
  } else if (fileType.includes('audio')) {
    return <FileAudio2 className="w-8 h-8 text-blue-500" />;
  } else if (fileType.includes('image')) {
    return <Image className="w-8 h-8 text-green-500" />;
  } else {
    return <FileText className="w-8 h-8 text-amber-500" />;
  }
};

// Format file size to human-readable format
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
};

interface UploaderComponentProps {
  onFileSelect?: (file: File) => void;
  onUploadComplete?: (fileUrl: string) => void;
  allowedFileTypes?: string[];
  maxFileSize?: number;
}

export default function UploaderComponent({
  onFileSelect,
  onUploadComplete,
  allowedFileTypes = ACCEPTED_FILE_TYPES,
  maxFileSize = 100 * 1024 * 1024 // 100MB default
}: UploaderComponentProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Define validateAndSetFile function before it's used in callbacks
  const validateAndSetFile = (file: File) => {
    // Check file type
    if (!allowedFileTypes.includes(file.type)) {
      setUploadError(`File type ${file.type} is not supported. Please upload one of the following formats: PDF, text, EPUB, DOCX, MP3, WAV, MP4 audio, or images.`);
      return;
    }
    
    // Check file size
    if (file.size > maxFileSize) {
      setUploadError(`File size (${formatFileSize(file.size)}) exceeds the maximum allowed size of ${formatFileSize(maxFileSize)}.`);
      return;
    }
    
    // Clear any previous errors
    setUploadError(null);
    setSelectedFile(file);
    
    // Call onFileSelect callback if provided
    if (onFileSelect) {
      onFileSelect(file);
    }
  };
  
  // Handle drag events
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  }, []);
  
  // Handle file selection via the browse button
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  }, []);
  
  // Simulate file upload
  const handleUpload = useCallback(() => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadSuccess(true);
          
          // Simulate server response with file URL
          if (onUploadComplete) {
            onUploadComplete(`https://api.example.com/files/${selectedFile.name}`);
          }
          
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  }, [selectedFile, onUploadComplete]);
  
  // Handle reset to upload a new file
  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setUploadError(null);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadSuccess(false);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);
  
  // Render the appropriate content based on the current state
  return (
    <div className="w-full">
      {uploadSuccess ? (
        // Upload successful state
        <div className="p-8 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">Upload Successful!</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Your file has been uploaded successfully and is ready for processing.
            </p>
            <div className="flex items-center justify-center gap-3 p-3 mb-4 w-full max-w-md rounded-lg bg-gray-50 dark:bg-gray-700/50">
              {getFileTypeIcon(selectedFile?.type || '')}
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                  {selectedFile?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatFileSize(selectedFile?.size || 0)}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Upload Another File
              </button>
            </div>
          </div>
        </div>
      ) : selectedFile ? (
        // File selected, ready to upload
        <div className="p-8 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">File Selected</h3>
            
            <div className="w-full max-w-md p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 mb-6 relative">
              <div className="flex items-center">
                {getFileTypeIcon(selectedFile.type)}
                <div className="flex-1 ml-3 text-left">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
                <button 
                  onClick={handleReset}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-500 dark:text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {isUploading && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mb-1">
                    <div 
                      className="bg-blue-500 dark:bg-blue-400 h-1.5 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right text-gray-500 dark:text-gray-400">
                    {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
            
            {uploadError && (
              <div className="w-full max-w-md p-3 mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}
            
            <div className="flex gap-4">
              <button 
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpload}
                disabled={isUploading}
                className={`px-4 py-2 rounded-lg bg-blue-500 text-white flex items-center gap-2
                  ${isUploading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'} 
                  transition-colors`}
              >
                {isUploading ? 'Uploading...' : 'Upload File'}
                {!isUploading && <Upload className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Initial upload state
        <div 
          className={`p-8 rounded-xl border-2 border-dashed ${
            isDragging ? 'border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/10' : 'border-gray-300 dark:border-gray-700'
          } bg-white dark:bg-gray-800 shadow-sm transition-colors`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
              {isDragging ? 'Drop your file here' : 'Upload a file'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Drag and drop your file here, or click the button below to select a file from your computer.
              Supported formats: PDF, TXT, EPUB, DOCX, MP3, WAV, MP4 audio, JPEG, PNG
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Maximum file size: {formatFileSize(maxFileSize)}
            </p>
            
            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept={allowedFileTypes.join(',')}
              className="hidden"
            />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 transition-colors"
            >
              <FileIcon className="w-4 h-4" />
              Browse Files
            </button>
            
            {uploadError && (
              <div className="w-full max-w-md p-3 mt-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
