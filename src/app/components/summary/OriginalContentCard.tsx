'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Paper, Typography, Divider, Tabs, Tab, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getSummaryAriaAttributes } from './utils/accessibility';
import { useTheme } from '@mui/material/styles';

interface OriginalContentCardProps {
  content: string;
  title: string;
  sourceDocumentName: string;
  selectedReferenceRange?: {
    start: number;
    end: number;
  };
  onRegenerateRequest?: () => void;
  contentChanged?: boolean;
}

export default function OriginalContentCard({
  content,
  title,
  sourceDocumentName,
  selectedReferenceRange,
  onRegenerateRequest,
  contentChanged = false
}: OriginalContentCardProps) {
  const theme = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  
  // Split content into paragraphs for better formatting
  const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');
  
  // Scroll to selected reference when it changes
  useEffect(() => {
    if (selectedReferenceRange && contentRef.current) {
      // Convert the content to HTML with highlighted text
      const { start, end } = selectedReferenceRange;
      
      // Find the element with the correct ID
      const highlightId = `source-text-${start}-${end}`;
      const element = document.getElementById(highlightId);
      
      if (element) {
        // Clear existing highlights
        document.querySelectorAll('.source-highlight').forEach(el => {
          el.classList.remove('source-highlight');
        });
        
        // Add highlight to this element
        element.classList.add('source-highlight');
        
        // Scroll the element into view
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [selectedReferenceRange]);
  
  // Parse content to highlight references
  const createContentElements = () => {
    if (!content) return <Typography>No content available</Typography>;
    
    return paragraphs.map((paragraph, index) => (
      <Typography 
        key={`para-${index}`}
        variant="body2" 
        component="p"
        sx={{ 
          mb: 2,
          lineHeight: 1.7,
          textAlign: 'justify'
        }}
      >
        {paragraph}
      </Typography>
    ));
  };
  
  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  // Get ARIA attributes for accessibility
  const ariaAttributes = getSummaryAriaAttributes(
    'original-content',
    true,
    false,
    1.0 // Source content has 100% confidence
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
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>
            Original Content
          </Typography>
          
          {/* Regenerate button (only visible if content changed) */}
          {contentChanged && (
            <Tooltip title="Content changed - Regenerate summary">
              <IconButton 
                color="primary" 
                size="small"
                onClick={onRegenerateRequest}
                sx={{
                  animation: contentChanged ? 'pulse 2s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0.4)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(25, 118, 210, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0)' }
                  }
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          From: <b>{sourceDocumentName}</b>
        </Typography>
        
        <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
          {title}
        </Typography>
        
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            minHeight: '36px',
            '& .MuiTab-root': {
              minHeight: '36px',
              textTransform: 'none',
              fontSize: '0.875rem'
            }
          }}
        >
          <Tab label="Content" />
          <Tab label="Structure" disabled />
          <Tab label="Metadata" disabled />
        </Tabs>
      </Box>

      {/* Content */}
      <Box
        ref={contentRef}
        sx={{
          p: 2,
          flex: 1,
          overflowY: 'auto',
          bgcolor: (theme) => 
            theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.01)',
          position: 'relative',
          
          // Styling for highlighted source text
          '& .source-highlight': {
            backgroundColor: theme => 
              theme.palette.mode === 'dark' ? 'rgba(144, 202, 249, 0.2)' : 'rgba(33, 150, 243, 0.1)',
            border: '1px solid',
            borderColor: theme => 
              theme.palette.mode === 'dark' ? 'rgba(144, 202, 249, 0.5)' : 'rgba(33, 150, 243, 0.3)',
            borderRadius: '4px',
            padding: '0 4px',
            margin: '0 -4px',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 8px rgba(33, 150, 243, 0.4)',
            animation: 'highlight-pulse 2s infinite',
            '@keyframes highlight-pulse': {
              '0%': { boxShadow: '0 0 4px rgba(33, 150, 243, 0.4)' },
              '50%': { boxShadow: '0 0 8px rgba(33, 150, 243, 0.7)' },
              '100%': { boxShadow: '0 0 4px rgba(33, 150, 243, 0.4)' }
            }
          }
        }}
      >
        {activeTab === 0 && createContentElements()}
      </Box>
    </Paper>
  );
}
