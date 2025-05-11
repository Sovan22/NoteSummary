'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Grid,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  Tabs,
  Tab,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@mui/material';
import {
  Edit as EditIcon,
  School as StudentIcon,
  Work as JobSeekerIcon,
  Business as EntrepreneurIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Storage as DataIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

export default function ProfilePage() {
  const [tabValue, setTabValue] = useState(0);
  const [userType, setUserType] = useState<'student' | 'job-seeker' | 'entrepreneur'>('student');
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    contentProcessed: true,
    newFeatures: false,
    weeklyDigest: true
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked,
    });
  };

  const handleUserTypeChange = (type: 'student' | 'job-seeker' | 'entrepreneur') => {
    setUserType(type);
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile & Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account and customize your experience.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Profile Overview */}
        <Box sx={{ width: { xs: '100%', md: '33.333%' } }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 4, position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                src="/path/to/avatar.jpg"
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                Alex Johnson
              </Typography>
              <Typography variant="body2" color="text.secondary">
                alex.johnson@example.com
              </Typography>
              
              <Chip 
                label={userType === 'student' ? 'Student' : userType === 'job-seeker' ? 'Job Seeker' : 'Entrepreneur'} 
                color="primary" 
                sx={{ mt: 1 }}
              />
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <List>
              <ListItem component="div" sx={{ cursor: 'pointer', bgcolor: tabValue === 0 ? 'rgba(25, 118, 210, 0.08)' : 'transparent' }} onClick={(e) => handleTabChange(e, 0)}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="General Settings" />
              </ListItem>
              <ListItem component="div" sx={{ cursor: 'pointer', bgcolor: tabValue === 1 ? 'rgba(25, 118, 210, 0.08)' : 'transparent' }} onClick={(e) => handleTabChange(e, 1)}>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem component="div" sx={{ cursor: 'pointer', bgcolor: tabValue === 2 ? 'rgba(25, 118, 210, 0.08)' : 'transparent' }} onClick={(e) => handleTabChange(e, 2)}>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Privacy & Security" />
              </ListItem>
              <ListItem component="div" sx={{ cursor: 'pointer', bgcolor: tabValue === 3 ? 'rgba(25, 118, 210, 0.08)' : 'transparent' }} onClick={(e) => handleTabChange(e, 3)}>
                <ListItemIcon>
                  <DataIcon />
                </ListItemIcon>
                <ListItemText primary="Data & Storage" />
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem sx={{ cursor: 'pointer' }}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItem>
            </List>
          </Paper>
        </Box>

        {/* Settings Content */}
        <Box sx={{ width: { xs: '100%', md: '66.667%' } }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 4 }}>
            <Box>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
                <Tab label="General" {...a11yProps(0)} />
                <Tab label="Notifications" {...a11yProps(1)} />
                <Tab label="Privacy" {...a11yProps(2)} />
                <Tab label="Data" {...a11yProps(3)} />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" gutterBottom>
                General Settings
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Profile Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid component="div" sx={{ width: { xs: '100%', sm: '50%' }, p: 1 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      defaultValue="Alex Johnson"
                      margin="normal"
                    />
                  </Grid>
                  <Grid component="div" sx={{ width: { xs: '100%', sm: '50%' }, p: 1 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      defaultValue="alex.johnson@example.com"
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                User Type
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Select your user type to customize AI outputs for your specific needs.
              </Typography>
              
              <Grid container spacing={2}>
                <Grid component="div" sx={{ width: { xs: '100%', sm: '33.333%' }, p: 1 }}>
                  <Paper
                    elevation={userType === 'student' ? 3 : 1}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      cursor: 'pointer',
                      bgcolor: userType === 'student' ? 'primary.light' : 'background.paper',
                      color: userType === 'student' ? 'primary.contrastText' : 'text.primary',
                      '&:hover': {
                        bgcolor: userType === 'student' ? 'primary.light' : 'action.hover',
                      },
                    }}
                    onClick={() => handleUserTypeChange('student')}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <StudentIcon sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="subtitle1">Student</Typography>
                      <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                        Flashcards, academic concepts, revision tools
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid component="div" sx={{ width: { xs: '100%', sm: '33.333%' }, p: 1 }}>
                  <Paper
                    elevation={userType === 'job-seeker' ? 3 : 1}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      cursor: 'pointer',
                      bgcolor: userType === 'job-seeker' ? 'primary.light' : 'background.paper',
                      color: userType === 'job-seeker' ? 'primary.contrastText' : 'text.primary',
                      '&:hover': {
                        bgcolor: userType === 'job-seeker' ? 'primary.light' : 'action.hover',
                      },
                    }}
                    onClick={() => handleUserTypeChange('job-seeker')}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <JobSeekerIcon sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="subtitle1">Job Seeker</Typography>
                      <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                        Resume keywords, interview prep, skills focus
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid component="div" sx={{ width: { xs: '100%', sm: '33.333%' }, p: 1 }}>
                  <Paper
                    elevation={userType === 'entrepreneur' ? 3 : 1}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      cursor: 'pointer',
                      bgcolor: userType === 'entrepreneur' ? 'primary.light' : 'background.paper',
                      color: userType === 'entrepreneur' ? 'primary.contrastText' : 'text.primary',
                      '&:hover': {
                        bgcolor: userType === 'entrepreneur' ? 'primary.light' : 'action.hover',
                      },
                    }}
                    onClick={() => handleUserTypeChange('entrepreneur')}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <EntrepreneurIcon sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="subtitle1">Entrepreneur</Typography>
                      <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                        Business insights, actionable points, pitch practice
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Notification Settings
              </Typography>
              
              <FormControl component="fieldset" variant="standard">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={notifications.emailAlerts} 
                        onChange={handleNotificationChange} 
                        name="emailAlerts" 
                      />
                    }
                    label="Email Alerts"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ pl: 4, mt: -1, mb: 2 }}>
                    Receive important notifications via email
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={notifications.contentProcessed} 
                        onChange={handleNotificationChange} 
                        name="contentProcessed" 
                      />
                    }
                    label="Content Processing Alerts"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ pl: 4, mt: -1, mb: 2 }}>
                    Get notified when your content has been processed
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={notifications.newFeatures} 
                        onChange={handleNotificationChange} 
                        name="newFeatures" 
                      />
                    }
                    label="New Features"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ pl: 4, mt: -1, mb: 2 }}>
                    Stay updated about new app features
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={notifications.weeklyDigest} 
                        onChange={handleNotificationChange} 
                        name="weeklyDigest" 
                      />
                    }
                    label="Weekly Digest"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ pl: 4, mt: -1, mb: 2 }}>
                    Receive a weekly summary of your learning progress
                  </Typography>
                </FormGroup>
              </FormControl>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>
                Privacy & Security Settings
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Account Security
                </Typography>
                
                <Button variant="outlined" sx={{ mb: 2 }}>
                  Change Password
                </Button>
                
                <FormGroup>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Two-Factor Authentication"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ pl: 4, mt: -1, mb: 2 }}>
                    Add an extra layer of security to your account
                  </Typography>
                </FormGroup>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Privacy Settings
                </Typography>
                
                <FormGroup>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Store Content for Personalization"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ pl: 4, mt: -1, mb: 2 }}>
                    Allow us to store your content to improve personalization
                  </Typography>
                  
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Allow AI to Learn from Your Usage"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ pl: 4, mt: -1, mb: 2 }}>
                    Help improve our AI by allowing it to learn from your interactions
                  </Typography>
                </FormGroup>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Typography variant="h6" gutterBottom>
                Data & Storage
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Storage Usage
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgressWithLabel value={45} />
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  You've used 450MB of your 1GB storage limit
                </Typography>
                
                <Button variant="outlined" sx={{ mt: 2 }}>
                  Upgrade Storage
                </Button>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Data Management
                </Typography>
                
                <Button variant="outlined" color="error" sx={{ mr: 2 }}>
                  Delete All Notes
                </Button>
                
                <Button variant="outlined" color="error">
                  Clear Upload History
                </Button>
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Warning: These actions cannot be undone.
                </Typography>
              </Box>
            </TabPanel>
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
}

// Helper component for storage usage display
function LinearProgressWithLabel(props: { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <div style={{ 
          height: 10, 
          width: '100%', 
          backgroundColor: '#e0e0e0', 
          borderRadius: 5,
          position: 'relative'
        }}>
          <div style={{ 
            height: '100%', 
            width: `${props.value}%`, 
            backgroundColor: '#6750A4',
            borderRadius: 5
          }} />
        </div>
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
