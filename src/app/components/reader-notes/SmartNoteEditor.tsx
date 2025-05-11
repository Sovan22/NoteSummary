'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Save as SaveIcon,
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatListBulleted as ListIcon,
  FormatListNumbered as NumberedListIcon,
  Title as HeadingIcon,
  Code as CodeIcon,
  Add as AddIcon,
  AutoAwesome as AIIcon,
  MoreVert as MoreIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  Share as ShareIcon,
  Label as TagIcon
} from '@mui/icons-material';

interface SmartNoteEditorProps {
  contentTitle?: string;
  initialContent?: string;
}

export default function SmartNoteEditor({ 
  contentTitle = 'Untitled Note',
  initialContent = '# My Notes\n\nStart taking notes here...'
}: SmartNoteEditorProps) {
  const [noteContent, setNoteContent] = useState(initialContent);
  const [noteTags, setNoteTags] = useState<string[]>(['machine-learning']);
  const [noteTitle, setNoteTitle] = useState(contentTitle);
  const [isSaved, setIsSaved] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([
    'Add a summary of key machine learning algorithms',
    'Include a section on neural networks architecture',
    'Add notes about supervised vs. unsupervised learning'
  ]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [tagInputValue, setTagInputValue] = useState('');
  const [tagMenuAnchorEl, setTagMenuAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    // Set up autosave
    const interval = setInterval(() => {
      if (!isSaved) {
        handleSave();
      }
    }, 30000); // Autosave every 30 seconds
    
    return () => clearInterval(interval);
  }, [isSaved, noteContent, noteTitle]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
    setIsSaved(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    // In a real application, you would save to your backend here
    console.log('Saving note:', { title: noteTitle, content: noteContent, tags: noteTags });
    
    setIsSaved(true);
    showSnackbar('Note saved successfully');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTagMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setTagMenuAnchorEl(event.currentTarget);
  };

  const handleTagMenuClose = () => {
    setTagMenuAnchorEl(null);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(e.target.value);
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInputValue.trim()) {
      addTag(tagInputValue.trim());
      setTagInputValue('');
    }
  };

  const addTag = (tag: string) => {
    if (!noteTags.includes(tag)) {
      setNoteTags([...noteTags, tag]);
      setIsSaved(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNoteTags(noteTags.filter(tag => tag !== tagToRemove));
    setIsSaved(false);
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const insertFormatting = (format: string) => {
    let formattedText = '';
    const textarea = document.getElementById('note-content') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = noteContent.substring(start, end);
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText || 'italic text'}*`;
        break;
      case 'heading':
        formattedText = `\n## ${selectedText || 'Heading'}\n`;
        break;
      case 'bullet-list':
        formattedText = `\n- ${selectedText || 'List item'}\n`;
        break;
      case 'numbered-list':
        formattedText = `\n1. ${selectedText || 'List item'}\n`;
        break;
      case 'code':
        formattedText = `\`${selectedText || 'code'}\``;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newContent = noteContent.substring(0, start) + formattedText + noteContent.substring(end);
    setNoteContent(newContent);
    setIsSaved(false);
    
    // This allows us to refocus and set cursor position after the inserted formatting
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  const insertAISuggestion = (suggestion: string) => {
    // In a real app, this would generate actual content based on the suggestion
    let aiContent = '';
    switch (suggestion) {
      case 'Add a summary of key machine learning algorithms':
        aiContent = "\n\n## Key Machine Learning Algorithms\n\n- **Linear Regression**: Used for predicting continuous values\n- **Logistic Regression**: Used for binary classification\n- **Decision Trees**: Tree-like model of decisions\n- **Random Forests**: Ensemble of decision trees\n- **Support Vector Machines (SVM)**: Used for classification and regression\n- **K-Means**: Clustering algorithm for unsupervised learning\n- **Neural Networks**: Deep learning models inspired by human brain\n";
        break;
      case 'Include a section on neural networks architecture':
        aiContent = "\n\n## Neural Network Architecture\n\n1. **Input Layer**: Receives the input data\n2. **Hidden Layers**: Process the input data through weighted connections\n3. **Output Layer**: Produces the final result\n4. **Activation Functions**: Add non-linearity (ReLU, Sigmoid, Tanh)\n5. **Weights & Biases**: Parameters optimized during training\n6. **Backpropagation**: Algorithm for updating weights based on error\n";
        break;
      case 'Add notes about supervised vs. unsupervised learning':
        aiContent = "\n\n## Supervised vs. Unsupervised Learning\n\n### Supervised Learning\n- Uses labeled training data\n- Has defined input and output pairs\n- Examples: Classification, Regression\n- Algorithms: Linear/Logistic Regression, SVM, Neural Networks\n\n### Unsupervised Learning\n- Uses unlabeled data\n- Finds patterns without guidance\n- Examples: Clustering, Dimensionality Reduction\n- Algorithms: K-means, Hierarchical Clustering, PCA, Autoencoders\n";
        break;
      default:
        aiContent = `\n\n## AI Generated Content\n\nThis is a placeholder for content related to: "${suggestion}"\n`;
    }
    
    setNoteContent(noteContent + aiContent);
    setIsSaved(false);
    
    // Remove the used suggestion and generate a new one
    const newSuggestions = aiSuggestions.filter(s => s !== suggestion);
    newSuggestions.push('Add examples of real-world machine learning applications');
    setAiSuggestions(newSuggestions);
    
    showSnackbar('AI suggestion added to your notes');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField
          value={noteTitle}
          onChange={handleTitleChange}
          variant="standard"
          placeholder="Note Title"
          fullWidth
          sx={{ 
            mr: 2,
            '& .MuiInputBase-input': {
              fontSize: '1.5rem',
              fontWeight: 500
            },
            '& .MuiInput-underline:before': {
              borderBottomColor: 'transparent'
            }
          }}
        />
        
        <Box>
          <Tooltip title={isSaved ? 'Saved' : 'Save'}>
            <IconButton 
              onClick={handleSave}
              color={isSaved ? 'success' : 'primary'}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="More options">
            <IconButton onClick={handleMenuOpen}>
              <MoreIcon />
            </IconButton>
          </Tooltip>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <CopyIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy to clipboard</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <ShareIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Share</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete note</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      
      {/* Tags */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <TagIcon color="action" fontSize="small" sx={{ mr: 1 }} />
        
        {noteTags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            onDelete={() => removeTag(tag)}
          />
        ))}
        
        <IconButton
          size="small"
          onClick={handleTagMenuOpen}
        >
          <AddIcon fontSize="small" />
        </IconButton>
        
        <Menu
          anchorEl={tagMenuAnchorEl}
          open={Boolean(tagMenuAnchorEl)}
          onClose={handleTagMenuClose}
        >
          <Box sx={{ p: 1, width: 200 }}>
            <TextField
              size="small"
              placeholder="Add tag"
              value={tagInputValue}
              onChange={handleTagInputChange}
              onKeyPress={handleTagInputKeyPress}
              fullWidth
              autoFocus
            />
          </Box>
          <Divider />
          <MenuItem onClick={() => { addTag('important'); handleTagMenuClose(); }}>
            <ListItemText>important</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { addTag('review'); handleTagMenuClose(); }}>
            <ListItemText>review</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { addTag('concepts'); handleTagMenuClose(); }}>
            <ListItemText>concepts</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
      
      {/* Formatting Toolbar */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, bgcolor: 'background.default', p: 1, borderRadius: 1 }}>
        <Tooltip title="Bold">
          <IconButton size="small" onClick={() => insertFormatting('bold')}>
            <BoldIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Italic">
          <IconButton size="small" onClick={() => insertFormatting('italic')}>
            <ItalicIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Heading">
          <IconButton size="small" onClick={() => insertFormatting('heading')}>
            <HeadingIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bullet List">
          <IconButton size="small" onClick={() => insertFormatting('bullet-list')}>
            <ListIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Numbered List">
          <IconButton size="small" onClick={() => insertFormatting('numbered-list')}>
            <NumberedListIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Code">
          <IconButton size="small" onClick={() => insertFormatting('code')}>
            <CodeIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Note Editor */}
      <TextField
        id="note-content"
        multiline
        fullWidth
        minRows={15}
        maxRows={30}
        value={noteContent}
        onChange={handleNoteChange}
        variant="outlined"
        sx={{
          '& .MuiInputBase-root': {
            fontFamily: 'monospace',
            fontSize: '1rem',
          }
        }}
      />
      
      {/* AI Suggestions */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <AIIcon sx={{ mr: 1 }} color="primary" />
          AI Suggestions
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {aiSuggestions.map((suggestion, index) => (
            <Chip
              key={index}
              label={suggestion}
              onClick={() => insertAISuggestion(suggestion)}
              icon={<AIIcon fontSize="small" />}
              clickable
            />
          ))}
        </Box>
      </Box>
      
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
