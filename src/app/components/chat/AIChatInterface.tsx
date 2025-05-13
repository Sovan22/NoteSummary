'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  IconButton,
  Avatar,
  CircularProgress,
  Fab,
  InputAdornment
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MicIcon from '@mui/icons-material/Mic';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

// Message types
type MessageType = 'text' | 'image' | 'file';
type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  content: string;
  type: MessageType;
  role: MessageRole;
  timestamp: Date;
  isBookmarked?: boolean;
}

interface AIChatInterfaceProps {
  contentTitle?: string;
  initialMessages?: Message[];
  onSendMessage?: (message: string) => Promise<void>;
}

export default function AIChatInterface({
  contentTitle = "AI Assistant",
  initialMessages = [],
  onSendMessage
}: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputHeight = useRef<number>(56);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize input height (simple version)
    const lines = e.target.value.split('\n').length;
    const newHeight = Math.min(Math.max(56, lines * 24), 120); // Min 56px, max 120px
    inputHeight.current = newHeight;
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    
    // Create new user message
    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      type: 'text',
      role: 'user',
      timestamp: new Date(),
    };
    
    // Add user message to chat
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsSending(true);
    
    // Show typing indicator
    setIsTyping(true);

    // Simulate response delay (replace with actual API call)
    setTimeout(() => {
      // Create AI response message
      const aiResponseMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: "I'm analyzing your notes and have found several key points related to your question. Would you like me to expand on any particular aspect?",
        type: 'text',
        role: 'assistant',
        timestamp: new Date(),
      };
      
      // Add AI response
      setMessages((prev) => [...prev, aiResponseMessage]);
      setIsTyping(false);
      setIsSending(false);
    }, 2000);
    
    // Call the parent handler if provided
    if (onSendMessage) {
      try {
        await onSendMessage(inputValue);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBookmarkToggle = (messageId: string) => {
    setMessages(messages.map(message => 
      message.id === messageId 
        ? { ...message, isBookmarked: !message.isBookmarked } 
        : message
    ));
  };

  const getMessageTimeString = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Paper
      elevation={2}
      sx={{
        height: '75vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Chat header */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          background: theme => `linear-gradient(90deg, ${theme.palette.primary.main}20, ${theme.palette.background.paper})`,
        }}
      >
        <Avatar
          sx={{ 
            bgcolor: 'primary.main',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': {
                boxShadow: '0 0 0 0 rgba(103, 80, 164, 0.6)',
              },
              '70%': {
                boxShadow: '0 0 0 10px rgba(103, 80, 164, 0)',
              },
              '100%': {
                boxShadow: '0 0 0 0 rgba(103, 80, 164, 0)',
              },
            }
          }}
        >
          <QuestionAnswerIcon />
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight={600} lineHeight={1.2}>
            {contentTitle}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            AI-powered assistant for your notes
          </Typography>
        </Box>
      </Box>

      {/* Messages container */}
      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          backgroundColor: 'background.default',
          height: 'calc(75vh - 135px)', // Adjusted to account for header and input area
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              p: 4,
              opacity: 0.7,
            }}
          >
            <QuestionAnswerIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2, opacity: 0.7 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Start a conversation with your AI assistant
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ask questions about your notes, request summaries, or generate flashcards.
            </Typography>
          </Box>
        ) : (
          messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.role === 'user' ? 'flex-end' : 'flex-start',
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                animation: `${message.role === 'user' ? 'slideInRight' : 'slideInLeft'} 0.3s ease`,
                '@keyframes slideInRight': {
                  from: { opacity: 0, transform: 'translateX(20px)' },
                  to: { opacity: 1, transform: 'translateX(0)' }
                },
                '@keyframes slideInLeft': {
                  from: { opacity: 0, transform: 'translateX(-20px)' },
                  to: { opacity: 1, transform: 'translateX(0)' }
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                {message.role === 'assistant' && (
                  <Avatar
                    sx={{ 
                      width: 32, 
                      height: 32,
                      bgcolor: 'primary.main',
                      fontSize: '0.9rem'
                    }}
                  >
                    AI
                  </Avatar>
                )}
                
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    pb: 1,
                    borderRadius: 2,
                    borderTopRightRadius: message.role === 'user' ? 0 : 2,
                    borderTopLeftRadius: message.role === 'assistant' ? 0 : 2,
                    backgroundColor: message.role === 'user' ? 'primary.main' : '#FFFFFF',
                    color: message.role === 'user' ? 'primary.contrastText' : 'text.primary',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    },
                    maxWidth: '100%',
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
                    {message.content}
                  </Typography>
                  
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                      gap: 1,
                      mt: 1,
                      opacity: 0.7,
                      fontSize: '0.7rem',
                      '& .actions': {
                        opacity: 0,
                        transition: 'opacity 0.2s ease',
                      },
                      '&:hover .actions': {
                        opacity: 1,
                      },
                    }}
                  >
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontSize: '0.65rem',
                        color: message.role === 'user' ? 'rgba(255,255,255,0.7)' : 'text.secondary' 
                      }}
                    >
                      {getMessageTimeString(message.timestamp)}
                    </Typography>
                    
                    <Box className="actions">
                      <IconButton 
                        size="small" 
                        onClick={() => handleBookmarkToggle(message.id)}
                        sx={{ 
                          p: 0.5,
                          color: message.role === 'user' ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                          '&:hover': {
                            backgroundColor: message.role === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                          }
                        }}
                      >
                        {message.isBookmarked ? (
                          <BookmarkIcon fontSize="small" sx={{ fontSize: '0.9rem' }}/>
                        ) : (
                          <BookmarkBorderIcon fontSize="small" sx={{ fontSize: '0.9rem' }}/>
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
                
                {message.role === 'user' && (
                  <Avatar
                    sx={{ 
                      width: 32, 
                      height: 32,
                      bgcolor: 'secondary.main',
                      fontSize: '0.9rem'
                    }}
                  >
                    ME
                  </Avatar>
                )}
              </Box>
            </Box>
          ))
        )}
        
        {/* Typing indicator */}
        {isTyping && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              alignSelf: 'flex-start',
              gap: 1,
              animation: 'fadeIn 0.3s ease',
              '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 1 }
              }
            }}
          >
            <Avatar
              sx={{ 
                width: 32, 
                height: 32,
                bgcolor: 'primary.main',
                fontSize: '0.9rem'
              }}
            >
              AI
            </Avatar>
            
            <Paper
              elevation={1}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 2,
                borderTopLeftRadius: 0,
                backgroundColor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 60,
              }}
            >
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    animation: 'bounce 1.2s infinite ease-in-out',
                    animationDelay: '0s',
                    '@keyframes bounce': {
                      '0%, 60%, 100%': {
                        transform: 'translateY(0)',
                      },
                      '30%': {
                        transform: 'translateY(-4px)',
                      }
                    }
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    animation: 'bounce 1.2s infinite ease-in-out',
                    animationDelay: '0.2s',
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    animation: 'bounce 1.2s infinite ease-in-out',
                    animationDelay: '0.4s',
                  }}
                />
              </Box>
            </Paper>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>

      {/* Message input */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          mt: 'auto',
        }}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 1,
          }}
        >
          <IconButton color="primary" size="medium" disabled={isSending}>
            <AttachFileIcon />
          </IconButton>
          
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Type your message..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
            disabled={isSending}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color="primary" disabled={isSending}>
                    <MicIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                p: 1.5,
                alignItems: 'flex-end'
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'background.default',
                transition: 'all 0.3s ease',
                minHeight: `${inputHeight.current}px`,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
                '&.Mui-focused': {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
              },
            }}
          />
          
          <Fab 
            color="primary" 
            size="medium"
            disabled={inputValue.trim() === '' || isSending}
            onClick={handleSendMessage}
            sx={{
              borderRadius: 2,
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
              },
              '&.Mui-disabled': {
                opacity: 0.6,
              },
            }}
          >
            {isSending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <SendIcon />
            )}
          </Fab>
        </Box>
      </Box>
    </Paper>
  );
}
