'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Button,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  MoreVert as MoreIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ContentCopy as CopyIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import FlashcardComponent from '../components/interactive-output/FlashcardComponent';
import QuizComponent from '../components/interactive-output/QuizComponent';

export default function FlashcardsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'flashcards' | 'quizzes'>('flashcards');
  
  // Sample deck data - in a real app this would come from your database
  const flashcardDecks = [
    { id: '1', title: 'Machine Learning Basics', count: 24, tags: ['AI', 'ML', 'Beginner'] },
    { id: '2', title: 'Neural Networks Architecture', count: 15, tags: ['Deep Learning', 'Advanced'] },
    { id: '3', title: 'Python Data Science', count: 32, tags: ['Programming', 'Data'] },
    { id: '4', title: 'Statistics Fundamentals', count: 20, tags: ['Math', 'Beginner'] },
  ];
  
  const quizzes = [
    { id: '1', title: 'Machine Learning Quiz', questions: 10, lastScore: '8/10', tags: ['AI', 'ML'] },
    { id: '2', title: 'Neural Networks Test', questions: 8, lastScore: 'Not taken', tags: ['Deep Learning'] },
  ];
  
  const handleFilterClick = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleTabChange = (tab: 'flashcards' | 'quizzes') => {
    setActiveTab(tab);
  };
  
  // Get all unique tags from decks
  const allTags = Array.from(
    new Set(
      [...flashcardDecks, ...quizzes].flatMap(item => item.tags)
    )
  );

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Flashcards & Quizzes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review your learning materials with interactive flashcards and quizzes.
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant={activeTab === 'flashcards' ? 'contained' : 'outlined'}
            onClick={() => handleTabChange('flashcards')}
          >
            Flashcards
          </Button>
          <Button 
            variant={activeTab === 'quizzes' ? 'contained' : 'outlined'}
            onClick={() => handleTabChange('quizzes')}
          >
            Quizzes
          </Button>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create New
        </Button>
      </Box>
      
      <Paper elevation={1} sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid component="div" sx={{ width: { xs: '100%', md: '50%' }, p: 1.5 }}>
            <TextField
              fullWidth
              placeholder={`Search ${activeTab}...`}
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid component="div" sx={{ width: { xs: '100%', md: '50%' }, p: 1.5 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                icon={<FilterIcon />}
                label="Filter by tag"
                variant="outlined"
                sx={{ mr: 1 }}
              />
              
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => handleFilterClick(tag)}
                  variant={activeFilter === tag ? "filled" : "outlined"}
                  color={activeFilter === tag ? "primary" : "default"}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {activeTab === 'flashcards' ? (
        <>
          <Typography variant="h6" gutterBottom>
            Your Flashcard Decks
          </Typography>
          
          <Grid container spacing={3}>
            {flashcardDecks
              .filter(deck => !activeFilter || deck.tags.includes(activeFilter))
              .map((deck) => (
                <Grid component="div" sx={{ width: { xs: '100%', md: '33.333%' }, p: 1.5 }} key={deck.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="h6" gutterBottom>
                          {deck.title}
                        </Typography>
                        
                        <IconButton size="small" onClick={handleMenuOpen}>
                          <MoreIcon />
                        </IconButton>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {deck.count} cards
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                        {deck.tags.map(tag => (
                          <Chip key={tag} label={tag} size="small" />
                        ))}
                      </Box>
                      
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="text" color="primary">
                          Study
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h6" gutterBottom>
            Study Session
          </Typography>
          
          <FlashcardComponent contentTitle="Machine Learning Fundamentals" />
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Your Quizzes
          </Typography>
          
          <Grid container spacing={3}>
            {quizzes
              .filter(quiz => !activeFilter || quiz.tags.includes(activeFilter))
              .map((quiz) => (
                <Grid component="div" sx={{ width: { xs: '100%', sm: '50%' }, p: 1.5 }} key={quiz.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="h6" gutterBottom>
                          {quiz.title}
                        </Typography>
                        
                        <IconButton size="small" onClick={handleMenuOpen}>
                          <MoreIcon />
                        </IconButton>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {quiz.questions} questions · Last Score: {quiz.lastScore}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                        {quiz.tags.map(tag => (
                          <Chip key={tag} label={tag} size="small" />
                        ))}
                      </Box>
                      
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="text" color="primary">
                          Take Quiz
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h6" gutterBottom>
            Active Quiz
          </Typography>
          
          <QuizComponent contentTitle="Machine Learning Fundamentals" />
        </>
      )}
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <CopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Layout>
  );
}
