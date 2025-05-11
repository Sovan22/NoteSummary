'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Alert,
  Button,
  Fade,
  Grow,
  useTheme,
  CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkIcon from '@mui/icons-material/Link';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Layout from '../components/layout/Layout';

// Import correct paths to the components
import UploaderComponent from '../components/upload/UploaderComponent';
import URLInputComponent from '../components/upload/URLInputComponent';
import SummaryView from '../components/summary/SummaryView';

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
      id={`upload-tabpanel-${index}`}
      aria-labelledby={`upload-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const theme = useTheme();

  // Animate page load
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Simulate file upload process
  const handleFileSelect = () => {
    setIsUploaded(true);
  };

  // Simulate processing
  const handleStartProcessing = () => {
    setIsProcessing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsProcessed(true);
    }, 3000);
  };

  // Reset the process
  const handleReset = () => {
    setIsUploaded(false);
    setIsProcessing(false);
    setIsProcessed(false);
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <Fade in={isPageLoaded} timeout={800}>
          <Box>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 2,
                background: (theme) => 
                  `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.main}05)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2
              }}
            >
              <Box>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  Upload Content
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Upload or link content for AI analysis and insights
                </Typography>
              </Box>
              
              <Box
                sx={{
                  width: { xs: 60, md: 80 },
                  height: { xs: 60, md: 80 },
                  borderRadius: '50%',
                  backgroundColor: 'background.paper',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '150%',
                    height: '150%',
                    background: 'radial-gradient(circle, rgba(103,80,164,0.1) 0%, rgba(103,80,164,0) 70%)',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { opacity: 0.6, transform: 'scale(0.8)' },
                      '50%': { opacity: 1, transform: 'scale(1)' },
                      '100%': { opacity: 0.6, transform: 'scale(0.8)' },
                    },
                  },
                }}
              >
                {isProcessed ? (
                  <AutoAwesomeIcon 
                    color="primary" 
                    sx={{ 
                      fontSize: { xs: 30, md: 40 },
                      animation: 'float 3s ease-in-out infinite',
                      '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(-5px)' },
                      },
                    }} 
                  />
                ) : activeTab === 0 ? (
                  <CloudUploadIcon 
                    color="primary" 
                    sx={{ 
                      fontSize: { xs: 30, md: 40 },
                      animation: 'fadeInUp 1s ease-out',
                      '@keyframes fadeInUp': {
                        from: { opacity: 0, transform: 'translateY(10px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                      },
                    }} 
                  />
                ) : (
                  <LinkIcon 
                    color="primary" 
                    sx={{ 
                      fontSize: { xs: 30, md: 40 },
                      animation: 'fadeInUp 1s ease-out',
                    }} 
                  />
                )}
              </Box>
            </Paper>
          </Box>
        </Fade>
        
        {!isProcessed && (
          <Grow in={isPageLoaded && !isProcessed} timeout={1000}>
            <Paper 
              elevation={2} 
              sx={{ 
                borderRadius: 2,
                overflow: 'hidden',
                mb: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.07)'
                }
              }}
            >
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange}
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  backgroundColor: theme.palette.background.paper,
                  '& .MuiTabs-indicator': {
                    height: 4,
                    borderRadius: '4px 4px 0 0',
                  },
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: 16,
                    py: 2,
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <Tab 
                  label="File Upload" 
                  icon={<CloudUploadIcon />}
                  iconPosition="start"
                  sx={{
                    minHeight: 64,
                    transition: 'background-color 0.3s ease',
                    '&.Mui-selected': {
                      color: 'primary.main',
                    },
                  }}
                />
                <Tab 
                  label="URL / Link" 
                  icon={<LinkIcon />}
                  iconPosition="start"
                  sx={{
                    minHeight: 64,
                    transition: 'background-color 0.3s ease',
                    '&.Mui-selected': {
                      color: 'primary.main',
                    },
                  }}
                />
              </Tabs>
              
              <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Fade key={activeTab} in={true} timeout={500}>
                  <Box>
                    <TabPanel value={activeTab} index={0}>
                      <UploaderComponent onFileSelect={handleFileSelect} />
                    </TabPanel>
                    <TabPanel value={activeTab} index={1}>
                      <URLInputComponent 
                        onURLValidated={(isValid) => setIsUploaded(isValid)}
                        onURLSubmit={handleStartProcessing}
                      />
                    </TabPanel>
                  </Box>
                </Fade>
              </Box>
              
              {isUploaded && !isProcessing && !isProcessed && activeTab === 0 && (
                <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Grow in={isUploaded && !isProcessing && !isProcessed} timeout={500}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Alert 
                        severity="success" 
                        sx={{ 
                          borderRadius: 2,
                          flex: 1,
                          animation: 'slideInLeft 0.5s ease-out',
                          '@keyframes slideInLeft': {
                            from: { opacity: 0, transform: 'translateX(-20px)' },
                            to: { opacity: 1, transform: 'translateX(0)' },
                          },
                        }}
                      >
                        File uploaded successfully! Ready for AI processing.
                      </Alert>
                      
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleStartProcessing}
                        sx={{
                          ml: 2,
                          borderRadius: 2,
                          px: 3,
                          py: 1.2,
                          animation: 'pulse 1.5s infinite',
                          '@keyframes pulse': {
                            '0%': { boxShadow: '0 0 0 0 rgba(103, 80, 164, 0.4)' },
                            '70%': { boxShadow: '0 0 0 10px rgba(103, 80, 164, 0)' },
                            '100%': { boxShadow: '0 0 0 0 rgba(103, 80, 164, 0)' },
                          }
                        }}
                      >
                        Process with AI
                      </Button>
                    </Box>
                  </Grow>
                </Box>
              )}
              
              {isProcessing && (
                <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Fade in={isProcessing} timeout={500}>
                    <Alert 
                      severity="info" 
                      sx={{ 
                        borderRadius: 2,
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                          '0%': { boxShadow: '0 0 0 0 rgba(33, 150, 243, 0.4)' },
                          '70%': { boxShadow: '0 0 0 10px rgba(33, 150, 243, 0)' },
                          '100%': { boxShadow: '0 0 0 0 rgba(33, 150, 243, 0)' },
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={20} thickness={5} />
                        AI is analyzing your content. This might take a few moments...
                      </Box>
                    </Alert>
                  </Fade>
                </Box>
              )}
            </Paper>
          </Grow>
        )}
        
        {/* AI Generated Summary */}
        {isProcessed && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  }
                }}
              >
                Upload Another File
              </Button>
            </Box>
            
            <Grow in={isProcessed} timeout={800}>
              <Box>
                <SummaryView />
              </Box>
            </Grow>
          </Box>
        )}
      </Container>
    </Layout>
  );
}
