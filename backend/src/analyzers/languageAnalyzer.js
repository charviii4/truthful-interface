/**
 * Language Analyzer
 * 
 * Detects manipulative language patterns in UI text.
 * Uses keyword matching and phrase detection - fully transparent rules.
 * 
 * Pattern Categories:
 * - Fake Urgency: Creates artificial time pressure
 * - Guilt Framing: Uses emotional manipulation to influence decisions
 * - Scarcity Claims: False claims about limited availability
 * - Fear-Based Language: Exaggerates negative consequences
 */

// ============================================
// PATTERN DEFINITIONS
// Each pattern is documented for transparency
// ============================================

/**
 * Urgency patterns - words and phrases that create artificial time pressure
 * These suggest the user must act immediately without evidence of real deadlines
 */
const URGENCY_PATTERNS = [
    { pattern: /\b(hurry|quick|fast|now|immediately|instant)\b/gi, weight: 1 },
    { pattern: /\b(limited time|act now|don't wait|expires? (soon|today|in))\b/gi, weight: 2 },
    { pattern: /\b(last chance|final offer|ending soon|while supplies last)\b/gi, weight: 2 },
    { pattern: /\b(only \d+ (left|remaining|available))\b/gi, weight: 2 },
    { pattern: /\b(offer ends|sale ends|deadline)\b/gi, weight: 1 },
    { pattern: /\b(\d+ (people|users|customers) (are )?(viewing|watching|looking))\b/gi, weight: 2 },
];

/**
 * Guilt/shame patterns - phrases that emotionally manipulate the user
 * These make users feel bad about choosing against the suggested option
 */
const GUILT_PATTERNS = [
    { pattern: /\b(don't miss out|you'll regret|missing out|fomo)\b/gi, weight: 2 },
    { pattern: /\b(everyone else|others (are|have)|people like you)\b/gi, weight: 1 },
    { pattern: /\b(smart (people|users|customers)|successful (people|users))\b/gi, weight: 1 },
    { pattern: /\b(don't be left behind|join thousands|be part of)\b/gi, weight: 1 },
    { pattern: /\b(you (really )?need this|can't live without)\b/gi, weight: 2 },
];

/**
 * Scarcity patterns - claims about limited availability
 * Often used without evidence of actual scarcity
 */
const SCARCITY_PATTERNS = [
    { pattern: /\b(only \d+ left|selling fast|almost gone|running out)\b/gi, weight: 2 },
    { pattern: /\b(exclusive|rare|limited edition|one-time)\b/gi, weight: 1 },
    { pattern: /\b(popular|best-?seller|trending|hot)\b/gi, weight: 0.5 },
    { pattern: /\b(high demand|in demand|selling out)\b/gi, weight: 1 },
];

/**
 * Analyze text for language manipulation patterns
 * @param {string} text - The text content to analyze
 * @returns {Array} Array of detected flags
 */
function analyze(text) {
    if (!text || typeof text !== 'string') {
        return [];
    }

    const flags = [];
    const normalizedText = text.toLowerCase();

    // Check for urgency patterns
    const urgencyScore = calculatePatternScore(text, URGENCY_PATTERNS);
    if (urgencyScore > 0) {
        flags.push({
            type: 'Fake Urgency',
            category: 'languageManipulation',
            severity: getSeverity(urgencyScore),
            explanation: 'Language creates artificial time pressure, potentially rushing decisions without evidence of real deadlines.',
            score: Math.min(urgencyScore * 5, 20) // Cap at 20 points
        });
    }

    // Check for guilt framing
    const guiltScore = calculatePatternScore(text, GUILT_PATTERNS);
    if (guiltScore > 0) {
        flags.push({
            type: 'Guilt Framing',
            category: 'languageManipulation',
            severity: getSeverity(guiltScore),
            explanation: 'Text uses emotional pressure or social comparison to influence decisions rather than presenting neutral information.',
            score: Math.min(guiltScore * 5, 15) // Cap at 15 points
        });
    }

    // Check for scarcity patterns
    const scarcityScore = calculatePatternScore(text, SCARCITY_PATTERNS);
    if (scarcityScore > 1) { // Higher threshold - some scarcity language is legitimate
        flags.push({
            type: 'Scarcity Claims',
            category: 'languageManipulation',
            severity: getSeverity(scarcityScore - 1),
            explanation: 'Claims of limited availability may create false sense of scarcity without verifiable evidence.',
            score: Math.min((scarcityScore - 1) * 4, 10) // Cap at 10 points
        });
    }

    // Check for countdown/timer mentions in text
    if (/\b(\d+:\d+|\d+ (hours?|minutes?|seconds?|days?) (left|remaining))\b/gi.test(text)) {
        flags.push({
            type: 'Timer Language',
            category: 'languageManipulation',
            severity: 'medium',
            explanation: 'Countdown or timer references in text suggest time pressure tactics.',
            score: 8
        });
    }

    return flags;
}

/**
 * Calculate total pattern match score
 * @param {string} text - Text to analyze
 * @param {Array} patterns - Array of pattern objects with regex and weight
 * @returns {number} Total weighted score
 */
function calculatePatternScore(text, patterns) {
    let score = 0;
    for (const { pattern, weight } of patterns) {
        const matches = text.match(pattern);
        if (matches) {
            score += matches.length * weight;
        }
    }
    return score;
}

/**
 * Convert numeric score to severity level
 * @param {number} score - Numeric score
 * @returns {string} Severity level: 'low', 'medium', or 'high'
 */
function getSeverity(score) {
    if (score >= 4) return 'high';
    if (score >= 2) return 'medium';
    return 'low';
}

module.exports = { analyze };
