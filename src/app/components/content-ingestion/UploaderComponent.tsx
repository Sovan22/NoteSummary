'use client';

import { useState, useRef, DragEvent } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  LinearProgress,
  Alert,
  Chip,
  Stack 
} from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/epub+zip',
  'application/x-mobipocket-ebook',
  'audio/mpeg',
  'text/plain',
  'text/markdown'
];

export default function UploaderComponent() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => 
      ALLOWED_FILE_TYPES.includes(file.type) || 
      file.name.endsWith('.md') || 
      file.name.endsWith('.epub') || 
      file.name.endsWith('.mobi')
    );
    
    if (validFiles.length !== newFiles.length) {
      setError('Some files were rejected. Please upload only PDFs, eBooks, audio, or text files.');
    } else {
      setError(null);
    }
    
    setFiles(prevFiles => [...prevFiles, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
    
    // In a real application, you would upload files to your backend here
    // const formData = new FormData();
    // files.forEach(file => formData.append('files', file));
    // const response = await fetch('/api/upload', { method: 'POST', body: formData });
    
    // Simulate completion after "upload"
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setUploading(false);
        setFiles([]);
        // Here you would process the server response and move to processing
      }, 1000);
    }, 3000);
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        borderRadius: 4,
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant="h5" gutterBottom>
        Upload Content
      </Typography>
      
      <Box
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          mt: 2,
          border: '2px dashed',
          borderColor: dragActive ? 'primary.main' : 'grey.300',
          borderRadius: 2,
          p: 6,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s',
          bgcolor: dragActive ? 'rgba(103, 80, 164, 0.08)' : 'transparent',
          '&:hover': {
            bgcolor: 'rgba(103, 80, 164, 0.04)'
          }
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          multiple
          accept=".pdf,.epub,.mobi,.mp3,.txt,.md"
        />
        <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Drag and drop
        </Typography>
        <Typography variant="body1" color="textSecondary">
          File or enter link
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      
      {files.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Selected Files ({files.length})
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
            {files.map((file, index) => (
              <Chip
                key={`${file.name}-${index}`}
                label={file.name}
                onDelete={() => removeFile(index)}
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
          <Button 
            variant="contained" 
            color="primary" 
            disabled={uploading} 
            onClick={handleUpload}
            startIcon={<UploadIcon />}
            sx={{ mt: 1 }}
          >
            Process
          </Button>
        </Box>
      )}
      
      {uploading && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Uploading... {uploadProgress}%
          </Typography>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </Box>
      )}
    </Paper>
  );
}
