'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton
} from '@mui/material';
import {
  SmartToy as BotIcon,
  Book as BookIcon,
  VideoLibrary as VideoIcon,
  Description as DocumentIcon,
  Public as WebIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import AIChatInterface from '../components/interactive-output/AIChatInterface';

export default function ChatPage() {
  // Sample chat history - in a real app, this would come from your database
  const chatHistory = [
    { id: '1', title: 'Machine Learning Basics', lastMessage: 'What is supervised learning?', timestamp: 'May 10, 2025', type: 'document' },
    { id: '2', title: 'Neural Networks Video', lastMessage: 'Explain backpropagation simply', timestamp: 'May 8, 2025', type: 'video' },
    { id: '3', title: 'AI Ethics Article', lastMessage: 'What are the ethical concerns in AI?', timestamp: 'May 5, 2025', type: 'web' },
  ];

  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'document':
        return <DocumentIcon />;
      case 'video':
        return <VideoIcon />;
      case 'web':
        return <WebIcon />;
      case 'book':
        return <BookIcon />;
      default:
        return <DocumentIcon />;
    }
  };

  const getAvatarColorForType = (type: string) => {
    switch (type) {
      case 'document':
        return 'primary.main';
      case 'video':
        return 'error.main';
      case 'web':
        return 'info.main';
      case 'book':
        return 'success.main';
      default:
        return 'primary.main';
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          AI Chat
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ask questions about your learning materials and get instant responses.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 0 }}>
        {/* Chat History Sidebar */}
        <Box sx={{ width: { xs: '100%', md: '33.333%' }, pr: { md: 2 }, mb: { xs: 3, md: 0 } }}>
          <Paper elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">
                Chat History
              </Typography>
            </Box>

            <List sx={{ overflow: 'auto', height: '75vh', maxHeight: '75vh' }}>
              {chatHistory.map((chat, index) => (
                <Box key={chat.id}>
                  {index > 0 && <Divider component="li" />}
                  <ListItem
                    component="div"
                    sx={{ 
                      cursor: 'pointer',
                      bgcolor: selectedChat === chat.id ? 'rgba(25, 118, 210, 0.08)' : 'transparent'
                    }}
                    onClick={() => handleChatSelect(chat.id)}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: getAvatarColorForType(chat.type) }}>
                        {getIconForType(chat.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={chat.title}
                      secondary={
                        <Box component="span" sx={{ display: 'block' }}>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            noWrap
                            sx={{ display: 'block', maxWidth: '180px' }}
                          >
                            {chat.lastMessage}
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            color="text.secondary"
                          >
                            {chat.timestamp}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </Box>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Chat Interface */}
        <Box sx={{ width: { xs: '100%', md: '66.667%' } }}>
          {selectedChat ? (
            <AIChatInterface
              contentTitle={chatHistory.find(chat => chat.id === selectedChat)?.title}
              contentId={selectedChat}
            />
          ) : (
            <Box>
              <Paper 
                elevation={2} 
                sx={{ 
                  mb: 3,
                  p: 2, 
                  borderRadius: 2,
                  backgroundColor: 'background.paper'
                }}
              >
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BotIcon sx={{ color: 'primary.main' }} />
                  Start a New Conversation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Select a chat from the history or ask a question about your content.
                </Typography>
              </Paper>
              
              <AIChatInterface />
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
}
