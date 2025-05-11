'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton,
  CircularProgress,
  Tooltip,
  Chip
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  Delete as ClearIcon,
  Save as SaveIcon,
  ContentCopy as CopyIcon,
  Description as DocIcon
} from '@mui/icons-material';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIChatInterfaceProps {
  contentTitle?: string;
  contentId?: string;
}

export default function AIChatInterface({ contentTitle, contentId }: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI assistant. Ask me anything about your content and I'll do my best to help.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Sample suggested questions related to machine learning content
  const suggestedQuestions = [
    "What are the main types of machine learning?",
    "Explain how neural networks work",
    "What are some applications of reinforcement learning?",
    "What's the difference between supervised and unsupervised learning?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // In a real application, this would call your AI API with the content context
    // const response = await fetch('/api/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ 
    //     message: inputMessage, 
    //     contentId: contentId,
    //     history: messages.map(m => ({ role: m.sender, content: m.content }))
    //   })
    // });
    // const data = await response.json();
    
    // Simulate AI response with timeout
    setTimeout(() => {
      // Generate a contextual response based on the question
      let aiResponse = '';
      const lowerCaseMessage = inputMessage.toLowerCase();
      
      if (lowerCaseMessage.includes('types of machine learning') || lowerCaseMessage.includes('ml types')) {
        aiResponse = "The main types of machine learning are:\n\n1. Supervised Learning: Uses labeled data to train models to predict outcomes\n\n2. Unsupervised Learning: Finds patterns in unlabeled data\n\n3. Reinforcement Learning: Trains agents through reward-based feedback\n\n4. Semi-supervised Learning: Uses a combination of labeled and unlabeled data";
      } else if (lowerCaseMessage.includes('neural network') || lowerCaseMessage.includes('deep learning')) {
        aiResponse = "Neural networks are computing systems inspired by biological neural networks. They consist of layers of interconnected nodes (neurons) that process information. Each connection has a weight that adjusts as learning proceeds.\n\nA typical neural network includes:\n- Input layer: Receives data\n- Hidden layers: Process information\n- Output layer: Produces results\n\nDeep learning refers to neural networks with multiple hidden layers.";
      } else if (lowerCaseMessage.includes('reinforcement learning') || lowerCaseMessage.includes('rl')) {
        aiResponse = "Reinforcement learning applications include:\n\n- Game playing (AlphaGo, Chess)\n- Robotics and autonomous systems\n- Recommendation systems\n- Resource management\n- Financial trading\n- Healthcare treatment planning\n- Smart grids and energy optimization";
      } else if (lowerCaseMessage.includes('supervised') && lowerCaseMessage.includes('unsupervised')) {
        aiResponse = "Supervised vs. Unsupervised Learning:\n\nSupervised Learning:\n- Uses labeled data\n- Has specific target outputs\n- Examples: Classification, Regression\n- Goal: Make accurate predictions\n\nUnsupervised Learning:\n- Uses unlabeled data\n- No target outputs\n- Examples: Clustering, Dimensionality Reduction\n- Goal: Find hidden patterns or structures";
      } else {
        aiResponse = "Based on the content about machine learning, I can tell you that machine learning is a field of AI that enables systems to learn and improve from experience without explicit programming. It relies on algorithms that build mathematical models based on sample data to make predictions or decisions.";
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        content: "Chat history cleared. How can I help you with your content?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content).then(
      () => {
        // Optional: Show a copy success notification
        console.log('Message copied to clipboard');
      },
      (err) => {
        console.error('Failed to copy: ', err);
      }
    );
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          AI Chat
        </Typography>
        
        <Box>
          {contentTitle && (
            <Chip
              icon={<DocIcon />}
              label={contentTitle}
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
            />
          )}
          <Tooltip title="Clear chat history">
            <IconButton onClick={handleClearChat} size="small">
              <ClearIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save conversation">
            <IconButton size="small">
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Chat Messages */}
      <Paper
        variant="outlined"
        sx={{
          height: 400,
          overflow: 'auto',
          mb: 2,
          p: 2,
          bgcolor: 'background.default',
        }}
      >
        <List>
          {messages.map((message, index) => (
            <Box key={message.id}>
              {index > 0 && <Divider variant="inset" component="li" />}
              <ListItem
                alignItems="flex-start"
                sx={{
                  textAlign: message.sender === 'user' ? 'right' : 'left',
                  flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: message.sender === 'user' ? 'secondary.main' : 'primary.main' }}>
                    {message.sender === 'user' ? <PersonIcon /> : <BotIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        display: 'flex',
                        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      {message.sender === 'ai' && (
                        <Tooltip title="Copy to clipboard">
                          <IconButton 
                            size="small" 
                            onClick={() => handleCopyMessage(message.content)}
                          >
                            <CopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {message.sender === 'user' ? 'You' : 'AI Assistant'}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{
                        display: 'inline',
                        mt: 1,
                        whiteSpace: 'pre-line',
                        wordBreak: 'break-word',
                        textAlign: message.sender === 'user' ? 'right' : 'left',
                      }}
                    >
                      {message.content}
                    </Typography>
                  }
                />
              </ListItem>
            </Box>
          ))}
          {isLoading && (
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <BotIcon />
              </Avatar>
              <CircularProgress size={24} />
            </Box>
          )}
          <div ref={chatEndRef} />
        </List>
      </Paper>
      
      {/* Suggested Questions */}
      <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {suggestedQuestions.map((question, index) => (
          <Chip
            key={index}
            label={question}
            variant="outlined"
            onClick={() => handleSuggestedQuestion(question)}
            sx={{ cursor: 'pointer', borderRadius: 2 }}
          />
        ))}
      </Box>
      
      {/* Message Input */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask a question about your content..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          multiline
          maxRows={3}
          sx={{ mr: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
}
