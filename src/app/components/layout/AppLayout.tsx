'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

// Icons
import { 
  ChevronLeft, ChevronRight, Menu, 
  Search, Upload, Folder, Tag,
  FileText, Key, Grid, MessageSquare,
  PanelLeft, PanelRight, Settings, User,
  Moon, Sun, BrainCircuit, Plus,
  Home, BookOpen, LucideIcon
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export default function AppLayout({ children, title = 'Dashboard' }: AppLayoutProps) {
  const { theme, setTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  
  // Navigation items
  const mainNavItems: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Upload', href: '/upload', icon: Upload },
    // { name: 'Flashcards', href: '/flashcards', icon: BookOpen },
    // { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'Learning', href: '/learning', icon: Key },
  ];
  
  const recentFiles = [
    { name: 'Machine Learning Notes', path: '/dashboard/1' },
    { name: 'Physics Lecture', path: '/dashboard/2' },
    { name: 'History Essay', path: '/dashboard/3' },
  ];
  
  // Tags for workspace navigation
  const tags = [
    { name: 'Important', color: 'bg-red-500' },
    { name: 'Study', color: 'bg-blue-500' },
    { name: 'Research', color: 'bg-green-500' },
    { name: 'Reference', color: 'bg-purple-500' },
  ];
  
  // Handle responsive sidebar
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // Auto-close sidebars on mobile
      if (isMobileView) {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
      } else {
        setLeftSidebarOpen(true);
        // Only open right sidebar on very large screens
        setRightSidebarOpen(window.innerWidth >= 1280);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Left Sidebar - Workspace Navigation */}
      <aside 
        className={`fixed md:relative z-30 h-screen transition-all duration-300 ease-in-out ${
          leftSidebarOpen ? 'left-0' : '-left-64'
        } w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <BrainCircuit className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-lg font-semibold">AI Note Taker</h2>
            </div>
            <button 
              onClick={() => setLeftSidebarOpen(false)}
              className="md:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search notes..."
                className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
          
          {/* Main Navigation */}
          <nav className="flex-1 px-3 py-2 overflow-y-auto">
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <Icon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400 group-hover:text-blue-500" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            
            {/* Recent Files Section */}
            <div className="mt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Recent Files
              </h3>
              <div className="mt-2 space-y-1">
                {recentFiles.map((file, index) => (
                  <Link
                    key={index}
                    href={file.path}
                    className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FileText className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400 group-hover:text-blue-500" />
                    <span className="truncate">{file.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Tags Section */}
            <div className="mt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Tags
              </h3>
              <div className="mt-2 px-3 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span 
                    key={index}
                    className={`${tag.color} text-white text-xs font-medium px-2 py-1 rounded-full`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 mr-2" />
                  Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-20">
          <div className="flex items-center">
            {!leftSidebarOpen && (
              <button 
                onClick={() => setLeftSidebarOpen(true)}
                className="p-2 mr-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Open navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50"
              aria-label="Create new note"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className="p-2 rounded-full bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 text-indigo-600 dark:text-indigo-400 hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-800/50 dark:hover:to-blue-800/50"
              aria-label="Toggle AI assistant"
            >
              <BrainCircuit className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4">
          {children}
        </div>
      </main>
      
      {/* Right Sidebar - AI Assistant */}
      <aside 
        className={`fixed md:relative z-30 h-screen transition-all duration-300 ease-in-out ${
          rightSidebarOpen ? 'right-0' : '-right-80'
        } w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-sm`}
      >
        <div className="flex flex-col h-full">
          {/* AI Assistant Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <BrainCircuit className="w-5 h-5 text-indigo-500 mr-2" />
              <h2 className="font-semibold">AI Assistant</h2>
            </div>
            <button 
              onClick={() => setRightSidebarOpen(false)}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* AI Message */}
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <BrainCircuit className="h-4 w-4 text-white" />
                </div>
                <div className="ml-3 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-3 rounded-lg rounded-tl-none max-w-[85%]">
                  <p className="text-sm">How can I help you with your notes today?</p>
                </div>
              </div>
              
              {/* User Message */}
              <div className="flex items-start justify-end">
                <div className="mr-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-tr-none max-w-[85%]">
                  <p className="text-sm">Can you summarize my machine learning notes?</p>
                </div>
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-xs font-medium text-white">ME</span>
                </div>
              </div>
              
              {/* AI Response */}
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <BrainCircuit className="h-4 w-4 text-white" />
                </div>
                <div className="ml-3 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-3 rounded-lg rounded-tl-none max-w-[85%]">
                  <p className="text-sm">Here's a summary of your machine learning notes:</p>
                  <ul className="mt-2 space-y-1 text-sm list-disc pl-5">
                    <li>Supervised learning uses labeled data to predict outcomes</li>
                    <li>Unsupervised learning finds patterns in unlabeled data</li>
                    <li>Reinforcement learning uses rewards to train agents</li>
                    <li>Key algorithms include decision trees, neural networks, and SVMs</li>
                  </ul>
                  <p className="mt-2 text-sm">Would you like me to expand on any specific concept?</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <input 
                type="text" 
                placeholder="Ask anything about your notes..."
                className="flex-1 p-2 text-sm rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="p-2 rounded-r-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
              <span>AI powered by Claude</span>
              <button className="text-indigo-500 hover:text-indigo-600">New conversation</button>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Mobile Backdrop Overlay */}
      {(isMobile && (leftSidebarOpen || rightSidebarOpen)) && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-20"
          onClick={() => {
            setLeftSidebarOpen(false);
            setRightSidebarOpen(false);
          }}
        />
      )}
    </div>
  );
}
