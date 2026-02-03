/**
 * Visual Analyzer
 * 
 * Detects manipulative visual patterns in UI metadata.
 * Analyzes button contrast, visual hierarchy, and interactive elements.
 * 
 * Pattern Categories:
 * - Choice Asymmetry: Making one option visually dominant
 * - Countdown Timers: Visual urgency elements
 * - Low Contrast: Making certain options hard to see
 */

// ============================================
// THRESHOLD DEFINITIONS
// Documented thresholds for transparent analysis
// ============================================

/**
 * WCAG AA recommends minimum contrast ratio of 4.5:1 for normal text
 * We flag ratios below 3.0 as potentially problematic for choice visibility
 */
const MIN_ACCEPTABLE_CONTRAST = 3.0;

/**
 * Analyze UI metadata for visual manipulation patterns
 * @param {Object} uiMetadata - UI interaction metadata
 * @returns {Array} Array of detected flags
 */
function analyze(uiMetadata) {
    if (!uiMetadata || typeof uiMetadata !== 'object') {
        return [];
    }

    const flags = [];

    // Check for countdown timers
    if (uiMetadata.hasCountdownTimer === true) {
        flags.push({
            type: 'Fake Urgency',
            category: 'visualCoercion',
            severity: 'high',
            explanation: 'A countdown timer is used to pressure quick decisions without evidence of real scarcity or deadline.',
            score: 15
        });
    }

    // Check for contrast ratio issues
    if (typeof uiMetadata.contrastRatio === 'number') {
        if (uiMetadata.contrastRatio < MIN_ACCEPTABLE_CONTRAST) {
            const severity = uiMetadata.contrastRatio < 2.0 ? 'high' : 'medium';
            flags.push({
                type: 'Low Contrast',
                category: 'visualCoercion',
                severity,
                explanation: `Contrast ratio of ${uiMetadata.contrastRatio.toFixed(1)}:1 may make certain options difficult to see, potentially steering users toward more visible choices.`,
                score: severity === 'high' ? 12 : 8
            });
        }
    }

    // Check for choice asymmetry (button text analysis)
    const asymmetryResult = analyzeChoiceAsymmetry(uiMetadata);
    if (asymmetryResult) {
        flags.push(asymmetryResult);
    }

    // Check for visual elements that create pressure
    if (uiMetadata.hasAnimatedElements === true) {
        flags.push({
            type: 'Attention Manipulation',
            category: 'visualCoercion',
            severity: 'low',
            explanation: 'Animated elements may draw attention disproportionately to certain choices.',
            score: 5
        });
    }

    // Check for progress indicators that pressure completion
    if (uiMetadata.showsProgress === true && uiMetadata.progressLocked !== false) {
        flags.push({
            type: 'Sunk Cost Pressure',
            category: 'visualCoercion',
            severity: 'medium',
            explanation: 'Progress indicators may create psychological pressure to complete a process even if the user has doubts.',
            score: 8
        });
    }

    return flags;
}

/**
 * Analyze button text for choice asymmetry
 * Detects when positive/negative framing is used to steer choices
 * 
 * @param {Object} uiMetadata - UI metadata with button text
 * @returns {Object|null} Flag object if asymmetry detected, null otherwise
 */
function analyzeChoiceAsymmetry(uiMetadata) {
    const { primaryButtonText, secondaryButtonText } = uiMetadata;

    if (!primaryButtonText || !secondaryButtonText) {
        return null;
    }

    const primary = primaryButtonText.toLowerCase();
    const secondary = secondaryButtonText.toLowerCase();

    // Patterns indicating manipulative framing
    const positiveFraming = ['yes', 'accept', 'continue', 'get', 'claim', 'unlock', 'start', 'try'];
    const negativeFraming = ['no', 'miss out', 'decline', 'skip', 'lose', "don't", 'later', 'remind'];
    const guiltyFraming = ['no thanks', "i don't want", 'not interested', "i'll miss"];

    let asymmetryScore = 0;
    let explanation = '';

    // Check if primary uses positive language
    const primaryPositive = positiveFraming.some(word => primary.includes(word));

    // Check if secondary uses negative/guilty language
    const secondaryNegative = negativeFraming.some(word => secondary.includes(word));
    const secondaryGuilty = guiltyFraming.some(phrase => secondary.includes(phrase));

    if (secondaryGuilty) {
        asymmetryScore = 3;
        explanation = 'The decline option uses guilt-inducing language, making users feel bad about choosing it.';
    } else if (primaryPositive && secondaryNegative) {
        asymmetryScore = 2;
        explanation = 'Button language is asymmetric - the desired action uses positive framing while the alternative uses negative framing.';
    }

    // Check text length asymmetry (long decline text is a common pattern)
    if (secondary.length > primary.length * 2 && secondary.length > 20) {
        asymmetryScore += 1;
        explanation = explanation || 'The decline option has significantly longer text, potentially making it less appealing to read.';
    }

    if (asymmetryScore > 0) {
        return {
            type: 'Choice Asymmetry',
            category: 'choiceAsymmetry',
            severity: getSeverity(asymmetryScore),
            explanation,
            score: Math.min(asymmetryScore * 5, 15)
        };
    }

    return null;
}

/**
 * Convert numeric score to severity level
 */
function getSeverity(score) {
    if (score >= 3) return 'high';
    if (score >= 2) return 'medium';
    return 'low';
}

module.exports = { analyze };
