'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Trash, 
  Edit as EditIcon, 
  Copy, 
  Share2 
} from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import FlashcardComponent from '../components/flashcards/FlashcardComponent';

export default function FlashcardsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'flashcards' | 'quizzes'>('flashcards');
  
  // Sample flashcards data
  const flashcards = [
    {
      id: '1',
      question: 'What is machine learning?',
      answer: 'Machine learning is a subfield of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed.',
      category: 'Basics',
      difficulty: 'easy',
      reviewStatus: 'new'
    },
    {
      id: '2',
      question: 'What are the three main types of machine learning?',
      answer: 'The three main types of machine learning are: 1) Supervised Learning, 2) Unsupervised Learning, and 3) Reinforcement Learning.',
      category: 'Basics',
      difficulty: 'easy',
      reviewStatus: 'new'
    },
    {
      id: '3',
      question: 'What is the difference between supervised and unsupervised learning?',
      answer: 'Supervised learning uses labeled data where the algorithm learns to map inputs to known outputs. Unsupervised learning works with unlabeled data to find patterns or structure without explicit guidance.',
      category: 'Concepts',
      difficulty: 'medium',
      reviewStatus: 'new'
    },
    {
      id: '4',
      question: 'What is a neural network?',
      answer: 'A neural network is a computational model inspired by the structure of the human brain, consisting of interconnected nodes (neurons) organized in layers that process information and learn patterns from data.',
      category: 'Deep Learning',
      difficulty: 'medium',
      reviewStatus: 'new'
    },
    {
      id: '5',
      question: 'What is the purpose of an activation function in a neural network?',
      answer: 'Activation functions introduce non-linearity into neural networks, allowing them to learn complex patterns. Without activation functions, neural networks would be equivalent to linear regression models regardless of their depth.',
      category: 'Deep Learning',
      difficulty: 'hard',
      reviewStatus: 'new'
    }
  ];

  // Filters for flashcards
  const filters = [
    { name: 'All', value: null },
    { name: 'Basics', value: 'Basics' },
    { name: 'Concepts', value: 'Concepts' },
    { name: 'Deep Learning', value: 'Deep Learning' },
  ];

  // Difficulty filters
  const difficultyFilters = [
    { name: 'All Difficulties', value: null },
    { name: 'Easy', value: 'easy' },
    { name: 'Medium', value: 'medium' },
    { name: 'Hard', value: 'hard' },
  ];

  return (
    <AppLayout title="Flashcards">
      <div className="container mx-auto">
        <div className="flex flex-col">
          {/* Page header with search and filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Flashcards</h1>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="Search flashcards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 pl-9 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              
              {/* Filter dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                </button>
                
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                    <div className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Categories</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {filters.map(filter => (
                          <button
                            key={filter.name}
                            className={`px-2 py-1 text-xs rounded-full ${
                              activeFilter === filter.value
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                            onClick={() => setActiveFilter(filter.value)}
                          >
                            {filter.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="py-2 px-3">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {difficultyFilters.map(filter => (
                          <button
                            key={filter.name}
                            className={`px-2 py-1 text-xs rounded-full ${
                              activeFilter === filter.value
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                            onClick={() => setActiveFilter(filter.value)}
                          >
                            {filter.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Create flashcard button */}
              <button className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Create</span>
              </button>
            </div>
          </div>
          
          {/* Tab navigation */}
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'flashcards'
                  ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('flashcards')}
            >
              <span>Flashcards</span>
            </button>
            
            <button
              className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'quizzes'
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('quizzes')}
            >
              <span>Quizzes</span>
            </button>
          </div>
          
          {/* Flashcards content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            {activeTab === 'flashcards' && (
              <FlashcardComponent 
                cards={flashcards}
                title="Study Flashcards"
                onFavoriteToggle={(id, isFavorite) => {
                  console.log(`Toggle favorite for card ${id}: ${isFavorite}`);
                }}
                onReviewStatusChange={(id, status) => {
                  console.log(`Changed status for card ${id} to ${status}`);
                }}
              />
            )}
            
            {activeTab === 'quizzes' && (
              <div className="flex flex-col items-center justify-center p-12">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">Quiz Mode Coming Soon</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md text-center">
                  We're working on an interactive quiz mode to help you test your knowledge. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
