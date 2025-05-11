'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  IconButton,
  Paper,
  Fab,
  Chip,
  CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import EditIcon from '@mui/icons-material/Edit';
import SyncIcon from '@mui/icons-material/Sync';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isFavorite?: boolean;
}

interface FlashcardComponentProps {
  cards: Flashcard[];
  title?: string;
  onEdit?: (card: Flashcard) => void;
  onFavoriteToggle?: (cardId: string, isFavorite: boolean) => void;
}

export default function FlashcardComponent({ 
  cards, 
  title = "Flashcards", 
  onEdit, 
  onFavoriteToggle 
}: FlashcardComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const flashcardRef = useRef<HTMLDivElement>(null);
  
  // Calculate progress
  useEffect(() => {
    if (cards.length > 0) {
      setProgressValue(((currentIndex + 1) / cards.length) * 100);
    }
  }, [currentIndex, cards.length]);

  const handleFlip = () => {
    if (!isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setFlipped(!flipped);
        setTimeout(() => {
          setIsFlipping(false);
        }, 150);
      }, 150);
    }
  };

  const goToNextCard = () => {
    if (currentIndex < cards.length - 1) {
      if (flipped) handleFlip();
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, flipped ? 300 : 0);
    }
  };

  const goToPrevCard = () => {
    if (currentIndex > 0) {
      if (flipped) handleFlip();
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
      }, flipped ? 300 : 0);
    }
  };

  const shuffleCards = () => {
    // Reset to first card
    if (flipped) handleFlip();
    setTimeout(() => {
      setCurrentIndex(0);
    }, flipped ? 300 : 0);
  };

  const handleFavoriteToggle = () => {
    if (cards.length === 0) return;
    if (onFavoriteToggle) {
      onFavoriteToggle(
        cards[currentIndex].id,
        !cards[currentIndex].isFavorite
      );
    }
  };

  const handleEditCard = () => {
    if (cards.length === 0) return;
    if (onEdit) {
      onEdit(cards[currentIndex]);
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'error';
      default:
        return 'primary';
    }
  };

  if (cards.length === 0) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 4,
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: 'background.paper',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundImage: 'linear-gradient(to right, #6750A4, #958DA5)',
          }
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          No Flashcards Available
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Create new flashcards from your notes or uploaded content to study.
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          sx={{ 
            borderRadius: '28px',
            px: 3,
            py: 1.2,
            fontWeight: 500,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          Create Flashcards
        </Button>
      </Paper>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2 
      }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip 
            label={`${currentIndex + 1} of ${cards.length}`} 
            variant="outlined" 
            sx={{ 
              borderRadius: '16px',
              borderWidth: 2,
              fontWeight: 500,
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
          />
          <IconButton 
            color="primary" 
            onClick={shuffleCards}
            sx={{ 
              transition: 'all 0.2s ease',
              '&:hover': { 
                transform: 'rotate(180deg) scale(1.1)'
              }
            }}
          >
            <ShuffleIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ position: 'relative', width: '100%', height: '400px', mb: 2 }}>
        <Box
          ref={flashcardRef}
          onClick={handleFlip}
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
            cursor: 'pointer',
          }}
        >
          {/* Front of Card (Question) */}
          <Paper
            elevation={4}
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 4,
              borderRadius: 4,
              background: theme => `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 8px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                backgroundImage: 'linear-gradient(to right, #6750A4, #958DA5)',
              }
            }}
          >
            <Box sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16, 
              display: 'flex', 
              gap: 1 
            }}>
              <Chip 
                label={cards[currentIndex]?.category || 'General'} 
                size="small" 
                color="secondary"
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              />
              <Chip 
                label={cards[currentIndex]?.difficulty || 'medium'} 
                size="small" 
                color={getDifficultyColor(cards[currentIndex]?.difficulty || 'medium') as any}
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              />
            </Box>

            <Typography 
              variant="subtitle2" 
              color="text.secondary" 
              gutterBottom
              sx={{ 
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                mb: 2
              }}
            >
              Question
            </Typography>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 500,
                maxWidth: '90%',
                mb: 3
              }}
            >
              {cards[currentIndex]?.question}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                position: 'absolute',
                bottom: 16,
                fontStyle: 'italic'
              }}
            >
              Click to flip
            </Typography>
          </Paper>

          {/* Back of Card (Answer) */}
          <Paper
            elevation={4}
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 4,
              borderRadius: 4,
              background: theme => `linear-gradient(145deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Typography 
              variant="subtitle2" 
              gutterBottom
              sx={{ 
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                mb: 2,
                color: 'rgba(255, 255, 255, 0.9)'
              }}
            >
              Answer
            </Typography>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 500,
                maxWidth: '90%',
                mb: 3
              }}
            >
              {cards[currentIndex]?.answer}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                position: 'absolute',
                bottom: 16,
                fontStyle: 'italic',
                color: 'rgba(255, 255, 255, 0.7)'
              }}
            >
              Click to flip back
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Progress indicator */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress 
            variant="determinate" 
            value={progressValue} 
            size={40} 
            thickness={4}
            sx={{ 
              color: theme => theme.palette.primary.main,
              transition: 'all 0.5s ease'
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">
              {`${Math.round(progressValue)}%`}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Card navigation and actions */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 2,
        mt: 3
      }}>
        <Fab 
          size="medium" 
          color="default" 
          onClick={goToPrevCard} 
          disabled={currentIndex === 0}
          sx={{ 
            transition: 'all 0.2s ease',
            boxShadow: 2,
            '&:hover': { 
              transform: 'translateX(-4px)',
            },
            '&.Mui-disabled': {
              opacity: 0.5,
              background: 'rgba(0,0,0,0.05)'
            }
          }}
        >
          <ArrowBackIcon />
        </Fab>
        
        <Fab 
          color="primary" 
          onClick={handleFlip}
          sx={{ 
            transition: 'all 0.2s ease',
            boxShadow: 3,
            '&:hover': { 
              transform: 'scale(1.1)',
            }
          }}
        >
          <SyncIcon 
            sx={{ 
              transition: 'transform 0.3s ease',
              transform: flipped ? 'rotate(180deg)' : 'rotate(0deg)'
            }} 
          />
        </Fab>
        
        <Fab 
          color="secondary" 
          size="small" 
          onClick={handleFavoriteToggle}
          sx={{ 
            transition: 'all 0.2s ease',
            boxShadow: 2,
            '&:hover': { 
              transform: 'translateY(-4px)',
            }
          }}
        >
          {cards[currentIndex]?.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Fab>
        
        {onEdit && (
          <Fab 
            size="small" 
            color="info" 
            onClick={handleEditCard}
            sx={{ 
              transition: 'all 0.2s ease',
              boxShadow: 2,
              '&:hover': { 
                transform: 'rotate(15deg)',
              }
            }}
          >
            <EditIcon />
          </Fab>
        )}
        
        <Fab 
          size="medium" 
          color="default" 
          onClick={goToNextCard} 
          disabled={currentIndex === cards.length - 1}
          sx={{ 
            transition: 'all 0.2s ease',
            boxShadow: 2,
            '&:hover': { 
              transform: 'translateX(4px)',
            },
            '&.Mui-disabled': {
              opacity: 0.5,
              background: 'rgba(0,0,0,0.05)'
            }
          }}
        >
          <ArrowForwardIcon />
        </Fab>
      </Box>
    </Box>
  );
}
