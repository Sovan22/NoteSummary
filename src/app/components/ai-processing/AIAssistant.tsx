'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  IconButton, 
  Paper, 
  Avatar, 
  Divider,
  Tooltip,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { motion } from 'framer-motion';

// Message type for AI chat
interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

// Suggested queries type
interface SuggestedQuery {
  id: string;
  text: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I\'m your AI assistant. I can help you summarize content, create flashcards, answer questions about your notes, and more. What would you like to do today?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Suggested queries
  const suggestedQueries: SuggestedQuery[] = [
    { id: 'q1', text: 'Summarize my latest note' },
    { id: 'q2', text: 'Create flashcards from Chemistry notes' },
    { id: 'q3', text: 'What are the key concepts in my Biology notes?' },
    { id: 'q4', text: 'Draw a concept map of Machine Learning topics' }
  ];
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `I'm processing your request: "${inputText}". This is a simulated response. In the actual application, I would provide a relevant answer based on your query and context.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  // Handle suggested query click
  const handleSuggestedQuery = (query: string) => {
    setInputText(query);
  };
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme => theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{ 
              bgcolor: 'primary.main',
              width: 32,
              height: 32,
              mr: 1
            }}
          >
            <SmartToyIcon fontSize="small" />
          </Avatar>
          <Typography variant="subtitle1" fontWeight={600}>
            AI Assistant
          </Typography>
        </Box>
        
        <Tooltip title="Start new conversation">
          <IconButton size="small" onClick={() => setMessages([messages[0]])}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {messages.map(message => (
          <Box
            key={message.id}
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            sx={{
              display: 'flex',
              flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
              gap: 1,
              maxWidth: '85%',
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            {/* Avatar */}
            <Avatar
              sx={{ 
                bgcolor: message.sender === 'ai' ? 'primary.main' : 'secondary.main',
                width: 32,
                height: 32
              }}
            >
              {message.sender === 'ai' ? 
                <SmartToyIcon fontSize="small" /> : 
                <PersonIcon fontSize="small" />
              }
            </Avatar>
            
            {/* Message Bubble */}
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                borderRadius: 2,
                maxWidth: 'calc(100% - 40px)',
                bgcolor: message.sender === 'ai' 
                  ? theme => theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.15)' : 'rgba(25, 118, 210, 0.1)'
                  : theme => theme.palette.mode === 'dark' ? 'rgba(156, 39, 176, 0.15)' : 'rgba(156, 39, 176, 0.1)',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {message.text}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block', 
                  textAlign: message.sender === 'user' ? 'left' : 'right',
                  mt: 0.5,
                  opacity: 0.7
                }}
              >
                {formatTime(message.timestamp)}
              </Typography>
            </Paper>
          </Box>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              maxWidth: '85%'
            }}
          >
            <Avatar
              sx={{ 
                bgcolor: 'primary.main',
                width: 32,
                height: 32
              }}
            >
              <SmartToyIcon fontSize="small" />
            </Avatar>
            
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.15)' : 'rgba(25, 118, 210, 0.1)',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} thickness={6} />
                <Typography variant="body2">Thinking...</Typography>
              </Box>
            </Paper>
          </Box>
        )}
        
        {/* Empty div for scroll reference */}
        <div ref={messagesEndRef} />
      </Box>
      
      {/* Suggested Queries */}
      {messages.length <= 2 && (
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            Suggested Queries:
          </Typography>
          
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1
            }}
          >
            {suggestedQueries.map(query => (
              <Box
                key={query.id}
                component={motion.div}
                whileHover={{ y: -2, scale: 1.02 }}
                onClick={() => handleSuggestedQuery(query.text)}
                sx={{
                  py: 0.75,
                  px: 1.5,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  cursor: 'pointer',
                  backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                  '&:hover': {
                    backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                  },
                  transition: 'background-color 0.2s ease'
                }}
              >
                <Typography variant="caption">{query.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      
      {/* Input Area */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.01)'
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask me anything..."
          size="small"
          value={inputText}
          onChange={handleInputChange}
          disabled={isLoading}
          InputProps={{
            sx: {
              borderRadius: 3,
              bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
            }
          }}
        />
        
        <IconButton 
          type="submit" 
          color="primary" 
          disabled={!inputText.trim() || isLoading}
          sx={{
            bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.2)' : 'rgba(25, 118, 210, 0.1)',
            '&:hover': {
              bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.3)' : 'rgba(25, 118, 210, 0.2)',
            },
            '&.Mui-disabled': {
              bgcolor: 'transparent'
            }
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
