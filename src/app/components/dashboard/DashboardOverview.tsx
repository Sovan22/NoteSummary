'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  Chip,
  Avatar,
  IconButton,
  LinearProgress,
  Divider,
  Button,
  Badge,
  Fade,
  Grow
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AddIcon from '@mui/icons-material/Add';
import SchoolIcon from '@mui/icons-material/School';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import InsightIcon from '@mui/icons-material/Insights';
import PeopleIcon from '@mui/icons-material/People';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

// Mock data types
interface RecentDocument {
  id: string;
  title: string;
  previewText: string;
  icon: 'pdf' | 'doc' | 'article' | 'youtube' | 'audio';
  uploadDate: Date;
  aiStatus: 'processed' | 'processing' | 'queued' | 'error';
  progress?: number;
  insights?: number;
}

interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'concept' | 'trend' | 'summary' | 'question';
  documentId: string;
  documentTitle: string;
  timestamp: Date;
  isNew?: boolean;
}

interface LearningMetric {
  label: string;
  value: number;
  total: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

// Mock data
const recentDocuments: RecentDocument[] = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    previewText: 'This comprehensive guide covers supervised and unsupervised learning techniques...',
    icon: 'pdf',
    uploadDate: new Date(2025, 4, 10), // May 10, 2025
    aiStatus: 'processed',
    insights: 12
  },
  {
    id: '2',
    title: 'Introduction to Quantum Computing',
    previewText: 'Exploring the principles of quantum bits, entanglement, and quantum algorithms...',
    icon: 'article',
    uploadDate: new Date(2025, 4, 9), // May 9, 2025
    aiStatus: 'processed',
    insights: 8
  },
  {
    id: '3',
    title: 'Advanced React Design Patterns',
    previewText: 'Learn about compound components, render props, and custom hooks...',
    icon: 'youtube',
    uploadDate: new Date(2025, 4, 11), // May 11, 2025
    aiStatus: 'processing',
    progress: 67
  },
  {
    id: '4',
    title: 'Blockchain Fundamentals',
    previewText: 'Understanding distributed ledgers, consensus mechanisms, and smart contracts...',
    icon: 'doc',
    uploadDate: new Date(2025, 4, 8), // May 8, 2025
    aiStatus: 'queued'
  }
];

const aiInsights: AIInsight[] = [
  {
    id: '1',
    title: 'Connection between Neural Networks and Human Brain',
    description: 'The AI identified a key connection between artificial neural networks and biological brain structures...',
    type: 'concept',
    documentId: '1',
    documentTitle: 'Machine Learning Fundamentals',
    timestamp: new Date(2025, 4, 10, 14, 30), // May 10, 2025, 14:30
    isNew: true
  },
  {
    id: '2',
    title: 'Question: How does quantum decoherence affect quantum computations?',
    description: 'Based on your notes, this follow-up question might help deepen your understanding...',
    type: 'question',
    documentId: '2',
    documentTitle: 'Introduction to Quantum Computing',
    timestamp: new Date(2025, 4, 9, 10, 15), // May 9, 2025, 10:15
  },
  {
    id: '3',
    title: 'React Hooks Usage Patterns',
    description: 'Summary of the most effective patterns for using React hooks according to your materials...',
    type: 'summary',
    documentId: '3',
    documentTitle: 'Advanced React Design Patterns',
    timestamp: new Date(2025, 4, 11, 9, 45), // May 11, 2025, 9:45
    isNew: true
  }
];

const learningMetrics: LearningMetric[] = [
  {
    label: 'Notes Created',
    value: 28,
    total: 30,
    unit: 'notes',
    trend: 'up',
    percentage: 93
  },
  {
    label: 'Study Time',
    value: 24,
    total: 40,
    unit: 'hours',
    trend: 'up',
    percentage: 60
  },
  {
    label: 'Flashcards Mastered',
    value: 152,
    total: 200,
    unit: 'cards',
    trend: 'stable',
    percentage: 76
  },
  {
    label: 'Concepts Learned',
    value: 42,
    total: 50,
    unit: 'concepts',
    trend: 'up',
    percentage: 84
  }
];

export default function DashboardOverview() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Animate in content after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Helper to format dates
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };
  
  // Helper to get document icon
  const getDocumentIcon = (type: RecentDocument['icon']) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'doc':
        return '📝';
      case 'article':
        return '📰';
      case 'youtube':
        return '🎬';
      case 'audio':
        return '🎧';
      default:
        return '📄';
    }
  };
  
  // Helper to get insight icon
  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'concept':
        return <ImportContactsIcon />;
      case 'trend':
        return <TrendingUpIcon />;
      case 'summary':
        return <DescriptionIcon />;
      case 'question':
        return <SchoolIcon />;
      default:
        return <InsightIcon />;
    }
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      {/* Welcome Section */}
      <Fade in={isLoaded} timeout={800}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 4,
            background: theme => 
              `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.main}05)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Welcome back, Alex
            </Typography>
            <Typography variant="body1" color="text.secondary">
              You have <b>3 new insights</b> and <b>1 document</b> processing.
            </Typography>
          </Box>
          
          <Box
            sx={{
              width: 60,
              height: 60,
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
            <AutoAwesomeIcon 
              color="primary" 
              sx={{ 
                fontSize: 32,
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-5px)' },
                },
              }} 
            />
          </Box>
          
          {/* Decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              right: 100,
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              opacity: 0.1,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 30,
              right: 140,
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: 'secondary.main',
              opacity: 0.15,
            }}
          />
        </Paper>
      </Fade>
      
      {/* Main Dashboard Content */}
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Left column - Recent Documents */}
        <Box sx={{ width: { xs: '100%', md: '60%' } }}>
          <Grow in={isLoaded} timeout={900}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 4,
                mb: 3,
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Recent Documents
                </Typography>
                
                <Button
                  startIcon={<AddIcon />}
                  variant="outlined"
                  color="primary"
                  sx={{
                    borderRadius: 8,
                    borderWidth: 2,
                    px: 2,
                    textTransform: 'none',
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Upload
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentDocuments.map((doc, index) => (
                  <Fade 
                    key={doc.id} 
                    in={isLoaded} 
                    timeout={1000 + index * 200}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <Card
                      sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        transform: 'translateY(0)',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                        },
                        position: 'relative',
                      }}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 24,
                              backgroundColor: 'action.hover',
                              flexShrink: 0,
                            }}
                          >
                            {getDocumentIcon(doc.icon)}
                          </Box>
                          
                          <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <Typography variant="subtitle1" fontWeight={600} noWrap>
                                {doc.title}
                              </Typography>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                  {formatDate(doc.uploadDate)}
                                </Typography>
                                
                                <IconButton size="small">
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                            
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                mb: doc.aiStatus === 'processing' ? 1 : 0,
                              }}
                            >
                              {doc.previewText}
                            </Typography>
                            
                            {doc.aiStatus === 'processing' && (
                              <Box sx={{ mt: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={doc.progress || 0}
                                  sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    mb: 0.5,
                                    '& .MuiLinearProgress-bar': {
                                      transition: 'transform 0.5s ease',
                                    }
                                  }}
                                />
                                <Typography variant="caption" color="text.secondary">
                                  AI Processing: {doc.progress}%
                                </Typography>
                              </Box>
                            )}
                            
                            <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center' }}>
                              <Chip
                                label={doc.aiStatus === 'processed' ? 'Processed' : 
                                      doc.aiStatus === 'processing' ? 'Processing' : 
                                      doc.aiStatus === 'queued' ? 'In Queue' : 'Error'}
                                size="small"
                                color={doc.aiStatus === 'processed' ? 'success' : 
                                      doc.aiStatus === 'processing' ? 'primary' : 
                                      doc.aiStatus === 'queued' ? 'info' : 'error'}
                                sx={{ 
                                  height: 24,
                                  '& .MuiChip-label': { px: 1 },
                                  borderRadius: 3
                                }}
                              />
                              
                              {doc.insights && (
                                <Chip
                                  icon={<InsightIcon sx={{ fontSize: 16 }} />}
                                  label={`${doc.insights} insights`}
                                  size="small"
                                  variant="outlined"
                                  sx={{ 
                                    height: 24,
                                    '& .MuiChip-label': { px: 1 },
                                    borderRadius: 3
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                ))}
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button 
                  color="primary"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 8,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(103, 80, 164, 0.08)',
                    }
                  }}
                >
                  View All Documents
                </Button>
              </Box>
            </Paper>
          </Grow>
        </Box>
        
        {/* Right column - AI Insights and Learning Metrics */}
        <Box sx={{ width: { xs: '100%', md: '40%' }, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* AI Insights */}
          <Grow in={isLoaded} timeout={1000}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  AI Insights
                </Typography>
                
                <Badge badgeContent={aiInsights.filter(i => i.isNew).length} color="error">
                  <NotificationsIcon color="action" />
                </Badge>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {aiInsights.map((insight, index) => (
                  <Fade 
                    key={insight.id} 
                    in={isLoaded} 
                    timeout={1200 + index * 200}
                    style={{ transitionDelay: `${100 + index * 100}ms` }}
                  >
                    <Card
                      sx={{
                        borderRadius: 3,
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        transform: insight.isNew ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: insight.isNew ? '0 8px 16px rgba(0, 0, 0, 0.08)' : 'none',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                        },
                        overflow: 'visible',
                        cursor: 'pointer',
                        '&::before': insight.isNew ? {
                          content: '""',
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: 'error.main',
                          zIndex: 1,
                        } : {}
                      }}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Avatar 
                            sx={{ 
                              bgcolor: 'primary.main',
                              width: 40,
                              height: 40,
                            }}
                          >
                            {getInsightIcon(insight.type)}
                          </Avatar>
                          
                          <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <Typography variant="subtitle1" fontWeight={600}>
                                {insight.title}
                              </Typography>
                              
                              <Typography variant="caption" color="text.secondary">
                                {new Date(insight.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </Typography>
                            </Box>
                            
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                mb: 1,
                              }}
                            >
                              {insight.description}
                            </Typography>
                            
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                            >
                              <DescriptionIcon fontSize="inherit" />
                              From: {insight.documentTitle}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                ))}
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button 
                  color="primary"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 8,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(103, 80, 164, 0.08)',
                    }
                  }}
                >
                  View All Insights
                </Button>
              </Box>
            </Paper>
          </Grow>
          
          {/* Learning Metrics */}
          <Grow in={isLoaded} timeout={1100}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                },
              }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Learning Progress
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  {learningMetrics.map((metric, index) => (
                    <Grid 
                      key={metric.label} 
                      sx={{ 
                        width: '50%', 
                        p: 1
                      }}
                    >
                      <Fade 
                        in={isLoaded} 
                        timeout={1300 + index * 100}
                        style={{ transitionDelay: `${200 + index * 50}ms` }}
                      >
                        <Card
                          sx={{
                            p: 2,
                            height: '100%',
                            borderRadius: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                              {metric.label}
                            </Typography>
                            
                            {metric.trend === 'up' && (
                              <TrendingUpIcon 
                                color="success" 
                                fontSize="small" 
                                sx={{ animation: 'fadeIn 1s ease' }} 
                              />
                            )}
                          </Box>
                          
                          <Box sx={{ mt: 'auto' }}>
                            <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                              {metric.value}
                              <Typography 
                                component="span" 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ ml: 0.5, fontWeight: 400 }}
                              >
                                / {metric.total} {metric.unit}
                              </Typography>
                            </Typography>
                            
                            <LinearProgress
                              variant="determinate"
                              value={metric.percentage}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                mb: 0.5,
                                '& .MuiLinearProgress-bar': {
                                  transition: 'transform 1s ease',
                                }
                              }}
                            />
                            
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                            >
                              <AccessTimeIcon fontSize="inherit" />
                              {metric.percentage}% Complete
                            </Typography>
                          </Box>
                        </Card>
                      </Fade>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grow>
          
          {/* Quick Actions */}
          <Grow in={isLoaded} timeout={1200}>
            <Paper
              elevation={2}
              sx={{
                p: 2.5,
                borderRadius: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                },
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Quick Actions
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<SchoolIcon />}
                  sx={{
                    borderRadius: 4,
                    textTransform: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Review Flashcards
                </Button>
                
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<PeopleIcon />}
                  sx={{
                    borderRadius: 4,
                    textTransform: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Share Notes
                </Button>
                
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<InsightIcon />}
                  sx={{
                    borderRadius: 4,
                    textTransform: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Generate Quiz
                </Button>
              </Box>
            </Paper>
          </Grow>
        </Box>
      </Box>
    </Box>
  );
}
