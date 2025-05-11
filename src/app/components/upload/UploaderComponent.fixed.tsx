'use client';

import { useState, useRef, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  IconButton, 
  Chip,
  LinearProgress,
  CircularProgress,
  Alert,
  Fade,
  Grow
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import UploadFileIcon from '@mui/icons-material/UploadFile';

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
    return <PictureAsPdfIcon fontSize="large" />;
  } else if (fileType.includes('audio')) {
    return <AudioFileIcon fontSize="large" />;
  } else if (fileType.includes('image')) {
    return <ImageIcon fontSize="large" />;
  } else {
    return <DescriptionIcon fontSize="large" />;
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
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  }, []);
  
  const handleButtonClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);
  
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  }, []);
  
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
    
    // Set the selected file
    setSelectedFile(file);
    
    // Call onFileSelect if provided
    if (onFileSelect) {
      onFileSelect(file);
    }
  };
  
  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setUploadError(null);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);
  
  const handleUpload = useCallback(async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    /* This would be replaced with actual file upload logic
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(progress);
        }
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      setIsUploading(false);
      setUploadSuccess(true);
      
      if (onUploadComplete) {
        onUploadComplete(data.fileUrl);
      }
    } catch (error) {
      setIsUploading(false);
      setUploadError('Upload failed. Please try again.');
      console.error('Upload error:', error);
    }
    */
  }, [selectedFile, onUploadComplete]);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
        accept={allowedFileTypes.join(',')}
      />
      
      {/* Error message */}
      {uploadError && (
        <Grow in={!!uploadError}>
          <Alert 
            severity="error" 
            onClose={() => setUploadError(null)}
            sx={{ 
              mb: 2,
              borderRadius: 2,
              animation: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
              '@keyframes shake': {
                '0%, 100%': { transform: 'translateX(0)' },
                '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
                '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' }
              }
            }}
          >
            {uploadError}
          </Alert>
        </Grow>
      )}
      
      {/* Success message */}
      {uploadSuccess && (
        <Grow in={uploadSuccess}>
          <Alert 
            severity="success" 
            icon={<CheckCircleIcon fontSize="inherit" />}
            sx={{ mb: 2, borderRadius: 2 }}
          >
            File uploaded successfully!
          </Alert>
        </Grow>
      )}
      
      {!selectedFile ? (
        // Drop zone
        <Paper
          elevation={isDragging ? 6 : 2}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          sx={{
            borderRadius: 2,
            p: 5,
            textAlign: 'center',
            cursor: 'pointer',
            borderWidth: 2,
            borderStyle: 'dashed',
            borderColor: isDragging ? 'primary.main' : 'divider',
            backgroundColor: isDragging ? 'action.hover' : 'background.paper',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isDragging ? 'scale(1.02)' : 'scale(1)',
            boxShadow: isDragging ? '0 8px 30px rgba(0, 0, 0, 0.12)' : '',
            position: 'relative',
            overflow: 'hidden',
            '&::before': isDragging ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              backgroundImage: 'linear-gradient(to right, #6750A4, #958DA5)',
              animation: 'slideRight 2s linear infinite',
              '@keyframes slideRight': {
                from: { transform: 'translateX(-100%)' },
                to: { transform: 'translateX(100%)' }
              }
            } : {}
          }}
          onClick={handleButtonClick}
        >
          <Fade in={true} timeout={500}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'action.hover',
                }}
              >
                <UploadFileIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
              
              <Typography variant="h6" gutterBottom fontWeight={600}>
                {isDragging ? 'Drop your file here' : 'Drag & Drop your file here'}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                or click to browse files
              </Typography>
              
              <Button
                color="primary"
                variant="contained"
                startIcon={<UploadFileIcon />}
                sx={{
                  px: 3,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                Browse Files
              </Button>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mt: 4 }}>
                <Chip label="PDF" size="small" icon={<PictureAsPdfIcon />} />
                <Chip label="Text" size="small" icon={<DescriptionIcon />} />
                <Chip label="Word" size="small" icon={<InsertDriveFileIcon />} />
                <Chip label="Audio" size="small" icon={<AudioFileIcon />} />
                <Chip label="Images" size="small" icon={<ImageIcon />} />
              </Box>
            </Box>
          </Fade>
        </Paper>
      ) : (
        // Selected file preview
        <Grow in={!!selectedFile}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              p: 3,
              backgroundColor: 'background.paper',
              transition: 'all 0.3s ease',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 50, height: 50 }}>
                  {getFileTypeIcon(selectedFile.type)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} noWrap sx={{ maxWidth: 250 }}>
                    {selectedFile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatFileSize(selectedFile.size)} • {selectedFile.type.split('/')[1].toUpperCase()}
                  </Typography>
                </Box>
              </Box>
              
              <IconButton color="error" onClick={handleRemoveFile} disabled={isUploading}>
                <DeleteIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ mt: 2 }}>
              {isUploading ? (
                <Box sx={{ width: '100%' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={uploadProgress} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 2,
                      mb: 1,
                      '& .MuiLinearProgress-bar': {
                        transition: 'transform 0.3s ease'
                      }
                    }} 
                  />
                  <Typography variant="caption" color="text.secondary">
                    Uploading... {Math.round(uploadProgress)}%
                  </Typography>
                </Box>
              ) : uploadSuccess ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon color="success" />
                  <Typography variant="body2" color="success.main">
                    Upload complete
                  </Typography>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    mt: 1,
                    borderRadius: 2,
                    px: 3,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  Upload File
                </Button>
              )}
            </Box>
          </Paper>
        </Grow>
      )}
      
      {/* Processing indicator after upload */}
      {uploadSuccess && (
        <Box 
          sx={{ 
            mt: 3, 
            p: 2, 
            borderRadius: 2, 
            backgroundColor: 'action.hover',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            animation: 'fadeIn 0.5s ease',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(10px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <CircularProgress size={24} />
          <Typography variant="body2">
            Processing your file... The AI is analyzing the content.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
