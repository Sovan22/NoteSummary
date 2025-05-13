'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  IconButton,
  Divider,
  Paper,
  Button,
  Tooltip,
  Checkbox
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import WebIcon from '@mui/icons-material/Language';
import SchoolIcon from '@mui/icons-material/School';

// Source types
type SourceType = 'pdf' | 'video' | 'web' | 'course';

interface ContentSource {
  id: string;
  title: string;
  type: SourceType;
  selected: boolean;
}

interface ContentSourcesPanelProps {
  onSourceSelected: (sources: ContentSource[]) => void;
}

export default function ContentSourcesPanel({ onSourceSelected }: ContentSourcesPanelProps) {
  // Sample sources - in a real app, these would come from a database
  const [sources, setSources] = useState<ContentSource[]>([
    { id: '1', title: 'Learn Machine Learning Like a GENIUS and MASTER AI: The Ultimate AI Academy', type: 'course', selected: false },
    { id: '2', title: 'Machine Learning for Everybody – Full Course', type: 'video', selected: false },
  ]);

  const getIconForType = (type: SourceType) => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdfIcon color="error" />;
      case 'video':
        return <YouTubeIcon color="error" />;
      case 'web':
        return <WebIcon color="primary" />;
      case 'course':
        return <SchoolIcon color="success" />;
      default:
        return <PictureAsPdfIcon />;
    }
  };

  const handleSourceToggle = (id: string) => {
    const updatedSources = sources.map(source => 
      source.id === id ? { ...source, selected: !source.selected } : source
    );
    setSources(updatedSources);
    onSourceSelected(updatedSources.filter(source => source.selected));
  };

  const handleSelectAll = () => {
    const allSelected = sources.every(source => source.selected);
    const updatedSources = sources.map(source => ({ ...source, selected: !allSelected }));
    setSources(updatedSources);
    onSourceSelected(updatedSources.filter(source => source.selected));
  };

  const handleDiscover = () => {
    // Implementation for discovering new sources
    console.log('Discover new sources');
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid', 
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6">Sources</Typography>
        <Box>
          <Tooltip title="Add Source">
            <IconButton size="small" color="primary">
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Discover">
            <IconButton size="small" color="primary" onClick={handleDiscover}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Box sx={{ p: 1 }}>
        <ListItem 
          dense
          button 
          onClick={handleSelectAll}
          sx={{ 
            borderRadius: 1,
            '&:hover': { bgcolor: 'action.hover' }
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Checkbox
              edge="start"
              checked={sources.every(source => source.selected)}
              indeterminate={sources.some(source => source.selected) && !sources.every(source => source.selected)}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText primary="Select all sources" />
        </ListItem>
      </Box>
      
      <Divider />
      
      <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
        {sources.map((source) => (
          <ListItem
            key={source.id}
            dense
            button
            onClick={() => handleSourceToggle(source.id)}
            sx={{ 
              p: 1.5,
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Checkbox
                edge="start"
                checked={source.selected}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemIcon sx={{ minWidth: 36 }}>
              {getIconForType(source.type)}
            </ListItemIcon>
            <ListItemText 
              primary={source.title} 
              primaryTypographyProps={{ 
                variant: 'body2',
                noWrap: true,
                sx: { fontWeight: source.selected ? 600 : 400 }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
