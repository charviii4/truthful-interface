/**
 * Trust Score Calculator
 * 
 * Calculates a transparent, explainable trust score from 0-100.
 * Higher score = more trustworthy design.
 * 
 * Scoring Philosophy:
 * - Start from 100 (assume good intent)
 * - Deduct points based on detected patterns
 * - Score breakdown shows exactly where points were lost
 * - All deductions are documented and deterministic
 */

// ============================================
// SCORE CONFIGURATION
// Maximum deductions per category for balance
// ============================================

const CATEGORY_MAX_DEDUCTIONS = {
    languageManipulation: 30,  // Max 30 points for language issues
    visualCoercion: 25,        // Max 25 points for visual issues
    choiceAsymmetry: 20,       // Max 20 points for choice issues
    consentManipulation: 25,   // Max 25 points for consent issues
};

/**
 * Calculate trust score from detected flags
 * 
 * @param {Array} flags - Array of detected pattern flags
 * @returns {Object} Trust score and breakdown
 * 
 * Each flag should have:
 * - category: string (which category the pattern belongs to)
 * - score: number (points to deduct, before cap)
 */
function calculateTrustScore(flags) {
    // Initialize base score and category deductions
    const BASE_SCORE = 100;

    const categoryDeductions = {
        languageManipulation: 0,
        visualCoercion: 0,
        choiceAsymmetry: 0,
        consentManipulation: 0,
    };

    // Calculate deductions per category
    for (const flag of flags) {
        const category = flag.category || 'other';
        const deduction = flag.score || 0;

        if (categoryDeductions.hasOwnProperty(category)) {
            categoryDeductions[category] += deduction;
        }
    }

    // Apply category caps to prevent any single category from dominating
    const cappedDeductions = {};
    for (const [category, deduction] of Object.entries(categoryDeductions)) {
        const maxDeduction = CATEGORY_MAX_DEDUCTIONS[category] || 25;
        cappedDeductions[category] = Math.min(deduction, maxDeduction);
    }

    // Calculate total deduction
    const totalDeduction = Object.values(cappedDeductions).reduce((sum, val) => sum + val, 0);

    // Calculate final score (minimum 0)
    const trustScore = Math.max(0, BASE_SCORE - totalDeduction);

    // Format score breakdown for response
    // Show negative values to indicate deductions
    const scoreBreakdown = {};
    for (const [category, deduction] of Object.entries(cappedDeductions)) {
        if (deduction > 0) {
            scoreBreakdown[category] = -deduction;
        }
    }

    return {
        trustScore: Math.round(trustScore),
        scoreBreakdown
    };
}

/**
 * Get trust level label based on score
 * (Optional helper for readable output)
 * 
 * @param {number} score - Trust score 0-100
 * @returns {string} Human-readable trust level
 */
function getTrustLevel(score) {
    if (score >= 90) return 'High Trust';
    if (score >= 70) return 'Moderate Trust';
    if (score >= 50) return 'Needs Attention';
    if (score >= 30) return 'Concerning';
    return 'Low Trust';
}

module.exports = {
    calculateTrustScore,
    getTrustLevel,
    CATEGORY_MAX_DEDUCTIONS
};
