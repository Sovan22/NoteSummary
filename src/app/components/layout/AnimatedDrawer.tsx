'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Typography, 
  Avatar, 
  Divider, 
  Tooltip,
  useMediaQuery,
  useTheme as useMuiTheme
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SchoolIcon from '@mui/icons-material/School';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../../theme/ThemeProvider';

// Drawer width
const drawerWidth = 240;

// Navigation items
const navItems = [
  { title: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { title: 'Upload', icon: <FileUploadIcon />, path: '/upload' },
  { title: 'Flashcards', icon: <SchoolIcon />, path: '/flashcards' },
  { title: 'Chat', icon: <ChatIcon />, path: '/chat' },
  { title: 'Profile', icon: <PersonIcon />, path: '/profile' },
];

export default function AnimatedDrawer() {
  const pathname = usePathname();
  const muiTheme = useMuiTheme();
  const { mode, toggleTheme } = useTheme();
  const [open, setOpen] = useState(true);
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up('md'));
  
  // Toggle drawer open/closed
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant={isDesktop ? "permanent" : "temporary"}
      open={isDesktop ? open : false}
      onClose={isDesktop ? undefined : () => setOpen(false)}
      sx={{
        width: open ? drawerWidth : 72,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 72,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          transition: theme => theme.transitions.create(['width'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.complex,
          }),
          background: theme => theme.palette.background.default,
          borderRight: theme => `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          padding: 2,
          minHeight: 64,
        }}
      >
        {open && (
          <Typography
            variant="h6"
            sx={{
              backgroundImage: 'linear-gradient(90deg, #006C51, #6750A4)',
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              flexGrow: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              transition: theme => theme.transitions.create(['opacity', 'transform'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.complex,
              }),
            }}
          >
            AI Note Taker
          </Typography>
        )}
        <IconButton
          onClick={handleDrawerToggle}
          size="small"
          sx={{
            borderRadius: '50%',
            backgroundColor: theme => theme.palette.background.paper,
            boxShadow: theme => theme.shadows[2],
            transition: theme => theme.transitions.create(['transform'], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.complex,
            }),
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          sx={{
            width: open ? 80 : 40,
            height: open ? 80 : 40,
            transition: theme => theme.transitions.create(['width', 'height'], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.complex,
            }),
            boxShadow: theme => theme.shadows[4],
            mb: 1,
          }}
          alt="User Avatar"
          src="/path/to/avatar.jpg"
        />
        {open && (
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: 'center',
              fontWeight: 500,
              mt: 1,
              opacity: open ? 1 : 0,
              transition: theme => theme.transitions.create(['opacity'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.complex,
              }),
            }}
          >
            John Doe
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <List sx={{ px: 1 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          
          return (
            <ListItem disablePadding sx={{ mb: 0.5 }} key={item.title}>
              <ListItemButton
                component={Link}
                href={item.path}
                style={{ textDecoration: 'none', color: 'inherit' }}
                sx={{
                  borderRadius: 2,
                  py: 1.2,
                  minHeight: 48,
                  bgcolor: isActive ? 'primary.main' : 'transparent',
                  color: isActive ? 'primary.contrastText' : 'text.primary',
                  transition: theme => theme.transitions.create(['background-color', 'transform', 'padding-left'], {
                    easing: theme.transitions.easing.easeInOut,
                    duration: isActive ? theme.transitions.duration.complex : theme.transitions.duration.shorter,
                  }),
                  '&:hover': {
                    bgcolor: isActive ? 'primary.dark' : 'action.hover',
                    transform: 'translateX(4px)',
                  },
                  pl: open ? 2 : 1.5,
                  justifyContent: open ? 'flex-start' : 'center',
                }}
              >
                <Tooltip title={open ? '' : item.title} placement="right" arrow>
                  <ListItemIcon
                    sx={{
                      color: isActive ? 'primary.contrastText' : 'inherit',
                      minWidth: open ? 40 : 'auto',
                      mr: open ? 1 : 'auto',
                      justifyContent: 'center',
                      '& svg': {
                        transition: theme => theme.transitions.create(['transform'], {
                          easing: theme.transitions.easing.easeInOut,
                          duration: theme.transitions.duration.complex,
                        }),
                        transform: isActive ? 'scale(1.2)' : 'scale(1)',
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                {open && (
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      noWrap: true,
                      fontWeight: isActive ? 600 : 400,
                    }}
                    sx={{
                      opacity: open ? 1 : 0,
                      transition: theme => theme.transitions.create(['opacity'], {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.complex,
                      }),
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ p: 2, display: 'flex', justifyContent: open ? 'space-between' : 'center' }}>
        <Tooltip title={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
          <IconButton
            onClick={toggleTheme}
            sx={{
              borderRadius: 2,
              backgroundColor: mode === 'light' ? '#2C7DA0' : '#A9DDE5',
              color: mode === 'light' ? '#FFFFFF' : '#012A4A',
              p: 1.2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                backgroundColor: mode === 'light' ? '#61A5C2' : '#89C2D9',
              },
            }}
          >
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
        {open && (
          <Typography variant="body2" sx={{ alignSelf: 'center', fontWeight: 500, color: 'text.secondary' }}>
            {mode === 'light' ? 'Light Mode' : 'Dark Mode'}
          </Typography>
        )}
        
        {open && (
          <Tooltip title="Settings">
            <IconButton
              sx={{
                borderRadius: '50%',
                backgroundColor: theme => theme.palette.background.paper,
                boxShadow: theme => theme.shadows[2],
                transition: theme => theme.transitions.create(['transform'], {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.complex,
                }),
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
              size="medium"
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Drawer>
  );
}
