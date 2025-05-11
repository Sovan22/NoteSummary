'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Fade,
  Grow,
  Skeleton,
  Divider,
  Button,
  Tooltip,
  Badge
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ShareIcon from '@mui/icons-material/Share';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Types
interface KeyPoint {
  id: string;
  text: string;
  category: 'concept' | 'fact' | 'definition' | 'person' | 'date' | 'formula';
  confidence: number;
}

interface SummaryData {
  title: string;
  shortSummary: string;
  mediumSummary: string;
  detailedSummary: string;
  keyPoints: KeyPoint[];
  sourceDocumentName: string;
}

const mockSummaryData: SummaryData = {
  title: "Machine Learning Fundamentals",
  shortSummary: "This document introduces core machine learning concepts, including supervised and unsupervised learning approaches, model evaluation techniques, and common algorithms like regression, classification, and clustering.",
  mediumSummary: `Machine learning is a field of artificial intelligence focused on building systems that learn from data. The document covers the major categories of machine learning: supervised learning (with labeled training data), unsupervised learning (without labeled data), and reinforcement learning (learning through interaction with an environment).

Key algorithms discussed include linear and logistic regression, decision trees, support vector machines, k-means clustering, and neural networks. The document emphasizes the importance of proper data preparation, feature selection, and model evaluation using metrics such as accuracy, precision, recall, and F1 score.

The text also addresses common challenges in machine learning, including overfitting, underfitting, and the bias-variance tradeoff.`,
  detailedSummary: `Machine learning is a subfield of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. The document comprehensively explores the theoretical foundations and practical applications of machine learning across various domains.

The text begins by distinguishing between the three primary machine learning paradigms:
1. Supervised Learning: Algorithms learn from labeled training data to predict outcomes for unseen data. Examples include regression (predicting continuous values) and classification (assigning categories).
2. Unsupervised Learning: Algorithms find patterns in unlabeled data. Key techniques include clustering, dimensionality reduction, and association rule learning.
3. Reinforcement Learning: Agents learn optimal behaviors through trial-and-error interactions with an environment, maximizing cumulative rewards.

The document thoroughly examines the machine learning pipeline, starting with data collection and preprocessing. It emphasizes the critical importance of data cleaning, normalization, and handling missing values. Feature engineering and selection are presented as essential steps that significantly impact model performance.

For model training and evaluation, the text discusses:
- Train-test splits and cross-validation techniques
- Hyperparameter tuning approaches like grid search and random search
- Evaluation metrics including accuracy, precision, recall, F1 score for classification; and MAE, MSE, RMSE for regression
- Learning curves to diagnose bias and variance problems

Specific algorithms covered in detail include:
- Linear and polynomial regression
- Logistic regression and softmax for multi-class problems
- Decision trees and ensemble methods (Random Forests, Gradient Boosting)
- Support Vector Machines with various kernel functions
- K-means and hierarchical clustering
- Principal Component Analysis (PCA) for dimensionality reduction
- Neural networks, including feed-forward, convolutional, and recurrent architectures

The document addresses advanced topics such as:
- Regularization techniques (L1/L2) to prevent overfitting
- The bias-variance tradeoff and strategies for optimization
- Feature importance and model interpretability
- Handling imbalanced datasets
- Online learning for streaming data

Ethical considerations in machine learning applications are also discussed, including issues of bias, fairness, transparency, and privacy. The text concludes with emerging trends and future directions in the field.`,
  keyPoints: [
    {
      id: "kp1",
      text: "Supervised learning uses labeled data to train models that can predict outcomes for new data.",
      category: "concept",
      confidence: 0.98
    },
    {
      id: "kp2",
      text: "Unsupervised learning finds patterns in unlabeled data through clustering and dimensionality reduction.",
      category: "concept",
      confidence: 0.95
    },
    {
      id: "kp3",
      text: "The bias-variance tradeoff is a central challenge in machine learning model development.",
      category: "concept",
      confidence: 0.92
    },
    {
      id: "kp4",
      text: "Arthur Samuel coined the term 'machine learning' in 1959 while at IBM.",
      category: "person",
      confidence: 0.88
    },
    {
      id: "kp5",
      text: "Cross-validation is a technique to assess how a model generalizes to independent datasets.",
      category: "definition",
      confidence: 0.94
    },
    {
      id: "kp6",
      text: "F1 Score = 2 * (Precision * Recall) / (Precision + Recall)",
      category: "formula",
      confidence: 0.99
    },
    {
      id: "kp7",
      text: "Deep learning models began dominating computer vision tasks after AlexNet won the ImageNet competition in 2012.",
      category: "date",
      confidence: 0.96
    },
    {
      id: "kp8",
      text: "Feature selection is the process of selecting a subset of relevant features for model training.",
      category: "definition",
      confidence: 0.93
    }
  ],
  sourceDocumentName: "Machine Learning - Comprehensive Guide.pdf"
};

interface SummaryViewProps {
  summaryData?: SummaryData;
  isLoading?: boolean;
  onSave?: () => void;
}

export default function SummaryView({
  summaryData = mockSummaryData,
  isLoading = false,
  onSave
}: SummaryViewProps) {
  const [activeTab, setActiveTab] = useState(1); // 0: short, 1: medium, 2: detailed
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedPoints, setExpandedPoints] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isTextHighlighted, setIsTextHighlighted] = useState(false);
  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([]);
  const paragraphRefs = useRef<(HTMLElement | null)[]>([]);
  
  // Prepare the content based on active tab
  const activeContent = activeTab === 0 
    ? summaryData.shortSummary 
    : activeTab === 1 
      ? summaryData.mediumSummary 
      : summaryData.detailedSummary;
  
  const paragraphs = activeContent.split('\n\n').filter(p => p.trim() !== '');
  
  // Initialize paragraph refs
  useEffect(() => {
    paragraphRefs.current = paragraphs.map(() => null);
  }, [paragraphs.length]);
  
  // Animate paragraphs in sequence
  useEffect(() => {
    if (isLoading) return;
    
    // Reset visible paragraphs when tab changes
    setVisibleParagraphs([]);
    
    // Show paragraphs one by one with delay
    const timeouts = paragraphs.map((_, index) => {
      return setTimeout(() => {
        setVisibleParagraphs(prev => [...prev, index]);
      }, 150 * (index + 1));
    });
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [activeTab, isLoading, paragraphs.length]);
  
  // Toggle bookmark
  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (onSave) {
      onSave();
    }
  };
  
  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  // Toggle key points expansion
  const toggleExpandPoints = () => {
    setExpandedPoints(!expandedPoints);
  };
  
  // Filter key points by category
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  // Get filtered key points
  const filteredKeyPoints = selectedCategories.length === 0 
    ? summaryData.keyPoints 
    : summaryData.keyPoints.filter(kp => selectedCategories.includes(kp.category));
  
  // Get category label and color
  const getCategoryProps = (category: string) => {
    switch (category) {
      case 'concept':
        return { label: 'Concept', color: 'primary' };
      case 'fact':
        return { label: 'Fact', color: 'info' };
      case 'definition':
        return { label: 'Definition', color: 'secondary' };
      case 'person':
        return { label: 'Person', color: 'success' };
      case 'date':
        return { label: 'Date', color: 'warning' };
      case 'formula':
        return { label: 'Formula', color: 'error' };
      default:
        return { label: category, color: 'default' };
    }
  };
  
  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  // Toggle text highlighting
  const handleToggleHighlight = () => {
    setIsTextHighlighted(!isTextHighlighted);
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        elevation={2}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.07)',
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            background: theme => 
              `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.main}05)`,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {isLoading ? <Skeleton width={300} /> : summaryData.title}
            </Typography>
            
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
              
              <Tooltip title={isBookmarked ? "Remove bookmark" : "Bookmark this summary"}>
                <IconButton 
                  size="small" 
                  onClick={handleToggleBookmark}
                  color={isBookmarked ? "primary" : "default"}
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
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
          
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {isLoading ? (
              <Skeleton width="60%" />
            ) : (
              <>Source: <b>{summaryData.sourceDocumentName}</b></>
            )}
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: 2,
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                },
              }}
            >
              <Tab 
                label="Concise" 
                disabled={isLoading}
                sx={{ 
                  fontSize: 14,
                  '&.Mui-selected': {
                    color: 'primary.main',
                  }
                }} 
              />
              <Tab 
                label="Standard" 
                disabled={isLoading}
                sx={{ 
                  fontSize: 14,
                  '&.Mui-selected': {
                    color: 'primary.main',
                  }
                }} 
              />
              <Tab 
                label="Detailed" 
                disabled={isLoading}
                sx={{ 
                  fontSize: 14,
                  '&.Mui-selected': {
                    color: 'primary.main',
                  }
                }} 
              />
            </Tabs>
          </Box>
        </Box>
        
        {/* Summary content */}
        <Box sx={{ p: 3 }}>
          {isLoading ? (
            // Loading skeleton
            <>
              <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={24} width="60%" sx={{ mb: 3 }} />
              
              <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={24} width="80%" sx={{ mb: 3 }} />
            </>
          ) : (
            // Actual summary content
            <Box
              sx={{
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
                  in={visibleParagraphs.includes(index)} 
                  timeout={500}
                  style={{ 
                    transitionDelay: `${50 * index}ms`,
                  }}
                >
                  <Typography 
                    ref={(el) => {
                      if (el) {
                        paragraphRefs.current[index] = el;
                      }
                    }}
                    component="div"
                    variant="body1" 
                    paragraph 
                    sx={{ 
                      lineHeight: 1.8,
                      textAlign: 'justify',
                      opacity: visibleParagraphs.includes(index) ? 1 : 0,
                      transform: visibleParagraphs.includes(index) ? 'translateY(0)' : 'translateY(10px)',
                      transition: 'opacity 0.5s ease, transform 0.5s ease',
                    }}
                  >
                    {paragraph}
                  </Typography>
                </Fade>
              ))}
            </Box>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              size="small"
              startIcon={<AutoAwesomeIcon />}
              onClick={handleToggleHighlight}
              variant={isTextHighlighted ? "contained" : "text"}
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
        
        {/* Key Points Section */}
        <Divider />
        <Box sx={{ p: 3 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2,
              cursor: 'pointer',
            }}
            onClick={toggleExpandPoints}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextSnippetIcon color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Key Points
              </Typography>
              <Badge 
                badgeContent={summaryData.keyPoints.length} 
                color="primary"
                sx={{ ml: 1 }}
              />
            </Box>
            
            <IconButton size="small">
              {expandedPoints ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
          
          {/* Category filter chips */}
          {expandedPoints && (
            <Fade in={expandedPoints} timeout={300}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {['concept', 'fact', 'definition', 'person', 'date', 'formula'].map(category => {
                  const { label, color } = getCategoryProps(category);
                  const count = summaryData.keyPoints.filter(kp => kp.category === category).length;
                  const isSelected = selectedCategories.includes(category);
                  
                  return (
                    <Chip
                      key={category}
                      label={`${label} (${count})`}
                      variant={isSelected ? "filled" : "outlined"}
                      color={isSelected ? color as any : "default"}
                      size="small"
                      onClick={() => handleCategoryToggle(category)}
                      sx={{
                        borderRadius: 10,
                        transition: 'all 0.3s ease',
                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                        fontWeight: isSelected ? 600 : 400,
                      }}
                    />
                  );
                })}
              </Box>
            </Fade>
          )}
          
          {/* Key points list */}
          {expandedPoints && (
            <Box 
              sx={{ 
                mt: 1,
                maxHeight: expandedPoints ? 400 : 0,
                overflow: 'auto',
                transition: 'max-height 0.3s ease',
              }}
            >
              {filteredKeyPoints.length === 0 ? (
                <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                  No key points match the selected filters.
                </Typography>
              ) : (
                filteredKeyPoints.map((keyPoint, index) => {
                  const { label, color } = getCategoryProps(keyPoint.category);
                  
                  return (
                    <Grow 
                      key={keyPoint.id} 
                      in={expandedPoints}
                      timeout={300 + index * 50}
                      style={{ transformOrigin: '0 0 0' }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          p: 2,
                          mb: 1.5,
                          borderRadius: 2,
                          backgroundColor: 'background.default',
                          border: '1px solid',
                          borderColor: 'divider',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                            borderColor: theme => 
                              keyPoint.category === 'concept' ? theme.palette.primary.main : 
                              keyPoint.category === 'definition' ? theme.palette.secondary.main :
                              keyPoint.category === 'formula' ? theme.palette.error.main :
                              keyPoint.category === 'person' ? theme.palette.success.main :
                              keyPoint.category === 'date' ? theme.palette.warning.main :
                              theme.palette.info.main
                          },
                        }}
                      >
                        <Box sx={{ mr: 2, mt: 0.5 }}>
                          <Chip
                            label={label}
                            size="small"
                            color={color as any}
                            sx={{ 
                              minWidth: 90,
                              fontWeight: 600,
                              fontSize: '0.7rem',
                            }}
                          />
                        </Box>
                        
                        <Box>
                          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                            {keyPoint.text}
                          </Typography>
                          
                          <Typography 
                            variant="caption" 
                            color="text.secondary" 
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              mt: 1,
                              opacity: 0.7
                            }}
                          >
                            Confidence: {(keyPoint.confidence * 100).toFixed(0)}%
                          </Typography>
                        </Box>
                      </Box>
                    </Grow>
                  );
                })
              )}
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
