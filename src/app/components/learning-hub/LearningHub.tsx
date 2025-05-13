'use client';

import { useState, useEffect } from 'react';
import { 
  Layers,
  BookOpen,
  MessageSquare,
  Lightbulb,
  List,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

import FlashcardComponent from '../flashcards/FlashcardComponent';

// Types
interface ContentSource {
  id: string;
  title: string;
  type: string;
  selected: boolean;
}

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isFavorite?: boolean;
  reviewStatus?: 'new' | 'learning' | 'review' | 'mastered';
}

interface Message {
  id: string;
  content: string;
  type: 'text' | 'image' | 'file';
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  isBookmarked?: boolean;
}

type ContentViewType = 'flashcards' | 'quiz' | 'summary';

export default function LearningHub() {
  const [selectedSources, setSelectedSources] = useState<ContentSource[]>([]);
  const [contentView, setContentView] = useState<ContentViewType>('flashcards');
  const [isGenerating, setIsGenerating] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Handle source selection
  const handleSourceSelected = (sources: ContentSource[]) => {
    setSelectedSources(sources);
    if (sources.length > 0) {
      generateSampleData(sources);
    } else {
      setFlashcards([]);
      setMessages([]);
    }
  };

  // Generate sample data based on selected sources
  const generateSampleData = (sources: ContentSource[]) => {
    setIsGenerating(true);
    
    // Simulate API call to generate flashcards
    setTimeout(() => {
      // Sample flashcards based on machine learning topics
      const sampleFlashcards: Flashcard[] = [
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
      
      // Sample messages for the chat
      const sampleMessages: Message[] = [
        {
          id: '1',
          content: 'I need help understanding the concept of overfitting in machine learning.',
          type: 'text',
          role: 'user',
          timestamp: new Date(),
        },
        {
          id: '2',
          content: 'Overfitting occurs when a machine learning model learns the training data too well, including its noise and outliers, which negatively impacts its performance on new, unseen data. Think of it as memorizing answers to a test rather than understanding the underlying concepts.\n\nSigns of overfitting include:\n1. High accuracy on training data but poor performance on test data\n2. Complex model with many parameters relative to the number of training examples\n3. The model captures random fluctuations in the training data\n\nTo prevent overfitting, you can use techniques like:\n- Cross-validation\n- Regularization (L1/L2)\n- Dropout (for neural networks)\n- Early stopping\n- Data augmentation\n- Reducing model complexity\n\nWould you like me to explain any of these prevention techniques in more detail?',
          type: 'text',
          role: 'assistant',
          timestamp: new Date(),
        }
      ];
      
      setFlashcards(sampleFlashcards);
      setMessages(sampleMessages);
      setIsGenerating(false);
    }, 1500);
  };

  // Generate content for selected sources
  const handleGenerateContent = () => {
    if (selectedSources.length === 0) {
      // Show error message
      return;
    }
    
    setIsGenerating(true);
    generateSampleData(selectedSources);
  };

  // Mock source data
  const sources: ContentSource[] = [
    { id: '1', title: 'Introduction to Machine Learning', type: 'document', selected: false },
    { id: '2', title: 'Neural Networks Fundamentals', type: 'document', selected: false },
    { id: '3', title: 'Deep Learning Techniques', type: 'document', selected: false },
    { id: '4', title: 'Machine Learning Lecture Notes', type: 'notes', selected: false }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Left panel - Content Sources */}
      <div className="w-full lg:w-1/4 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Content Sources</h2>
        
        <div className="mb-6">
          {sources.map((source) => (
            <div 
              key={source.id}
              className="flex items-center p-3 mb-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
              onClick={() => {
                const updatedSources = sources.map(s => 
                  s.id === source.id ? { ...s, selected: !s.selected } : s
                );
                handleSourceSelected(updatedSources.filter(s => s.selected));
              }}
            >
              <div className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 ${
                source.selected 
                  ? 'bg-blue-500 dark:bg-blue-600 border-2 border-blue-200 dark:border-blue-800' 
                  : 'border-2 border-gray-300 dark:border-gray-600'
              }`}></div>
              <div className="flex-1">
                <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">{source.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{source.type}</div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={handleGenerateContent}
          disabled={selectedSources.length === 0 || isGenerating}
          className={`w-full py-2 rounded-lg text-center text-white font-medium transition-colors ${
            selectedSources.length === 0 || isGenerating
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
          }`}
        >
          {isGenerating ? 'Generating...' : 'Generate Learning Content'}
        </button>
      </div>
      
      {/* Right panel - Learning Content */}
      <div className="flex-1">
        {/* Content type tabs */}
        <div className="flex items-center border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
              contentView === 'flashcards'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
            onClick={() => setContentView('flashcards')}
          >
            <Layers className="w-4 h-4" />
            <span>Flashcards</span>
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
              contentView === 'quiz'
                ? 'border-green-500 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
            onClick={() => setContentView('quiz')}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Quiz</span>
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
              contentView === 'summary'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
            onClick={() => setContentView('summary')}
          >
            <BookOpen className="w-4 h-4" />
            <span>Summary</span>
          </button>
        </div>
        
        {/* Loading state */}
        {isGenerating && (
          <div className="flex items-center justify-center p-12">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-t-purple-500 border-r-purple-300 border-b-purple-200 border-l-purple-400 rounded-full animate-spin mb-4"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Generating learning content...</p>
            </div>
          </div>
        )}
        
        {/* No content selected state */}
        {!isGenerating && selectedSources.length === 0 && (
          <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
              <Layers className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">No content selected</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mb-6">
              Select one or more content sources from the panel to generate AI-powered learning materials.
            </p>
          </div>
        )}
        
        {/* Content views */}
        {!isGenerating && selectedSources.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            {contentView === 'flashcards' && flashcards.length > 0 && (
              <FlashcardComponent 
                cards={flashcards}
                title="AI-Generated Flashcards"
                onFavoriteToggle={(id, isFavorite) => {
                  setFlashcards(flashcards.map(card => 
                    card.id === id ? {...card, isFavorite} : card
                  ));
                }}
                onReviewStatusChange={(id, status) => {
                  setFlashcards(flashcards.map(card => 
                    card.id === id ? {...card, reviewStatus: status} : card
                  ));
                }}
              />
            )}
            
            {contentView === 'quiz' && (
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">AI-Generated Quiz</h2>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                    Question 1: What is the primary goal of supervised learning?
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 cursor-pointer transition-colors">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500 mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">To find patterns in unlabeled data</span>
                    </div>
                    
                    <div className="flex items-center p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 cursor-pointer transition-colors">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500 mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">To learn a function that maps inputs to outputs based on example input-output pairs</span>
                    </div>
                    
                    <div className="flex items-center p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 cursor-pointer transition-colors">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500 mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">To learn through trial and error with rewards and penalties</span>
                    </div>
                    
                    <div className="flex items-center p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 cursor-pointer transition-colors">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500 mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">To reduce the dimensionality of data</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                      Submit Answer
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Previous
                  </button>
                  <div className="text-sm text-gray-500 dark:text-gray-400 self-center">
                    Question 1 of 5
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
            
            {contentView === 'summary' && (
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">AI-Generated Summary</h2>
                
                <div className="prose dark:prose-invert prose-sm max-w-none mb-8">
                  <h3>Machine Learning Fundamentals</h3>
                  <p>
                    Machine learning is a subfield of artificial intelligence that focuses on developing algorithms 
                    and statistical models that enable computers to perform tasks without explicit instructions, 
                    relying instead on patterns and inference. These systems learn from data, identify patterns, 
                    and make decisions with minimal human intervention.
                  </p>
                  
                  <h4>Key Types of Machine Learning</h4>
                  <ul>
                    <li>
                      <strong>Supervised Learning:</strong> Algorithms learn from labeled training data, making predictions 
                      based on that data. Examples include classification and regression problems.
                    </li>
                    <li>
                      <strong>Unsupervised Learning:</strong> Algorithms find patterns in unlabeled data. Common techniques 
                      include clustering, association, and dimensionality reduction.
                    </li>
                    <li>
                      <strong>Reinforcement Learning:</strong> Algorithms learn optimal actions through trial and error, 
                      receiving rewards or penalties. Used in robotics, gaming, and navigation.
                    </li>
                  </ul>
                  
                  <h4>Neural Networks</h4>
                  <p>
                    Neural networks are computing systems inspired by the biological neural networks in animal brains. 
                    They consist of:
                  </p>
                  <ul>
                    <li>Input layer: Receives initial data</li>
                    <li>Hidden layers: Process information using weighted connections</li>
                    <li>Output layer: Produces the final result</li>
                    <li>Activation functions: Add non-linearity, enabling complex pattern recognition</li>
                  </ul>
                  
                  <p>
                    Deep learning uses neural networks with many layers (deep neural networks) to analyze various factors 
                    of data. These models have revolutionized fields like computer vision, natural language processing, 
                    and speech recognition.
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <List className="w-4 h-4" />
                    <span>4 source documents</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      Save as PDF
                    </button>
                    <button className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                      Copy to notes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
