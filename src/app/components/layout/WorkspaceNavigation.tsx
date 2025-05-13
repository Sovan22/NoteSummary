'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemButton,
  Divider,
  TextField,
  InputAdornment,
  Collapse,
  IconButton,
  Tooltip,
  Avatar
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import NoteIcon from '@mui/icons-material/Note';
import TagIcon from '@mui/icons-material/Tag';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Mock data for folders and tags
const mockFolders = [
  {
    id: 'f1',
    name: 'School Notes',
    items: [
      { id: 'n1', name: 'Biology 101', type: 'note' },
      { id: 'n2', name: 'Chemistry Lecture', type: 'note' },
      { id: 'n3', name: 'Physics Lab Report', type: 'note' }
    ]
  },
  {
    id: 'f2',
    name: 'Work',
    items: [
      { id: 'n4', name: 'Meeting Minutes', type: 'note' },
      { id: 'n5', name: 'Project Plan', type: 'note' }
    ]
  },
  {
    id: 'f3',
    name: 'Personal',
    items: [
      { id: 'n6', name: 'Book Notes', type: 'note' },
      { id: 'n7', name: 'Ideas', type: 'note' }
    ]
  }
];

const mockTags = [
  { id: 't1', name: 'Important', count: 5 },
  { id: 't2', name: 'Research', count: 3 },
  { id: 't3', name: 'To Review', count: 2 },
  { id: 't4', name: 'AI', count: 4 },
  { id: 't5', name: 'Quick Reference', count: 1 }
];

export default function WorkspaceNavigation() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    f1: true,  // School Notes folder starts expanded
    f2: false, // Work folder starts collapsed
    f3: false  // Personal folder starts collapsed
  });
  const [expandedSections, setExpandedSections] = useState({
    folders: true,
    tags: true
  });
  
  // Toggle folder expansion
  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };
  
  // Toggle section expansion
  const toggleSection = (section: 'folders' | 'tags') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Navigate to the right view
  const handleItemClick = (id: string, type: string) => {
    // Mock navigation - in a real app, this would navigate to the item
    console.log(`Navigating to ${type}: ${id}`);
    router.push(`/dashboard?item=${id}`);
  };
  
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme => theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Avatar
          src="/path/to/avatar.jpg"
          alt="User Avatar"
          sx={{ width: 40, height: 40, mr: 2 }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            John's Workspace
          </Typography>
          <Typography variant="caption" color="text.secondary">
            15 notes • Last updated 2h ago
          </Typography>
        </Box>
      </Box>
      
      {/* Search Box */}
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search notes..."
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
            }
          }}
        />
      </Box>
      
      {/* Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          pt: 1
        }}
      >
        {/* Folders Section */}
        <Box sx={{ mb: 2 }}>
          <ListItem
            secondaryAction={
              <Box>
                <Tooltip title="Add new folder">
                  <IconButton size="small" edge="end" onClick={() => console.log('Add folder')}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <IconButton size="small" edge="end" onClick={() => toggleSection('folders')}>
                  {expandedSections.folders ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                </IconButton>
              </Box>
            }
            sx={{ pr: 6 }}
          >
            <ListItemText
              primary={
                <Typography variant="subtitle2" fontWeight={600}>
                  Folders
                </Typography>
              }
            />
          </ListItem>
          
          <Collapse in={expandedSections.folders} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              {mockFolders.map(folder => (
                <Box key={folder.id}>
                  <ListItemButton
                    onClick={() => toggleFolder(folder.id)}
                    sx={{ pl: 3 }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {expandedFolders[folder.id] ? 
                        <FolderOpenIcon fontSize="small" color="primary" /> : 
                        <FolderIcon fontSize="small" color="primary" />
                      }
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="body2">
                          {folder.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {folder.items.length} items
                        </Typography>
                      }
                    />
                    {expandedFolders[folder.id] ? 
                      <ExpandLessIcon fontSize="small" /> : 
                      <ExpandMoreIcon fontSize="small" />
                    }
                  </ListItemButton>
                  
                  <Collapse in={expandedFolders[folder.id]} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                      {folder.items.map(item => (
                        <ListItemButton
                          key={item.id}
                          sx={{ pl: 6 }}
                          onClick={() => handleItemClick(item.id, item.type)}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <NoteIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={
                              <Typography
                                variant="body2"
                                component={motion.div}
                                whileHover={{ x: 4 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                              >
                                {item.name}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ))}
            </List>
          </Collapse>
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        {/* Tags Section */}
        <Box sx={{ mb: 2 }}>
          <ListItem
            secondaryAction={
              <Box>
                <Tooltip title="Add new tag">
                  <IconButton size="small" edge="end" onClick={() => console.log('Add tag')}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <IconButton size="small" edge="end" onClick={() => toggleSection('tags')}>
                  {expandedSections.tags ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                </IconButton>
              </Box>
            }
            sx={{ pr: 6 }}
          >
            <ListItemText
              primary={
                <Typography variant="subtitle2" fontWeight={600}>
                  Tags
                </Typography>
              }
            />
          </ListItem>
          
          <Collapse in={expandedSections.tags} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              {mockTags.map(tag => (
                <ListItemButton
                  key={tag.id}
                  sx={{ pl: 3 }}
                  onClick={() => handleItemClick(tag.id, 'tag')}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <TagIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography
                        variant="body2"
                        component={motion.div}
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        {tag.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {tag.count} items
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Box>
      </Box>
      
      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Typography variant="caption" color="text.secondary">
          AI Note Taker v0.1.0
        </Typography>
      </Box>
    </Box>
  );
}
