'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Paper, 
  IconButton, 
  Grow,
  Fade,
  Divider
} from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyPointCard from './KeyPointCard';
import { getKeyboardNavHelpers } from './utils/accessibility';
import { useTheme } from '@mui/material/styles';

interface KeyPoint {
  id: string;
  text: string;
  category: 'concept' | 'fact' | 'definition' | 'person' | 'date' | 'formula';
  confidence: number;
}

interface KeyPointsPanelProps {
  keyPoints: KeyPoint[];
  sourceReferences?: any;
  onKeyPointHover?: (id: string) => void;
  onKeyPointLeave?: () => void;
}

export default function KeyPointsPanel({
  keyPoints,
  sourceReferences = {},
  onKeyPointHover,
  onKeyPointLeave
}: KeyPointsPanelProps) {
  const theme = useTheme();
  const [expandedPoints, setExpandedPoints] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [focusedKeyPointIndex, setFocusedKeyPointIndex] = useState(-1);
  
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
    ? keyPoints 
    : keyPoints.filter(kp => selectedCategories.includes(kp.category));
  
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
  
  // Get keyboard navigation helpers
  const keyboardNavProps = getKeyboardNavHelpers(
    filteredKeyPoints.length,
    focusedKeyPointIndex,
    setFocusedKeyPointIndex
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
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={toggleExpandPoints}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextSnippetIcon color="primary" />
          <Typography variant="h6" fontWeight={600}>
            Key Points
          </Typography>
          <Chip 
            label={keyPoints.length}
            color="primary"
            size="small"
            sx={{ ml: 1, height: '22px', minWidth: '22px' }}
          />
        </Box>
        
        <IconButton size="small">
          {expandedPoints ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>
      
      {/* Content area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          pt: 0,
          display: 'flex',
          flexDirection: 'column',
          opacity: expandedPoints ? 1 : 0,
          maxHeight: expandedPoints ? '100%' : 0,
          transition: 'opacity 0.3s ease, max-height 0.3s ease',
        }}
      >
        {/* Category filter chips */}
        <Fade in={expandedPoints} timeout={300}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
            {['concept', 'fact', 'definition', 'person', 'date', 'formula'].map(category => {
              const { label, color } = getCategoryProps(category);
              const count = keyPoints.filter(kp => kp.category === category).length;
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
        
        {/* Divider */}
        <Divider sx={{ mb: 2 }} />
        
        {/* Key points list */}
        <Box 
          sx={{ flex: 1 }}
          {...keyboardNavProps}
        >
          {filteredKeyPoints.length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
              No key points match the selected filters.
            </Typography>
          ) : (
            filteredKeyPoints.map((keyPoint, index) => {
              const refs = sourceReferences[keyPoint.id] || [];
              
              return (
                <Grow 
                  key={keyPoint.id} 
                  in={expandedPoints}
                  timeout={300 + index * 50}
                  style={{ transformOrigin: '0 0 0' }}
                >
                  <Box 
                    id={`item-${index}`}
                    tabIndex={focusedKeyPointIndex === index ? 0 : -1}
                    sx={{ 
                      outline: focusedKeyPointIndex === index ? `2px solid ${theme.palette.primary.main}` : 'none',
                      outlineOffset: '2px',
                      borderRadius: '8px'
                    }}
                  >
                    <KeyPointCard
                      id={keyPoint.id}
                      text={keyPoint.text}
                      category={keyPoint.category}
                      confidence={keyPoint.confidence}
                      sourceReferences={refs}
                      onMouseEnter={() => onKeyPointHover && onKeyPointHover(keyPoint.id)}
                      onMouseLeave={onKeyPointLeave}
                    />
                  </Box>
                </Grow>
              );
            })
          )}
        </Box>
      </Box>
    </Paper>
  );
}
