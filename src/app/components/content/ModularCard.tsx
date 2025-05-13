'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MoreHorizontal, 
  Copy, 
  Bookmark, 
  Share, 
  Download,
  FileText,
  Key,
  MessageSquare,
  Layers,
  BarChart
} from 'lucide-react';

type CardType = 'summary' | 'keypoints' | 'flashcards' | 'chat' | 'diagram' | 'original';

interface ModularCardProps {
  id: string;
  title: string;
  type: CardType;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  headerControls?: React.ReactNode;
  footerControls?: React.ReactNode;
  expandable?: boolean;
  fullWidth?: boolean;
}

export default function ModularCard({
  id,
  title,
  type,
  children,
  className = '',
  actions,
  headerControls,
  footerControls,
  expandable = false,
  fullWidth = false
}: ModularCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Card styling based on type
  const getCardStyles = () => {
    const baseStyles = "rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow";
    const borderStyles = {
      'summary': 'border-l-4 border-blue-500',
      'keypoints': 'border-l-4 border-green-500',
      'flashcards': 'border-l-4 border-purple-500',
      'chat': 'border-l-4 border-amber-500',
      'diagram': 'border-l-4 border-red-500',
      'original': 'border-l-4 border-gray-500'
    };
    
    return `${baseStyles} ${borderStyles[type]} ${className} ${fullWidth ? 'w-full' : ''}`;
  };
  
  // Card icon based on type
  const getCardIcon = () => {
    switch (type) {
      case 'summary':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'keypoints':
        return <Key className="w-5 h-5 text-green-500" />;
      case 'flashcards':
        return <Layers className="w-5 h-5 text-purple-500" />;
      case 'chat':
        return <MessageSquare className="w-5 h-5 text-amber-500" />;
      case 'diagram':
        return <BarChart className="w-5 h-5 text-red-500" />;
      case 'original':
        return <FileText className="w-5 h-5 text-gray-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };
  
  // Default actions if none provided
  const defaultActions = (
    <div className="flex space-x-1">
      <button 
        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Copy content"
      >
        <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>
      <button 
        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Bookmark"
      >
        <Bookmark className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>
      <button 
        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Share"
      >
        <Share className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>
      <button 
        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Download"
      >
        <Download className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>
    </div>
  );
  
  return (
    <div className={getCardStyles()}>
      {/* Card Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          {getCardIcon()}
          <h3 className="font-medium">{title}</h3>
          {headerControls}
        </div>
        
        <div className="flex items-center">
          {actions || defaultActions}
          
          <div className="relative ml-2">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Edit
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Duplicate
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className={`p-4 ${expandable && !expanded ? 'max-h-64 overflow-hidden' : ''}`}>
        {children}
      </div>
      
      {/* Expandable Control */}
      {expandable && (
        <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 text-center">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        </div>
      )}
      
      {/* Card Footer */}
      {footerControls && (
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
          {footerControls}
        </div>
      )}
    </div>
  );
}
