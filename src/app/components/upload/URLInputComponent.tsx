'use client';

import { useState, useEffect } from 'react';
import { 
  Link,
  Globe, 
  Youtube, 
  FileText, 
  X, 
  Send, 
  ExternalLink, 
  CheckCircle, 
  Eye, 
  Clipboard
} from 'lucide-react';

interface URLPreview {
  title: string;
  description: string;
  imageUrl?: string;
  type: 'article' | 'video' | 'other';
  source: string;
}

interface URLInputComponentProps {
  onURLSubmit?: (url: string, preview: URLPreview) => void;
  onURLValidated?: (isValid: boolean, url: string) => void;
}

export default function URLInputComponent({
  onURLSubmit,
  onURLValidated
}: URLInputComponentProps) {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentURLs, setRecentURLs] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Mock URL preview - in a real app, this would come from your backend
  const [preview, setPreview] = useState<URLPreview | null>(null);

  useEffect(() => {
    // Validate URL
    const validateURL = () => {
      if (!url) {
        setIsValid(false);
        onURLValidated?.(false, '');
        return;
      }

      try {
        // Check if it's a valid URL format
        const urlObj = new URL(url);
        // Only http/https protocols are valid
        if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
          setIsValid(false);
          setError('Only HTTP and HTTPS URLs are supported');
          onURLValidated?.(false, url);
          return;
        }
        
        setIsValid(true);
        setError(null);
        onURLValidated?.(true, url);
      } catch (err) {
        setIsValid(false);
        setError('Please enter a valid URL');
        onURLValidated?.(false, url);
      }
    };

    validateURL();
  }, [url, onURLValidated]);

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setShowPreview(false);
    setSuccessMessage(null);
  };

  const fetchURLPreview = () => {
    if (!isValid) return;
    
    setIsProcessing(true);
    setError(null);
    
    // Simulate API call to fetch URL preview
    setTimeout(() => {
      // This is a mock implementation - in a real app, this would be an API call
      const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
      const isArticle = url.includes('medium.com') || url.includes('wikipedia.org') || url.includes('blog');
      
      // Create a mock preview based on URL type
      const mockPreview: URLPreview = {
        title: isYouTube 
          ? 'How to Master JavaScript in 2025' 
          : isArticle 
            ? 'Modern Web Development Techniques' 
            : 'Website Content',
        description: isYouTube 
          ? 'A comprehensive guide to JavaScript best practices, new features, and performance optimization techniques for 2025.' 
          : isArticle 
            ? 'This article covers the latest trends in web development, including serverless architecture, AI integration, and performance optimization.' 
            : 'Content from the provided URL',
        imageUrl: isYouTube 
          ? 'https://example.com/youtube-thumbnail.jpg' 
          : isArticle 
            ? 'https://example.com/article-image.jpg' 
            : undefined,
        type: isYouTube ? 'video' : isArticle ? 'article' : 'other',
        source: new URL(url).hostname
      };
      
      setPreview(mockPreview);
      setShowPreview(true);
      setIsProcessing(false);
      
      // Add to recent URLs if not already present
      if (!recentURLs.includes(url)) {
        setRecentURLs(prev => [url, ...prev].slice(0, 5));
      }
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) return;
    
    if (!preview) {
      fetchURLPreview();
      return;
    }
    
    // Submit the URL and its preview
    onURLSubmit?.(url, preview);
    setUrl('');
    setPreview(null);
    setShowPreview(false);
    setSuccessMessage('URL has been successfully processed');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setUrl(clipboardText);
    } catch (err) {
      setError('Unable to access clipboard. Please paste manually.');
    }
  };

  const clearURL = () => {
    setUrl('');
    setPreview(null);
    setShowPreview(false);
    setError(null);
    setSuccessMessage(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Youtube className="w-5 h-5 text-red-500" />;
      case 'article':
        return <FileText className="w-5 h-5 text-blue-500" />;
      default:
        return <Globe className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Link className="w-5 h-5 text-purple-500" />
        <h2 className="font-medium text-gray-800 dark:text-gray-200">URL Input</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="flex">
            <div className="relative flex-1">
              <input
                type="text"
                value={url}
                onChange={handleURLChange}
                placeholder="Enter URL (e.g., https://example.com)"
                className={`w-full px-4 py-3 pr-10 rounded-l-lg border-y border-l focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  error 
                    ? 'border-red-300 focus:border-red-300 focus:ring-red-200 dark:border-red-600 dark:focus:ring-red-900'
                    : isValid 
                      ? 'border-green-300 focus:border-green-300 focus:ring-green-200 dark:border-green-600 dark:focus:ring-green-900'
                      : 'border-gray-300 focus:border-blue-300 focus:ring-blue-200 dark:border-gray-600 dark:focus:ring-blue-900'
                } dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
              />
              {url && (
                <button 
                  type="button" 
                  onClick={clearURL}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <button
              type="button"
              onClick={handlePaste}
              className="px-3 border-y border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
              title="Paste from clipboard"
            >
              <Clipboard className="w-4 h-4" />
            </button>
            
            <button
              type="submit"
              disabled={!isValid || isProcessing}
              className={`px-4 py-2 rounded-r-lg flex items-center ${
                isValid && !isProcessing
                  ? 'bg-purple-500 hover:bg-purple-600 text-white'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              } transition-colors`}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing</span>
                </div>
              ) : showPreview ? (
                <Send className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
        
        {successMessage && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {successMessage}
          </div>
        )}
        
        {/* URL Preview */}
        {showPreview && preview && (
          <div className="mt-4 bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {getTypeIcon(preview.type)}
                <span className="text-xs text-gray-500 dark:text-gray-400">{preview.source}</span>
              </div>
              
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">{preview.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{preview.description}</p>
              
              <div className="flex justify-between items-center">
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  Visit original
                </a>
                
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-md flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3 h-3" />
                  Process content
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
      
      {/* Recent URLs */}
      {recentURLs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recent URLs</h3>
          <div className="space-y-2">
            {recentURLs.map((recentUrl, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-2 truncate">
                  <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-400 truncate">{recentUrl}</span>
                </div>
                <button 
                  onClick={() => setUrl(recentUrl)}
                  className="ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
