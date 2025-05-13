'use client';

import { useState } from 'react';
import { 
  Bot, 
  BookOpen, 
  Video, 
  FileText, 
  Globe, 
  Trash2,
  MessageSquare,
  Search,
  Plus,
  MoreVertical
} from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  
  // Sample chat history
  const chatHistory = [
    { id: '1', title: 'Machine Learning Basics', lastMessage: 'What is supervised learning?', timestamp: 'May 10, 2025', type: 'document' },
    { id: '2', title: 'Neural Networks', lastMessage: 'Can you explain backpropagation?', timestamp: 'May 8, 2025', type: 'document' },
    { id: '3', title: 'Harvard CS50 Course', lastMessage: 'Here are the key concepts from lecture 4...', timestamp: 'May 5, 2025', type: 'video' },
    { id: '4', title: 'Web Development Trends', lastMessage: 'What are the most popular JavaScript frameworks in 2025?', timestamp: 'May 3, 2025', type: 'web' },
    { id: '5', title: 'Physics Quantum Notes', lastMessage: 'Can you explain quantum entanglement in simple terms?', timestamp: 'May 1, 2025', type: 'document' },
  ];

  // Sample chat messages for the selected chat
  const chatMessages = [
    {
      id: '1',
      content: 'Can you explain supervised learning in simple terms?',
      type: 'text',
      role: 'user',
      timestamp: new Date(2025, 4, 10, 10, 15),
    },
    {
      id: '2',
      content: 'Supervised learning is like learning with a teacher. The algorithm is trained on a labeled dataset, where we provide both the input data and the correct output labels. The algorithm learns to map inputs to outputs based on this training data.\n\nImagine teaching a child to recognize fruits. You show them an apple and say "this is an apple", an orange and say "this is an orange", etc. After seeing many examples, they learn to identify new fruits they haven\'t seen before. This is similar to supervised learning.\n\nKey components:\n- Labeled training data\n- A defined target output\n- An algorithm that learns the mapping from inputs to outputs\n- Evaluation using a separate test dataset\n\nCommon examples are classification (predicting categories) and regression (predicting continuous values).',
      type: 'text',
      role: 'assistant',
      timestamp: new Date(2025, 4, 10, 10, 16),
    },
    {
      id: '3',
      content: 'What\'s the difference between supervised and unsupervised learning?',
      type: 'text',
      role: 'user',
      timestamp: new Date(2025, 4, 10, 10, 18),
    },
    {
      id: '4',
      content: 'The main difference between supervised and unsupervised learning is whether the data is labeled or not:\n\n**Supervised Learning:**\n- Uses labeled data (input + correct output)\n- Has a "teacher" providing the correct answers\n- Goal: Learn a mapping from inputs to outputs\n- Example tasks: Classification, regression\n- Example applications: Spam detection, price prediction\n\n**Unsupervised Learning:**\n- Uses unlabeled data (input only, no output labels)\n- No "teacher" or correct answers\n- Goal: Find hidden patterns or structure in data\n- Example tasks: Clustering, dimensionality reduction, association\n- Example applications: Customer segmentation, anomaly detection, topic modeling\n\nA simple analogy: Supervised learning is like studying with answers available, while unsupervised learning is like trying to find patterns in data without any predefined answers.',
      type: 'text',
      role: 'assistant',
      timestamp: new Date(2025, 4, 10, 10, 19),
    }
  ];

  const getIconForChatType = (type: string) => {
    switch(type) {
      case 'document':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-red-500" />;
      case 'web':
        return <Globe className="w-5 h-5 text-green-500" />;
      default:
        return <MessageSquare className="w-5 h-5 text-purple-500" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AppLayout title="AI Chat">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-150px)]">
          {/* Left sidebar - Chat history */}
          <div className="w-full lg:w-1/4 flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            {/* Search bar */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 pl-9 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            {/* Chat list */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 flex justify-between items-center">
                <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Chats</h2>
                <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                      selectedChat === chat.id ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getIconForChatType(chat.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{chat.title}</h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">{chat.timestamp}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{chat.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right area - Chat interface */}
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            {selectedChat ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Bot className="w-5 h-5 text-purple-500" />
                    <div>
                      <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {chatHistory.find(c => c.id === selectedChat)?.title || 'Chat Assistant'}
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">AI powered learning assistant</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900/50">
                  <div className="space-y-6">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] rounded-2xl p-4 ${
                          message.role === 'user' 
                            ? 'bg-blue-500 text-white rounded-tr-none' 
                            : 'bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-tl-none'
                        }`}>
                          <div className="whitespace-pre-wrap text-sm">
                            {message.content}
                          </div>
                          <div className={`mt-1 text-xs ${
                            message.role === 'user' 
                              ? 'text-blue-100' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Input box */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <textarea
                        placeholder="Type your message..."
                        rows={3}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      ></textarea>
                    </div>
                    <button className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                    AI responses are generated based on your learning materials and general knowledge.
                  </p>
                </div>
              </>
            ) : (
              // No chat selected state
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-purple-500 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">No chat selected</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mb-6">
                  Select a chat from the sidebar or start a new conversation to get help with your learning materials.
                </p>
                <button className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>New Conversation</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
