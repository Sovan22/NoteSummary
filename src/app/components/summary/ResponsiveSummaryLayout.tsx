'use client';

import { useState, useEffect } from 'react';
import { Box, useMediaQuery, Paper, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface ResponsiveSummaryLayoutProps {
  originalContent: React.ReactNode;
  summaryContent: React.ReactNode;
  keyPointsContent: React.ReactNode;
}

export default function ResponsiveSummaryLayout({
  originalContent,
  summaryContent,
  keyPointsContent
}: ResponsiveSummaryLayoutProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [activeView, setActiveView] = useState<'original' | 'summary' | 'keypoints'>('summary');
  const [previousView, setPreviousView] = useState<'original' | 'summary' | 'keypoints'>('original');
  
  // Toggle between views on mobile
  const handleViewChange = (view: 'original' | 'summary' | 'keypoints') => {
    if (view !== activeView) {
      setPreviousView(activeView);
      setActiveView(view);
    }
  };
  
  // Reset to summary view when switching from mobile to desktop
  useEffect(() => {
    if (isDesktop) {
      setActiveView('summary');
    }
  }, [isDesktop]);
  
  // For desktop: side-by-side layout
  if (isDesktop) {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 3,
          width: '100%',
          height: 'calc(100vh - 200px)',
          minHeight: '600px',
          maxHeight: '1000px',
          mb: 4
        }}
      >
        {/* Original content column */}
        <Box
          sx={{
            gridColumn: '1 / 2',
            height: '100%'
          }}
        >
          {originalContent}
        </Box>
        
        {/* Summary + Key Points column */}
        <Box
          sx={{
            gridColumn: '2 / 3',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            gap: 3
          }}
        >
          {/* Summary takes 60% of height */}
          <Box
            sx={{
              height: '60%',
            }}
          >
            {summaryContent}
          </Box>
          
          {/* Key points take 40% of height */}
          <Box
            sx={{
              height: '40%',
            }}
          >
            {keyPointsContent}
          </Box>
        </Box>
      </Box>
    );
  }
  
  // For mobile: stacked layout with navigation
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        mb: 4
      }}
    >
      {/* Mobile Navigation */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 2,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Paper
          elevation={1}
          sx={{
            display: 'flex',
            gap: 1,
            p: 0.5,
            borderRadius: 20,
            bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
          }}
        >
          <Tooltip title="View original content">
            <IconButton
              size="small"
              color={activeView === 'original' ? 'primary' : 'default'}
              onClick={() => handleViewChange('original')}
              sx={{
                bgcolor: activeView === 'original' 
                  ? theme => theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.2)' : 'rgba(25, 118, 210, 0.1)'
                  : 'transparent',
                '&:hover': {
                  bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.3)' : 'rgba(25, 118, 210, 0.2)'
                }
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="View summary">
            <IconButton
              size="small"
              color={activeView === 'summary' ? 'primary' : 'default'}
              onClick={() => handleViewChange('summary')}
              sx={{
                bgcolor: activeView === 'summary' 
                  ? theme => theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.2)' : 'rgba(25, 118, 210, 0.1)'
                  : 'transparent',
                '&:hover': {
                  bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.3)' : 'rgba(25, 118, 210, 0.2)'
                }
              }}
            >
              {activeView === 'original' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="View key points">
            <IconButton
              size="small"
              color={activeView === 'keypoints' ? 'primary' : 'default'}
              onClick={() => handleViewChange('keypoints')}
              sx={{
                bgcolor: activeView === 'keypoints' 
                  ? theme => theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.2)' : 'rgba(25, 118, 210, 0.1)'
                  : 'transparent',
                '&:hover': {
                  bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.3)' : 'rgba(25, 118, 210, 0.2)'
                }
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Tooltip>
        </Paper>
      </Box>
      
      {/* Content display area */}
      <Box
        sx={{
          height: 'calc(100vh - 200px)',
          minHeight: '600px',
          maxHeight: '1000px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Original Content */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: activeView === 'original' ? 0 : activeView === 'summary' ? '-100%' : '-200%',
            opacity: activeView === 'original' ? 1 : 0,
            transition: 'left 0.3s ease-in-out, opacity 0.3s ease-in-out',
            visibility: activeView === 'original' ? 'visible' : 'hidden',
          }}
        >
          {originalContent}
        </Box>
        
        {/* Summary Content */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: activeView === 'summary' ? 0 : activeView === 'original' ? '100%' : '-100%',
            opacity: activeView === 'summary' ? 1 : 0,
            transition: 'left 0.3s ease-in-out, opacity 0.3s ease-in-out',
            visibility: activeView === 'summary' ? 'visible' : 'hidden',
          }}
        >
          {summaryContent}
        </Box>
        
        {/* Key Points Content */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: activeView === 'keypoints' ? 0 : activeView === 'summary' ? '100%' : '200%',
            opacity: activeView === 'keypoints' ? 1 : 0,
            transition: 'left 0.3s ease-in-out, opacity 0.3s ease-in-out',
            visibility: activeView === 'keypoints' ? 'visible' : 'hidden',
          }}
        >
          {keyPointsContent}
        </Box>
      </Box>
    </Box>
  );
}
