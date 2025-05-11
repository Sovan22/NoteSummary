'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Chip,
  IconButton,
  CircularProgress,
  Fade,
  Grow,
  Alert,
  Collapse
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArticleIcon from '@mui/icons-material/Article';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PreviewIcon from '@mui/icons-material/Preview';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

interface URLPreview {
  title: string;
  description: string;
  imageUrl?: string;
  source: string;
  type: 'youtube' | 'article' | 'webpage';
}

interface URLInputComponentProps {
  onURLSubmit?: (url: string, preview: URLPreview) => void;
  onURLValidated?: (isValid: boolean, url: string) => void;
}

export default function URLInputComponent({
  onURLSubmit,
  onURLValidated
}: URLInputComponentProps) {
  const [url, setUrl] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValidURL, setIsValidURL] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [urlType, setUrlType] = useState<'youtube' | 'article' | 'webpage' | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [preview, setPreview] = useState<URLPreview | null>(null);
  
  // Validate URL when it changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (url) {
        validateURL(url);
      } else {
        setIsValidURL(false);
        setUrlType(null);
        setValidationError(null);
        if (onURLValidated) {
          onURLValidated(false, '');
        }
      }
    }, 500); // Debounce
    
    return () => clearTimeout(timer);
  }, [url]);
  
  // URL validation helper
  const validateURL = (input: string) => {
    setIsValidating(true);
    setValidationError(null);
    
    try {
      // Check if it's a valid URL
      const urlObj = new URL(input);
      
      if (!urlObj.protocol.startsWith('http')) {
        throw new Error('URL must start with http:// or https://');
      }
      
      // Identify URL type
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        setUrlType('youtube');
      } else if (
        urlObj.hostname.includes('medium.com') || 
        urlObj.pathname.endsWith('.pdf') || 
        urlObj.pathname.endsWith('.doc') || 
        urlObj.pathname.endsWith('.docx')
      ) {
        setUrlType('article');
      } else {
        setUrlType('webpage');
      }
      
      setIsValidURL(true);
      
      if (onURLValidated) {
        onURLValidated(true, input);
      }
    } catch (e) {
      setIsValidURL(false);
      setUrlType(null);
      setValidationError('Please enter a valid URL starting with http:// or https://');
      
      if (onURLValidated) {
        onURLValidated(false, input);
      }
    }
    
    setIsValidating(false);
  };
  
  // Generate URL preview
  const generatePreview = () => {
    if (!isValidURL || !url) return;
    
    setIsProcessing(true);
    
    // Simulate API call to get URL preview
    setTimeout(() => {
      // Mock preview data based on URL type
      const mockPreviews = {
        youtube: {
          title: 'Understanding Neural Networks - Deep Learning Fundamentals',
          description: 'Learn the basics of neural networks, activation functions, and backpropagation in this comprehensive tutorial.',
          imageUrl: 'https://picsum.photos/seed/neural/400/225',
          source: 'YouTube',
          type: 'youtube' as const
        },
        article: {
          title: 'The Future of Artificial Intelligence in Education',
          description: 'This article explores how AI is transforming educational systems around the world, with case studies and expert insights.',
          imageUrl: 'https://picsum.photos/seed/article/400/200',
          source: 'Medium',
          type: 'article' as const
        },
        webpage: {
          title: 'Complete Guide to Modern JavaScript Practices',
          description: 'Explore the latest JavaScript features, best practices, and optimization techniques for modern web development.',
          imageUrl: 'https://picsum.photos/seed/webpage/400/200',
          source: url.split('/')[2], // Domain as source
          type: 'webpage' as const
        }
      };
      
      // Set preview based on URL type
      if (urlType) {
        setPreview(mockPreviews[urlType]);
        setShowPreview(true);
      }
      
      setIsProcessing(false);
    }, 1500);
  };
  
  // Handle URL submission
  const handleSubmit = () => {
    if (!isValidURL || !url || !preview) return;
    
    // Call the callback if provided
    if (onURLSubmit) {
      onURLSubmit(url, preview);
    }
    
    // Reset form after submission
    setUrl('');
    setIsValidURL(false);
    setUrlType(null);
    setShowPreview(false);
    setPreview(null);
  };
  
  // Handle URL reset
  const handleReset = () => {
    setUrl('');
    setIsValidURL(false);
    setUrlType(null);
    setShowPreview(false);
    setPreview(null);
    setValidationError(null);
  };
  
  // Handle paste from clipboard
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };
  
  // Get icon based on URL type
  const getURLTypeIcon = () => {
    switch (urlType) {
      case 'youtube':
        return <YouTubeIcon color="error" />;
      case 'article':
        return <ArticleIcon color="primary" />;
      case 'webpage':
        return <InsertLinkIcon color="action" />;
      default:
        return <LinkIcon />;
    }
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        elevation={2}
        sx={{
          borderRadius: 4,
          p: 3,
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          },
          '&::before': isValidURL ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: urlType === 'youtube' ? '#FF0000' : 
                            urlType === 'article' ? '#6750A4' : '#4285F4',
            transition: 'background-color 0.3s ease'
          } : {}
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          Import Content from URL
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter a YouTube video URL, article link, or any webpage to extract and analyze its content.
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <TextField
            fullWidth
            placeholder="https://example.com/article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            InputProps={{
              startAdornment: urlType && (
                <Box 
                  sx={{ 
                    mr: 1,
                    display: 'flex',
                    alignItems: 'center',
                    animation: 'fadeIn 0.3s ease',
                    '@keyframes fadeIn': {
                      from: { opacity: 0 },
                      to: { opacity: 1 }
                    }
                  }}
                >
                  {getURLTypeIcon()}
                </Box>
              ),
              endAdornment: url && (
                <IconButton 
                  size="small" 
                  onClick={handleReset}
                  sx={{ 
                    animation: 'fadeIn 0.2s ease',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'rotate(90deg)',
                    }
                  }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              ),
              sx: {
                pr: 1,
                borderRadius: 10,
                transition: 'all 0.3s ease',
                backgroundColor: 'background.default',
                '&.Mui-focused': {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                }
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 10,
              },
            }}
          />
          
          <Button
            variant="outlined"
            color="primary"
            onClick={handlePaste}
            startIcon={<ContentPasteIcon />}
            sx={{
              height: 56,
              whiteSpace: 'nowrap',
              borderRadius: 10,
              px: 2,
              borderWidth: 2,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderWidth: 2,
                transform: 'translateY(-2px)',
              }
            }}
          >
            Paste
          </Button>
        </Box>
        
        {/* Validation error */}
        <Collapse in={!!validationError}>
          <Alert 
            severity="error" 
            sx={{ 
              mt: 2, 
              borderRadius: 2,
              animation: 'fadeIn 0.3s ease'
            }}
          >
            {validationError}
          </Alert>
        </Collapse>
        
        {/* URL Types Chips */}
        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
          <Chip 
            icon={<YouTubeIcon />} 
            label="YouTube" 
            variant={urlType === 'youtube' ? 'filled' : 'outlined'} 
            color={urlType === 'youtube' ? 'error' : 'default'}
            sx={{ 
              transition: 'all 0.3s ease',
              transform: urlType === 'youtube' ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          <Chip 
            icon={<ArticleIcon />} 
            label="Articles" 
            variant={urlType === 'article' ? 'filled' : 'outlined'} 
            color={urlType === 'article' ? 'primary' : 'default'}
            sx={{ 
              transition: 'all 0.3s ease',
              transform: urlType === 'article' ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          <Chip 
            icon={<InsertLinkIcon />} 
            label="Webpages" 
            variant={urlType === 'webpage' ? 'filled' : 'outlined'} 
            color={urlType === 'webpage' ? 'info' : 'default'}
            sx={{ 
              transition: 'all 0.3s ease',
              transform: urlType === 'webpage' ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="text"
            color="primary"
            disabled={!isValidURL || isProcessing}
            startIcon={<PreviewIcon />}
            onClick={generatePreview}
            sx={{
              borderRadius: 10,
              textTransform: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'rgba(103, 80, 164, 0.08)',
              }
            }}
          >
            Generate Preview
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            disabled={!isValidURL || !preview}
            endIcon={isProcessing ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
            onClick={handleSubmit}
            sx={{
              borderRadius: 10,
              px: 3,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
              }
            }}
          >
            {isProcessing ? 'Processing...' : preview ? 'Process Content' : 'Extract URL'}
          </Button>
        </Box>
      </Paper>
      
      {/* URL Preview */}
      {showPreview && preview && (
        <Grow in={showPreview}>
          <Paper
            elevation={3}
            sx={{
              mt: 3,
              borderRadius: 4,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              animation: 'slideUp 0.4s ease',
              '@keyframes slideUp': {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            {preview.imageUrl && (
              <Box
                sx={{
                  height: 200,
                  backgroundImage: `url(${preview.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                  }
                }}
              >
                {preview.type === 'youtube' && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,0,0,0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(255,0,0,1)',
                        transform: 'translate(-50%, -50%) scale(1.1)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <YouTubeIcon sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                )}
              </Box>
            )}
            
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {preview.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {preview.description}
                  </Typography>
                </Box>
                
                <Chip
                  icon={
                    preview.type === 'youtube' ? <YouTubeIcon /> : 
                    preview.type === 'article' ? <ArticleIcon /> : <InsertLinkIcon />
                  }
                  label={preview.source}
                  size="small"
                  color={
                    preview.type === 'youtube' ? 'error' : 
                    preview.type === 'article' ? 'primary' : 'default'
                  }
                  sx={{ 
                    borderRadius: 8,
                    animation: 'fadeIn 0.5s ease',
                    fontWeight: 600
                  }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 0.5,
                    color: 'success.main',
                    animation: 'fadeIn 0.8s ease',
                  }}
                >
                  <CheckCircleIcon fontSize="small" />
                  <Typography variant="body2" fontWeight={500}>
                    Content validated
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grow>
      )}
    </Box>
  );
}
