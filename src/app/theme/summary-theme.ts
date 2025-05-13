// Summary component theme extension
export const summaryTheme = {
  light: {
    background: {
      primary: '#ffffff',
      secondary: '#f7f9fc',
      card: '#ffffff',
      highlight: 'rgba(224, 242, 254, 0.5)',
      activeCard: 'rgba(224, 242, 254, 0.2)'
    },
    border: {
      card: 'rgba(226, 232, 240, 0.8)',
      divider: 'rgba(226, 232, 240, 1)'
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      accent: '#3b82f6'
    },
    confidence: {
      high: '#4ade80',
      medium: '#facc15',
      low: '#f87171'
    }
  },
  dark: {
    background: {
      primary: '#0f172a',
      secondary: '#1e293b', 
      card: '#1e293b',
      highlight: 'rgba(30, 58, 138, 0.3)',
      activeCard: 'rgba(30, 58, 138, 0.2)'
    },
    border: {
      card: 'rgba(51, 65, 85, 0.8)',
      divider: 'rgba(51, 65, 85, 1)'
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
      accent: '#60a5fa'
    },
    confidence: {
      high: '#4ade80',
      medium: '#facc15',
      low: '#f87171'
    }
  },
  transitions: {
    smooth: 'all 0.3s ease'
  },
  cards: {
    spacing: {
      sm: '12px',
      md: '16px',
      lg: '24px'
    },
    borderRadius: '12px',
    shadow: {
      default: '0 4px 12px rgba(0, 0, 0, 0.05)',
      hover: '0 8px 24px rgba(0, 0, 0, 0.08)'
    }
  },
  typography: {
    heading: {
      fontWeight: 700
    },
    body: {
      lineHeight: 1.8
    }
  },
  // Category colors that work well in both light and dark modes
  categories: {
    concept: {
      light: '#3b82f6',
      dark: '#60a5fa'
    },
    fact: {
      light: '#14b8a6', 
      dark: '#2dd4bf'
    },
    definition: {
      light: '#8b5cf6',
      dark: '#a78bfa'
    },
    person: {
      light: '#22c55e',
      dark: '#4ade80'
    },
    date: {
      light: '#eab308',
      dark: '#facc15'
    },
    formula: {
      light: '#ef4444',
      dark: '#f87171'
    }
  }
};
