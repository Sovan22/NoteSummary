'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  FlipToBack as FlipIcon
} from '@mui/icons-material';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  isFavorite: boolean;
}

interface FlashcardComponentProps {
  contentTitle?: string;
}

export default function FlashcardComponent({ contentTitle }: FlashcardComponentProps) {
  // In a real application, these would be generated by AI and stored in a database
  const initialFlashcards: Flashcard[] = [
    {
      id: '1',
      question: 'What is supervised learning?',
      answer: 'A type of machine learning where algorithms learn from labeled training data to predict outputs for unseen data. Examples include classification and regression.',
      tags: ['ML Basics', 'Algorithms'],
      isFavorite: false
    },
    {
      id: '2',
      question: 'What is the difference between classification and regression?',
      answer: 'Classification predicts discrete class labels (categories), while regression predicts continuous quantities.',
      tags: ['ML Basics', 'Terminology'],
      isFavorite: true
    },
    {
      id: '3',
      question: 'What is overfitting?',
      answer: 'Overfitting occurs when a model learns the training data too well, including its noise and outliers, causing poor performance on new, unseen data.',
      tags: ['ML Basics', 'Challenges'],
      isFavorite: false
    },
    {
      id: '4',
      question: 'What is the purpose of cross-validation?',
      answer: 'Cross-validation helps assess how well a model will generalize to independent data by partitioning the data into training and validation sets multiple times.',
      tags: ['Validation', 'Best Practices'],
      isFavorite: false
    },
    {
      id: '5',
      question: 'What is the gradient descent algorithm?',
      answer: 'An optimization algorithm that iteratively adjusts parameters to minimize the cost function by moving in the direction of the steepest descent.',
      tags: ['Algorithms', 'Optimization'],
      isFavorite: true
    }
  ];

  const [flashcards, setFlashcards] = useState<Flashcard[]>(initialFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>(flashcards);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedCard, setEditedCard] = useState<Flashcard | null>(null);

  useEffect(() => {
    if (activeTag) {
      setFilteredCards(flashcards.filter(card => card.tags.includes(activeTag)));
      setCurrentIndex(0);
      setFlipped(false);
    } else {
      setFilteredCards(flashcards);
    }
  }, [flashcards, activeTag]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredCards.length);
    setFlipped(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredCards.length) % filteredCards.length);
    setFlipped(false);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
  };

  const handleFavoriteToggle = () => {
    const currentCard = filteredCards[currentIndex];
    setFlashcards(cards => 
      cards.map(card => 
        card.id === currentCard.id 
          ? { ...card, isFavorite: !card.isFavorite } 
          : card
      )
    );
  };

  const handleEditClick = () => {
    setEditedCard({ ...filteredCards[currentIndex] });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editedCard) {
      setFlashcards(cards => 
        cards.map(card => 
          card.id === editedCard.id ? editedCard : card
        )
      );
      setEditDialogOpen(false);
    }
  };

  const getAllTags = () => {
    const tags = new Set<string>();
    flashcards.forEach(card => {
      card.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  // Get a unique set of all tags
  const allTags = getAllTags();

  const currentCard = filteredCards[currentIndex];

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          Flashcards
        </Typography>
        
        <Tooltip title="Generate new flashcards">
          <IconButton color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      {contentTitle && (
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {contentTitle}
        </Typography>
      )}
      
      {/* Tag filters */}
      <Stack 
        direction="row" 
        spacing={1} 
        sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}
      >
        {allTags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => handleTagClick(tag)}
            variant={activeTag === tag ? "filled" : "outlined"}
            color={activeTag === tag ? "primary" : "default"}
          />
        ))}
      </Stack>
      
      {/* Flashcard */}
      {filteredCards.length > 0 ? (
        <Box sx={{ mb: 3, height: 280, perspective: '1000px' }}>
          <Card
            elevation={3}
            onClick={handleFlip}
            sx={{
              height: '100%',
              width: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              cursor: 'pointer',
            }}
          >
            {/* Front (Question) */}
            <CardContent
              sx={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                backfaceVisibility: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 3,
              }}
            >
              <Typography variant="h6" gutterBottom align="center" sx={{ mb: 3 }}>
                {currentCard.question}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                (Click to flip)
              </Typography>
              <FlipIcon color="action" />
            </CardContent>
            
            {/* Back (Answer) */}
            <CardContent
              sx={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 3,
                overflowY: 'auto',
              }}
            >
              <Typography variant="body1" align="center">
                {currentCard.answer}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box sx={{ height: 280, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No flashcards match the selected filter.
          </Typography>
        </Box>
      )}
      
      {/* Navigation controls */}
      {filteredCards.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <IconButton onClick={handleFavoriteToggle} color={currentCard.isFavorite ? "error" : "default"}>
              {currentCard.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton onClick={handleEditClick} color="primary">
              <EditIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
              {currentIndex + 1} of {filteredCards.length}
            </Typography>
          </Box>
          
          <Box>
            <IconButton onClick={handlePrev} disabled={filteredCards.length <= 1}>
              <PrevIcon />
            </IconButton>
            <IconButton onClick={handleNext} disabled={filteredCards.length <= 1}>
              <NextIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      
      {/* Edit dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Flashcard</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Question"
            value={editedCard?.question || ''}
            onChange={(e) => setEditedCard(prev => prev ? { ...prev, question: e.target.value } : null)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Answer"
            value={editedCard?.answer || ''}
            onChange={(e) => setEditedCard(prev => prev ? { ...prev, answer: e.target.value } : null)}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Tags (comma separated)"
            value={editedCard?.tags.join(', ') || ''}
            onChange={(e) => setEditedCard(prev => 
              prev ? { ...prev, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean) } : null
            )}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
