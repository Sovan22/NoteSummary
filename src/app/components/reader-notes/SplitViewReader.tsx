'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  BookmarkBorder as BookmarkIcon,
  Share as ShareIcon
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`reader-tabpanel-${index}`}
      aria-labelledby={`reader-tab-${index}`}
      {...other}
      style={{ height: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `reader-tab-${index}`,
    'aria-controls': `reader-tabpanel-${index}`,
  };
}

interface SplitViewReaderProps {
  contentTitle?: string;
  contentType?: 'pdf' | 'text' | 'web' | 'video';
  isLoading?: boolean;
}

export default function SplitViewReader({ 
  contentTitle = 'Understanding Machine Learning', 
  contentType = 'pdf',
  isLoading = false
}: SplitViewReaderProps) {
  const [tabValue, setTabValue] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 10, 50));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Sample content for demonstration
  const originalContent = `# Understanding Machine Learning

Machine learning is a field of artificial intelligence that uses statistical techniques to give computer systems the ability to "learn" from data, without being explicitly programmed.

## Types of Machine Learning

### Supervised Learning
Supervised learning algorithms build a mathematical model of a set of data that contains both the inputs and the desired outputs. Examples include:
- Classification
- Regression

### Unsupervised Learning
Unsupervised learning algorithms take a set of data that contains only inputs, and find structure in the data, like grouping or clustering. Examples include:
- Clustering
- Dimensionality reduction

### Reinforcement Learning
Reinforcement learning is concerned with how intelligent agents ought to take actions in an environment in order to maximize the notion of cumulative reward.

## Popular Algorithms
- Linear Regression
- Logistic Regression
- Decision Trees
- Random Forests
- Support Vector Machines
- Neural Networks
- K-means Clustering`;

  const aiSummary = `# AI-Generated Summary

## Key Concepts in Machine Learning

Machine learning is a subset of AI that enables systems to learn from data without explicit programming.

### Three Main Types:
1. **Supervised Learning**
   - Uses labeled data
   - Includes classification and regression tasks
   - Examples: spam detection, price prediction

2. **Unsupervised Learning**
   - Uses unlabeled data
   - Focuses on finding patterns and structures
   - Examples: customer segmentation, anomaly detection

3. **Reinforcement Learning**
   - Based on reward-based feedback
   - Agent learns optimal actions
   - Examples: game playing, robotics

### Important Algorithms
- Linear/Logistic Regression: For simple relationships
- Decision Trees & Random Forests: For complex pattern recognition
- Neural Networks: For deep pattern recognition
- K-means: For data clustering`;

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        borderRadius: 4,
        height: isFullscreen ? 'calc(100vh - 100px)' : 600,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2,
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Typography variant="h6" noWrap>
          {contentTitle}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Zoom out">
            <IconButton onClick={handleZoomOut} size="small">
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="body2" sx={{ mx: 1 }}>
            {zoomLevel}%
          </Typography>
          <Tooltip title="Zoom in">
            <IconButton onClick={handleZoomIn} size="small">
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <Tooltip title="Bookmark">
            <IconButton size="small">
              <BookmarkIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton size="small">
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
            <IconButton onClick={toggleFullscreen} size="small">
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flexGrow: 1,
        overflow: 'hidden'
      }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="reader tabs"
            variant="fullWidth"
          >
            <Tab label="Split View" {...a11yProps(0)} />
            <Tab label="Original" {...a11yProps(1)} />
            <Tab label="AI Summary" {...a11yProps(2)} />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Box 
            sx={{ 
              display: 'flex', 
              height: '100%',
              flexDirection: { xs: 'column', md: 'row' }
            }}
          >
            <Box 
              sx={{ 
                flex: 1, 
                p: 2, 
                borderRight: { md: 1 }, 
                borderBottom: { xs: 1, md: 0 },
                borderColor: 'divider',
                height: { xs: '50%', md: '100%' },
                overflow: 'auto'
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Original Content
              </Typography>
              
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Typography
                  component="div"
                  sx={{
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    fontSize: `${zoomLevel}%`,
                  }}
                >
                  {originalContent}
                </Typography>
              )}
            </Box>
            
            <Box 
              sx={{ 
                flex: 1, 
                p: 2,
                height: { xs: '50%', md: '100%' },
                overflow: 'auto'
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                AI Summary
              </Typography>
              
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Typography
                  component="div"
                  sx={{
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    fontSize: `${zoomLevel}%`,
                  }}
                >
                  {aiSummary}
                </Typography>
              )}
            </Box>
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Typography
              component="div"
              sx={{
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                fontSize: `${zoomLevel}%`,
              }}
            >
              {originalContent}
            </Typography>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Typography
              component="div"
              sx={{
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                fontSize: `${zoomLevel}%`,
              }}
            >
              {aiSummary}
            </Typography>
          )}
        </TabPanel>
      </Box>
    </Paper>
  );
}
