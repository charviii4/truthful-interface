/**
 * Dark Pattern Analyzers
 * 
 * Rule-based heuristic analysis for detecting manipulative UI patterns.
 * Each analyzer is transparent and explainable - no black-box AI.
 */

const languageAnalyzer = require('./languageAnalyzer');
const visualAnalyzer = require('./visualAnalyzer');
const consentAnalyzer = require('./consentAnalyzer');

/**
 * Main analysis function
 * Runs all analyzers and aggregates results
 * 
 * @param {string} pageText - Text content from the UI
 * @param {Object} uiMetadata - UI interaction metadata
 * @returns {Object} Analysis result with all detected flags
 */
function analyzeContent(pageText, uiMetadata) {
    const flags = [];

    // Run language/text analysis
    const languageFlags = languageAnalyzer.analyze(pageText);
    flags.push(...languageFlags);

    // Run visual/UI analysis
    const visualFlags = visualAnalyzer.analyze(uiMetadata);
    flags.push(...visualFlags);

    // Run consent pattern analysis
    const consentFlags = consentAnalyzer.analyze(pageText, uiMetadata);
    flags.push(...consentFlags);

    return { flags };
}

module.exports = { analyzeContent };
