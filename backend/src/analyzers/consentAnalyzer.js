/**
 * Consent Analyzer
 * 
 * Detects patterns that manipulate user consent and preferences.
 * Focuses on opt-in/opt-out patterns and pre-selected options.
 * 
 * Pattern Categories:
 * - Pre-checked Boxes: Default selections that favor the service
 * - Hidden Opt-out: Obscured unsubscribe/decline options
 * - Consent Bundling: Combining unrelated consents
 * - Confusing Language: Double negatives or unclear phrasing
 */

// ============================================
// PATTERN DEFINITIONS
// ============================================

/**
 * Patterns indicating obscured opt-out language
 */
const OBSCURED_OPTOUT_PATTERNS = [
    /\b(uncheck|untick) (this box |here )?(to|if you) (don't|do not|prefer not)\b/gi,
    /\b(by (not )?checking|leave unchecked)\b/gi,
    /\b(don't|do not) (want to )?(receive|get|subscribe|sign up)\b/gi,
];

/**
 * Patterns indicating confusing double negatives
 */
const DOUBLE_NEGATIVE_PATTERNS = [
    /\b(don't|do not) (uncheck|untick|deselect)\b/gi,
    /\bnot (to )?not\b/gi,
    /\b(un)?subscribe.*(un)?less\b/gi,
];

/**
 * Patterns indicating consent bundling
 */
const BUNDLING_PATTERNS = [
    /\b(and|also|as well as|plus) (receive|get|agree|accept)\b/gi,
    /\b(all|everything|the following|these terms)\b/gi,
];

/**
 * Analyze for consent manipulation patterns
 * @param {string} pageText - Page text content
 * @param {Object} uiMetadata - UI metadata
 * @returns {Array} Array of detected flags
 */
function analyze(pageText, uiMetadata) {
    const flags = [];
    const text = pageText || '';

    // Check for pre-checked consent boxes
    if (uiMetadata.preCheckedBoxes === true) {
        flags.push({
            type: 'Pre-selected Consent',
            category: 'consentManipulation',
            severity: 'high',
            explanation: 'Options are pre-selected by default, which may lead users to consent to things they did not actively choose.',
            score: 15
        });
    }

    // Check for obscured opt-out language
    const hasObscuredOptout = OBSCURED_OPTOUT_PATTERNS.some(pattern => pattern.test(text));
    if (hasObscuredOptout) {
        flags.push({
            type: 'Obscured Opt-out',
            category: 'consentManipulation',
            severity: 'medium',
            explanation: 'The opt-out mechanism uses confusing language that requires extra effort to understand.',
            score: 10
        });
    }

    // Check for double negatives in consent language
    const hasDoubleNegatives = DOUBLE_NEGATIVE_PATTERNS.some(pattern => pattern.test(text));
    if (hasDoubleNegatives) {
        flags.push({
            type: 'Confusing Language',
            category: 'consentManipulation',
            severity: 'high',
            explanation: 'Double negatives or confusing phrasing makes it difficult to understand what you are consenting to.',
            score: 12
        });
    }

    // Check for consent bundling indicators
    if (analyzeConsentBundling(text)) {
        flags.push({
            type: 'Consent Bundling',
            category: 'consentManipulation',
            severity: 'medium',
            explanation: 'Multiple unrelated consents may be bundled together, preventing granular choice.',
            score: 8
        });
    }

    // Check for hidden unsubscribe patterns
    if (analyzeHiddenUnsubscribe(text, uiMetadata)) {
        flags.push({
            type: 'Hidden Unsubscribe',
            category: 'consentManipulation',
            severity: 'medium',
            explanation: 'Unsubscribe or opt-out options may not be clearly visible or accessible.',
            score: 10
        });
    }

    // Check for misdirection in consent flow
    if (uiMetadata.consentFlowSteps && uiMetadata.consentFlowSteps > 3) {
        flags.push({
            type: 'Consent Maze',
            category: 'consentManipulation',
            severity: 'medium',
            explanation: `Opting out requires ${uiMetadata.consentFlowSteps} steps, which may discourage users from exercising their choice.`,
            score: Math.min(uiMetadata.consentFlowSteps * 2, 12)
        });
    }

    return flags;
}

/**
 * Analyze for consent bundling patterns
 * @param {string} text - Text to analyze
 * @returns {boolean} True if bundling detected
 */
function analyzeConsentBundling(text) {
    if (!text) return false;

    // Count consent-related keywords
    const consentKeywords = (text.match(/\b(agree|consent|accept|subscribe|sign up|opt[- ]?in)\b/gi) || []).length;

    // If multiple consent actions appear together, might be bundling
    if (consentKeywords >= 3) {
        return true;
    }

    // Check for explicit bundling language
    return BUNDLING_PATTERNS.some(pattern => pattern.test(text));
}

/**
 * Analyze for hidden unsubscribe mechanisms
 * @param {string} text - Page text
 * @param {Object} uiMetadata - UI metadata
 * @returns {boolean} True if hidden unsubscribe detected
 */
function analyzeHiddenUnsubscribe(text, uiMetadata) {
    // Check if unsubscribe is mentioned but not prominently
    const mentionsUnsubscribe = /\bunsubscribe\b/gi.test(text);
    const mentionsOptOut = /\bopt[- ]?out\b/gi.test(text);

    // If metadata indicates the opt-out is visually de-emphasized
    if ((mentionsUnsubscribe || mentionsOptOut) && uiMetadata.optOutVisibility === 'low') {
        return true;
    }

    // Check for patterns that bury the unsubscribe
    const buriedPatterns = /\b(tiny|small|fine) print\b|\bterms and conditions\b|\bprivacy policy\b/gi;
    if ((mentionsUnsubscribe || mentionsOptOut) && buriedPatterns.test(text)) {
        return true;
    }

    return false;
}

module.exports = { analyze };
