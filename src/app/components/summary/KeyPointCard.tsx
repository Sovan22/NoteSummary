'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Paper, 
  Tooltip, 
  Fade, 
  IconButton,
  Collapse
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { getKeyPointAriaAttributes } from './utils/accessibility';
import { getVisualPattern } from './utils/contentRelationship';
import { useTheme } from '@mui/material/styles';

export interface KeyPointCardProps {
  id: string;
  text: string;
  category: 'concept' | 'fact' | 'definition' | 'person' | 'date' | 'formula';
  confidence: number;
  sourceReferences?: any[];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onEditRequest?: () => void;
}

export default function KeyPointCard({
  id,
  text,
  category,
  confidence,
  sourceReferences = [],
  onMouseEnter,
  onMouseLeave,
  onEditRequest
}: KeyPointCardProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [correctionSubmitted, setCorrectionSubmitted] = useState(false);
  
  // Determine if this is a high, medium, or low confidence point
  const confidenceLevel = confidence >= 0.9 ? 'high' : confidence >= 0.7 ? 'medium' : 'low';
  
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
  
  const { label, color } = getCategoryProps(category);
  
  // Get ARIA attributes for accessibility
  const ariaAttributes = getKeyPointAriaAttributes(
    id,
    category,
    confidence,
    sourceReferences.length > 0
  );
  
  // Get visual pattern based on category and confidence
  const patternStyles = getVisualPattern(category, confidence);
  
  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  // Report a correction
  const handleRequestEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCorrectionSubmitted(true);
    if (onEditRequest) {
      onEditRequest();
    }
  };
  
  // Determine card border color based on confidence
  const getBorderColor = () => {
    const { palette } = theme;
    switch (confidenceLevel) {
      case 'high':
        return palette.success.main;
      case 'medium':
        return palette.warning.main;
      case 'low':
        return palette.error.main;
      default:
        return palette.divider;
    }
  };
  
  return (
    <Paper
      elevation={1}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        p: 0,
        mb: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: (theme) => 
          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          borderColor: getBorderColor(),
        },
        '&:focus-within': {
          borderColor: getBorderColor(),
          outline: `2px solid ${getBorderColor()}`,
          outlineOffset: '2px'
        }
      }}
      onClick={toggleExpanded}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...ariaAttributes}
    >
      {/* Category indicator with visual pattern */}
      <Box
        sx={{
          height: '6px',
          width: '100%',
          bgcolor: (theme) => {
            const colorKey = category as keyof typeof theme.palette;
            // @ts-ignore - We know these colors exist
            return theme.palette[colorKey]?.main || theme.palette.primary.main;
          },
          opacity: confidence,
          ...patternStyles
        }}
        role="presentation"
      />
      
      <Box sx={{ display: 'flex', p: 2 }}>
        {/* Category chip */}
        <Box sx={{ mr: 2 }}>
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
          
          {/* Confidence indicator */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center', 
              mt: 1,
              opacity: 0.8
            }}
          >
            <Tooltip
              title={`${(confidence * 100).toFixed(0)}% confidence`}
              placement="left"
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  gap: 0.5
                }}
              >
                {confidenceLevel === 'high' && (
                  <CheckCircleIcon 
                    color="success" 
                    fontSize="small" 
                    sx={{ fontSize: '1rem' }} 
                  />
                )}
                {confidenceLevel === 'medium' && (
                  <InfoIcon 
                    color="warning" 
                    fontSize="small" 
                    sx={{ fontSize: '1rem' }} 
                  />
                )}
                {confidenceLevel === 'low' && (
                  <ErrorIcon 
                    color="error" 
                    fontSize="small" 
                    sx={{ fontSize: '1rem' }} 
                  />
                )}
                <Typography variant="caption" fontWeight={500}>
                  {(confidence * 100).toFixed(0)}%
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        </Box>
        
        {/* Main content */}
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              lineHeight: 1.6,
              mb: 1
            }}
          >
            {text}
          </Typography>
          
          {/* Source references indicator */}
          {sourceReferences.length > 0 && (
            <Typography
              variant="caption"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'text.secondary',
                gap: 0.5,
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline'
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(true);
              }}
            >
              <InfoIcon sx={{ fontSize: '0.8rem' }} />
              {sourceReferences.length} {sourceReferences.length === 1 ? 'source' : 'sources'}
            </Typography>
          )}
        </Box>
        
        {/* Edit request button */}
        <Box sx={{ ml: 1 }}>
          <Tooltip title={correctionSubmitted ? "Correction submitted" : "Request correction"}>
            <IconButton 
              size="small" 
              onClick={handleRequestEdit}
              color={correctionSubmitted ? "success" : "default"}
              sx={{
                opacity: correctionSubmitted ? 1 : 0.6,
                '&:hover': {
                  opacity: 1
                }
              }}
            >
              {correctionSubmitted ? <CheckCircleIcon fontSize="small" /> : <EditIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Expanded source references */}
      <Collapse in={expanded && sourceReferences.length > 0}>
        <Box 
          sx={{ 
            p: 2, 
            pt: 0,
            borderTop: '1px dashed',
            borderColor: 'divider',
            bgcolor: (theme) => 
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
          }}
        >
          <Typography 
            variant="subtitle2" 
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Source References:
          </Typography>
          
          {sourceReferences.map((ref, index) => (
            <Box 
              key={`${id}-ref-${index}`}
              sx={{ 
                p: 1, 
                mb: 1,
                borderRadius: 1,
                bgcolor: (theme) => 
                  theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                fontSize: '0.85rem',
                fontFamily: 'monospace'
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}
              >
                {ref.sourceText}
              </Typography>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Paper>
  );
}
