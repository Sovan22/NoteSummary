'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Shuffle, 
  Edit, 
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Layers,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isFavorite?: boolean;
  reviewStatus?: 'new' | 'learning' | 'review' | 'mastered';
  lastReviewed?: string;
  nextReview?: string;
}

interface FlashcardComponentProps {
  cards: Flashcard[];
  title?: string;
  onEdit?: (card: Flashcard) => void;
  onFavoriteToggle?: (cardId: string, isFavorite: boolean) => void;
  onReviewStatusChange?: (cardId: string, status: Flashcard['reviewStatus']) => void;
}

export default function FlashcardComponent({ 
  cards, 
  title = "Flashcards", 
  onEdit, 
  onFavoriteToggle,
  onReviewStatusChange 
}: FlashcardComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
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

  const handleEdit = () => {
    if (cards.length === 0) return;
    if (onEdit) {
      onEdit(cards[currentIndex]);
    }
  };

  const handleReviewStatus = (status: Flashcard['reviewStatus']) => {
    if (cards.length === 0 || !onReviewStatusChange) return;
    onReviewStatusChange(cards[currentIndex].id, status);
    goToNextCard();
  };

  const getDifficultyColor = (difficulty: Flashcard['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };
  
  const getReviewStatusColor = (status?: Flashcard['reviewStatus']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'learning':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'review':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400';
      case 'mastered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  // Get current card
  const currentCard = cards.length > 0 ? cards[currentIndex] : null;

  // Empty state
  if (!currentCard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
        <div className="mb-4">
          <Layers className="w-12 h-12 text-gray-400 dark:text-gray-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No flashcards available</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
          You haven't created any flashcards yet. Create your first card to get started with your study session.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header with title and actions */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{title}</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsReviewMode(!isReviewMode)}
            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 ${
              isReviewMode 
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{isReviewMode ? 'Exit Review' : 'Review Mode'}</span>
          </button>
          <button 
            onClick={shuffleCards} 
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <Shuffle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mb-6 overflow-hidden">
        <div 
          className="bg-purple-500 dark:bg-purple-600 h-full rounded-full transition-all duration-300" 
          style={{ width: `${progressValue}%` }}
        ></div>
      </div>

      {/* Card counter */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Card {currentIndex + 1} of {cards.length}
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className={`px-2 py-0.5 rounded-full text-xs ${getDifficultyColor(currentCard.difficulty)}`}>
            {currentCard.difficulty}
          </span>
          {currentCard.reviewStatus && (
            <span className={`px-2 py-0.5 rounded-full text-xs ${getReviewStatusColor(currentCard.reviewStatus)}`}>
              {currentCard.reviewStatus}
            </span>
          )}
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative perspective-[1000px] h-[300px] sm:h-[400px] mb-6">
        <div 
          ref={flashcardRef}
          className={`relative w-full h-full rounded-xl shadow-md transition-all duration-300 transform-style-3d cursor-pointer ${
            isFlipping ? 'pointer-events-none' : ''
          } ${flipped ? 'rotate-y-180' : ''}`}
          onClick={handleFlip}
        >
          {/* Card Front (Question) */}
          <div className={`absolute inset-0 backface-hidden bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col ${
            flipped ? 'invisible' : ''
          }`}>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl font-medium text-gray-800 dark:text-gray-200 mb-4">
                  {currentCard.category}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {currentCard.question}
                </p>
              </div>
              <div className="absolute bottom-6 right-6 text-sm text-gray-400 dark:text-gray-500">
                Tap to flip
              </div>
            </div>
          </div>

          {/* Card Back (Answer) */}
          <div className={`absolute inset-0 backface-hidden bg-white dark:bg-gray-800 rounded-xl p-6 rotate-y-180 flex flex-col ${
            !flipped ? 'invisible' : ''
          }`}>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">
                  Answer
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg whitespace-pre-line">
                  {currentCard.answer}
                </p>
              </div>
              
              {isReviewMode && (
                <div className="absolute bottom-6 w-full flex justify-center gap-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleReviewStatus('learning'); }}
                    className="px-3 py-1.5 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-sm font-medium flex items-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Again</span>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleReviewStatus('review'); }}
                    className="px-3 py-1.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-lg text-sm font-medium flex items-center gap-1.5"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Hard</span>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleReviewStatus('mastered'); }}
                    className="px-3 py-1.5 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-lg text-sm font-medium flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Easy</span>
                  </button>
                </div>
              )}
              
              <div className="absolute bottom-6 right-6 text-sm text-gray-400 dark:text-gray-500">
                Tap to flip back
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and action buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={goToPrevCard}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full ${
            currentIndex === 0
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={handleFavoriteToggle}
            className={`p-2 rounded-full ${
              currentCard.isFavorite
                ? 'text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                : 'text-gray-400 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Heart 
              className="w-5 h-5" 
              fill={currentCard.isFavorite ? 'currentColor' : 'none'} 
            />
          </button>
          <button
            onClick={handleEdit}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={handleFlip}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
        
        <button
          onClick={goToNextCard}
          disabled={currentIndex === cards.length - 1}
          className={`p-2 rounded-full ${
            currentIndex === cards.length - 1
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
