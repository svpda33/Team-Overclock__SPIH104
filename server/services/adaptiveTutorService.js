/**
 * Rule-Based Adaptive Learning Engine
 * Implements PS 06 Adaptive Pace, Knowledge Score Management,
 * Understanding vs. Memorization Detection, and Question Selection.
 */

const { getAdaptiveQuestion } = require('../data/questions');

const KNOWLEDGE_LEVELS = {
  BEGINNER: { min: 0, max: 30, label: 'BEGINNER' },
  LEARNING: { min: 31, max: 60, label: 'LEARNING' },
  GOOD: { min: 61, max: 80, label: 'GOOD' },
  ADVANCED: { min: 81, max: 100, label: 'ADVANCED' }
};

function calculateLevelFromScore(score) {
  const currentScore = Math.max(0, Math.min(100, score));
  if (currentScore <= 30) return 'BEGINNER';
  if (currentScore <= 60) return 'LEARNING';
  if (currentScore <= 80) return 'GOOD';
  return 'ADVANCED';
}

function processAdaptiveLearning({
  question,
  language = 'en',
  classLevel = 1,
  subject = 'Maths',
  topic = 'Addition',
  currentDifficulty = 'BEGINNER',
  currentScore = 25
}) {
  const q = question.trim().toLowerCase();
  const isTelugu = language === 'te';

  let newScore = currentScore;
  let understandingStatus = 'developing'; // 'developing', 'verified', 'memorized', 'struggling'
  let nextAction = 'explain'; // 'ask_why', 'increase_difficulty', 'provide_hint', 'reinforce'

  // Safety Distress Check
  const distressKeywords = ['scared', 'sad', 'crying', 'lonely', 'afraid', 'upset', 'సంతోషం లేదు', 'భయం', 'ఏడుపు'];
  if (distressKeywords.some(k => q.includes(k))) {
    return {
      difficulty: calculateLevelFromScore(newScore),
      knowledgeScore: newScore,
      understanding: 'distress',
      nextAction: 'safety_intervention',
      suggestedQuestion: null
    };
  }

  // Detect explanation keywords ("because", "since", "reason", "ఎందుకంటే", "కారణం")
  const explanationKeywords = ['because', 'since', 'so', 'reason', 'equal', 'means', ' added', 'ఎందుకంటే', 'కారణం', 'కాబట్టి', 'సమానం'];
  const hasExplanation = explanationKeywords.some(k => q.includes(k));

  // Detect memorized response ("memorized", "just remembered", "గుర్తుపెట్టుకున్నా")
  const memorizedKeywords = ['memorize', 'memorised', 'remembered', 'just know', 'గుర్తుపెట్టుకున్నా', 'తెలుసు అంతే'];
  const isMemorized = memorizedKeywords.some(k => q.includes(k));

  // Detect basic correct numbers for Class 1 topics
  const isCorrectNumber = q.includes('2') || q.includes('5') || q.includes('8') || q.includes('9') || q.includes('3') || q.includes('15') || q.includes('circle');

  if (isMemorized) {
    // Student admits memorization: Do not increase difficulty, reinforce concept
    understandingStatus = 'memorized';
    nextAction = 'reinforce';
  } else if (hasExplanation) {
    // Student provided explanation: Elevate score & difficulty!
    understandingStatus = 'verified';
    newScore = Math.min(100, currentScore + 15);
    nextAction = 'increase_difficulty';
  } else if (isCorrectNumber) {
    // Correct numeric answer, but needs "Why?" explanation check
    understandingStatus = 'developing';
    nextAction = 'ask_why';
  } else if (q.includes("don't know") || q.includes("wrong") || q.includes("hard") || q.includes("కష్టం") || q.includes("తెలియదు")) {
    // Struggling: Reduce score, give hint & prerequisite question
    understandingStatus = 'struggling';
    newScore = Math.max(0, currentScore - 10);
    nextAction = 'provide_hint';
  }

  const difficulty = calculateLevelFromScore(newScore);
  const suggestedQuestion = getAdaptiveQuestion(topic, difficulty, language);

  return {
    difficulty,
    knowledgeScore: newScore,
    understanding: understandingStatus,
    nextAction,
    suggestedQuestion
  };
}

module.exports = {
  KNOWLEDGE_LEVELS,
  calculateLevelFromScore,
  processAdaptiveLearning
};
