'use client';

import { useState, useEffect } from 'react';
import { 
  Upload as UploadIcon, 
  Link as LinkIcon, 
  Sparkles, 
  CheckCircle,
  Loader2
} from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import UploaderComponent from '../components/upload/UploaderComponent';

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Animate page load
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Simulate file upload process
  const handleFileSelect = () => {
    setIsUploaded(true);
  };

  // Simulate processing
  const handleStartProcessing = () => {
    setIsProcessing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsProcessed(true);
    }, 3000);
  };

  // Reset the process
  const handleReset = () => {
    setIsUploaded(false);
    setIsProcessing(false);
    setIsProcessed(false);
  };

  return (
    <AppLayout title="Upload Content">
      <div className="container mx-auto">
        <div className="flex flex-col">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Upload Content</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Upload files or paste URLs to generate AI-powered summaries, flashcards, and learning materials.
            </p>
          </div>
          
          {/* Tab navigation */}
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 0
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab(0)}
            >
              <UploadIcon className="w-4 h-4" />
              <span>File Upload</span>
            </button>
            
            <button
              className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 1
                  ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab(1)}
            >
              <LinkIcon className="w-4 h-4" />
              <span>URL / Link</span>
            </button>
            
            <button
              className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 2
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab(2)}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI-Generated</span>
            </button>
          </div>
          
          {/* Tab content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            {/* File Upload Panel */}
            <div className={activeTab === 0 ? 'block' : 'hidden'}>
              {isProcessed ? (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">Processing Complete!</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                    Your file has been successfully processed. You can now access the generated content.
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={handleReset}
                      className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Upload Another
                    </button>
                    <button 
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-colors"
                    >
                      View Results
                    </button>
                  </div>
                </div>
              ) : isUploaded && !isProcessing ? (
                <div className="flex flex-col items-center text-center py-8">
                  <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-6">Ready to process</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                    Your file has been uploaded and is ready for processing. Click the button below to start generating AI content.
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={handleReset}
                      className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleStartProcessing}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-colors flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Process with AI
                    </button>
                  </div>
                </div>
              ) : isProcessing ? (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="w-16 h-16 flex items-center justify-center mb-4">
                    <Loader2 className="w-8 h-8 text-blue-500 dark:text-blue-400 animate-spin" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">Processing Your Content</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                    Our AI is analyzing your content to generate summaries, flashcards, and key points.
                  </p>
                  <div className="w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ) : (
                <UploaderComponent 
                  onFileSelect={handleFileSelect}
                  onUploadComplete={() => setIsUploaded(true)}
                />
              )}
            </div>
            
            {/* URL Input Panel */}
            <div className={activeTab === 1 ? 'block' : 'hidden'}>
              <div className="flex flex-col">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Add content from a URL</h3>
                <div className="mb-6">
                  <div className="flex">
                    <input 
                      type="text"
                      placeholder="Enter a URL (e.g., https://example.com/article)"
                      className="flex-1 p-3 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 rounded-r-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                      Process
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Supported sources: Articles, blog posts, news sites, and educational content
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300 text-sm">
                  <p className="font-medium mb-1">Tips for URL processing:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Make sure the URL is accessible (not behind a login)</li>
                    <li>For best results, use URLs that lead directly to the content</li>
                    <li>Academic papers and articles work best</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* AI Generated Panel */}
            <div className={activeTab === 2 ? 'block' : 'hidden'}>
              <div className="flex flex-col">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Generate AI content</h3>
                <div className="mb-6">
                  <div className="flex flex-col">
                    <label className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                      Topic or subject
                    </label>
                    <input 
                      type="text"
                      placeholder="E.g., Quantum physics, Machine learning, World War II"
                      className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    
                    <label className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                      Additional details (optional)
                    </label>
                    <textarea 
                      placeholder="Add specific aspects you want to cover, any particular focus areas, or educational level"
                      rows={4}
                      className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    ></textarea>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-colors flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Generate Content
                      </button>
                      
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        AI will create summaries, flashcards, and learning materials
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 text-amber-800 dark:text-amber-300 text-sm">
                  <p className="font-medium mb-1">About AI-generated content:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>AI content is created for educational purposes</li>
                    <li>Always verify important information from reliable sources</li>
                    <li>For academic work, use AI content as a starting point for your research</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
