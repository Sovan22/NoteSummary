'use client';

import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Tabs, 
  Tab, 
  Divider, 
  Chip, 
  IconButton, 
  Tooltip,
  Button,
  Fade
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { getSummaryAriaAttributes } from './utils/accessibility';
import { useTheme } from '@mui/material/styles';

interface SummaryContentCardProps {
  title: string;
  shortSummary: string;
  mediumSummary: string;
  detailedSummary: string;
  sourceDocumentName: string;
  onSave?: () => void;
  isBookmarked?: boolean;
}

export default function SummaryContentCard({
  title,
  shortSummary,
  mediumSummary,
  detailedSummary,
  sourceDocumentName,
  onSave,
  isBookmarked = false
}: SummaryContentCardProps) {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(1); // 0: short, 1: medium, 2: detailed
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [isTextHighlighted, setIsTextHighlighted] = useState(false);
  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([]);
  
  // Prepare the content based on active tab
  const activeContent = activeTab === 0 
    ? shortSummary 
    : activeTab === 1 
      ? mediumSummary 
      : detailedSummary;
  
  // Split content into paragraphs for better formatting
  const paragraphs = activeContent.split('\n\n').filter(p => p.trim() !== '');
  
  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    // Reset visible paragraphs when tab changes
    setVisibleParagraphs([]);
    
    // Show paragraphs one by one with delay
    paragraphs.forEach((_, index) => {
      setTimeout(() => {
        setVisibleParagraphs(prev => [...prev, index]);
      }, 100 * (index + 1));
    });
  };
  
  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  // Toggle bookmark
  const handleToggleBookmark = () => {
    setBookmarked(!bookmarked);
    if (onSave) {
      onSave();
    }
  };
  
  // Toggle text highlighting
  const handleToggleHighlight = () => {
    setIsTextHighlighted(!isTextHighlighted);
  };
  
  // Get ARIA attributes for accessibility
  const ariaAttributes = getSummaryAriaAttributes(
    'summary-content',
    true,
    false,
    0.95 // Arbitrary high confidence for the summary
  );
  
  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: (theme) => 
          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.05)',
        },
        position: 'relative',
        overflow: 'hidden'
      }}
      {...ariaAttributes}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: theme => `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.main}05)`,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              AI Summary
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Source: <b>{sourceDocumentName}</b>
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
              <IconButton 
                size="small" 
                onClick={handleCopy}
                color={copied ? "success" : "default"}
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title={bookmarked ? "Remove bookmark" : "Bookmark this summary"}>
              <IconButton 
                size="small" 
                onClick={handleToggleBookmark}
                color={bookmarked ? "primary" : "default"}
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Share summary">
              <IconButton 
                size="small"
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
          {title}
        </Typography>
        
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            minHeight: '36px',
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 2,
            },
            '& .MuiTab-root': {
              minHeight: '36px',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'all 0.3s ease',
            },
          }}
        >
          <Tab 
            label="Concise" 
            sx={{ 
              '&.Mui-selected': {
                color: 'primary.main',
              }
            }} 
          />
          <Tab 
            label="Standard" 
            sx={{ 
              '&.Mui-selected': {
                color: 'primary.main',
              }
            }} 
          />
          <Tab 
            label="Detailed" 
            sx={{ 
              '&.Mui-selected': {
                color: 'primary.main',
              }
            }} 
          />
        </Tabs>
      </Box>

      {/* Content */}
      <Box
        sx={{
          p: 2,
          flex: 1,
          overflowY: 'auto',
          position: 'relative',
          '&::after': isTextHighlighted ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255, 233, 125, 0.2) 0%, rgba(255, 233, 125, 0.2) 100%)',
            backgroundSize: '100% 25px',
            backgroundRepeat: 'no-repeat',
            animation: 'highlight 1.5s ease-in-out',
            animationIterationCount: 'infinite',
            '@keyframes highlight': {
              '0%': { backgroundPosition: '0 0' },
              '100%': { backgroundPosition: '0 100%' }
            }
          } : {}
        }}
      >
        {paragraphs.map((paragraph, index) => (
          <Fade 
            key={index}
            in={visibleParagraphs.includes(index) || visibleParagraphs.length === 0} 
            timeout={500}
            style={{ 
              transitionDelay: `${50 * index}ms`,
            }}
          >
            <Typography 
              variant="body2" 
              component="p"
              sx={{ 
                mb: 2,
                lineHeight: 1.8,
                textAlign: 'justify',
                opacity: visibleParagraphs.includes(index) || visibleParagraphs.length === 0 ? 1 : 0,
                transform: visibleParagraphs.includes(index) || visibleParagraphs.length === 0 
                  ? 'translateY(0)' 
                  : 'translateY(10px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              {paragraph}
            </Typography>
          </Fade>
        ))}
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            size="small"
            startIcon={<AutoAwesomeIcon />}
            onClick={handleToggleHighlight}
            variant={isTextHighlighted ? "contained" : "outlined"}
            color="secondary"
            sx={{
              borderRadius: 20,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: isTextHighlighted ? 'secondary.dark' : 'rgba(103, 80, 164, 0.08)',
              },
            }}
          >
            {isTextHighlighted ? "Stop Highlighting" : "Auto-Highlight"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
