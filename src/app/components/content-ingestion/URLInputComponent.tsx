'use client';

import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  CircularProgress,
  Alert,
  InputAdornment
} from '@mui/material';
import { 
  YouTube as YouTubeIcon, 
  Web as WebIcon,
  LinkOff as LinkOffIcon 
} from '@mui/icons-material';

type URLType = 'youtube' | 'webpage' | 'unknown';

export default function URLInputComponent() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlType, setUrlType] = useState<URLType>('unknown');
  const [previewData, setPreviewData] = useState<any>(null);

  const validateURL = (input: string): URLType => {
    try {
      const parsedUrl = new URL(input);
      
      // Check for YouTube URLs
      if (
        parsedUrl.hostname.includes('youtube.com') || 
        parsedUrl.hostname.includes('youtu.be')
      ) {
        return 'youtube';
      }
      
      // Any other valid URL is considered a webpage
      return 'webpage';
    } catch (e) {
      return 'unknown';
    }
  };

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUrl(input);
    
    if (input) {
      const type = validateURL(input);
      setUrlType(type);
      setError(type === 'unknown' ? 'Please enter a valid URL' : null);
    } else {
      setUrlType('unknown');
      setError(null);
    }
  };

  const handleFetchContent = async () => {
    if (!url || urlType === 'unknown') {
      setError('Please enter a valid URL');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real application, this would call your backend API
      // const response = await fetch('/api/fetch-content', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ url, type: urlType })
      // });
      
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate response based on URL type
      if (urlType === 'youtube') {
        setPreviewData({
          title: 'Sample YouTube Video',
          description: 'This is a placeholder for YouTube video content',
          thumbnail: 'https://via.placeholder.com/320x180.png?text=YouTube+Thumbnail',
          duration: '10:30'
        });
      } else {
        setPreviewData({
          title: 'Sample Web Page',
          excerpt: 'This is a placeholder for web page content that would be extracted...',
          url: url,
          wordCount: 1250
        });
      }
      
    } catch (err) {
      console.error(err);
      setError('Failed to fetch content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getIcon = () => {
    switch (urlType) {
      case 'youtube':
        return <YouTubeIcon color="error" />;
      case 'webpage':
        return <WebIcon color="primary" />;
      default:
        return <LinkOffIcon color="disabled" />;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add Content from URL
      </Typography>
      
      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Enter URL"
          variant="outlined"
          value={url}
          onChange={handleURLChange}
          placeholder="https://youtube.com/watch?v=... or https://example.com/article"
          error={!!error}
          helperText={error}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {getIcon()}
              </InputAdornment>
            ),
          }}
        />
        
        <Button
          variant="contained"
          color="primary"
          disabled={loading || urlType === 'unknown'}
          onClick={handleFetchContent}
          sx={{ mt: 2 }}
        >
          {loading ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
              Fetching...
            </>
          ) : (
            'Process URL'
          )}
        </Button>
      </Box>
      
      {previewData && (
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Content Preview
          </Typography>
          
          {urlType === 'youtube' ? (
            <Box>
              <img 
                src={previewData.thumbnail} 
                alt="Video thumbnail" 
                style={{ width: '100%', maxWidth: 320, borderRadius: 8 }} 
              />
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {previewData.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Duration: {previewData.duration}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {previewData.description}
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography variant="subtitle1">
                {previewData.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                {previewData.url} • {previewData.wordCount} words
              </Typography>
              <Typography variant="body2">
                {previewData.excerpt}
              </Typography>
            </Box>
          )}
          
          <Button 
            variant="outlined" 
            color="primary" 
            sx={{ mt: 2 }}
          >
            Process Content
          </Button>
        </Box>
      )}
    </Paper>
  );
}
