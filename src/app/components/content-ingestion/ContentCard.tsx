'use client';

import { ReactNode } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  IconButton, 
  Chip,
  Tooltip
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { motion } from 'framer-motion';

export interface ContentCardProps {
  title: string;
  icon: ReactNode;
  color?: string;
  contentType: 'summary' | 'keypoints' | 'flashcards' | 'chat' | 'diagram';
  timestamp?: Date;
  children: ReactNode;
  onAction?: () => void;
  expanded?: boolean;
}

export default function ContentCard({ 
  title, 
  icon, 
  color = '#3b82f6', 
  contentType,
  timestamp = new Date(),
  children,
  onAction,
  expanded = false
}: ContentCardProps) {
  // Format timestamp
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Get content type label
  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'summary':
        return 'Summary';
      case 'keypoints':
        return 'Key Points';
      case 'flashcards':
        return 'Flashcards';
      case 'chat':
        return 'Q&A Chat';
      case 'diagram':
        return 'Diagram';
      default:
        return 'Content';
    }
  };
  
  return (
    <Paper
      component={motion.div}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      elevation={1}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        height: expanded ? '100%' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        '&:hover': {
          boxShadow: theme => `0 6px 20px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'}`
        },
        transition: 'box-shadow 0.3s ease, transform 0.2s ease',
        cursor: 'default'
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          background: `linear-gradient(90deg, ${color}15, ${color}05)`,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: `${color}30`,
              color: color
            }}
          >
            {icon}
          </Box>
          
          <Box>
            <Typography variant="subtitle1" fontWeight={600} sx={{ lineHeight: 1.3 }}>
              {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={getContentTypeLabel(contentType)} 
                size="small" 
                sx={{ 
                  height: 20, 
                  fontSize: '0.7rem',
                  bgcolor: `${color}20`,
                  color: color,
                  fontWeight: 500
                }} 
              />
              <Typography variant="caption" color="text.secondary">
                {formatDate(timestamp)}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Tooltip title="More actions">
          <IconButton
            size="small"
            onClick={onAction}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Card Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          position: 'relative'
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}
