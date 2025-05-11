'use client';

import { useState } from 'react';
import React, { Fragment } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  InputBase,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  SortByAlpha as SortIcon,
  FilterList as FilterIcon,
  Description as DocumentIcon,
  VideoLibrary as VideoIcon,
  Public as WebIcon,
  AudioFile as AudioIcon,
  AccessTime as RecentIcon,
  Star as StarIcon,
  QueryStats as InsightsIcon
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';

export default function DashboardPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - in a real app, this would come from your database
  const recentUploads = [
    { id: '1', title: 'Machine Learning Fundamentals', type: 'pdf', date: 'May 10, 2025', thumbnail: '/path/to/thumbnail.jpg' },
    { id: '2', title: 'Introduction to Neural Networks', type: 'video', date: 'May 9, 2025', thumbnail: '/path/to/thumbnail.jpg' },
    { id: '3', title: 'Understanding Deep Learning', type: 'web', date: 'May 5, 2025', thumbnail: '/path/to/thumbnail.jpg' },
    { id: '4', title: 'Data Science Podcast', type: 'audio', date: 'May 3, 2025', thumbnail: '/path/to/thumbnail.jpg' },
  ];

  const insightItems = [
    { title: 'Trend Detected', description: 'Your recent uploads focus heavily on machine learning topics.' },
    { title: 'Knowledge Gap', description: 'Consider reviewing more content on data preprocessing.' },
    { title: 'Study Suggestion', description: 'You might want to revisit neural networks fundamentals.' },
  ];

  const savedNotes = [
    { 
      id: '1', 
      title: 'Machine Learning Notes', 
      date: 'May 10, 2025', 
      tags: ['ML', 'AI', 'Python'] 
    },
    { 
      id: '2', 
      title: 'Neural Networks Workshop', 
      date: 'May 8, 2025', 
      tags: ['Workshop', 'Deep Learning'] 
    },
    { 
      id: '3', 
      title: 'Data Science Career Path', 
      date: 'May 5, 2025', 
      tags: ['Career', 'Planning'] 
    },
  ];

  const getIconForType = (type: string) => {
    switch (type) {
      case 'pdf':
        return <DocumentIcon />;
      case 'video':
        return <VideoIcon />;
      case 'web':
        return <WebIcon />;
      case 'audio':
        return <AudioIcon />;
      default:
        return <DocumentIcon />;
    }
  };

  return (
    <Layout>
      <Typography component="h1" variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography component="div" variant="body1" color="text.secondary" paragraph>
        Welcome back! Here's a summary of your recent activity and insights.
      </Typography>
      
      {/* Search Bar */}
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', mb: 3, borderRadius: 2 }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search notes, uploads, and content"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconButton sx={{ p: '10px' }} aria-label="sort">
          <SortIcon />
        </IconButton>
        <IconButton sx={{ p: '10px' }} aria-label="filter">
          <FilterIcon />
        </IconButton>
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, flex: '1 0 auto' }}>
        {/* Recent Uploads */}
        <Box sx={{ flex: { md: 2 }, width: '100%' }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <RecentIcon sx={{ mr: 1 }} />
                <Typography component="h2" variant="h6">Recent Uploads</Typography>
              </Box>
              <Box component="span">
                <Typography component="span" variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                  View All
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {recentUploads.map((item) => (
                <Box key={item.id} sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
                  <Card elevation={1}>
                    <CardActionArea>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            {getIconForType(item.type)}
                          </Avatar>
                          <Box>
                            <Box component="span">
                              <Typography component="span" variant="subtitle1" noWrap>
                                {item.title}
                              </Typography>
                            </Box>
                            <Box component="span">
                              <Typography component="span" variant="body2" color="text.secondary">
                                {item.date}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* AI Insights */}
        <Box sx={{ flex: { md: 1 }, width: '100%' }}>
          <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InsightsIcon sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6">AI Insights</Typography>
            </Box>

            <List>
              {insightItems.map((item, index) => (
                <Fragment key={index}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={item.title}
                      secondary={item.description}
                    />
                  </ListItem>
                </Fragment>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>

      {/* Saved Notes */}
      <Box sx={{ mt: 3, width: '100%', flex: '1 0 auto' }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StarIcon sx={{ mr: 1 }} />
                <Typography component="h2" variant="h6">Saved Notes</Typography>
              </Box>
              <Box component="span">
                <Typography component="span" variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                  View All
                </Typography>
              </Box>
            </Box>

            <List>
              {savedNotes.map((note, index) => (
                <Fragment key={note.id}>
                  {index > 0 && <Divider />}
                  <ListItem
                    secondaryAction={
                      <Box component="span">
                        <Typography component="span" variant="body2" color="text.secondary">
                          {note.date}
                        </Typography>
                      </Box>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <DocumentIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={note.title}
                      secondary={
                        <Fragment>
                          <Box component="span" sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                            {note.tags.map(tag => (
                              <Chip key={tag} label={tag} size="small" variant="outlined" />
                            ))}
                          </Box>
                        </Fragment>
                      }
                    />
                  </ListItem>
                </Fragment>
              ))}
            </List>
          </Paper>
        </Box>
    </Layout>
  );
}
