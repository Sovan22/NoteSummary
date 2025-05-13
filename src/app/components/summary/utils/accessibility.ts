// Accessibility utilities for the summary component

// Get ARIA attributes for summary items
export const getSummaryAriaAttributes = (
  id: string,
  isExpanded: boolean,
  hasSourceReference: boolean,
  confidence: number
) => {
  const confidenceLevel = 
    confidence >= 0.9 ? 'high' :
    confidence >= 0.7 ? 'medium' : 'low';
  
  return {
    role: 'region',
    'aria-labelledby': `summary-heading-${id}`,
    'aria-expanded': isExpanded,
    'aria-describedby': `summary-content-${id}`,
    ...(hasSourceReference && {'aria-details': `source-reference-${id}`}),
    'data-confidence': confidenceLevel,
    // This helps screen readers announce confidence level
    'aria-description': `Confidence level: ${confidenceLevel}. ${confidence * 100}%`
  };
};

// Get ARIA attributes for key points
export const getKeyPointAriaAttributes = (
  id: string,
  category: string,
  confidence: number,
  hasSourceReference: boolean
) => {
  return {
    role: 'listitem',
    id: `key-point-${id}`,
    'aria-label': `${category} with ${confidence * 100}% confidence`,
    ...(hasSourceReference && {'aria-details': `key-point-source-${id}`})
  };
};

// Get ARIA attributes for content relationships
export const getRelationshipAriaAttributes = (
  sourceId: string,
  targetId: string,
  relationshipType: 'summarizes' | 'references' | 'elaborates'
) => {
  return {
    'aria-owns': targetId,
    'data-relationship': relationshipType,
    'aria-description': `This ${relationshipType} the content in ${targetId}`
  };
};

// Create aria-live announcements for dynamic content
export const createAccessibilityAnnouncement = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) => {
  return {
    'aria-live': priority,
    role: 'status',
    'aria-atomic': true
  };
};

// Return keyboard navigation helpers
export const getKeyboardNavHelpers = (
  itemCount: number,
  currentIndex: number,
  setCurrentIndex: (index: number) => void
) => {
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setCurrentIndex(Math.min(currentIndex + 1, itemCount - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setCurrentIndex(Math.max(currentIndex - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        setCurrentIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setCurrentIndex(itemCount - 1);
        break;
    }
  };

  return {
    tabIndex: 0,
    onKeyDown: handleKeyNavigation,
    role: 'listbox',
    'aria-activedescendant': `item-${currentIndex}`
  };
};
