# System Truth - Backend

Dark Pattern Detection Engine for analyzing manipulative UI patterns.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Or production
npm start
```

Server runs on `http://localhost:3001` by default.

## API Endpoints

### GET /health
Health check endpoint.

**Response:**
```json
{ "status": "ok" }
```

### POST /analyze
Analyze UI content for dark patterns.

**Request:**
```json
{
  "sessionId": "optional-session-id",
  "pageText": "Hurry! Only 3 left! Don't miss out on this limited time offer!",
  "uiMetadata": {
    "primaryButtonText": "Yes, I want this!",
    "secondaryButtonText": "No, I don't want to save money",
    "hasCountdownTimer": true,
    "preCheckedBoxes": true,
    "contrastRatio": 2.1
  }
}
```

**Response:**
```json
{
  "trustScore": 42,
  "flags": [
    {
      "type": "Fake Urgency",
      "category": "languageManipulation",
      "severity": "high",
      "explanation": "Language creates artificial time pressure..."
    }
  ],
  "scoreBreakdown": {
    "languageManipulation": -20,
    "visualCoercion": -15,
    "choiceAsymmetry": -10,
    "consentManipulation": -13
  }
}
```

## Detection Categories

| Category | Max Deduction | What It Detects |
|----------|---------------|-----------------|
| Language Manipulation | -30 | Urgency, guilt framing, scarcity claims |
| Visual Coercion | -25 | Countdown timers, low contrast, animations |
| Choice Asymmetry | -20 | Biased button framing, unequal text length |
| Consent Manipulation | -25 | Pre-checked boxes, hidden opt-outs |

## Design Philosophy

- **Transparent:** All rules are documented and deterministic
- **Explainable:** Every flag includes a plain-English explanation
- **Educational:** Informs about patterns, does NOT block content
- **Privacy-First:** No user tracking, stateless by design

## Deployment

Ready for deployment on:
- Render
- Railway
- Vercel Functions (serverless)
- Any Node.js hosting

Set `PORT` environment variable to customize the port.

## License

MIT
