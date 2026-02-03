/**
 * System Truth - Dark Pattern Detection Engine
 * 
 * A transparent, explainable backend for detecting manipulative UI patterns.
 * This is an information layer, NOT enforcement - it analyzes interfaces, not people.
 * 
 * Design Principles:
 * - Deterministic scoring
 * - Explainable results
 * - No user tracking
 * - No black-box AI
 */

const express = require('express');
const cors = require('cors');
const { analyzeContent } = require('./analyzers');
const { calculateTrustScore } = require('./scoring');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Health Check Endpoint
 * GET /health
 * 
 * Simple health check for deployment verification
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

/**
 * Analysis Endpoint
 * POST /analyze
 * 
 * Analyzes UI content for dark patterns and manipulative design.
 * Returns detected patterns, explanations, and a transparent trust score.
 * 
 * Request Body:
 * - sessionId: Optional session identifier
 * - pageText: Text content from the UI
 * - uiMetadata: Object containing UI interaction metadata
 * 
 * Response:
 * - trustScore: 0-100 score (100 = most trustworthy)
 * - flags: Array of detected patterns with severity and explanation
 * - scoreBreakdown: Detailed point deductions by category
 */
app.post('/analyze', (req, res) => {
  try {
    const { sessionId, pageText, uiMetadata } = req.body;

    // Validate request
    if (!pageText && !uiMetadata) {
      return res.status(400).json({
        error: 'At least one of pageText or uiMetadata is required'
      });
    }

    // Run analysis
    const analysisResult = analyzeContent(pageText || '', uiMetadata || {});
    
    // Calculate trust score
    const { trustScore, scoreBreakdown } = calculateTrustScore(analysisResult.flags);

    res.json({
      trustScore,
      flags: analysisResult.flags,
      scoreBreakdown
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🛡️  System Truth Backend running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
  console.log(`   Analysis endpoint: POST http://localhost:${PORT}/analyze\n`);
});

module.exports = app;
