'use client';

import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import AnimatedDrawer from './AnimatedDrawer';
import ThemeProvider from '../../theme/ThemeProvider';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider>
      <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
        <AnimatedDrawer />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 1, sm: 1.5 },
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            overflow: 'auto',
            width: { xs: '100%', sm: 'calc(100% - 72px)' }, // Adjust for collapsed drawer
            ml: { xs: 0, sm: '72px' } // Offset for collapsed drawer
          }}
        >
          <Container maxWidth="xl" sx={{ mt: 0.5, mb: 1.5, height: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
