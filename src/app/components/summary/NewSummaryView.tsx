'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Alert, Snackbar, CircularProgress } from '@mui/material';
import ResponsiveSummaryLayout from './ResponsiveSummaryLayout';
import SummaryContentCard from './SummaryContentCard';
import OriginalContentCard from './OriginalContentCard';
import KeyPointsPanel from './KeyPointsPanel';
import { generateCitations, SourceReferenceMap } from './utils/contentRelationship';
import { useTheme } from '@mui/material/styles';

// Types
interface KeyPoint {
  id: string;
  text: string;
  category: 'concept' | 'fact' | 'definition' | 'person' | 'date' | 'formula';
  confidence: number;
}

interface SummaryData {
  title: string;
  shortSummary: string;
  mediumSummary: string;
  detailedSummary: string;
  keyPoints: KeyPoint[];
  sourceDocumentName: string;
}

interface NewSummaryViewProps {
  summaryData?: SummaryData;
  isLoading?: boolean;
  onSave?: () => void;
  onRegenerateRequest?: () => void;
  contentChanged?: boolean;
}

export default function NewSummaryView({
  summaryData = mockSummaryData,
  isLoading = false,
  onSave,
  onRegenerateRequest,
  contentChanged = false
}: NewSummaryViewProps) {
  const theme = useTheme();
  const [sourceReferences, setSourceReferences] = useState<SourceReferenceMap>({});
  const [selectedKeyPoint, setSelectedKeyPoint] = useState<string | null>(null);
  const [selectedReferenceRange, setSelectedReferenceRange] = useState<{start: number, end: number} | null>(null);
  const [regenerateSuccess, setRegenerateSuccess] = useState(false);
  
  // Generate source references when summary data changes
  useEffect(() => {
    if (!isLoading && summaryData) {
      // Combine all content for reference generation
      const originalContent = [
        summaryData.shortSummary,
        summaryData.mediumSummary,
        summaryData.detailedSummary
      ].join('\n\n');
      
      // Generate citations
      const references = generateCitations(originalContent, summaryData.keyPoints);
      setSourceReferences(references);
    }
  }, [isLoading, summaryData]);
  
  // Clear selected reference when summary data changes
  useEffect(() => {
    setSelectedKeyPoint(null);
    setSelectedReferenceRange(null);
  }, [summaryData]);
  
  // Handle key point hover
  const handleKeyPointHover = (keyPointId: string) => {
    setSelectedKeyPoint(keyPointId);
    
    // Find first reference for this key point
    const references = sourceReferences[keyPointId];
    if (references && references.length > 0) {
      setSelectedReferenceRange({
        start: references[0].startPosition,
        end: references[0].endPosition
      });
    }
  };
  
  // Handle key point mouse leave
  const handleKeyPointLeave = () => {
    // Delay clearing to allow for a better UX
    setTimeout(() => {
      setSelectedKeyPoint(null);
      setSelectedReferenceRange(null);
    }, 300);
  };
  
  // Handle regenerate request
  const handleRegenerateRequest = () => {
    if (onRegenerateRequest) {
      onRegenerateRequest();
      setRegenerateSuccess(true);
    }
  };
  
  // If loading, show a loading indicator
  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        height: '50vh',
        width: '100%'
      }}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Generating Summary...
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          We're analyzing your document and creating an intelligent summary
        </Typography>
      </Box>
    );
  }
  
  return (
    <>
      <ResponsiveSummaryLayout
        originalContent={
          <OriginalContentCard
            content={summaryData.detailedSummary}
            title={summaryData.title}
            sourceDocumentName={summaryData.sourceDocumentName}
            selectedReferenceRange={selectedReferenceRange || undefined}
            onRegenerateRequest={handleRegenerateRequest}
            contentChanged={contentChanged}
          />
        }
        summaryContent={
          <SummaryContentCard
            title={summaryData.title}
            shortSummary={summaryData.shortSummary}
            mediumSummary={summaryData.mediumSummary}
            detailedSummary={summaryData.detailedSummary}
            sourceDocumentName={summaryData.sourceDocumentName}
            onSave={onSave}
          />
        }
        keyPointsContent={
          <KeyPointsPanel
            keyPoints={summaryData.keyPoints}
            sourceReferences={sourceReferences}
            onKeyPointHover={handleKeyPointHover}
            onKeyPointLeave={handleKeyPointLeave}
          />
        }
      />
      
      {/* Regeneration success notification */}
      <Snackbar
        open={regenerateSuccess}
        autoHideDuration={6000}
        onClose={() => setRegenerateSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setRegenerateSuccess(false)} 
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Summary regeneration requested successfully
        </Alert>
      </Snackbar>
    </>
  );
}

// Mock data for testing
const mockSummaryData: SummaryData = {
  title: "Machine Learning Fundamentals",
  shortSummary: "This document introduces core machine learning concepts, including supervised and unsupervised learning approaches, model evaluation techniques, and common algorithms like regression, classification, and clustering.",
  mediumSummary: `Machine learning is a field of artificial intelligence focused on building systems that learn from data. The document covers the major categories of machine learning: supervised learning (with labeled training data), unsupervised learning (without labeled data), and reinforcement learning (learning through interaction with an environment).

Key algorithms discussed include linear and logistic regression, decision trees, support vector machines, k-means clustering, and neural networks. The document emphasizes the importance of proper data preparation, feature selection, and model evaluation using metrics such as accuracy, precision, recall, and F1 score.

The text also addresses common challenges in machine learning, including overfitting, underfitting, and the bias-variance tradeoff.`,
  detailedSummary: `Machine learning is a subfield of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. The document comprehensively explores the theoretical foundations and practical applications of machine learning across various domains.

The text begins by distinguishing between the three primary machine learning paradigms:
1. Supervised Learning: Algorithms learn from labeled training data to predict outcomes for unseen data. Examples include regression (predicting continuous values) and classification (assigning categories).
2. Unsupervised Learning: Algorithms find patterns in unlabeled data. Key techniques include clustering, dimensionality reduction, and association rule learning.
3. Reinforcement Learning: Agents learn optimal behaviors through trial-and-error interactions with an environment, maximizing cumulative rewards.

The document thoroughly examines the machine learning pipeline, starting with data collection and preprocessing. It emphasizes the critical importance of data cleaning, normalization, and handling missing values. Feature engineering and selection are presented as essential steps that significantly impact model performance.

For model training and evaluation, the text discusses:
- Train-test splits and cross-validation techniques
- Hyperparameter tuning approaches like grid search and random search
- Evaluation metrics including accuracy, precision, recall, F1 score for classification; and MAE, MSE, RMSE for regression
- Learning curves to diagnose bias and variance problems

Specific algorithms covered in detail include:
- Linear and polynomial regression
- Logistic regression and softmax for multi-class problems
- Decision trees and ensemble methods (Random Forests, Gradient Boosting)
- Support Vector Machines with various kernel functions
- K-means and hierarchical clustering
- Principal Component Analysis (PCA) for dimensionality reduction
- Neural networks, including feed-forward, convolutional, and recurrent architectures

The document addresses advanced topics such as:
- Regularization techniques (L1/L2) to prevent overfitting
- The bias-variance tradeoff and strategies for optimization
- Feature importance and model interpretability
- Handling imbalanced datasets
- Online learning for streaming data

Ethical considerations in machine learning applications are also discussed, including issues of bias, fairness, transparency, and privacy. The text concludes with emerging trends and future directions in the field.`,
  keyPoints: [
    {
      id: "kp1",
      text: "Supervised learning uses labeled data to train models that can predict outcomes for new data.",
      category: "concept",
      confidence: 0.98
    },
    {
      id: "kp2",
      text: "Unsupervised learning finds patterns in unlabeled data through clustering and dimensionality reduction.",
      category: "concept",
      confidence: 0.95
    },
    {
      id: "kp3",
      text: "The bias-variance tradeoff is a central challenge in machine learning model development.",
      category: "concept",
      confidence: 0.92
    },
    {
      id: "kp4",
      text: "Arthur Samuel coined the term 'machine learning' in 1959 while at IBM.",
      category: "person",
      confidence: 0.88
    },
    {
      id: "kp5",
      text: "Cross-validation is a technique to assess how a model generalizes to independent datasets.",
      category: "definition",
      confidence: 0.94
    },
    {
      id: "kp6",
      text: "F1 Score = 2 * (Precision * Recall) / (Precision + Recall)",
      category: "formula",
      confidence: 0.99
    },
    {
      id: "kp7",
      text: "Deep learning models began dominating computer vision tasks after AlexNet won the ImageNet competition in 2012.",
      category: "date",
      confidence: 0.96
    },
    {
      id: "kp8",
      text: "Feature selection is the process of selecting a subset of relevant features for model training.",
      category: "definition",
      confidence: 0.93
    }
  ],
  sourceDocumentName: "Machine Learning - Comprehensive Guide.pdf"
};
