'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Upload, 
  Link as LinkIcon, 
  Mic, 
  Filter, 
  SlidersHorizontal,
  FileText,
  Key,
  Layers,
  MessageSquare,
  BarChart
} from 'lucide-react';

import ModularCard from '../components/content/ModularCard';

// Card type definition
type CardType = 'summary' | 'keypoints' | 'flashcards' | 'chat' | 'diagram' | 'original';

interface Card {
  id: string;
  title: string;
  type: CardType;
  content: string;
  date: string;
  expandable?: boolean;
}

export default function ModularCardGrid() {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [uploadMenuOpen, setUploadMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Mock data for cards
  const [cards, setCards] = useState<Card[]>([
    {
      id: '1',
      title: 'Machine Learning Fundamentals',
      type: 'summary',
      content: 'Machine learning is a field of artificial intelligence focused on building systems that learn from data. This document covers the major categories of machine learning: supervised learning, unsupervised learning, and reinforcement learning.',
      date: 'May 10, 2025',
      expandable: true
    },
    {
      id: '2',
      title: 'Key Concepts in AI',
      type: 'keypoints',
      content: 'Artificial Intelligence, Machine Learning, Deep Learning, Neural Networks, Supervised Learning, Unsupervised Learning, Reinforcement Learning',
      date: 'May 8, 2025'
    },
    {
      id: '3',
      title: 'Neural Networks Review',
      type: 'flashcards',
      content: '10 flashcards on neural network architecture and functions',
      date: 'May 5, 2025'
    },
    {
      id: '4',
      title: 'Data Science Q&A',
      type: 'chat',
      content: 'Discussion about data preprocessing techniques',
      date: 'May 3, 2025'
    },
    {
      id: '5',
      title: 'Model Performance',
      type: 'diagram',
      content: 'Visualization of model accuracy and loss',
      date: 'May 1, 2025'
    },
    {
      id: '6',
      title: 'Raw Lecture Notes',
      type: 'original',
      content: 'Original unprocessed lecture notes from ML course',
      date: 'April 28, 2025'
    }
  ]);
  
  // Filter options
  const filterOptions = [
    { name: 'All', value: null },
    { name: 'Summaries', value: 'summary' },
    { name: 'Key Points', value: 'keypoints' },
    { name: 'Flashcards', value: 'flashcards' },
    { name: 'Chats', value: 'chat' },
    { name: 'Diagrams', value: 'diagram' },
    { name: 'Original Content', value: 'original' }
  ];
  
  // Filter cards
  const filteredCards = activeFilter 
    ? cards.filter(card => card.type === activeFilter)
    : cards;
  
  return (
    <div className="container mx-auto">
      {/* Header with title and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Your Notes</h1>
        
        <div className="flex items-center gap-2">
          {/* Filter Menu */}
          <div className="relative">
            <button 
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            
            {filterMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                <div className="py-1">
                  {filterOptions.map(option => (
                    <button
                      key={option.name}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        activeFilter === option.value ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
                      }`}
                      onClick={() => {
                        setActiveFilter(option.value);
                        setFilterMenuOpen(false);
                      }}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Upload Menu */}
          <div className="relative">
            <button 
              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              onClick={() => setUploadMenuOpen(!uploadMenuOpen)}
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
            
            {uploadMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                <div className="py-1">
                  <button 
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    onClick={() => setUploadMenuOpen(false)}
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload File</span>
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    onClick={() => setUploadMenuOpen(false)}
                  >
                    <LinkIcon className="w-4 h-4" />
                    <span>Paste URL</span>
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    onClick={() => setUploadMenuOpen(false)}
                  >
                    <Mic className="w-4 h-4" />
                    <span>Voice Input</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Filter Chips */}
      {activeFilter && (
        <div className="flex items-center mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Filtered by:</span>
          <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium flex items-center">
            {filterOptions.find(opt => opt.value === activeFilter)?.name}
            <button 
              className="ml-1 hover:text-blue-800 dark:hover:text-blue-300"
              onClick={() => setActiveFilter(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map(card => (
          <ModularCard
            key={card.id}
            id={card.id}
            title={card.title}
            type={card.type}
            expandable={card.expandable}
            footerControls={
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">{card.date}</span>
                <Link
                  href={`/dashboard/${card.id}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View details →
                </Link>
              </div>
            }
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {card.content}
            </p>
          </ModularCard>
        ))}
        
        {/* Add New Card */}
        <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
          <div className="p-8 flex flex-col items-center justify-center h-full">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3">
              <Plus className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Add new content
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
