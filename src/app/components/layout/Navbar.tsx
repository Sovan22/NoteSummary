'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Box
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Class as FlashcardIcon,
  Chat as ChatIcon,
  Person as ProfileIcon,
  CloudUpload as UploadIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { title: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { title: 'Upload Content', icon: <UploadIcon />, path: '/upload' },
    { title: 'Flashcards', icon: <FlashcardIcon />, path: '/flashcards' },
    { title: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { title: 'Profile', icon: <ProfileIcon />, path: '/profile' },
  ];

  const drawerContent = (
    <Box sx={{ width: 240 }} onClick={toggleDrawer}>
      <Box sx={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'primary.main' }}>
        <Typography variant="h6" component="div" sx={{ color: 'white' }}>
          AI Notes
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <Link href={item.path} key={item.title} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem sx={{ cursor: 'pointer' }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI-powered Note-Taking
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            top: ['48px', '56px', '64px'],
            height: 'auto',
            bottom: 0,
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Toolbar /> {/* Empty toolbar to offset content below the AppBar */}
    </>
  );
}
